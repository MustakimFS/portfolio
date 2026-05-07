'use client'

import { PERSONAL } from '@/lib/data'
import { useInView } from '@/hooks/useInView'

const LINKS = [
  { label: 'github', value: PERSONAL.github, href: PERSONAL.github },
  { label: 'linkedin', value: PERSONAL.linkedin, href: PERSONAL.linkedin },
  { label: 'leetcode', value: PERSONAL.leetcode, href: PERSONAL.leetcode },
  { label: 'email', value: PERSONAL.email, href: `mailto:${PERSONAL.email}` },
]

export default function About() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24"
    >
      {/* Sweep line */}
      <div
        className="absolute top-0 left-0 h-px bg-green-400/40 transition-all duration-[400ms] ease-out"
        style={{ width: isInView ? '100%' : '0%' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-10 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '400ms' }}
        >
          <span className="font-mono text-xs text-gray-600 tracking-wider shrink-0">~/about</span>
          <div className="flex-1 h-px bg-gray-800/70" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: bio */}
          <div
            className="space-y-6 transition-all duration-500"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '480ms' }}
          >
            <p className="text-gray-300 leading-relaxed">{PERSONAL.bio}</p>

            {/* Education block */}
            <div className="border border-gray-800 rounded-lg p-4 bg-[#0a0c10] font-mono text-sm space-y-1">
              <div className="text-gray-500">// education</div>
              <div className="text-green-400">Arizona State University</div>
              <div className="text-gray-300">MS Software Engineering</div>
              <div className="text-gray-500">GPA: <span className="text-white">3.75</span> · Graduating <span className="text-white">May 2026</span></div>
            </div>

            {/* Current role */}
            <div className="border border-gray-800 rounded-lg p-4 bg-[#0a0c10] font-mono text-sm space-y-1">
              <div className="text-gray-500">// current_role</div>
              <div className="text-green-400">Technical Architecture Lead</div>
              <div className="text-gray-300">METY Legal</div>
              <div className="text-gray-500">Leading <span className="text-white">6-person</span> cross-functional team</div>
            </div>
          </div>

          {/* Right: links */}
          <div
            className="space-y-3 transition-all duration-500"
            style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '560ms' }}
          >
            <div className="font-mono text-sm text-gray-500 mb-4">// links</div>
            {LINKS.map(({ label, value, href }) => (
              <div key={label} className="flex items-start gap-3 font-mono text-sm border-b border-gray-800/50 pb-3">
                <span className="text-gray-600 w-20 shrink-0">{label}</span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
