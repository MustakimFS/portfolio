'use client'

import { useEffect, useState } from 'react'
import { getEasterHash } from '@/lib/easterHash'
import { Menu, X, FileText } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

const GLITCH_CHARS = '!@#$%^&*<>[]{}|'

function scrollTo(href: string) {
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [glitchText, setGlitchText] = useState('')
  const [glitchVisible, setGlitchVisible] = useState(false)

  useEffect(() => {
    function runGlitch() {
      const hash = getEasterHash()
      let frame = 0
      const scrambleFrames = 20
      const showFrames = 150
      const scrambleOutFrames = 20

      setGlitchVisible(true)

      function animate() {
        if (frame < scrambleFrames) {
          const scrambled = Array.from({ length: hash.length }, () =>
            GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          ).join('')
          setGlitchText(scrambled)
          frame++
          setTimeout(animate, 20)
        } else if (frame < scrambleFrames + showFrames) {
          setGlitchText(hash)
          frame++
          setTimeout(animate, 20)
        } else if (frame < scrambleFrames + showFrames + scrambleOutFrames) {
          const t = frame - scrambleFrames - showFrames
          const ratio = t / scrambleOutFrames
          const scrambled = hash
            .split('')
            .map(c =>
              Math.random() > ratio
                ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
                : c
            )
            .join('')
          setGlitchText(scrambled)
          frame++
          setTimeout(animate, 20)
        } else {
          setGlitchVisible(false)
          setGlitchText('')
        }
      }

      requestAnimationFrame(animate)
    }

    const interval = setInterval(runGlitch, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060810]/90 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: brand */}
        <span className="text-green-400 font-mono text-sm font-semibold tracking-tight select-none">
          MS.dev
        </span>

        {/* Center: nav links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="font-mono text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right: glitch display + resume */}
        <div className="flex items-center gap-3">
          {/* Easter egg glitch element — invisible except during animation */}
          <span
            className={`font-mono text-xs tracking-widest transition-opacity duration-100 ${
              glitchVisible ? 'text-green-400 opacity-100' : 'opacity-0 pointer-events-none select-none'
            }`}
            aria-hidden="true"
          >
            {glitchVisible ? glitchText : '          '}
          </span>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 border border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono text-xs px-3 py-1.5 rounded transition-colors"
          >
            <FileText className="w-3 h-3" />
            Resume
          </a>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-gray-400 hover:text-green-400 transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#060810]/95 border-t border-gray-800/50 px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => { scrollTo(href); setMenuOpen(false) }}
              className="font-mono text-sm text-gray-400 hover:text-green-400 transition-colors text-left"
            >
              {label}
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-green-400/50 text-green-400 hover:bg-green-400/10 font-mono text-xs px-3 py-1.5 rounded transition-colors w-fit"
          >
            <FileText className="w-3 h-3" />
            Resume
          </a>
        </div>
      )}
    </nav>
  )
}
