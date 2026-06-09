import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import GradientDivider from '@/components/typography/GradientDivider'
import { BrowserWindow } from '@/components/windows'
import ProjectShowcase from '@/components/project/ProjectShowcase'
import ArchiveList from '@/components/project/ArchiveList'
import NowSection from '@/components/project/NowSection'
import Footer from '@/components/Footer'
import { PERSONAL } from '@/lib/data'
import { FEATURED_PROJECTS, ARCHIVED_PROJECTS } from '@/lib/projects'

/**
 * Homepage — hero-in-a-browser-window, intro line, selected work as
 * project showcases (each in its own faux window), footer.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pt-32 sm:pt-36 pb-0">
        <div className="max-w-6xl lg:max-w-[1280px] mx-auto hero-glow">
          <BrowserWindow
            url={`${PERSONAL.linkedin.replace(/^https?:\/\//, '')}`}
            tabTitle="mustakim.dev"
            className="h-[calc(100dvh-8rem)] sm:h-auto"
            innerClassName="flex-1 sm:aspect-[16/9] hero-inner-glow"
            openBottom={true}
          >
            <div className="relative h-full flex flex-col justify-center items-center px-6 sm:px-12 py-10">
              <HeroHeading
                sans={
                  <>
                    I build distributed systems,
                    <br />
                    intelligent agents &
                  </>
                }
                accent="research."
                size="xl"
                className="text-center max-w-4xl"
              />

              <div className="mt-12 text-right self-end max-w-sm">
                <p className="text-bone font-medium text-base sm:text-lg leading-snug">
                  Software Engineer · MS @ ASU.
                </p>
                <p className="text-bone-muted text-sm sm:text-base mt-1">
                  IEEE published. Top 15% on LeetCode.
                </p>
              </div>

              {/* Fade to dark at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent pointer-events-none z-10" />
            </div>
          </BrowserWindow>

          {/* Scroll cue (outside the mask so it remains fully bright) */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-bone text-xl sm:text-2xl animate-arrow-bounce z-20"
            aria-hidden="true"
          >
            ↓
          </div>
        </div>
      </section>

      {/* ── Now — actively building (above selected work) ─────────────── */}
      <NowSection />

      {/* ── Selected Work label ────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pt-20 pb-12">
        <div className="max-w-6xl lg:max-w-[1340px] mx-auto">
          <SectionLabel className="mb-4">Selected Work · 2025 - 2026</SectionLabel>
          <GradientDivider width="full" className="max-w-md mr-auto ml-0" />
        </div>
      </section>

      {/* ── Project showcases ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-6xl lg:max-w-[1340px] mx-auto space-y-20">
          {FEATURED_PROJECTS.map(project => (
            <ProjectShowcase key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── More work (archive) ────────────────────────────────────────── */}
      {ARCHIVED_PROJECTS.length > 0 && (
        <section id="more-work" className="px-4 sm:px-8 pb-24 scroll-mt-24">
          <div className="max-w-6xl lg:max-w-[1340px] mx-auto">
            <SectionLabel className="mb-4">More work</SectionLabel>
            <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-8">
              Smaller builds and side projects — algorithms, tools, and games.
              Each one still ships a full case study.
            </p>
            <ArchiveList projects={ARCHIVED_PROJECTS} />
          </div>
        </section>
      )}



      <Footer />
    </main>
  )
}
