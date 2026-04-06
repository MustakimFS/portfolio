'use client'
import { useEffect, useRef, useState } from 'react'
import { SKILLS } from '@/lib/data'

function useReveal(ref: React.RefObject<HTMLElement>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); setVisible(true) } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null!)
  const visible = useReveal(sectionRef)

  return (
    <section id="skills" ref={sectionRef} className="reveal py-24 px-6" style={{ background: 'rgba(13,17,23,0.6)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--gold-dim)' }}>03 / Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Technical Expertise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((group, gi) => (
            <div
              key={group.category}
              className="glass-card p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s ease ${gi * 0.1}s, transform 0.5s ease ${gi * 0.1}s`,
              }}
            >
              <h3
                className="text-xs font-mono tracking-widest uppercase mb-5"
                style={{ color: 'var(--gold)' }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-4">
                {group.items.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{skill.name}</span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>{skill.level}%</span>
                    </div>
                    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(200,169,110,0.08)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-bright))',
                          transition: `width 0.8s ease ${gi * 0.1 + si * 0.05 + 0.2}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LeetCode callout */}
        <div
          className="mt-8 glass-card p-6 flex flex-col md:flex-row items-center gap-6"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.6s',
          }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold gold-shimmer">815+</span>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>LeetCode Problems Solved</span>
              <span className="tag">Top 15%</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              126 Hard problems · Graph algorithms, dynamic programming, system design · 500-day streak badge
            </p>
          </div>
          <a
            href="https://leetcode.com/u/Mustakim_Shikalgar/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary whitespace-nowrap"
          >
            View Profile →
          </a>
        </div>
      </div>
    </section>
  )
}
