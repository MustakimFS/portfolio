'use client'
import { useState, useEffect } from 'react'
import { PERSONAL } from '@/lib/data'
import Link from 'next/link'
import { Terminal } from 'lucide-react'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled ? 'bg-[#080b10]/95 backdrop-blur-md border-b border-border/50 shadow-sm' : 'bg-[#080b10] border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
          <Terminal className="w-5 h-5 text-foreground" />
          <span className="text-sm font-bold text-foreground">
            ~/mustakim
          </span>
          <span className="animate-pulse text-muted-foreground">_</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          ))}
          <a 
            href={PERSONAL.resume} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs px-4 py-2 border border-border/50 text-foreground hover:bg-secondary/50 hover:border-border transition-all rounded-md"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-current transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-current transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 bg-[#080b10] border-b border-border/50">
          {links.map(l => (
            <Link 
              key={l.href} 
              href={l.href} 
              className="text-sm text-muted-foreground hover:text-foreground py-2 border-b border-border/20" 
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a 
            href={PERSONAL.resume} 
            className="text-sm px-4 py-2 mt-2 border border-border/50 text-foreground hover:bg-secondary/50 transition-all rounded-md w-fit"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  )
}
