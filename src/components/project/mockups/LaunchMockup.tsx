'use client'

import { useEffect, useRef } from 'react'

/**
 * Launch Parameters, homepage card / case-study hero mockup.
 *
 * Plays the earth-globe demo clip (muted, looping). The clip is ~2.4 MB, so
 * `preload="none"` keeps it from downloading until it's first played, and an
 * IntersectionObserver plays it only while the card is on screen and pauses it
 * (freeing the decoder) when it scrolls off — so it stays smooth on the
 * card-heavy homepage without ever swapping the video out for a still. The clip
 * is pre-slowed at 60fps, so it plays at native speed.
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
      { threshold: 0.2 },
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
        poster="/projects/launch-parameters/01-default-globe.webp"
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  )
}
