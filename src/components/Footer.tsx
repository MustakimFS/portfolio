import Link from 'next/link'
import FluidLabel from './FluidLabel'
import { PERSONAL } from '@/lib/data'

/**
 * Site footer — minimal grid of MAIN + CONTACT links, copyright, and a
 * personality line. External links are fluid-glass FluidLabels.
 */
export default function Footer() {
  return (
    <footer className="px-4 sm:px-8 pt-20 pb-12 border-t border-ink-border/60 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-16">
          <FooterColumn label="MAIN">
            <FooterInternal href="/">Work</FooterInternal>
            <FooterInternal href="/info">Info</FooterInternal>
          </FooterColumn>
          <FooterColumn label="CONTACT">
            <FooterExternal href={PERSONAL.linkedin}>LinkedIn</FooterExternal>
            <FooterExternal href={PERSONAL.resume}>Resume</FooterExternal>
            <FooterExternal href={`mailto:${PERSONAL.email}`}>Email</FooterExternal>
          </FooterColumn>
          <FooterColumn label="ELSEWHERE">
            <FooterExternal href={PERSONAL.github}>GitHub</FooterExternal>
            <FooterExternal href={PERSONAL.leetcode}>LeetCode</FooterExternal>
            <FooterExternal href={PERSONAL.ieee}>IEEE Paper</FooterExternal>
          </FooterColumn>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 justify-between text-bone-dim text-sm">
          <div>
            <div className="text-bone/70">© 2026 {PERSONAL.name}. All Rights Reserved.</div>
            <div className="mt-1">
              Made with lots of caffeine and conviction.
            </div>
          </div>
          <div className="text-bone/55">
            Open to SDE roles · May 2026{' '}
            <span aria-hidden="true">·</span>{' '}
            <span className="italic font-serif">{PERSONAL.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-medium">
        {label}
      </div>
      <div className="flex flex-col items-start gap-2">{children}</div>
    </div>
  )
}

function FooterInternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-bone hover:text-bone-muted transition-colors text-[15px] w-fit"
    >
      {children}
    </Link>
  )
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <FluidLabel
      href={href}
      external
      size="xs"
      icon={
        <span className="text-[11px] leading-none" aria-hidden="true">
          ↗
        </span>
      }
    >
      {children}
    </FluidLabel>
  )
}
