/**
 * Shared building blocks for case-study pages. Each case study (METY,
 * AegisFlow, …) is its own component but the section primitives below stay
 * consistent across them so the design language is unified.
 */

import type { ReactNode } from 'react'
import FigureCaption from '@/components/project/FigureCaption'

// ── Meta (Overview left column) ───────────────────────────────────────────

/** Label-above-value block. Use as a left-column cell paired with a `<p>`. */
export function Meta({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-1.5">
        {label}
      </div>
      <div className="text-bone text-[14px]">{value}</div>
    </div>
  )
}

// ── Tile + text helpers ───────────────────────────────────────────────────

/** Big-number metric tile used in Highlights. */
export function MetricTile({
  value,
  label,
  sub,
}: {
  value: ReactNode
  label: string
  sub?: string
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <div className="font-sans font-medium text-bone text-3xl tracking-tightish mb-2 leading-none">
        {value}
      </div>
      <div className="text-bone-muted text-sm">{label}</div>
      {sub && <div className="text-bone-dim text-xs mt-1.5">{sub}</div>}
    </div>
  )
}

/** Bullet-style title + body row. */
export function Point({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="text-bone font-medium mb-1.5">{title}</div>
      <div className="text-bone-muted">{children}</div>
    </div>
  )
}

/** Inline `<code>` styled to fit the warm-black palette. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.05] text-bone text-[0.92em] font-mono">
      {children}
    </code>
  )
}

// ── Context: demand-signal mosaic ─────────────────────────────────────────

export function QuoteCard({
  source,
  quote,
  context,
  spanFull = false,
}: {
  source: string
  quote: string
  context?: string
  spanFull?: boolean
}) {
  return (
    <div
      className={`bg-ink-raised border border-ink-border rounded-xl p-5 ${
        spanFull ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono mb-2">
        {source}
      </div>
      <blockquote className="text-bone text-[14.5px] leading-snug italic font-serif">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {context && (
        <div className="text-bone-muted text-[12px] mt-3">{context}</div>
      )}
    </div>
  )
}

// ── Problem: constraint + principle cards ─────────────────────────────────

/** Numbered (or icon-prefixed) constraint card with body. Pass `n` for a
 *  numeric badge or `icon` (string / emoji / svg) for an icon badge. */
export function ConstraintCard({
  n,
  icon,
  title,
  body,
}: {
  n?: string
  icon?: ReactNode
  title: string
  body: ReactNode
}) {
  const badge = icon ?? n
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-4 flex items-start gap-3">
      <span className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 text-sm font-mono shrink-0">
        {badge}
      </span>
      <div>
        <div className="text-bone text-sm font-medium mb-1.5">{title}</div>
        <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
      </div>
    </div>
  )
}

/** Italic-titled principle card for the "north stars" row. */
export function PrincipleCard({ title, body }: { title: string; body: ReactNode }) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-5">
      <div className="text-bone font-medium text-[14.5px] mb-2 italic font-serif">
        {title}.
      </div>
      <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
    </div>
  )
}

// ── Process: pivots + before/after ────────────────────────────────────────

/** Tagged pivot ("V1 / V2 / V3") with a title and body. */
export function Pivot({
  version,
  title,
  body,
}: {
  version: string
  title: string
  body: ReactNode
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-amber-300/85 text-[11px] uppercase tracking-eyebrow font-mono">
          {version}
        </span>
        <h4 className="text-bone font-medium text-base">{title}</h4>
      </div>
      <p className="text-bone-muted text-[14.5px] leading-relaxed">{body}</p>
    </div>
  )
}

/** Side-by-side before/after card with a FigureCaption underneath. */
export function BeforeAfter({
  number,
  title,
  beforeLabel = 'Before',
  before,
  afterLabel = 'After',
  after,
}: {
  number: string
  title: string
  beforeLabel?: string
  before: ReactNode
  afterLabel?: string
  after: ReactNode
}) {
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
        {title}
      </div>
      <div className="space-y-2">
        <div className="bg-ink-raised border border-ink-border rounded-lg p-4">
          <div className="text-bone-muted text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            {beforeLabel}
          </div>
          <div className="text-bone-muted text-[13px] leading-relaxed">{before}</div>
        </div>
        <div className="bg-ink-raised border border-emerald-500/20 rounded-lg p-4">
          <div className="text-emerald-300/80 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            {afterLabel}
          </div>
          <div className="text-bone-muted text-[13px] leading-relaxed">{after}</div>
        </div>
      </div>
      <FigureCaption number={number} label="" kind="diagram" />
    </div>
  )
}

// ── Retrospective ─────────────────────────────────────────────────────────

export function RetroColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <h4 className="text-bone font-medium mb-4 text-sm uppercase tracking-eyebrow">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function RetroItem({ head, body }: { head: string; body: ReactNode }) {
  return (
    <div>
      <div className="text-bone text-[14px] font-medium mb-1">{head}</div>
      <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
    </div>
  )
}

// ── Final Designs: figure wrapper ─────────────────────────────────────────

/** Image + caption, width-constrained. Used in Final Designs sections. */
export function Figure({
  src,
  alt,
  number,
  caption,
  maxW = '',
}: {
  src: string
  alt: string
  number: string
  caption: string
  maxW?: string
}) {
  return (
    <div className={maxW ? `${maxW} mx-auto` : ''}>
      <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full block" loading="lazy" />
      </div>
      <FigureCaption number={number} label={caption} kind="image" />
    </div>
  )
}
