/**
 * AegisFlow homepage / case-study hero mockup rendering the featured image.
 */
export default function AegisflowMockup() {
  return (
    <div className="w-full h-full bg-[#101010] flex items-center justify-center overflow-hidden aspect-[16/9.5] sm:aspect-[16/9]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/aegisflow/Gemini_Generated_Image_1bsg891bsg891bsg.png"
        alt="AegisFlow architecture"
        className="w-full h-full object-cover block scale-[1.10]"
        loading="eager"
      />
    </div>
  )
}
