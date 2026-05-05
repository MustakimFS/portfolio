'use client'

import { useSectionEntrance } from '@/hooks/useSectionEntrance'

interface Props {
  id?: string
  children: React.ReactNode
  tall?: boolean       // Projects: max-h-screen + overflow-y-auto
  className?: string
}

export function SectionWrapper({ id, children, tall = false, className = '' }: Props) {
  const { ref, phase } = useSectionEntrance()

  // Line: sweep 0→100% on phase 1, fade out on phase 2
  const lineStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '2px',
    width: phase >= 1 ? '100%' : '0%',
    opacity: phase >= 2 ? 0 : 1,
    backgroundColor: 'hsl(var(--primary) / 0.6)',
    zIndex: 50,
    pointerEvents: 'none',
    transition:
      phase === 1 ? 'width 600ms ease-out' :
      phase === 2 ? 'opacity 300ms ease-out' : 'none',
  }

  // Content: hidden until phase 2, then fades up
  const contentStyle: React.CSSProperties = {
    opacity: phase >= 2 ? 1 : 0,
    transform: phase >= 2 ? 'translateY(0)' : 'translateY(32px)',
    transition: phase >= 2
      ? 'opacity 500ms ease-out, transform 500ms ease-out'
      : 'none',
    height: '100%',
  }

  return (
    <section
      id={id}
      ref={ref}
      className={[
        'relative',
        tall ? 'max-h-screen overflow-y-auto' : 'min-h-screen',
        className,
      ].join(' ')}
      style={{ scrollSnapAlign: 'start' }}
    >
      <div aria-hidden style={lineStyle} />
      <div style={contentStyle}>
        {children}
      </div>
    </section>
  )
}
