/**
 * METY Legal Chatbot — real product screenshot rendered inside the project's
 * BrowserWindow. The image lives at /public/projects/mety-legal/landing.png.
 *
 * We use a plain <img> rather than next/image because the Next.js image
 * optimizer endpoint can be slow/flaky in some dev/preview environments and
 * the file is already a reasonable size (~320 KB) — fine to ship as-is for a
 * homepage card. If we ever need responsive serving, swap to <Image>.
 */
export default function MetyMockup() {
  return (
    <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/mety-legal/landing.png"
        alt="METY Legal Chatbot — landing page"
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="eager"
        decoding="async"
      />
    </div>
  )
}
