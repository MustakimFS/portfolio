import Link from 'next/link'
import FluidLabel from '@/components/FluidLabel'
import type { Project } from '@/lib/projects'

/**
 * Compact "More work" list for non-featured projects. Each row links to the
 * full case study at /projects/<slug> without the heavy windowed mockup the
 * homepage hero cards use — title + category·year + blurb + an expand arrow.
 */
export default function ArchiveList({ projects }: { projects: Project[] }) {
  return (
    <ul className="divide-y divide-ink-border/60 border-y border-ink-border/60">
      {projects.map(project => (
        <li key={project.id}>
          <Link
            href={`/projects/${project.id}`}
            className="group relative flex items-center gap-4 py-5 pr-32 transition-colors hover:bg-ink-raised/40 rounded-lg px-4 -mx-4"
            aria-label={`Open ${project.title} case study`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-sans font-medium text-bone text-lg tracking-tightish mb-0.5 group-hover:text-bone transition-colors">
                {project.title}
              </h3>
              <p className="text-bone-muted text-sm leading-relaxed">
                <span className="text-bone/80">{project.category}</span>
                {project.year ? <span>, &apos;{project.year.slice(-2)}</span> : null}
                <span className="text-bone-dim"> — </span>
                <span>{project.blurb}</span>
              </p>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <FluidLabel
                expand
                ariaLabel={`Open ${project.title} case study`}
                icon={
                  <span className="text-base leading-none" aria-hidden="true">
                    →
                  </span>
                }
              >
                View project
              </FluidLabel>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
