'use client'

import { SKILLS } from '@/lib/data'
import { useInView } from '@/hooks/useInView'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Languages': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Backend & Systems': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'AI / ML': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Frontend': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Data & Infra': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const CATEGORY_COLORS: Record<string, { text: string; border: string; tag: string }> = {
  'Languages':        { text: 'text-emerald-400', border: 'border-emerald-500/30', tag: 'hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300' },
  'Backend & Systems':{ text: 'text-blue-400',    border: 'border-blue-500/30',    tag: 'hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-300' },
  'AI / ML':          { text: 'text-violet-400',  border: 'border-violet-500/30',  tag: 'hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-300' },
  'Frontend':         { text: 'text-amber-400',   border: 'border-amber-500/30',   tag: 'hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-300' },
  'Data & Infra':     { text: 'text-cyan-400',    border: 'border-cyan-500/30',    tag: 'hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300' },
}

export default function Skills() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24"
    >
      {/* Sweep line */}
      <div
        className="absolute top-0 left-0 h-px bg-green-400/40 transition-all duration-[400ms] ease-out"
        style={{ width: isInView ? '100%' : '0%' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Terminal header */}
        <div
          className="mb-10 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '400ms' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-sm text-gray-500 ml-2">~/skills</span>
          </div>
          <div className="font-mono text-sm text-gray-400">
            <span className="text-blue-400">export </span>
            <span className="text-white">const </span>
            <span className="text-green-400">techStack </span>
            <span className="text-gray-500">= {'{'}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((group, idx) => {
            const colors = CATEGORY_COLORS[group.category] ?? { text: 'text-gray-400', border: 'border-gray-700', tag: '' }
            return (
              <div
                key={group.category}
                className="relative p-5 rounded-xl border border-gray-800 bg-[#0a0c10] hover:border-gray-700 hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'none' : 'translateY(24px)',
                  transition: 'all 500ms ease-out',
                  transitionDelay: `${480 + idx * 80}ms`,
                }}
              >
                <div className={`absolute top-0 right-0 w-7 h-7 border-t border-r rounded-tr-xl ${colors.border}`} />

                <div className="flex items-center gap-2 mb-4">
                  <span className={colors.text}>{CATEGORY_ICONS[group.category]}</span>
                  <span className="font-mono text-xs text-gray-500">
                    <span className="text-gray-600">// </span>
                    {group.category}
                  </span>
                  <span className="ml-auto font-mono text-xs text-gray-700">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 text-sm font-mono rounded-md border border-gray-700/50 bg-gray-800/30 text-gray-300 transition-all duration-200 cursor-default ${colors.tag}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="mt-10 space-y-2 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transitionDelay: '880ms' }}
        >
          <div className="font-mono text-sm text-gray-500">{'};'}</div>
          <div className="font-mono text-sm text-gray-600">
            <span className="text-gray-700">// </span>
            Always learning, always building
          </div>
        </div>
      </div>
    </section>
  )
}
