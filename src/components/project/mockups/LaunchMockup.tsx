'use client'

import { useEffect, useRef } from 'react'

/**
 * Launch Parameters, homepage card / case-study hero mockup.
 *
 * Plays the earth-globe demo clip (muted, looping). `preload="metadata"` fetches
 * just the first frame up-front (tiny) so the card shows the video's own frame
 * instead of a separate poster image (no swap/flash), while the full ~2.4 MB
 * clip only downloads when it first plays. An IntersectionObserver plays it
 * while the card is on (or near) screen and pauses it — freeing the decoder —
 * when it scrolls off, keeping the card-heavy homepage smooth. The clip is
 * pre-slowed at 60fps, so it plays at native speed.
 */
const CLIP = '/projects/launch-parameters/earth-globe-thumbnail-slow.mp4'

export default function LaunchMockup() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { rootMargin: '250px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={ref}
        src={CLIP}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  )
}
