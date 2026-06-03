/**
 * Standardized caption for case-study figures: "X.0  description  KIND-PILL".
 *
 * @example
 *   <FigureCaption number="1.0" label="Architecture overview." kind="image" />
 */
export default function FigureCaption({
  number,
  label,
  kind = 'image',
  className = '',
}: {
  number: string
  label: React.ReactNode
  kind?: 'image' | 'video' | 'diagram' | 'placeholder' | 'screenshot'
  className?: string
}) {
  const KIND_LABELS: Record<string, string> = {
    image: 'IMAGE',
    video: 'VIDEO LOOP',
    diagram: 'DIAGRAM',
    placeholder: 'TODO',
    screenshot: 'SCREENSHOT',
  }
  return (
    <div
      className={`flex items-center justify-end gap-3 text-bone-dim text-xs mt-3 ${className}`}
    >
      <span className="text-bone-muted font-mono">{number}</span>
      <span>{label}</span>
      <span
        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
          kind === 'placeholder'
            ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-300'
            : 'bg-white/[0.04] border border-white/[0.06] text-bone-dim'
        }`}
      >
        {KIND_LABELS[kind]}
      </span>
    </div>
  )
}
