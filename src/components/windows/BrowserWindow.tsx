import type { ReactNode } from 'react'

/**
 * Faux macOS browser window — the central visual motif of the site.
 * Wraps any content in a chrome bar with traffic-light dots + URL bar.
 *
 * @example
 *   <BrowserWindow url="aegisflow.dev">
 *     <ProjectMockup />
 *   </BrowserWindow>
 */
export interface BrowserWindowProps {
  /** Address-bar text. If omitted, address bar is hidden. */
  url?: string
  /** Tab title (small text in the tab pill). Defaults to a friendly host name from `url`. */
  tabTitle?: string
  /** Visual tone — affects the chrome and inner background. */
  tone?: 'dark' | 'darker' | 'light'
  /** Rounded corner radius. */
  radius?: 'md' | 'lg' | 'xl'
  /** Extra classes for the outer frame. */
  className?: string
  /** Extra classes for the inner content area. */
  innerClassName?: string
  /** If true, removes the bottom border and bottom rounded corners so it blends into the section below. */
  openBottom?: boolean
  children?: ReactNode
}

const TONES = {
  dark:   { frame: 'bg-ink-raised border-ink-border', inner: 'bg-[#0e0e0e]' },
  darker: { frame: 'bg-[#0e0e0e] border-ink-border', inner: 'bg-[#080808]' },
  light:  { frame: 'bg-[#1c1c1c] border-ink-border', inner: 'bg-[#181818]' },
} as const

const RADII = {
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
} as const

const RADII_TOP = {
  md: 'rounded-t-lg',
  lg: 'rounded-t-xl',
  xl: 'rounded-t-2xl',
} as const

export default function BrowserWindow({
  url,
  tabTitle,
  tone = 'dark',
  radius = 'lg',
  className = '',
  innerClassName = '',
  openBottom = false,
  children,
}: BrowserWindowProps) {
  const t = TONES[tone]
  const r = openBottom ? RADII_TOP[radius] : RADII[radius]
  const borderClass = openBottom ? 'border-t border-l border-r' : 'border'
  const shadowClass = openBottom ? '' : 'shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]'
  const friendlyHost = tabTitle ?? (url ? url.replace(/^https?:\/\//, '').split('/')[0] : null)

  return (
    <div
      className={`${t.frame} ${r} ${borderClass} ${shadowClass} flex flex-col overflow-hidden ${openBottom ? 'mask-fade-bottom' : ''} ${className}`}
    >
      {/* Chrome bar */}
      <div className="window-chrome flex items-center gap-3 px-3.5 py-3 border-b border-black/40 shrink-0">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        {/* Tab pill (only if we have a title) */}
        {friendlyHost && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/30 text-bone/70 text-xs font-medium max-w-[280px] truncate">
            <span className="w-3 h-3 rounded-sm bg-bone/15 shrink-0" />
            <span className="truncate">{friendlyHost}</span>
          </div>
        )}

        {/* URL bar */}
        {url && (
          <div className="flex-1 flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 text-bone/60 text-xs font-mono truncate min-w-0">
            <span className="text-bone/30 shrink-0">{url.startsWith('http') ? '' : 'https://'}</span>
            <span className="truncate">{url}</span>
          </div>
        )}

        {/* Right-side plus icon */}
        <span className="text-bone/30 text-sm shrink-0 select-none">+</span>
      </div>

      {/* Inner content */}
      <div className={`flex-1 ${t.inner} ${innerClassName}`}>{children}</div>
    </div>
  )
}
