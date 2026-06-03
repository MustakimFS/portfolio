'use client'

import { useEffect, useState } from 'react'

/**
 * Sticky right-side CONTENTS sidebar used inside case studies.
 * Highlights the section currently in view via IntersectionObserver.
 */
export default function CaseStudySidebar({
  sections,
}: {
  sections: { id: string; label: string }[]
}) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null)

  useEffect(() => {
    const elements = sections
      .map(s => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (!elements.length) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          // pick the section closest to the top of the viewport
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <aside
      className="hidden lg:block sticky top-24 h-fit pr-6 pl-2"
      aria-label="Case study contents"
    >
      <div className="text-bone-dim text-[11px] font-medium uppercase tracking-eyebrow mb-5">
        Contents
      </div>
      <nav className="flex flex-col gap-2.5">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`text-sm transition-colors duration-200 ${
              activeId === s.id ? 'text-bone' : 'text-bone-dim hover:text-bone-muted'
            }`}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
