import type { ReactNode } from 'react'

/**
 * Faux terminal window. Used for sections that should feel like a shell —
 * "About me as `whoami`" style content, command listings, easter-egg hints, etc.
 */
export interface TerminalWindowProps {
  /** Shown in the title bar (e.g. "mustakim@portfolio: ~"). */
  title?: string
  /** Visual tone. */
  tone?: 'dark' | 'darker'
  /** Optional className for the frame. */
  className?: string
  /** Optional className for the body. */
  innerClassName?: string
  children?: ReactNode
}

const TONES = {
  dark:   { frame: 'bg-ink-raised border-ink-border', inner: 'bg-[#080808]' },
  darker: { frame: 'bg-[#0a0a0a] border-ink-border', inner: 'bg-[#040404]' },
} as const

export default function TerminalWindow({
  title = 'mustakim@portfolio: ~',
  tone = 'dark',
  className = '',
  innerClassName = '',
  children,
}: TerminalWindowProps) {
  const t = TONES[tone]
  return (
    <div
      className={`${t.frame} rounded-lg border overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Title bar */}
      <div className="window-chrome flex items-center gap-3 px-3.5 py-2.5 border-b border-black/40">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-bone/55 text-xs font-mono mx-auto truncate select-none">
          {title}
        </span>
        <span className="w-12 shrink-0" /> {/* spacer to balance dots */}
      </div>

      {/* Body */}
      <div className={`${t.inner} font-mono text-sm text-bone/85 ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}

/** Single terminal line with prompt + command. */
export function TerminalLine({
  user = 'mustakim',
  host = 'portfolio',
  cwd = '~',
  command,
  output,
}: {
  user?: string
  host?: string
  cwd?: string
  command?: string
  output?: ReactNode
}) {
  return (
    <div className="space-y-1">
      {command !== undefined && (
        <div className="flex flex-wrap items-baseline gap-1.5">
          <span className="text-bone-muted">{user}@{host}</span>
          <span className="text-bone/40">:</span>
          <span className="text-bone-dim">{cwd}</span>
          <span className="text-bone/40">$</span>
          <span className="text-bone/95">{command}</span>
        </div>
      )}
      {output !== undefined && <div className="text-bone/70 pl-1">{output}</div>}
    </div>
  )
}
