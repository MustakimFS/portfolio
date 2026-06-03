'use client'

import { useEffect, useState } from 'react'
import FluidLabel from '@/components/FluidLabel'

/**
 * Scroll-aware Back button shown on every case study page.
 *
 * Behavior:
 *   • Near top of page (< 200px scroll): always visible.
 *   • Scrolling DOWN past the threshold: fades out + drops slightly.
 *   • Scrolling UP at all: snaps back into view.
 *
 * Uses `position: fixed` so it stays anchored to the viewport top-left
 * regardless of where in the case study you are. Tracks direction via a
 * window scroll listener (passive, no layout cost).
 */
export default function CaseStudyBackButton() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const TOP_BAND = 200 // px — always show within this distance from top
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < TOP_BAND) {
          setVisible(true)
        } else if (y < lastY - 1) {
          // Any upward motion past 1px → show
          setVisible(true)
        } else if (y > lastY + 4) {
          // Downward motion past 4px past threshold → hide
          setVisible(false)
        }
        lastY = y
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed top-24 left-6 sm:left-8 z-30 transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      }`}
    >
      <FluidLabel href="/" expand ariaLabel="Back to work" icon={<span>←</span>}>
        Back
      </FluidLabel>
    </div>
  )
}
