/**
 * Launch Parameters — homepage card / case-study hero mockup.
 * Plays the earth-globe demo clip (muted, looping, 0.5x speed) inside the
 * window. Falls back to the default-globe screenshot if the video can't play.
 */
'use client'

import { useEffect, useRef } from 'react'

export default function LaunchMockup() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5
  }, [])

  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src="/projects/launch-parameters/earth-globe-thumbnail.webm"
        poster="/projects/launch-parameters/01-default-globe.png"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </div>
  )
}
