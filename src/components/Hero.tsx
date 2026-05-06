'use client'

import { useEffect, useState } from 'react'
import { PERSONAL, ACHIEVEMENTS } from '@/lib/data'
import { useInView } from '@/hooks/useInView'

const ROTATING = ['distributed systems', 'intelligent agents', 'ml pipelines', 'knowledge graphs']

const STAT_COLORS = [
  'from-emerald-500/15 to-emerald-500/5 border-emerald-500/20',
  'from-blue-500/15 to-blue-500/5 border-blue-500/20',
  'from-violet-500/15 to-violet-500/5 border-violet-500/20',
  'from-amber-500/15 to-amber-500/5 border-amber-500/20',
]

export default function Hero() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })
  const [lineWidth, setLineWidth] = useState(0)
  const [focusIdx, setFocusIdx] = useState(0)
  const [focusFade, setFocusFade] = useState(true)
  const [leetcode, setLeetcode] = useState<string>(ACHIEVEMENTS[0].value)

  // Sweep line then content
  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => setLineWidth(100), 50)
    return () => clearTimeout(t)
  }, [isInView])

  // Rotating focus text
  useEffect(() => {
    const id = setInterval(() => {
      setFocusFade(false)
      setTimeout(() => {
        setFocusIdx(i => (i + 1) % ROTATING.length)
        setFocusFade(true)
      }, 300)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  // Live LeetCode count
  useEffect(() => {
    fetch('/api/leetcode')
      .then(r => r.json())
      .then(d => {
        if (d?.total) setLeetcode(String(d.total) + '+')
      })
      .catch(() => {})
  }, [])

  const stats = ACHIEVEMENTS.map((a, i) => ({
    ...a,
    value: i === 0 ? leetcode : a.value,
    color: STAT_COLORS[i],
  }))

  return (
    <section
      id="hero"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center overflow-hidden pt-14"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Sweep line */}
      <div
        className="absolute top-14 left-0 h-px bg-green-400/40 transition-all duration-[400ms] ease-out"
        style={{ width: `${lineWidth}%` }}
      />

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-6 py-16 transition-all duration-500 ease-out ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 mb-8 transition-all duration-500"
          style={{ transitionDelay: '480ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-sm text-gray-500 ml-3">~/portfolio</span>
        </div>

        {/* Name */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold text-white font-mono tracking-tight mb-4 transition-all duration-500"
          style={{ transitionDelay: '560ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          {PERSONAL.name}
          <span className="inline-block w-[3px] h-10 md:h-14 bg-green-400 ml-2 align-middle animate-pulse" />
        </h1>

        {/* Subtitle */}
        <p
          className="font-mono text-gray-400 text-lg mb-6 transition-all duration-500"
          style={{ transitionDelay: '640ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          Software Engineer · MS @ ASU · IEEE Researcher
        </p>

        {/* Rotating focus */}
        <div
          className="font-mono text-xl md:text-2xl mb-10 transition-all duration-500"
          style={{ transitionDelay: '720ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          <span className="text-blue-400">const </span>
          <span className="text-white">focus </span>
          <span className="text-gray-500">= </span>
          <span className="text-green-400">&quot;</span>
          <span
            className="text-green-400 inline-block transition-all duration-300"
            style={{ opacity: focusFade ? 1 : 0, transform: focusFade ? 'none' : 'translateY(6px)' }}
          >
            {ROTATING[focusIdx]}
          </span>
          <span className="text-green-400">&quot;</span>
          <span className="text-gray-500">;</span>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 transition-all duration-500"
          style={{ transitionDelay: '800ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          {stats.map((stat, i) => (
            <a
              key={i}
              href={stat.href}
              target={stat.href.startsWith('http') ? '_blank' : undefined}
              rel={stat.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group relative p-4 sm:p-5 rounded-xl bg-gradient-to-br ${stat.color} border backdrop-blur-sm hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 leading-snug">{stat.sub}</div>
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-3 mb-12 transition-all duration-500"
          style={{ transitionDelay: '880ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-6 py-2.5 bg-green-400 text-[#060810] font-mono font-semibold text-sm rounded hover:bg-green-300 transition-colors"
          >
            View Projects
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-mono text-sm rounded transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-mono text-sm rounded transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 font-mono text-sm rounded transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Tagline */}
        <div
          className="font-mono text-sm text-gray-600 transition-all duration-500"
          style={{ transitionDelay: '960ms', opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(12px)' }}
        >
          <span className="text-gray-700">// </span>
          Building systems that scale
        </div>
      </div>
    </section>
  )
}
