/**
 * Launch Parameters — homepage card / case-study hero mockup.
 * Plays the earth-globe demo clip (muted, looping). The clip is pre-slowed
 * and recorded at 60fps, so it plays at native speed — no playbackRate hack.
 * Falls back to the default-globe screenshot if the video can't play.
 */
export default function LaunchMockup() {
  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        src="/projects/launch-parameters/earth-globe-thumbnail-slow.mp4"
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
