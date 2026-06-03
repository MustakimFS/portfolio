import type { ReactNode } from 'react'

/**
 * Hero-style headline: clean sans + ONE italic-serif accent phrase.
 * Mirrors Perry Wang's signature ("I craft products, interactions & **stories.**")
 *
 * @example
 *   <HeroHeading
 *     sans="I build distributed systems, intelligent agents &"
 *     accent="research."
 *   />
 */
export interface HeroHeadingProps {
  /** Sans-serif portion. */
  sans: ReactNode
  /** Italic-serif accent phrase. */
  accent: ReactNode
  /** Optional class for the wrapping element. */
  className?: string
  /** Heading level (h1, h2, etc.). Defaults to h1. */
  as?: 'h1' | 'h2' | 'h3'
  /** Font size scale. */
  size?: 'xl' | 'lg' | 'md' | 'sm'
}

const SIZE_CLASSES = {
  xl: 'text-[clamp(2.6rem,7vw,5.2rem)]', // home hero
  lg: 'text-[clamp(2rem,5vw,3.4rem)]',   // info hero
  md: 'text-[clamp(1.6rem,3.2vw,2.4rem)]', // case study section heads
  sm: 'text-[clamp(1.2rem,2.2vw,1.6rem)]',
}

export default function HeroHeading({
  sans,
  accent,
  className = '',
  as: Tag = 'h1',
  size = 'xl',
}: HeroHeadingProps) {
  return (
    <Tag
      className={`font-sans font-medium text-bone tracking-tightest leading-[1.05] ${SIZE_CLASSES[size]} ${className}`}
    >
      <span className="text-glow">{sans} </span>
      <span className="font-serif italic font-normal text-accent-glow">{accent}</span>
    </Tag>
  )
}
