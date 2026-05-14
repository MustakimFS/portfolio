'use client'

import { useState } from 'react'
import { PROJECTS } from '@/lib/data'
import { ExternalLink, Github, FileText, Lock, Play } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

const CATEGORY_TAG: Record<string, string> = {
  'AI / Full Stack':       'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Distributed Systems':   'bg-blue-500/10   text-blue-400   border-blue-500/20',
  'Machine Learning':      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Computer Vision':       'bg-cyan-500/10   text-cyan-400   border-cyan-500/20',
  'Research / Full Stack': 'bg-amber-500/10  text-amber-400  border-amber-500/20',
  'Systems / Algorithms':  'bg-rose-500/10   text-rose-400   border-rose-500/20',
  'Web / Games':           'bg-pink-500/10   text-pink-400   border-pink-500/20',
}

const CATEGORY_GLOW: Record<string, string> = {
  'AI / Full Stack':       'border-violet-500/50 shadow-violet-500/10',
  'Distributed Systems':   'border-blue-500/50   shadow-blue-500/10',
  'Machine Learning':      'border-emerald-500/50 shadow-emerald-500/10',
  'Computer Vision':       'border-cyan-500/50   shadow-cyan-500/10',
  'Research / Full Stack': 'border-amber-500/50  shadow-amber-500/10',
  'Systems / Algorithms':  'border-rose-500/50   shadow-rose-500/10',
  'Web / Games':           'border-pink-500/50   shadow-pink-500/10',
}

export default function Projects() {
  const [sectionRef, isInView] = useInView({ threshold: 0.05 })
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered =
    activeCategory === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <section
      id="projects"
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
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs text-gray-600 tracking-wider shrink-0">~/projects</span>
            <div className="flex-1 h-px bg-gray-800/70" />
          </div>
          <div className="font-mono text-sm text-gray-500 mb-4">
            <span className="text-violet-400">const </span>
            <span className="text-white">projects </span>
            <span className="text-gray-500">= </span>
            <span className="text-amber-400">await </span>
            <span className="text-blue-400">fetchProjects</span>
            <span className="text-gray-500">(</span>
            <span className="text-green-400">&quot;all&quot;</span>
            <span className="text-gray-500">);</span>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setHoveredId(null) }}
                className={`px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'bg-green-400/10 text-green-400 border-green-400/40'
                    : 'bg-gray-900/50 text-gray-500 border-gray-800 hover:text-gray-300 hover:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '480ms' }}
        >
          {filtered.map((project, idx) => {
            const isHov   = hoveredId === project.id
            const anyHov  = hoveredId !== null
            const tagCls  = CATEGORY_TAG[project.category]  ?? 'bg-gray-800 text-gray-400 border-gray-700'
            const glowCls = CATEGORY_GLOW[project.category] ?? ''

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={[
                  'rounded-xl border transition-all duration-300 ease-out overflow-hidden',
                  isHov
                    ? `bg-[#0d1017] shadow-lg ${glowCls}`
                    : anyHov
                    ? 'border-gray-800/30 bg-[#0a0c10]/50 opacity-50 scale-[0.98]'
                    : 'border-gray-800/50 bg-[#0a0c10]',
                ].join(' ')}
              >
                {/* Compact (always visible) */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-gray-600 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.note && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border bg-amber-500/10 text-amber-500/80 border-amber-500/20">
                          NDA
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${tagCls}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white leading-snug mb-1">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-gray-500 mb-5 truncate">
                    {project.subtitle}
                  </p>

                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-white">
                      {project.metrics[0].value}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                      {project.metrics[0].label}
                    </span>
                  </div>
                </div>

                {/* Expanded on hover */}
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    isHov ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-gray-800/50 pt-4">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.description}
                    </p>

                    {project.playable && project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25 hover:border-emerald-400/60 hover:text-emerald-200 transition-all"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Play today&apos;s puzzle
                      </a>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map(m => (
                        <div
                          key={m.label}
                          className="p-2 rounded-lg bg-[#060810] border border-gray-800/50 text-center"
                        >
                          <div className="font-mono text-sm font-bold text-white">{m.value}</div>
                          <div className="font-mono text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800/60 text-gray-400 border border-gray-700/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.note ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-amber-500/10 text-amber-500/80 border border-amber-500/20">
                          <Lock className="w-3.5 h-3.5" />
                          Private · NDA
                        </span>
                      ) : project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      ) : null}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}

                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-gray-800/50 text-gray-300 hover:bg-gray-800 border border-gray-700 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Paper
                        </a>
                      )}

                      {project.ieee && (
                        <a
                          href={project.ieee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          IEEE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="mt-10 font-mono text-xs text-gray-600 text-center transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transitionDelay: '560ms' }}
        >
          <span className="text-gray-700">// </span>
          {filtered.length} project{filtered.length === 1 ? '' : 's'} · hover to expand
        </div>
      </div>
    </section>
  )
}
