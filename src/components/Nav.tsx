'use client'
import { useState, useEffect } from 'react'
import { PERSONAL } from '@/lib/data'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(8,11,16,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-1 group" style={{ textDecoration: 'none' }}>
          <span
            className="gold-shimmer text-xl font-bold tracking-tight"
            style={{ letterSpacing: '-0.03em' }}
          >
            MS
          </span>
          <span
            className="text-xs font-mono transition-colors duration-200"
            style={{ color: 'var(--text-dim)' }}
          >
            .dev
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href={PERSONAL.resume} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '7px 18px', fontSize: '12px' }}>
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="block w-5 h-px transition-all" style={{ background: open ? 'var(--gold)' : 'var(--text-secondary)', transform: open ? 'rotate(45deg) translateY(3px)' : 'none' }} />
          <span className="block w-5 h-px transition-all" style={{ background: 'var(--text-secondary)', opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-px transition-all" style={{ background: open ? 'var(--gold)' : 'var(--text-secondary)', transform: open ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: 'rgba(8,11,16,0.97)' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link text-base" onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href={PERSONAL.resume} className="btn-primary w-fit">Resume</a>
        </div>
      )}
    </nav>
  )
}
