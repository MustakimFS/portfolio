/**
 * Small eyebrow label: filled dot + UPPERCASE letter-spaced word.
 * Marks the start of each major section. Pair with a HeroHeading underneath.
 *
 * @example
 *   <SectionLabel>About me</SectionLabel>
 *   <HeroHeading sans="I'm passionate about" accent="empowering people." />
 */
export default function SectionLabel({
  children,
  className = '',
  dotColor,
}: {
  children: React.ReactNode
  className?: string
  /** Override the dot color (defaults to bone). */
  dotColor?: string
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: dotColor ?? '#F2F2F2' }}
        aria-hidden="true"
      />
      <span className="text-bone-muted text-[11px] font-medium uppercase tracking-eyebrow">
        {children}
      </span>
    </div>
  )
}
