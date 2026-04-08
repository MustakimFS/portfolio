'use client'
import { useEffect, useRef } from 'react'
import { PERSONAL } from '@/lib/data'

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

export function About() {
  const ref = useRef<HTMLElement>(null!)
  useReveal(ref)

  return (
    <section id="about" ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>01 / About</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <p className="text-base mb-5" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              I&apos;m a software engineer completing my MS in Software Engineering at Arizona State University (GPA 3.75, May 2026).
              My work sits at the intersection of <span style={{ color: 'var(--gold)' }}>distributed systems</span>, <span style={{ color: 'var(--gold)' }}>machine learning</span>, and <span style={{ color: 'var(--gold)' }}>full-stack engineering</span>.
            </p>
            <p className="text-base mb-5" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Currently serving as Technical Architecture Lead for METY Legal at MyEdMaster, where I architect Agentic RAG pipelines using LangGraph and lead a 6-person development team building a full-stack legal AI platform.
            </p>
            <p className="text-base" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              I&apos;m a published IEEE researcher, Mathematics Olympiad silver medalist, and have solved 815+ LeetCode problems placing me in the top 15% globally. I&apos;m seeking full-time SDE roles in distributed systems, backend infrastructure, and AI/ML applications.
            </p>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Quick facts */}
            {[
              { label: 'University', value: 'Arizona State University' },
              { label: 'Degree', value: 'MS Software Engineering' },
              { label: 'GPA', value: '3.75 / 4.0' },
              { label: 'Graduation', value: 'May 2026' },
              { label: 'Location', value: 'Tempe, Arizona' },
              { label: 'Email', value: PERSONAL.email },
            ].map(fact => (
              <div
                key={fact.label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: '1px solid rgba(200,169,110,0.08)' }}
              >
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>{fact.label}</span>
                <span className="text-sm text-right" style={{ color: 'var(--text-secondary)' }}>{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Research() {
  const ref = useRef<HTMLElement>(null!)
  useReveal(ref)

  return (
    <section id="research" ref={ref} className="reveal py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>04 / Research</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Published Work
          </h2>
        </div>

        {/* Paper card */}
        <div
          className="glass-card p-8 relative overflow-hidden"
          style={{ borderColor: 'rgba(200,169,110,0.2)' }}
        >
          {/* Decorative */}
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, rgba(200,169,110,0.06), transparent 70%)',
            }}
          />

          <div className="flex items-start gap-4 mb-6">
            <div
              className="px-3 py-1.5 rounded-md text-xs font-bold font-mono flex-shrink-0"
              style={{ background: 'rgba(200,169,110,0.1)', color: 'var(--gold)', border: '1px solid rgba(200,169,110,0.2)' }}
            >
              IEEE
            </div>
            <div>
              <span className="tag mb-2 inline-block">COMPSAC 2025 · 27% acceptance rate</span>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Enhanced Tracking and Reporting of Missing Persons using Knowledge Graph and Ontology Engineering
              </h3>
            </div>
          </div>

          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Full paper (10 pages) published at IEEE Computers, Software, and Applications Conference (COMPSAC 2025), Toronto, Canada.
            Research on applying semantic web technologies and knowledge graph construction for missing persons case matching and pattern discovery,
            integrating 10,000+ NamUs records with RDF/OWL ontologies for SPARQL-based cross-case analysis.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {['Knowledge Graphs', 'RDF/OWL', 'SPARQL', 'Ontology Engineering', 'Semantic Web', 'FastAPI'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href={PERSONAL.ieee} target="_blank" rel="noopener noreferrer" className="btn-primary">
              View on IEEE Xplore →
            </a>
            <div className="text-sm" style={{ color: 'var(--text-dim)' }}>
              Published June 2025 · Toronto, Canada
            </div>
          </div>
        </div>
      </div>
      {/* Secondary papers */}
      <div className="mt-8">
        <h3 className="text-sm font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--text-dim)' }}>
          Additional Technical Reports
        </h3>
        <div className="flex flex-col gap-3">
          {[
              { title: 'Semiconductor Yield Prediction using L1 Regularization and Ensemble Methods', file: '/papers/semiconductor-yield.pdf' },
              { title: 'PixelDrive: Comparative Study of Semantic Segmentation Architectures for Autonomous Driving', file: '/papers/pixeldrive.pdf' },
              { title: 'Movie Genre Prediction from Plot Summaries using Classification Algorithms', file: '/papers/working-paper.pdf' },
            ].map(p => (
              <a
                key={p.file}
                href={p.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg transition-colors group"
                style={{ background: 'rgba(200,169,110,0.04)', border: '1px solid rgba(200,169,110,0.08)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(200,169,110,0.08)')}
              >
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{p.title}</span>
                <span className="text-xs ml-4 flex-shrink-0" style={{ color: 'var(--gold-dim)' }}>PDF ↗</span>
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const ref = useRef<HTMLElement>(null!)
  useReveal(ref)

  const links = [
    {
      label: 'Email',
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: '/mustakim-shikalgar',
      href: PERSONAL.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: '/MustakimFS',
      href: PERSONAL.github,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" ref={ref} className="reveal py-24 px-6" style={{ background: 'rgba(13,17,23,0.6)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>05 / Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Let&apos;s Connect
        </h2>
        <p className="text-base mb-12" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          I&apos;m actively seeking full-time SDE roles starting May 2026. Open to distributed systems, backend infrastructure, AI/ML, and full-stack engineering positions. Feel free to reach out.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-3 px-6 py-4 flex-1"
              style={{ textDecoration: 'none' }}
            >
              <span style={{ color: 'var(--gold)' }}>{link.icon}</span>
              <div className="text-left">
                <div className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-dim)' }}>{link.label}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{link.value}</div>
              </div>
            </a>
          ))}
        </div>

        <a href={PERSONAL.resume} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3">
          Download Resume (PDF)
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="py-8 px-6 text-center" style={{ borderTop: '1px solid rgba(200,169,110,0.08)' }}>
      <p className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
        © 2026 Mustakim Shikalgar · Built with Next.js · Deployed on Vercel
      </p>
    </footer>
  )
}
