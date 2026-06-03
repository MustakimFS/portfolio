import type { Project } from '@/lib/projects'
import FluidLabel from '@/components/FluidLabel'

/**
 * Placeholder mockup content shown inside a faux browser window on the
 * homepage. Each project will get its own custom mockup eventually — for now
 * we render a styled summary: tag pills, big title, blurb, metrics, and a
 * "mockup placeholder" badge.
 */
export default function ProjectMockup({
  project,
  customMockup,
}: {
  project: Project
  customMockup?: React.ReactNode
}) {
  if (customMockup) return <>{customMockup}</>
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      {/* Soft inner gradient for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative h-full flex flex-col items-center justify-center px-10 py-12 text-center">
        {/* Tag pills — fluid glass */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6 max-w-md">
          {project.tags.slice(0, 5).map(t => (
            <FluidLabel key={t} size="xs">
              <span className="font-mono text-bone-muted text-[10.5px]">{t}</span>
            </FluidLabel>
          ))}
        </div>

        {/* Big title */}
        <h3 className="font-sans font-medium text-bone text-[clamp(1.6rem,3.5vw,2.6rem)] tracking-tightest leading-tight mb-3">
          {project.title}
        </h3>

        {/* One-line description */}
        <p className="text-bone-muted text-sm max-w-md mb-8">{project.subtitle}</p>

        {/* Metric grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-4 max-w-lg w-full">
            {project.metrics.slice(0, 3).map(m => (
              <div
                key={m.label}
                className="bg-black/30 border border-white/[0.05] rounded-md py-3 px-3"
              >
                <div className="font-sans font-medium text-bone text-lg leading-none mb-1">
                  {m.value}
                </div>
                <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <span className="placeholder-badge">mockup placeholder</span>
        </div>
      </div>
    </div>
  )
}
