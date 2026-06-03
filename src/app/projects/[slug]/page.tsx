import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getNextProject, ALL_PROJECTS, type Project } from '@/lib/projects'
import { BrowserWindow, TerminalWindow, CodeEditorWindow } from '@/components/windows'
import ProjectMockup from '@/components/project/ProjectMockup'
import { getHeroMockup, getMockupWindow, getCaseStudy, getSections } from '@/components/project/registry'
import CaseStudySidebar from '@/components/project/CaseStudySidebar'
import CaseStudyBackButton from '@/components/project/CaseStudyBackButton'
import FigureCaption from '@/components/project/FigureCaption'
import SectionLabel from '@/components/typography/SectionLabel'
import HeroHeading from '@/components/typography/HeroHeading'
import FluidLabel from '@/components/FluidLabel'
import Footer from '@/components/Footer'

/**
 * Case study template page. Every project gets one of these by default —
 * structure follows Perry Wang's: Overview → Highlights → Context → Problem
 * → Process → Visual Design → Final → Retrospective → Next Project.
 *
 * Most content is intentional placeholder — swap in real text/images per
 * project. Look for `<span className="placeholder-badge">` markers to find
 * what to edit.
 */

const DEFAULT_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'visual', label: 'Visual Design' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

// Pre-generate static params for every project
export async function generateStaticParams() {
  return ALL_PROJECTS.map(p => ({ slug: p.id }))
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const next = getNextProject(params.slug)
  const tintClass = `tint-${project.tint ?? 'stadia'}`
  const HeroMockup = getHeroMockup(project.id)
  const CustomCaseStudy = getCaseStudy(project.id)
  const sections = getSections(project.id) ?? DEFAULT_SECTIONS

  return (
    <main className={`min-h-screen ${
      project.id === 'missing-persons' ? 'selection-asu theme-asu' :
      project.id === 'aegisflow' ? 'selection-aegisflow theme-aegisflow' : ''
    }`}>
      {/* Scroll-aware Back button — fixed to viewport so it follows you down
          the page; hides when scrolling down and reappears on scroll-up. */}
      <CaseStudyBackButton />

      {/* ── Hero — outlined title + tinted backdrop + device mockup ────── */}
      <section className={`${tintClass} px-6 sm:px-8 pt-32 sm:pt-36 pb-20 relative overflow-hidden`}>
        <div className="max-w-5xl mx-auto text-center">

          {/* Outlined / serif title */}
          <h1 className="font-serif italic font-normal text-[clamp(2.6rem,7vw,5rem)] leading-[1.15] pb-2 mb-2 text-accent-glow">
            {project.title}
          </h1>
          <p className="text-bone-muted text-base sm:text-lg mb-12">
            {project.category} {project.year && <>| {project.year}</>}
          </p>

          {/* Hero device mockup — uses the registered custom mockup AND
              the registered window kind. Defaults to BrowserWindow if no
              mockupWindow is set on the registry entry. */}
          {HeroMockup ? (
            (() => {
              const win = getMockupWindow(project.id) ?? 'browser'
              if (win === 'terminal') {
                return (
                  <TerminalWindow
                    title={`mustakim@portfolio: ~/projects/${project.id}`}
                  >
                    <HeroMockup />
                  </TerminalWindow>
                )
              }
              if (win === 'editor') {
                return (
                  <CodeEditorWindow
                    filename={`${project.id}.ts`}
                    language="ts"
                    showLineNumbers={false}
                  >
                    <HeroMockup />
                  </CodeEditorWindow>
                )
              }
              return (
                <BrowserWindow url={project.mockupUrl} tabTitle={project.title}>
                  <HeroMockup />
                </BrowserWindow>
              )
            })()
          ) : (
            <BrowserWindow url={project.mockupUrl} tabTitle={project.title}>
              <ProjectMockup project={project} />
            </BrowserWindow>
          )}
        </div>
      </section>

      {/* ── Two-column body with sticky sidebar ────────────────────────── */}
      <div className="px-6 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1024px)_220px] justify-center gap-12">
          {/* Left spacer to center the main content column on lg screens */}
          <div className="hidden lg:block w-[220px]" />

          {/* Main content column — custom case study when registered;
              otherwise the placeholder template below. */}
          <div className="w-full max-w-5xl">
            {CustomCaseStudy ? (
              <CustomCaseStudy />
            ) : (
              <div className="space-y-24">
                <OverviewSection project={project} />
                <HighlightsSection project={project} />
                <ContextSection project={project} />
                <ProblemSection project={project} />
                <ProcessSection project={project} />
                <VisualDesignSection project={project} />
                <FinalSection project={project} />
                <RetroSection project={project} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <CaseStudySidebar sections={sections} />
        </div>
      </div>

      {/* ── Next Project ──────────────────────────────────────────────── */}
      {next && (
        <section className="px-6 sm:px-8 pb-24">
          <div className="max-w-5xl mx-auto">
            <SectionLabel className="mb-4">Next Project</SectionLabel>
            <Link href={`/projects/${next.id}`} className="block group">
              {/* Same anti-shift pattern: card reserves pr-32 for the
                  absolutely-positioned Open button so it can expand on hover
                  without pushing the title text around. `block` makes this a
                  full-width card; the explicit `relative` provides a
                  positioning context for the absolute Open button. */}
              <div className="block relative fluid-label px-8 py-7 pr-32 rounded-2xl">
                <div>
                  <h3 className="font-sans font-medium text-bone text-xl mb-1">{next.title}</h3>
                  <p className="text-bone-muted text-sm">{next.blurb}</p>
                </div>
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <FluidLabel
                    expand
                    ariaLabel={`Open ${next.title}`}
                    icon={
                      <span className="text-base leading-none" aria-hidden="true">
                        →
                      </span>
                    }
                  >
                    Open
                  </FluidLabel>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

// ── Section helpers ────────────────────────────────────────────────────────

function OverviewSection({ project }: { project: Project }) {
  return (
    <section id="overview" className="scroll-mt-24">
      <SectionLabel className="mb-4">Overview</SectionLabel>
      <HeroHeading
        sans="What it is,"
        accent="and why I built it."
        size="md"
        className="mb-8"
      />
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value={`Lead Engineer · ${project.category}`} />
        <p className="text-bone-muted">{project.description}</p>

        <Meta label="Stack" value={project.tags.join(' · ')} />
        <p className="text-bone-muted">
          <span className="placeholder-badge">role description</span> Add what you actually
          shipped, what your responsibilities were, and the cross-functional context.
        </p>

        <Meta label="Timeline" value={`${project.year ?? '2025'}`} />
        <p className="text-bone-muted">
          <span className="placeholder-badge">timeline placeholder</span> Replace with real
          duration, status, and any launch metrics.
        </p>
      </div>
    </section>
  )
}

function HighlightsSection({ project }: { project: Project }) {
  return (
    <section id="highlights" className="scroll-mt-24">
      <SectionLabel className="mb-4">Highlights</SectionLabel>
      <HeroHeading
        sans={`${project.title} in`}
        accent="three numbers."
        size="md"
        className="mb-10"
      />

      {/* Metric tiles */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {project.metrics.map(m => (
            <div
              key={m.label}
              className="bg-ink-raised border border-ink-border rounded-xl p-6"
            >
              <div className="font-sans font-medium text-bone text-3xl mb-2 tracking-tightish">
                {m.value}
              </div>
              <div className="text-bone-muted text-sm">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      <FigureCaption number="0.1" label="Key metrics at-a-glance." kind="diagram" />
    </section>
  )
}

function ContextSection({ project }: { project: Project }) {
  return (
    <section id="context" className="scroll-mt-24">
      <SectionLabel className="mb-4">Context</SectionLabel>
      <HeroHeading
        sans="The world this lived in,"
        accent="and the gap I saw."
        size="md"
        className="mb-8"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-6">
        <span className="placeholder-badge">context</span> Set the scene. What was happening
        in the world / the team / the codebase right before this work started? What did
        users want, or were missing, or were quietly suffering through?
      </p>
      <p className="text-bone-muted text-[15px] leading-relaxed">
        For Perry Wang&apos;s Stadia case study, this is where he collages community quotes from
        Reddit, Forbes, and The Verge to PROVE there was demand. Steal that move — show, don&apos;t
        tell. Drop in screenshots, tweets, GitHub issues, or paper citations here.
      </p>

      <div className="mt-8 rounded-xl bg-ink-raised border border-ink-border min-h-[280px] flex items-center justify-center">
        <span className="placeholder-badge">community / proof mosaic</span>
      </div>
      <FigureCaption number="1.0" label="Demand signals." kind="placeholder" />
    </section>
  )
}

function ProblemSection({ project }: { project: Project }) {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="The constraint stack —"
        accent="five things in tension."
        size="md"
        className="mb-8"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-8">
        <span className="placeholder-badge">problem</span> List the real constraints. Time?
        Compute? Compatibility? Data? Cost? People? Be specific.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {['Constraint A', 'Constraint B', 'Constraint C', 'Constraint D'].map((c, i) => (
          <div
            key={c}
            className="bg-ink-raised border border-ink-border rounded-lg p-4 flex items-start gap-3"
          >
            <span className="w-8 h-8 rounded-md bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 text-sm font-mono shrink-0">
              {i + 1}
            </span>
            <div>
              <div className="text-bone text-sm font-medium mb-1">{c}</div>
              <div className="text-bone-muted text-xs">
                <span className="placeholder-badge">constraint</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProcessSection({ project }: { project: Project }) {
  return (
    <section id="process" className="scroll-mt-24">
      <SectionLabel className="mb-4">Process</SectionLabel>
      <HeroHeading
        sans="How I got from"
        accent="zero to shipped."
        size="md"
        className="mb-8"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-8">
        <span className="placeholder-badge">process</span> Iteration steps, before/after
        comparisons, what got cut, what surprised you. Use numbered figures (3.0, 3.1,
        3.2…) and the VIDEO LOOP / IMAGE kind pills to mark what type of media each frame
        will hold.
      </p>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {['Before', 'After'].map((label, i) => (
          <div key={label}>
            <div className="aspect-video rounded-lg bg-ink-raised border border-ink-border flex items-center justify-center">
              <span className="placeholder-badge">{label.toLowerCase()} frame</span>
            </div>
            <FigureCaption
              number={`3.${i}`}
              label={label === 'Before' ? 'Initial approach.' : 'Final approach.'}
              kind="placeholder"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function VisualDesignSection({ project }: { project: Project }) {
  return (
    <section id="visual" className="scroll-mt-24">
      <SectionLabel className="mb-4">Visual Design</SectionLabel>
      <HeroHeading
        sans="Architecture, components,"
        accent="and the moments that matter."
        size="md"
        className="mb-8"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-8">
        <span className="placeholder-badge">design</span> System diagrams, key UI states,
        the API surface, or the component library. For research projects: model
        architecture, ablation tables, evaluation plots.
      </p>

      <div className="aspect-[16/9] rounded-xl bg-ink-raised border border-ink-border flex items-center justify-center">
        <span className="placeholder-badge">architecture / hero diagram</span>
      </div>
      <FigureCaption number="6.0" label="Full system architecture." kind="placeholder" />
    </section>
  )
}

function FinalSection({ project }: { project: Project }) {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="What shipped,"
        accent="end-to-end."
        size="md"
        className="mb-8"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-8">
        <span className="placeholder-badge">final</span> Show the polished final product.
        Real screenshots, real numbers, real outcomes.
      </p>

      <BrowserWindow url={project.mockupUrl} className="mb-2">
        {project.videoUrl ? (
          <div className="w-full bg-black overflow-hidden">
            <video
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            />
          </div>
        ) : (
          <ProjectMockup project={project} />
        )}
      </BrowserWindow>
      <FigureCaption number="7.0" label="Final product." kind={project.videoUrl ? 'video' : 'placeholder'} />
    </section>
  )
}

function RetroSection({ project }: { project: Project }) {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading sans="What I&apos;d do" accent="differently." size="md" className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Worked', 'Would change'].map(category => (
          <div key={category} className="bg-ink-raised border border-ink-border rounded-xl p-6">
            <h4 className="text-bone font-medium mb-3 text-sm uppercase tracking-eyebrow">
              {category}
            </h4>
            <ul className="space-y-2 text-bone-muted text-sm">
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-bone/40 mt-0.5">·</span>
                  <span>
                    <span className="placeholder-badge mr-1">item</span>
                    Replace me with a real lesson.
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-1.5">{label}</div>
      <div className="text-bone text-[14px]">{value}</div>
    </div>
  )
}
