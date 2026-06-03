'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PERSONAL } from '@/lib/data'
import FluidLabel from './FluidLabel'

/**
 * Top navigation — three regions:
 *   left:   "Mustakim Shikalgar / Software Engineer" identity
 *   center: Work | Info — fluid-glass pill with sliding indicator
 *   right:  LinkedIn ↗  Resume ↗ — fluid-glass icon labels that expand on hover
 *
 * Fixed top, transparent over content.
 */
export default function PillNav() {
  const pathname = usePathname()
  const isInfo = pathname?.startsWith('/info')
  const isWork = !isInfo

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
    <nav
      // z-[350] sits ABOVE the NavigationOverlay (z-300) so the Work | Info
      // slide animation stays visible during route transitions — keeps visual
      // continuity rather than hiding the pill behind the "Just a moment"
      // dim layer.
      className={`fixed top-0 left-0 right-0 z-[350] px-4 sm:px-8 py-4 pointer-events-none transition-all duration-300 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-3'
      }`}
      aria-label="Primary"
    >
      {/* Identity (left) + external links (right) — flex with justify-between
          handles ONLY these two so when the external pills expand they shrink
          the gap toward identity, leaving the absolutely-positioned center
          pill anchored to the viewport's horizontal center. */}
      <div className="flex items-center justify-between">
        <Link
          href="/info"
          className={`${visible ? 'pointer-events-auto' : 'pointer-events-none'} group flex flex-col leading-tight`}
          aria-label="About Mustakim"
        >
          <span className="text-bone font-medium text-[15px] tracking-tightish">
            <span className="inline sm:hidden">Mustakim</span>
            <span className="hidden sm:inline">{PERSONAL.name}</span>
          </span>
          <span className="text-bone-muted text-[12px] -mt-0.5 hidden sm:block">{PERSONAL.title}</span>
        </Link>

        {/* Right external pills — placed in the flex flow so they don't overlap
            anything else and stay at the right edge. Their expansion is
            contained to the right side of the bar. */}
        <div className={`${visible ? 'pointer-events-auto' : 'pointer-events-none'} flex items-center gap-2`}>
          <FluidLabel
            href={PERSONAL.linkedin}
            external
            expand
            ariaLabel="LinkedIn profile"
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-bone"
                aria-hidden="true"
              >
                <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 8.25 6.5 1.78 1.78 0 0 1 6.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19a.66.66 0 0 0 0 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            }
          >
            LinkedIn
          </FluidLabel>
          <FluidLabel
            href={PERSONAL.resume}
            external
            expand
            ariaLabel="Resume PDF"
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-bone"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M9 13h6" />
                <path d="M9 17h4" />
              </svg>
            }
          >
            Resume
          </FluidLabel>
        </div>
      </div>

      {/* Center pill — TWO layers:
          1. Outer wrapper: pure positioning. Anchors at viewport center via
             -translate-x-1/2 -translate-y-1/2. Never receives :hover so its
             transform is stable.
          2. Inner .fluid-label: receives the glass effect AND the hover lift
             (translateY(-1px)). Marked `relative` so the slide indicator
             positions correctly against it.

          This separation is required because .fluid-label:hover sets
          `transform: translateY(-1px)`, which would overwrite the centering
          translate if both lived on the same element. */}
      <div className={`${visible ? 'pointer-events-auto' : 'pointer-events-none'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}>
        <div
          className="fluid-label relative inline-flex items-center rounded-full px-1 py-1"
          aria-label="Section toggle"
        >
          {/* Active indicator — small line above active tab */}
          <span
            className="absolute -top-2 h-[3px] w-6 rounded-full bg-bone transition-all duration-300"
            style={{
              left: isWork ? 'calc(0% + 26px)' : 'calc(50% + 20px)',
            }}
            aria-hidden="true"
          />
          <PillLink href="/" active={isWork}>
            Work
          </PillLink>
          <PillLink href="/info" active={isInfo}>
            Info
          </PillLink>
        </div>
      </div>
    </nav>
  )
}

function PillLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`relative px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
        active ? 'text-bone' : 'text-bone-muted hover:text-bone'
      }`}
    >
      {active && (
        <span
          className="absolute inset-0 rounded-full bg-white/[0.08]"
          aria-hidden="true"
        />
      )}
      <span className="relative">{children}</span>
    </Link>
  )
}
