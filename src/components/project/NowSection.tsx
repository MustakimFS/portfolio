import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import { NOW_BUILDING, IDEAS } from '@/lib/now'

/**
 * "Now" — a snapshot of what's actively being built + ideas being explored.
 * Lives on the homepage. Content comes from `src/lib/now.ts`.
 */
export default function NowSection() {
  if (NOW_BUILDING.length === 0 && IDEAS.length === 0) return null

  return (
    <section id="now" className="px-4 sm:px-8 py-12 scroll-mt-24">
      <div className="max-w-6xl lg:max-w-[1340px] mx-auto">
        {/* Live "now" eyebrow with a pulsing dot */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-bone/40 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-bone" />
          </span>
          <span className="text-bone-muted text-[11px] font-medium uppercase tracking-eyebrow">
            Now · actively building
          </span>
        </div>

        <HeroHeading sans="What I'm building" accent="right now." size="md" className="mb-10" />

        {/* Active work */}
        {NOW_BUILDING.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14">
            {NOW_BUILDING.map(item => (
              <div
                key={item.title}
                className="bg-ink-raised border border-ink-border rounded-2xl p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-sans font-medium text-bone text-lg leading-snug">
                    {item.title}
                  </h3>
                  {item.status && (
                    <span className="shrink-0 text-[10px] font-mono uppercase tracking-eyebrow px-2 py-1 rounded-full bg-white/[0.06] border border-white/10 text-bone-muted">
                      {item.status}
                    </span>
                  )}
                </div>
                <p className="text-bone-muted text-sm leading-relaxed mb-4 flex-1">
                  {item.blurb}
                </p>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(t => (
                      <span
                        key={t}
                        className="text-[11px] text-bone-dim border border-ink-border rounded-md px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Ideas & explorations */}
        {IDEAS.length > 0 && (
          <>
            <SectionLabel className="mb-4">Ideas &amp; explorations</SectionLabel>
            <ul className="space-y-3 max-w-3xl">
              {IDEAS.map((idea, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-bone-muted text-[15px] leading-relaxed"
                >
                  <span className="text-bone-dim mt-1.5 text-[10px] shrink-0" aria-hidden="true">
                    ◇
                  </span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
