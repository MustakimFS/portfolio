'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

/**
 * "Just a moment" loading overlay shown:
 *   1. On initial page load (while the document is finishing hydration)
 *   2. Between every client-side navigation (intercept link clicks, show
 *      overlay for ~280ms, then push the route)
 *   3. Briefly after browser back/forward (popstate) so the user gets the
 *      same visual feedback as on forward navigation
 *
 * Mounted once globally from layout.tsx.
 */
export default function NavigationOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const [visible, setVisible] = useState(true) // start visible for initial load
  const startedAt = useRef(performance.now())
  const isFirstRender = useRef(true)
  // Tracks the live pathname so the popstate handler can tell a real page
  // back/forward from an in-page hash change (which also fires popstate).
  const currentPathRef = useRef(pathname)
  useEffect(() => {
    currentPathRef.current = pathname
  }, [pathname])

  // ── Hide overlay after initial load finishes (min 600ms dwell time) ──
  useEffect(() => {
    const minDwell = 600
    const hide = () => {
      const elapsed = performance.now() - startedAt.current
      const remaining = Math.max(0, minDwell - elapsed)
      window.setTimeout(() => setVisible(false), remaining)
    }
    if (document.readyState === 'complete') {
      hide()
    } else {
      window.addEventListener('load', hide, { once: true })
      return () => window.removeEventListener('load', hide)
    }
  }, [])

  // ── Hide when a new route has finished mounting ──
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // The pathname just changed — the new page is rendering. Hold the overlay
    // until at least MIN_DWELL has passed since the click so the transition
    // feels deliberate even when the route change is near-instant. This also
    // gives the nav pill's slide animation (300ms) room to play through.
    const MIN_DWELL = 600
    const elapsed = performance.now() - startedAt.current
    const remaining = Math.max(120, MIN_DWELL - elapsed)
    const t = window.setTimeout(() => setVisible(false), remaining)
    return () => window.clearTimeout(t)
  }, [pathname])

  // ── Intercept internal link clicks: show overlay AND push immediately ──
  // Both animations (overlay fade-in + nav pill slide) share a t=0 start so
  // the user sees them happen together instead of one-after-the-other.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Only handle primary, unmodified clicks
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as HTMLElement | null)?.closest('a')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href) return
      // Skip external + special hrefs + new-tab links
      if (
        href.startsWith('http') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        link.target === '_blank'
      ) return
      // Skip static-asset links (e.g. /resume.pdf). These aren't app routes,
      // so router.push() can't resolve them — intercepting would show the
      // overlay and never hide it. Let the browser handle them natively.
      const path = href.split(/[?#]/)[0]
      if (/\.[a-zA-Z0-9]+$/.test(path)) return
      // Skip same-page links
      if (href === pathname || href === window.location.pathname) return

      e.preventDefault()
      startedAt.current = performance.now()
      setVisible(true)
      // Push immediately so the nav pill (which sits above the overlay) starts
      // sliding at the same instant the overlay starts fading in.
      router.push(href)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, router])

  // ── Safety net: force-hide on bfcache restore ──
  // If the user navigates away (e.g. opens the resume PDF) while the overlay
  // is showing and then hits Back, the browser restores the page from the
  // back/forward cache with the overlay still visible. pageshow(persisted)
  // fires on that restore — clear the overlay so it can never get stuck.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setVisible(false)
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  // ── Brief overlay on browser back/forward ──
  useEffect(() => {
    const onPopState = () => {
      // In-page hash links (e.g. the case-study Contents sidebar) also fire
      // popstate but never change the path. Showing the overlay for those
      // would hang it forever, because the "hide on pathname change" effect
      // never runs. Only flash the overlay for true page back/forward.
      if (window.location.pathname === currentPathRef.current) return
      startedAt.current = performance.now()
      setVisible(true)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`navigation-overlay ${visible ? 'is-visible' : ''}`}
    >
      <div className="navigation-overlay-inner">
        <div className="navigation-dots" aria-label="Loading">
          <span />
          <span />
          <span />
        </div>
        <p className="navigation-overlay-text">
          <span className="font-serif italic">Just</span> a moment
        </p>
      </div>
    </div>
  )
}
