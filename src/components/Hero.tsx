"use client"

import { useState, useEffect } from "react"
import { PERSONAL, ACHIEVEMENTS } from "@/lib/data"
import { SectionWrapper } from "@/components/SectionWrapper"

const rotatingTexts = [
  "distributed systems",
  "intelligent agents",
  "ML pipelines",
  "knowledge graphs"
]

const statIcons = [
  <svg key="code" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="paper" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="gpa" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  <svg key="cost" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
]

const statAccents = [
  "from-emerald-500/20 to-emerald-500/5",
  "from-blue-500/20 to-blue-500/5",
  "from-violet-500/20 to-violet-500/5",
  "from-amber-500/20 to-amber-500/5"
]

interface HeroProps {
  leetcodeSolved?: string
}

export function Hero({ leetcodeSolved = "815+" }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rotatingTexts.length)
        setIsAnimating(false)
      }, 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const stats = ACHIEVEMENTS.map((achievement, idx) => ({
    ...achievement,
    value: idx === 0 ? leetcodeSolved : achievement.value,
    icon: statIcons[idx],
    accent: statAccents[idx]
  }))

  return (
    <SectionWrapper className="flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 sm:py-20">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <div className="flex gap-1.5">
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-red-500/80" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground ml-3 sm:ml-4">~/portfolio</span>
        </div>

        {/* Main content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Name with typing cursor */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            {PERSONAL.name}
            <span className="inline-block w-[2px] sm:w-[3px] h-8 sm:h-12 md:h-16 bg-primary ml-1 sm:ml-2 animate-pulse" />
          </h1>

          {/* Title */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground font-mono">
            {PERSONAL.title} · MS @ ASU · IEEE Researcher
          </p>

          {/* Rotating text */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-sm sm:text-xl md:text-2xl font-mono">
            <span className="text-primary">const</span>
            <span className="text-foreground">focus</span>
            <span className="text-muted-foreground">=</span>
            <span className="text-emerald-400">&quot;</span>
            <span 
              className={`text-emerald-400 transition-all duration-300 ${
                isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {rotatingTexts[currentIndex]}
            </span>
            <span className="text-emerald-400">&quot;</span>
            <span className="text-muted-foreground">;</span>
          </div>

          {/* Rotating indicator dots */}
          <div className="flex gap-2 pt-1 sm:pt-2">
            {rotatingTexts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentIndex(idx)
                    setIsAnimating(false)
                  }, 150)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "bg-primary w-5 sm:w-6" 
                    : "bg-muted-foreground/40 hover:bg-muted-foreground/60"
                }`}
                aria-label={`Show ${rotatingTexts[idx]}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-10 sm:mt-16">
          {stats.map((stat, idx) => (
            <a
              key={idx}
              href={stat.href}
              target={stat.href.startsWith("http") ? "_blank" : undefined}
              rel={stat.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative p-4 sm:p-6 rounded-xl bg-gradient-to-br ${stat.accent} border border-border/50 backdrop-blur-sm hover:border-border transition-all duration-300 hover:-translate-y-1 block`}
            >
              <div className="absolute top-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-t border-r border-primary/30 rounded-tr-xl" />
              <div className="flex items-center gap-2 text-muted-foreground mb-1 sm:mb-2">
                <span className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{stat.icon}</span>
              </div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-mono mt-0.5 sm:mt-1">{stat.label}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1 line-clamp-1">{stat.sub}</div>
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-12">
          <a 
            href="#projects"
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Projects
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a 
            href={PERSONAL.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary hover:border-muted-foreground/50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
            <svg className="w-4 h-4 opacity-50 transition-opacity group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <a 
            href={PERSONAL.linkedin}
            target="_blank" 
            rel="noopener noreferrer"
            className="group px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary hover:border-muted-foreground/50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
            <svg className="w-4 h-4 opacity-50 transition-opacity group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <a 
            href={PERSONAL.resume}
            download
            className="group px-6 sm:px-8 py-3 sm:py-4 border border-border text-foreground font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-secondary hover:border-muted-foreground/50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Resume
            <svg className="w-4 h-4 opacity-50 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Bottom code comment */}
        <div className="mt-10 sm:mt-16 font-mono text-xs sm:text-sm text-muted-foreground/60">
          <span className="text-muted-foreground/40">{"// "}</span>
          {PERSONAL.tagline}
        </div>
      </div>
    </SectionWrapper>
  )
}
