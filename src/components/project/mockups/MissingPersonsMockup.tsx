/**
 * Missing Persons KG — homepage card thumbnail.
 *
 * The faux search-results table was screenshotted from the rendered mockup and
 * saved as a static PNG, so the card always looks exactly right without
 * re-rendering the JSX version at runtime.
 */
/* eslint-disable @next/next/no-img-element */
export default function MissingPersonsMockup() {
  return (
    <img
      src="/projects/missing-persons/thumbnail.png"
      alt="Missing Persons Tracker — knowledge graph search interface showing case table with filter pills"
      className="w-full block"
      loading="lazy"
    />
  )
}

/**
 * Registered as the case-study hero mockup — the real landing screenshot,
 * made clickable so the whole hero window opens the deployed app in a new
 * tab. The faux-browser chrome is supplied by the case-study page template.
 */
export function MissingPersonsHeroMockup() {
  return (
    <a
      href="https://missing-persons-knowledge-graph.vercel.app/"
      target="_blank"
      rel="noreferrer"
      className="group block bg-[#ffffff] relative"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/projects/missing-persons/landing.png"
        alt="Missing Persons Tracker — search interface with ASU branding"
        className="w-full block"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
        <span className="text-bone text-sm font-medium flex items-center gap-2">
          Open live app ↗
        </span>
      </div>
    </a>
  )
}
