'use client'

import { PERSONAL } from '@/lib/data'
import { Mail, Github, Linkedin, FileText, ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const LINKS = [
  {
    name: 'Email',
    handle: PERSONAL.email,
    href: `mailto:${PERSONAL.email}`,
    icon: <Mail className="w-5 h-5" />,
    color: 'text-rose-400',
    border: 'hover:border-rose-500/40',
  },
  {
    name: 'LinkedIn',
    handle: 'mustakim-shikalgar',
    href: PERSONAL.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
    color: 'text-blue-400',
    border: 'hover:border-blue-500/40',
  },
  {
    name: 'GitHub',
    handle: 'MustakimFS',
    href: PERSONAL.github,
    icon: <Github className="w-5 h-5" />,
    color: 'text-gray-300',
    border: 'hover:border-gray-500/40',
  },
  {
    name: 'Resume',
    handle: 'Download PDF',
    href: PERSONAL.resume,
    icon: <FileText className="w-5 h-5" />,
    color: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
  },
]

export default function Contact() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24 pb-32"
    >
      {/* Sweep line */}
      <div
        className="absolute top-0 left-0 h-px bg-green-400/40 transition-all duration-[400ms] ease-out"
        style={{ width: isInView ? '100%' : '0%' }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 mb-10 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '400ms' }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-sm text-gray-500 ml-2">~/contact</span>
        </div>

        {/* Heading */}
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '480ms' }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Let&apos;s Connect</h2>
          <p className="text-gray-400 font-mono text-sm max-w-lg mx-auto">
            I&apos;m always open to discussing distributed systems, AI infrastructure, or new opportunities.
          </p>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {LINKS.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-center justify-between p-5 rounded-xl border border-gray-800 bg-[#0a0c10] hover:-translate-y-1 transition-all duration-300 ${link.border}`}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : 'translateY(24px)',
                transition: 'all 500ms ease-out',
                transitionDelay: `${560 + idx * 80}ms`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-gray-800/50 ${link.color}`}>
                  {link.icon}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{link.name}</div>
                  <div className="font-mono text-xs text-gray-500">{link.handle}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
