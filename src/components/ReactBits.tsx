'use client'
import { useRef, useEffect, useState, useCallback } from 'react'

/* ─── Spotlight Card ──────────────────────────────────────────────────────────
   Mouse-tracking radial spotlight that follows the cursor over a card.
   Usage: wrap any card content in <SpotlightCard> */
export function SpotlightCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = divRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mouse-x', `${x}px`)
    el.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  useEffect(() => {
    const el = divRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={divRef}
      className={`glass-card relative overflow-hidden ${className}`}
      style={{
        ...style,
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(200,169,110,0.07), transparent 60%)',
        }}
        ref={el => {
          if (!el) return
          const parent = el.parentElement
          if (!parent) return
          parent.addEventListener('mouseenter', () => { el.style.opacity = '1' })
          parent.addEventListener('mouseleave', () => { el.style.opacity = '0' })
        }}
      />
      {children}
    </div>
  )
}

/* ─── Rotating Text ──────────────────────────────────────────────────────────
   Cycles through an array of words with a fade/slide animation.
   Usage: <RotatingText words={['engineer', 'researcher', 'builder']} /> */
export function RotatingText({
  words,
  className = '',
}: {
  words: string[]
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % words.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span
      className={`inline-block gold-shimmer ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        minWidth: '180px',
        display: 'inline-block',
      }}
    >
      {words[index]}
    </span>
  )
}

/* ─── Magnetic Button ─────────────────────────────────────────────────────────
   Subtle magnetic pull effect on hover — button follows cursor slightly.
   Usage: <MagneticButton href="...">Label</MagneticButton> */
export function MagneticButton({
  children,
  href,
  className = '',
  target,
}: {
  children: React.ReactNode
  href: string
  className?: string
  target?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={className}
      style={{ transition: 'transform 0.15s ease' }}
    >
      {children}
    </a>
  )
}

/* ─── Animated Counter ───────────────────────────────────────────────────────
   Counts up from 0 to a target number when it enters the viewport. */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1500,
}: {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          setCount(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
