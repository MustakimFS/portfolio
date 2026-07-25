'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

/**
 * Lenis smooth-scroll provider + scroll manager. Wraps the app once at layout
 * level. Falls back to native scroll if prefers-reduced-motion is set.
 *
 * Why this also manages scroll position: Lenis keeps its own internal scroll
 * value and drives `window.scrollTo` every frame. On a client-side route change
 * that means Lenis re-applies the *previous* page's scroll offset to the new
 * page, so every navigation opened wherever the last page was scrolled, and
 * browser Back never returned you to where you left off.
 *
 * Fix: take manual control of scroll restoration while Lenis is active.
 *   - Forward navigation (nav links, opening a project): jump to the top.
 *   - Browser Back / Forward: restore the exact position we saved for that URL.
 * When Lenis is disabled (reduced motion) we do nothing and let the browser's
 * native restoration handle it.
 */
export default function SmoothScroll() {
  const pathname = usePathname()
  const lenisRef = useRef<Lenis | null>(null)
  const positions = useRef<Map<string, number>>(new Map())
  const isPop = useRef(false)
  const isFirst = useRef(true)
  const lastPath = useRef<string>(pathname)

  // ── Init Lenis once ──
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis

    // Continuously record the *current* page's scroll so Back can restore it.
    // Attributed to lastPath, which the route-change effect updates before it
    // programmatically scrolls, so a reset never overwrites the page we left.
    lenis.on('scroll', () => {
      positions.current.set(lastPath.current, lenis.scroll)
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // We restore scroll ourselves; stop the browser from also doing it.
    const prevRestoration = history.scrollRestoration
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    // Flag true page Back/Forward. Hash-only popstate (same path, e.g. the
    // case-study sidebar) must NOT count, or the next real navigation would
    // wrongly try to "restore" instead of scrolling to the top.
    const onPop = () => {
      if (window.location.pathname !== lastPath.current) isPop.current = true
    }
    window.addEventListener('popstate', onPop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('popstate', onPop)
      if ('scrollRestoration' in history) history.scrollRestoration = prevRestoration
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // ── On route change: restore (Back/Forward) or reset to top (forward nav) ──
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return // reduced motion → native restoration handles it

    // Skip the initial mount: the browser already positioned the first page
    // (top, or an anchor), and there's nothing to reset yet.
    if (isFirst.current) {
      isFirst.current = false
      lastPath.current = pathname
      return
    }

    const target = isPop.current ? positions.current.get(pathname) ?? 0 : 0
    isPop.current = false
    // Point lastPath at the new page FIRST, so the scroll event fired by the
    // programmatic scroll below records against the new URL, not the one we
    // just left (whose saved position we must preserve for Back).
    lastPath.current = pathname
    lenis.scrollTo(target, { immediate: true, force: true })
  }, [pathname])

  return null
}
