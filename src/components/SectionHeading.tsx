'use client'

interface SectionHeadingProps {
  label: string
  className?: string
}

// Simple label — entrance animation is handled by SectionWrapper
export function SectionHeading({ label, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <span className="font-mono text-xs sm:text-sm text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
