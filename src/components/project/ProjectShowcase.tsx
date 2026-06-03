import Link from 'next/link'
import { BrowserWindow, TerminalWindow, CodeEditorWindow, TerminalLine, Tok } from '@/components/windows'
import FluidLabel from '@/components/FluidLabel'
import type { Project } from '@/lib/projects'
import ProjectMockup from './ProjectMockup'
import { getMockup, getMockupWindow } from './registry'

/**
 * A single project on the homepage: title strip + arrow + windowed mockup.
 *
 * For each project we pick the window kind from `project.mockupKind` and an
 * optional custom mockup component from CUSTOM_MOCKUPS (keyed by project id).
 * Projects without a custom mockup fall back to the generic `<ProjectMockup>`
 * (tag pills + title + metric tiles + "placeholder" marker).
 *
 * The whole window sits inside `.project-frame` so hovering the Link triggers:
 *   1. A radial ambient glow blooms behind the window (colors per project via
 *      the `--glow-1 / 2 / 3` CSS variables).
 *   2. The window lifts up by ~8px.
 */

/** Per-project glow palettes. Hover ambient lighting picks from these. */
const GLOW_PALETTES: Record<string, { '--glow-1': string; '--glow-2': string; '--glow-3': string }> = {
  'mety-legal': {
    // Prismatic — matches the rainbow swirl on the landing page
    '--glow-1': 'rgba(0, 212, 255, 0.55)',
    '--glow-2': 'rgba(255, 0, 170, 0.40)',
    '--glow-3': 'rgba(255, 140, 0, 0.30)',
  },
  aegisflow: {
    // Cool blues — distributed systems / reliability vibe
    '--glow-1': 'rgba(64, 156, 255, 0.55)',
    '--glow-2': 'rgba(138, 102, 255, 0.40)',
    '--glow-3': 'rgba(40, 220, 200, 0.25)',
  },
  'distributed-kv': {
    // Console-green
    '--glow-1': 'rgba(80, 220, 130, 0.45)',
    '--glow-2': 'rgba(40, 180, 180, 0.35)',
    '--glow-3': 'rgba(20, 120, 100, 0.25)',
  },
  semiconductor: {
    // Warm amber / industrial
    '--glow-1': 'rgba(255, 180, 60, 0.50)',
    '--glow-2': 'rgba(255, 120, 50, 0.35)',
    '--glow-3': 'rgba(200, 60, 40, 0.25)',
  },
  'launch-parameters': {
    // Deep-space blue / orbit teal — matches the dark cosmos globe
    '--glow-1': 'rgba(30, 120, 255, 0.55)',
    '--glow-2': 'rgba(0, 200, 220, 0.35)',
    '--glow-3': 'rgba(80, 60, 200, 0.25)',
  },
  'missing-persons': {
    // ASU Gold & Maroon — matches the ASU project identity
    '--glow-1': 'rgba(140, 29, 64, 0.55)',
    '--glow-2': 'rgba(255, 198, 39, 0.40)',
    '--glow-3': 'rgba(140, 29, 64, 0.25)',
  },
  pixeldrive: {
    // Carla road colors — violet → pink → cyan, mirrors the tab20 mask palette
    '--glow-1': 'rgba(155, 108, 199, 0.50)',
    '--glow-2': 'rgba(255, 122, 144, 0.35)',
    '--glow-3': 'rgba(78, 195, 230, 0.25)',
  },
  'genome-assembler': {
    // Lab-bench green / teal — DNA bases, agar plates, terminal feel
    '--glow-1': 'rgba(80, 220, 130, 0.50)',
    '--glow-2': 'rgba(40, 200, 180, 0.35)',
    '--glow-3': 'rgba(120, 200, 80, 0.25)',
  },
  'job-hunt': {
    // Hustle amber / desktop teal — productivity tool, tray-app vibe
    '--glow-1': 'rgba(255, 180, 60, 0.45)',
    '--glow-2': 'rgba(80, 200, 200, 0.30)',
    '--glow-3': 'rgba(120, 100, 220, 0.20)',
  },
  zebradoodle: {
    // Wordle-tile palette — green / amber / soft slate
    '--glow-1': 'rgba(90, 179, 106, 0.50)',
    '--glow-2': 'rgba(202, 168, 77, 0.35)',
    '--glow-3': 'rgba(160, 160, 200, 0.20)',
  },
}

export default function ProjectShowcase({ project }: { project: Project }) {
  const glowStyle = GLOW_PALETTES[project.id] as React.CSSProperties | undefined

  return (
    <article>
      <Link
        href={`/projects/${project.id}`}
        className="project-trigger block"
        aria-label={`Open ${project.title} case study`}
      >
        <div className="project-frame relative overflow-hidden bg-ink-raised border border-ink-border rounded-3xl p-6 sm:p-8 lg:p-10 z-10" style={glowStyle}>
          {/* Encapsulated inner color glow */}
          <div className="project-inner-glow pointer-events-none" style={{ background: 'radial-gradient(ellipse 75% 64% at 50% 58%, var(--glow-1) 0%, var(--glow-2) 40%, var(--glow-3) 70%, transparent 90%)', ...glowStyle }} />
          
          {/* Header inside the card */}
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pr-16 sm:pr-0 z-10">
            <div>
              <h2 className="font-sans font-medium text-bone text-[clamp(1.4rem,2.6vw,1.8rem)] tracking-tightest mb-1.5">
                {project.title}
              </h2>
              <p className="text-bone-muted text-sm leading-relaxed">
                <span className="text-bone/85 font-medium">{project.category}</span>
                {project.year ? <span>, '{project.year.slice(-2)}</span> : null}
                <span className="text-bone-dim"> — </span>
                <span>{project.blurb}</span>
              </p>
            </div>
            {/* Decorative only — the whole card is already a <Link>. No href
                here, so FluidLabel renders a <span> and we avoid nesting an
                <a> inside an <a> (which is invalid HTML and breaks hydration). */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0 shrink-0">
              <FluidLabel
                expand
                icon={
                  <span className="text-base leading-none" aria-hidden="true">
                    →
                  </span>
                }
              >
                View project
              </FluidLabel>
            </div>
          </div>

          {/* Mockup window inside the card */}
          <div className="project-window relative z-10">
            {renderMockup(project)}
          </div>
        </div>
      </Link>
    </article>
  )
}

function renderMockup(p: Project) {
  const Custom = getMockup(p.id)
  if (Custom) {
    const win = getMockupWindow(p.id) ?? 'browser'
    if (win === 'terminal') {
      return (
        <TerminalWindow title={`mustakim@portfolio: ~/projects/${p.id}`}>
          <Custom />
        </TerminalWindow>
      )
    }
    if (win === 'editor') {
      return (
        <CodeEditorWindow filename={`${p.id}.ts`} language="ts" showLineNumbers={false}>
          <Custom />
        </CodeEditorWindow>
      )
    }
    return (
      <BrowserWindow url={p.mockupUrl} tabTitle={p.title}>
        <Custom />
      </BrowserWindow>
    )
  }
  switch (p.mockupKind) {
    case 'terminal':
      return (
        <TerminalWindow title={`mustakim@portfolio: ~/projects/${p.id}`}>
          <div className="p-5 sm:p-8 space-y-3 min-h-[280px]">
            <TerminalLine command={`cat ${p.id}.md`} />
            <TerminalLine
              output={
                <div className="space-y-1.5 mt-1">
                  <div className="text-bone">
                    <span className="text-bone-muted"># {p.title}</span>
                  </div>
                  <div className="text-bone/70 text-[13px]">{p.subtitle}</div>
                  <div className="text-bone-dim text-[12px] italic">{p.category}</div>
                </div>
              }
            />
            <TerminalLine command="metrics --format=brief" />
            <TerminalLine
              output={
                <div className="grid grid-cols-3 gap-x-6 gap-y-1 mt-1 text-[13px]">
                  {(p.metrics ?? []).slice(0, 3).map(m => (
                    <div key={m.label}>
                      <span className="text-bone">{m.value}</span>
                      <span className="text-bone-dim ml-2">{m.label.toLowerCase()}</span>
                    </div>
                  ))}
                </div>
              }
            />
            <TerminalLine command="open --in-editor" />
            <div className="text-bone-dim/60 italic text-[12px]">→ opening case study…</div>
          </div>
        </TerminalWindow>
      )
    case 'editor':
      return (
        <CodeEditorWindow filename={`${p.id}.ts`} language="ts">
          <pre className="text-[13px] leading-[1.55] m-0">
            <code>
              {Tok.comment(`// ${p.title}`)}
              {'\n'}
              {Tok.comment(`// ${p.subtitle}`)}
              {'\n\n'}
              {Tok.keyword('export const ')}
              {Tok.variable('project')} {Tok.punct('= {')}
              {'\n  '}
              {Tok.variable('name')}
              {Tok.punct(': ')}
              {Tok.string(`'${p.title}'`)}
              {Tok.punct(',')}
              {'\n  '}
              {Tok.variable('category')}
              {Tok.punct(': ')}
              {Tok.string(`'${p.category}'`)}
              {Tok.punct(',')}
              {'\n  '}
              {Tok.variable('stack')}
              {Tok.punct(': [')}
              {'\n    '}
              {p.tags.slice(0, 6).map((t, i) => (
                <span key={t}>
                  {Tok.string(`'${t}'`)}
                  {Tok.punct(i < Math.min(p.tags.length, 6) - 1 ? ', ' : '')}
                </span>
              ))}
              {'\n  '}
              {Tok.punct('],')}
              {'\n  '}
              {Tok.variable('metrics')}
              {Tok.punct(': {')}
              {'\n'}
              {(p.metrics ?? []).slice(0, 3).map(m => (
                <span key={m.label}>
                  {'    '}
                  {Tok.variable(camelize(m.label))}
                  {Tok.punct(': ')}
                  {Tok.string(`'${m.value}'`)}
                  {Tok.punct(',')}
                  {'\n'}
                </span>
              ))}
              {'  '}
              {Tok.punct('},')}
              {'\n'}
              {Tok.punct('}')}
              {'\n\n'}
              {Tok.comment('// TODO: real editor mockup goes here')}
            </code>
          </pre>
        </CodeEditorWindow>
      )
    case 'browser':
    default:
      return (
        <BrowserWindow url={p.mockupUrl}>
          <ProjectMockup project={p} />
        </BrowserWindow>
      )
  }
}

function camelize(s: string) {
  return s
    .toLowerCase()
    .replace(/[\s\W_]+(\w)/g, (_, c) => c.toUpperCase())
    .replace(/[^A-Za-z0-9]/g, '')
}
