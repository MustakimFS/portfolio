/**
 * Thin horizontal divider with a gradient that fades at both edges.
 * Used to separate sections without shouting.
 */
export default function GradientDivider({
  className = '',
  width = 'sm',
}: {
  className?: string
  /** sm = compact (~250px-ish via container), md = wider, full = container-wide */
  width?: 'sm' | 'md' | 'full'
}) {
  const widthClasses = {
    sm: 'max-w-xs',
    md: 'max-w-md',
    full: '',
  }
  return (
    <div className={`divider-fade ${widthClasses[width]} mx-auto ${className}`} aria-hidden="true" />
  )
}
