import { useEffect, useRef, useState } from 'react'

// phase 0 = idle, 1 = line sweeping, 2 = content visible
export function useSectionEntrance() {
  const ref = useRef<HTMLElement>(null)
  const [phase, setPhase] = useState<0 | 1 | 2>(0)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timer.current)
          setPhase(1)
          timer.current = setTimeout(() => setPhase(2), 600)
        } else {
          clearTimeout(timer.current)
          setPhase(0)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => { observer.disconnect(); clearTimeout(timer.current) }
  }, [])

  return { ref, phase }
}
