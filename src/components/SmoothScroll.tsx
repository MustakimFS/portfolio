'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth-scroll provider. Wraps the app once at layout level.
 * Falls back to native scroll if prefers-reduced-motion is set.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect users who don't want smooth scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
