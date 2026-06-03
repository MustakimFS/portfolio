import type { ReactNode } from 'react'

/**
 * Faux code-editor window with file tab + optional line numbers.
 * Use for sections that benefit from a code-editor aesthetic — e.g. showing
 * skills as imports, philosophy as a manifesto file, etc.
 */
export interface CodeEditorWindowProps {
  /** Filename shown in the tab. */
  filename: string
  /** Language label (e.g. "ts", "py", "go") — shown next to filename. */
  language?: string
  /** Show line numbers in a gutter. */
  showLineNumbers?: boolean
  /**
   * How many lines the gutter should render. Defaults to 64 (legacy).
   * Set this to the actual line count of your code so the gutter doesn't
   * leave a tall block of empty numbers below the snippet.
   */
  lineCount?: number
  className?: string
  innerClassName?: string
  children?: ReactNode
}

export default function CodeEditorWindow({
  filename,
  language,
  showLineNumbers = true,
  lineCount = 64,
  className = '',
  innerClassName = '',
  children,
}: CodeEditorWindowProps) {
  return (
    <div
      className={`bg-ink-raised border border-ink-border rounded-lg overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ${className}`}
    >
      {/* Chrome */}
      <div className="window-chrome flex items-center gap-3 px-3.5 py-2.5 border-b border-black/40">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* Active tab */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-white/5 text-bone/80 text-xs font-mono">
          {language && (
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-bone/10 text-bone/60 uppercase tracking-wider">
              {language}
            </span>
          )}
          <span>{filename}</span>
          <span className="ml-2 w-1.5 h-1.5 rounded-full bg-bone/40" />
        </div>
        <span className="text-bone/30 text-xs shrink-0 ml-auto select-none">+</span>
      </div>

      {/* Body */}
      <div className={`bg-[#0b0b0b] font-mono text-sm ${innerClassName}`}>
        {showLineNumbers ? (
          <div className="flex">
            <div
              className="shrink-0 select-none text-right text-bone-dim/40 pr-3 py-4 pl-3 border-r border-ink-border-dim"
              aria-hidden="true"
            >
              {/* Line numbers rendered by child component; this is layout only */}
              <CodeLineNumbers maxLines={lineCount} />
            </div>
            <div className="flex-1 py-4 pl-4 pr-4 overflow-x-auto">{children}</div>
          </div>
        ) : (
          <div className="py-4 px-4 overflow-x-auto">{children}</div>
        )}
      </div>
    </div>
  )
}

function CodeLineNumbers({ maxLines = 32 }: { maxLines?: number }) {
  return (
    <div className="space-y-[5px] leading-[1.5]">
      {Array.from({ length: maxLines }, (_, i) => (
        <div key={i} className="text-[12px]">
          {i + 1}
        </div>
      ))}
    </div>
  )
}

/** Helpers for syntax-colored snippets without a real highlighter. */
export const Tok = {
  keyword: (s: ReactNode) => <span className="text-[#c792ea]">{s}</span>,
  string: (s: ReactNode) => <span className="text-[#c3e88d]">{s}</span>,
  func: (s: ReactNode) => <span className="text-[#82aaff]">{s}</span>,
  comment: (s: ReactNode) => <span className="text-bone-dim/55 italic">{s}</span>,
  punct: (s: ReactNode) => <span className="text-bone/50">{s}</span>,
  variable: (s: ReactNode) => <span className="text-[#f78c6c]">{s}</span>,
  type: (s: ReactNode) => <span className="text-[#ffcb6b]">{s}</span>,
  plain: (s: ReactNode) => <span className="text-bone/85">{s}</span>,
}
