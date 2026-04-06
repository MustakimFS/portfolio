'use client'
import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '@/lib/data'

type GHStats = { stars: number; forks: number; language: string | null }

function useReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

function ProjectCard({ project, index, stats }: { project: typeof PROJECTS[0]; index: number; stats?: GHStats }) {
  return (
    <div
      className="glass-card p-6 flex flex-col h-full group relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated corner accent — React Bits inspired */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at top right, rgba(200,169,110,0.07), transparent 70%)',
          opacity: 0,
        }}
        ref={el => {
          if (!el) return
          const parent = el.parentElement
          if (!parent) return
          parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
          parent.addEventListener('mouseleave', () => { el.style.opacity = '0' })
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="tag mb-2 inline-block">{project.category}</span>
          <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
          <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--gold-dim)' }}>{project.subtitle}</p>
        </div>
        <div className="flex gap-1.5 ml-4 flex-shrink-0">
          {(project as any).demo && (
            <a
              href={(project as any).demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all"
              style={{
                background: 'rgba(200,169,110,0.1)',
                border: '1px solid rgba(200,169,110,0.2)',
                color: 'var(--gold)',
              }}
              aria-label="Live Demo"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 4px rgba(74,222,128,0.8)' }} />
              Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md transition-colors"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {(project as any).ieee && (
            <a
              href={(project as any).ieee}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md transition-colors text-xs font-bold"
              style={{ color: 'var(--text-dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              aria-label="IEEE"
            >
              IEEE
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 flex-1" style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}>
        {project.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {project.metrics.map(m => (
          <div
            key={m.label}
            className="rounded-lg p-2 text-center"
            style={{ background: 'rgba(200,169,110,0.05)', border: '1px solid rgba(200,169,110,0.1)' }}
          >
            <div className="text-sm font-bold" style={{ color: 'var(--gold)' }}>{m.value}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-dim)' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      {(project as any).note && (
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,169,110,0.06)', color: 'var(--text-dim)', border: '1px solid rgba(200,169,110,0.1)' }}>
          🔒 {(project as any).note}
        </span>
      )}

      {/* GitHub stats */}
      {stats && (
        <div className="flex items-center gap-4 pt-3 mt-auto" style={{ borderTop: '1px solid rgba(200,169,110,0.08)' }}>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-dim)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {stats.stars}
          </span>
          {stats.language && (
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-dim)' }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: 'var(--gold-dim)' }} />
              {stats.language}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null!)
  useReveal(sectionRef)

  const [ghStats, setGhStats] = useState<Record<string, GHStats>>({})
  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

  useEffect(() => {
    const repos = [
      { id: 'distributed-kv', repo: 'MustakimFS/distributed-kv-store' },
      { id: 'semiconductor', repo: 'MustakimFS/semiconductor-yield-optimizer' },
    ]
    repos.forEach(async ({ id, repo }) => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`)
        if (res.ok) {
          const data = await res.json()
          setGhStats(prev => ({
            ...prev,
            [id]: { stars: data.stargazers_count, forks: data.forks_count, language: data.language }
          }))
        }
      } catch {}
    })
  }, [])

  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" ref={sectionRef} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>02 / Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Things I&apos;ve Built
          </h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="text-xs px-4 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: filter === cat ? 'rgba(200,169,110,0.15)' : 'transparent',
                  border: `1px solid ${filter === cat ? 'rgba(200,169,110,0.4)' : 'rgba(200,169,110,0.12)'}`,
                  color: filter === cat ? 'var(--gold)' : 'var(--text-dim)',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              stats={ghStats[project.id]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
