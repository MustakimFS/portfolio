'use client'

import type { ReactNode, MouseEventHandler } from 'react'
import Link from 'next/link'

/**
 * Glass / Liquid-Glass pill. Two modes:
 *
 *   • Default (static)     — always shows icon + text + optional trailing icon.
 *   • Expand-on-hover      — `expand` prop: starts as a compact icon-only pill;
 *                            on hover/focus, smoothly expands to reveal the text
 *                            (Spline-style). Uses the CSS grid-template-columns
 *                            0fr → 1fr trick.
 *
 * Renders as `<Link>` when `href`, `<button>` when `onClick`, otherwise `<span>`.
 *
 * @example
 *   <FluidLabel expand href="/" icon={<span>←</span>}>Back</FluidLabel>
 *   <FluidLabel icon={<span>↗</span>} href="https://...">LinkedIn</FluidLabel>
 */
export interface FluidLabelProps {
  children: ReactNode
  icon?: ReactNode
  trailingIcon?: ReactNode
  href?: string
  external?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** Start collapsed (icon-only). Hover/focus expands to reveal the children. */
  expand?: boolean
  size?: 'xs' | 'sm' | 'md'
  tone?: 'default' | 'solid'
  className?: string
  ariaLabel?: string
  title?: string
}

const SIZE_CLASSES = {
  xs: { collapsed: 'h-7 min-w-7', expanded: 'gap-1.5 px-2.5 py-1.5 text-[11px]' },
  sm: { collapsed: 'h-9 min-w-9', expanded: 'gap-2 px-3.5 py-2 text-xs' },
  md: { collapsed: 'h-11 min-w-11', expanded: 'gap-2.5 px-5 py-2.5 text-sm' },
} as const

export default function FluidLabel({
  children,
  icon,
  trailingIcon,
  href,
  external = false,
  onClick,
  expand = false,
  size = 'sm',
  tone = 'default',
  className = '',
  ariaLabel,
  title,
}: FluidLabelProps) {
  const sz = SIZE_CLASSES[size]
  const sizeClasses = expand
    ? `${sz.collapsed} fluid-label-expandable items-center justify-center px-2 text-${size === 'xs' ? '[11px]' : size === 'sm' ? 'xs' : 'sm'}`
    : sz.expanded

  const inner = expand ? (
    // Expandable layout: icon stays fixed; text+trailing icon collapse to 0
    <>
      {icon && (
        <span className="inline-flex items-center text-bone shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="fluid-label-reveal inline-flex items-center min-w-0 overflow-hidden whitespace-nowrap">
        <span className="pl-2">{children}</span>
        {trailingIcon && (
          <span className="inline-flex items-center text-bone-muted pl-1.5" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </span>
    </>
  ) : (
    <>
      {icon && (
        <span className="inline-flex items-center text-bone/85 shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="inline-flex items-center leading-none whitespace-nowrap">{children}</span>
      {trailingIcon && (
        <span className="inline-flex items-center text-bone-muted shrink-0" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </>
  )

  const classes = `fluid-label ${tone === 'solid' ? 'fluid-label-solid' : ''} ${
    expand ? 'inline-grid' : 'inline-flex items-center'
  } rounded-full font-medium text-bone ${sizeClasses} ${className}`

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:')) {
      // Open in a new tab for everything that leaves the app (profiles,
      // the resume PDF, etc.) so the visitor never loses the portfolio —
      // except mailto:/tel: which hand off to the OS. This also keeps the
      // navigation overlay from intercepting same-tab asset links.
      const newTab = !(href.startsWith('mailto:') || href.startsWith('tel:'))
      return (
        <a
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className={classes}
          aria-label={ariaLabel}
          title={title}
        >
          {inner}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} title={title}>
        {inner}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        title={title}
      >
        {inner}
      </button>
    )
  }
  return (
    <span className={classes} aria-label={ariaLabel} title={title}>
      {inner}
    </span>
  )
}
