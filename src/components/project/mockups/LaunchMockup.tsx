/**
 * Launch Parameters — homepage card mockup.
 * Plays the demo video (muted, looping) inside the BrowserWindow on the homepage.
 * Falls back to the default-globe screenshot if the video fails to load.
 */
'use client'

import { useEffect, useRef } from 'react'

export default function LaunchMockup() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
      <video
        ref={videoRef}
        src="/projects/launch-parameters/I_need_it_to_not_zoom_in_and_i.mp4"
        poster="/projects/launch-parameters/01-default-globe.png"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.07] origin-top"
      />
    </div>
  )
}
