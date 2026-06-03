import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import GradientDivider from '@/components/typography/GradientDivider'
import { TerminalWindow, TerminalLine, CodeEditorWindow, Tok } from '@/components/windows'
import Footer from '@/components/Footer'
import { PERSONAL } from '@/lib/data'
import { getLeetcodeStats, getGithubActivity, timeAgo } from '@/lib/liveData'
import ClientTimeAgo from '@/components/ClientTimeAgo'

// Revalidate every 30 minutes so the live LeetCode + GitHub blocks stay
// fresh without rebuilding. ISR: keeps the page fast and statically
// cacheable while still picking up new commits / problems.
export const revalidate = 1800

/**
 * Info page: about, journey, experience, achievements (live),
 * philosophy, recent commits (live), personal time, outings.
 */
export default async function InfoPage() {
  const [leetcode, github] = await Promise.all([getLeetcodeStats(), getGithubActivity()])

  return (
    <main className="min-h-screen">
      {/* ── About-me hero: text only, no portrait ────────────────────── */}
      <section className="px-4 sm:px-8 pt-32 sm:pt-36 pb-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-6">About me</SectionLabel>
          <HeroHeading
            sans="I build systems that scale, ship code that lasts, and chase"
            accent="hard problems."
            size="lg"
          />
        </div>
      </section>

      {/* ── Journey: two-column narrative ──────────────────────────────── */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <GradientDivider width="md" className="max-w-md mr-auto ml-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="font-sans font-medium text-bone text-lg mb-3">
                Math, galaxies, and the road to systems.
              </h3>
              <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
                <p>
                  I was the kid who loved math before anything else. Then physics,
                  then astrophysics. Galaxies, particle physics, the absurd scales
                  of the universe and the absurd smallness of the things that hold
                  it together. The thing I actually loved was{' '}
                  <span className="text-bone">the equations</span>, long, ugly,
                  cascading systems of them, and what falls out when you finally
                  reduce them.
                </p>
                <p>
                  Computer engineering in undergrad was the moment those equations
                  got faster. I could write programs to solve the math I&apos;d
                  been doing by hand and then point them at problems no single
                  notebook could hold. That&apos;s where{' '}
                  <span className="text-bone">distributed systems</span> hooked me:
                  the same elegance, on a different axis. Raft, gRPC, replicated
                  logs, consensus, the CAP triangle: all of it is just the same
                  question I started with as a kid, asked at a different scale.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-sans font-medium text-bone text-lg mb-3">
                NLP, then ML, then everything models can be.
              </h3>
              <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
                <p>
                  I fell for NLP first: the idea that a sequence of tokens could
                  predict, adapt, summarize, translate, and (eventually) reason. As
                  models got bigger and weirder, I went deeper: how they train, how
                  they fail, how they{' '}
                  <span className="text-bone">behave under stress</span>, and what
                  it takes to make a probabilistic service feel like reliable
                  infrastructure.
                </p>
                <p>
                  Today my time goes into the unglamorous half of that work:
                  stress testing models, reducing hallucinations, hosting local
                  companion models that help me ship faster, and building small
                  applications that automate the day-to-day chores I&apos;d
                  otherwise lose hours to. Generative AI gets framed as a
                  replacement story; I think it&apos;s the opposite. Models are
                  leverage.{' '}
                  <span className="italic font-serif text-bone">
                    Used well, they buy us back the time to do harder science.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience as a terminal ───────────────────────────────────── */}
      <section className="px-4 sm:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-6">Experience</SectionLabel>
          <TerminalWindow title="mustakim@career: ~/timeline">
            <div className="p-5 sm:p-8 space-y-4">
              <TerminalLine command="timeline --reverse" />
              <TerminalLine
                output={
                  <div className="space-y-5 mt-1">
                    <ExperienceEntry
                      role="Graduate Software Engineer"
                      org="Arizona State University"
                      period="Aug '24 to present"
                      summary={
                        <>
                          MS Software Engineering · GPA 3.75. Coursework across
                          distributed systems, ML, AI engineering, and applied
                          research. Graduating May 2026.
                        </>
                      }
                    />
                    <ExperienceEntry
                      role="AI Pipeline Architect"
                      org="METY Legal · Industry Capstone · MyEdMaster"
                      period="Jan '26 to May '26"
                      summary={
                        <>
                          Sole engineer on the QnA backend, FSPR knowledge
                          profiling, and production architecture across 7 sprints
                          on a 6-person team. Rebuilt a 6-node LangGraph pipeline
                          into a 5-node privacy-first topology and dropped
                          per-query LLM cost{' '}
                          <span className="text-bone">82%</span> ($0.024 →
                          $0.0044). Shipped under NDA; IP owned by MyEdMaster.
                        </>
                      }
                    />
                    <ExperienceEntry
                      role="IEEE Researcher"
                      org="COMPSAC 2025 · Toronto"
                      period="Aug '24"
                      summary={
                        <>
                          Published &ldquo;Enhanced Tracking and Reporting of
                          Missing Persons Using Semantic Web Technologies&rdquo;
                          at IEEE COMPSAC (27% acceptance rate). Replaced a
                          $50/month GraphDB/Azure backend with FastAPI + RDFLib at{' '}
                          <span className="text-bone">$0 infra cost</span>,
                          sub-100ms SPARQL over 3,559 NamUs cases.
                        </>
                      }
                    />
                  </div>
                }
              />
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* ── Innovation Showcase — wider/horizontal crop + text ─────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 md:gap-10 items-center">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-ink-border bg-ink-raised shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/innovation-showcase/IMG-20260501-WA0045.jpg"
                alt="METY Legal team at the ASU SER517 Innovation Showcase"
                className="w-full h-full object-cover object-center block"
                loading="lazy"
              />
            </div>
            <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
              <div className="text-bone-dim text-xs font-mono uppercase tracking-wider">
                May 2026 · Tempe, AZ
              </div>
              <p className="text-bone font-medium text-base">
                Innovation Showcase, Ira A. Fulton Schools of Engineering.
              </p>
              <p>
                Demoed the METY Legal QnA pipeline to ASU faculty, industry judges,
                and MyEdMaster stakeholders at the end-of-semester showcase. The
                whole 6-person team made it out for one photo with the banner,
                that&apos;s us. A semester of compressed work that landed as the
                production pilot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Competitive coding — LIVE LeetCode stats ───────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <SectionLabel>Competitive coding</SectionLabel>
            <span className="text-bone-dim text-[11px] font-mono uppercase tracking-wider">
              {leetcode.live ? '● live · leetcode' : '○ cached'}
            </span>
          </div>
          <div className="mb-8 max-w-3xl">
            <HeroHeading
              sans="Optimization is a habit I keep losing sleep over,"
              accent="and winning back."
              size="sm"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            <StatTile value={`${leetcode.total}+`} label="LeetCode solved" />
            <StatTile value={`#${leetcode.ranking.toLocaleString()}`} label="Global ranking" />
            <StatTile value={`${leetcode.rating}`} label={`Contest rating (Top ${leetcode.topPercentage}%)`} />
            <StatTile value="6+ yrs" label="Daily-ish habit" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-bone-muted text-[15px] leading-relaxed">
            <p>
              I started in undergrad as plain interview prep and never stopped.{' '}
              <span className="text-bone">C++ for the tight stuff</span>: the
              kind of problems where you fight for milliseconds and constant
              factors. Python when I just need an answer fast. The point of the
              habit was never the badges; it was learning to spot the second-best
              solution and refuse to ship it.
            </p>
            <p>
              On HackerRank that&apos;s shown up as{' '}
              <span className="text-bone">gold badges</span> in Algorithms, Data
              Structures, and Problem Solving. On LeetCode, my contest rating sits at{' '}
              <span className="text-bone">{leetcode.rating}</span>, placing me in the{' '}
              <span className="text-bone">top {leetcode.topPercentage}%</span> of competitive solvers globally.{' '}
              <span className="italic font-serif text-bone">
                The habit is the point.
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <a
              href={PERSONAL.leetcode}
              target="_blank"
              rel="noreferrer"
              className="text-bone hover:text-bone-muted transition-colors inline-flex items-center gap-1.5"
            >
              <span className="text-bone-dim font-mono">↗</span> LeetCode profile
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="text-bone hover:text-bone-muted transition-colors inline-flex items-center gap-1.5"
            >
              <span className="text-bone-dim font-mono">↗</span> GitHub
            </a>
            <span className="text-bone-dim text-[12px] ml-auto">
              Last accepted submission · <ClientTimeAgo iso={leetcode.lastSubmission} serverFallback={timeAgo(leetcode.lastSubmission)} />
            </span>
          </div>
        </div>
      </section>

      {/* ── Philosophy as a code editor file — compact gutter ──────────── */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-6">How I work</SectionLabel>
          <CodeEditorWindow
            filename="philosophy.ts"
            language="ts"
            lineCount={14}
          >
            <pre className="text-[13px] leading-[1.55] m-0">
              <code>
                {Tok.comment('// My defaults when starting a new project')}
                {'\n\n'}
                {Tok.keyword('export const ')}
                {Tok.variable('principles')}
                {Tok.punct(' = {')}
                {'\n  '}
                {Tok.variable('innovation')}
                {Tok.punct(':   ')}
                {Tok.string("'first ask if the problem itself is the right one'")}
                {Tok.punct(',')}
                {'\n  '}
                {Tok.variable('reliability')}
                {Tok.punct(':   ')}
                {Tok.string("'design for failure modes first'")}
                {Tok.punct(',')}
                {'\n  '}
                {Tok.variable('simplicity')}
                {Tok.punct(':    ')}
                {Tok.string("'fewer moving parts > more abstractions'")}
                {Tok.punct(',')}
                {'\n  '}
                {Tok.variable('observability')}
                {Tok.punct(': ')}
                {Tok.string("'if you cant trace it, you cant fix it'")}
                {Tok.punct(',')}
                {'\n  '}
                {Tok.variable('cost')}
                {Tok.punct(':          ')}
                {Tok.string("'cheap by default, expensive on purpose'")}
                {Tok.punct(',')}
                {'\n  '}
                {Tok.variable('research')}
                {Tok.punct(':      ')}
                {Tok.string("'cite well, replicate before improving'")}
                {Tok.punct(',')}
                {'\n'}
                {Tok.punct('}')}
                {'\n\n'}
                {Tok.comment('// innovation comes first.')}
                {'\n'}
                {Tok.comment('// the rest are how to ship it without breaking things.')}
              </code>
            </pre>
          </CodeEditorWindow>
        </div>
      </section>

      {/* ── Live GitHub activity — recent commits terminal ─────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <SectionLabel>Recent commits</SectionLabel>
            <span className="text-bone-dim text-[11px] font-mono uppercase tracking-wider">
              {github.live ? '● live · github' : '○ cached'}
            </span>
          </div>

          <TerminalWindow title="mustakim@github: ~/recent">
            <div className="p-5 sm:p-7">
              <TerminalLine command="git log --all --oneline --pretty=format -n 6" />
              <div className="mt-3 space-y-1.5 text-[13px] font-mono">
                {github.commits.map((c, i) => (
                  <div key={`${c.sha}-${i}`} className="grid grid-cols-[80px_120px_1fr_auto] gap-3 items-baseline">
                    <span className="text-[#c792ea]">{c.sha}</span>
                    <span className="text-[#82aaff] truncate">{c.repo}</span>
                    <span className="text-bone/85 truncate">{c.message}</span>
                    <span className="text-bone-dim text-[11px] shrink-0">
                      <ClientTimeAgo iso={c.time} serverFallback={timeAgo(c.time)} />
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-bone-dim/70 text-[11px] font-mono">
                refreshes every 30 minutes · source github.com/MustakimFS
              </div>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* ── Personal time (gaming) + Languages ─────────────────────────── */}
      <section className="px-4 sm:px-8 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionLabel className="mb-4">Off the keyboard</SectionLabel>
            <p className="text-bone-muted text-[15px] leading-relaxed">
              Off one keyboard I&apos;m usually on a different one — Valorant and
              Apex Legends are the games I keep coming back to. First esports
              love was{' '}
              <span className="italic font-serif text-bone">Sentinels</span> when
              they had TenZ and Shroud; these days I don&apos;t lock in on any
              one org and just root for{' '}
              <span className="text-bone">NA as a region</span>. Outside the
              screen I play golf (badly, with conviction), pickup FPS in any
              form, and soccer when I can find a field.
            </p>
          </div>
          <div>
            <SectionLabel className="mb-4">Languages I reach for</SectionLabel>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[14px]">
              <LangRow lang="Python" use="ML, data, scripts" />
              <LangRow lang="C++" use="performance work" />
              <LangRow lang="TypeScript" use="this site, apps" />
              <LangRow lang="Go" use="services, infra" />
              <LangRow lang="Java" use="JVM systems" />
              <LangRow lang="SQL" use="anything stateful" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Out exploring — smaller photos, nature text ────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          <SectionLabel className="mb-6">Out exploring</SectionLabel>
          <div className="mb-10 max-w-3xl">
            <HeroHeading
              sans="Slow miles outdoors, usually with"
              accent="people I love."
              size="sm"
            />
          </div>

          {/* Row 1 — small landscape photo on the left + text */}
          <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[220px_1fr] gap-4 sm:gap-10 items-center mb-10">
            <PhotoCard
              src="/projects/me/IMG-20251129-WA0082.jpg"
              alt="Birch trees and snow at golden hour, Flagstaff"
              caption="Birch + snow, northern Arizona"
            />
            <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
              <p>
                Last Thanksgiving we drove up to{' '}
                <span className="text-bone">Flagstaff and Sedona</span> for the
                first proper snow of the year. Red rocks on the way up, white
                trees on the way back, and that one window of golden hour where
                everything looks like it&apos;s been color-graded for you.
              </p>
              <p className="italic font-serif text-bone/85">
                The kind of trip where you forget you ever owned a laptop.
              </p>
            </div>
          </div>

          {/* Row 2 — text on left, Memphis Botanical Garden photo on right */}
          <div className="grid grid-cols-[1fr_110px] sm:grid-cols-[1fr_220px] gap-4 sm:gap-10 items-center mb-10">
            <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
              <p>
                Closer to home it&apos;s the{' '}
                <span className="text-bone">Memphis Zoo</span> on a slow Sunday,
                or the <span className="text-bone">Botanical Garden</span> when
                whatever&apos;s in bloom is in bloom. Nothing about it is
                aspirational — just walking around, taking too many photos of
                the same flowers, eating something we&apos;ll regret later.
              </p>
              <p>
                I think you can tell a lot about a person by how they spend an
                empty Sunday. Mine usually ends up outside.
              </p>
            </div>
            <PhotoCard
              src="/projects/me/IMG-20250321-WA0012.jpg"
              alt="Memphis Botanical Garden, spring"
              caption="Memphis Botanical Garden, spring"
            />
          </div>

          {/* Row 3 — small ski-slope photo on left, text on right */}
          <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[220px_1fr] gap-4 sm:gap-10 items-center">
            <PhotoCard
              src="/projects/me/IMG-20251129-WA0078.jpg"
              alt="On a ski slope in Flagstaff"
              caption="Snowbowl, Flagstaff"
            />
            <div className="text-bone-muted text-[15px] leading-relaxed space-y-3">
              <p>
                I&apos;m a hopeless beginner on a snowboard and a slightly less
                hopeless beginner on skis. Doesn&apos;t matter. The lift line is
                where half my best conversations happen.
              </p>
              <p className="text-bone-dim text-[13px] italic">
                Most of these are with friends and my better half, who has
                better camera instincts than I&apos;ll ever have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Currently / Say hi ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionLabel className="mb-4">Currently</SectionLabel>
            <p className="text-bone-muted text-[15px] leading-relaxed">
              Graduating <span className="text-bone">May 2026</span> and looking
              for full-time SDE roles where I can ship reliability infrastructure
              or applied-ML systems at scale. In the meantime: stress-testing
              models, chasing hallucinations down, building small daily-use
              applications, and self-hosting local companion models that
              pair-program with me while I work.
            </p>
          </div>
          <div>
            <SectionLabel className="mb-4">Get in touch</SectionLabel>
            <p className="text-bone-muted text-[15px] leading-relaxed">
              I&apos;m best reached by email. I read everything I get sent and
              I&apos;m a quick reply if there&apos;s a real reason to talk.
            </p>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-4 inline-flex items-center gap-1.5 text-bone hover:text-bone-muted text-[15px] transition-colors"
            >
              Say hi ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ExperienceEntry({
  role,
  org,
  period,
  summary,
}: {
  role: string
  org: string
  period: string
  summary: React.ReactNode
}) {
  return (
    <div className="border-l border-white/20 pl-4">
      <div className="flex items-baseline justify-between gap-3 mb-1">
        <span className="text-bone font-medium">{role}</span>
        <span className="text-bone-dim text-[12px] font-mono shrink-0">{period}</span>
      </div>
      <div className="text-bone-muted text-[13px]">{org}</div>
      <div className="text-bone/65 text-[13px] mt-1.5 leading-relaxed">{summary}</div>
    </div>
  )
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl px-4 py-5 sm:px-5 sm:py-6">
      <div className="text-bone font-medium text-2xl sm:text-3xl tracking-tight">
        {value}
      </div>
      <div className="text-bone-dim text-[12px] uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  )
}

function LangRow({ lang, use }: { lang: string; use: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-ink-border/60 pb-1.5">
      <span className="text-bone font-mono text-[13px]">{lang}</span>
      <span className="text-bone-dim text-[12px]">{use}</span>
    </div>
  )
}

function PhotoCard({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="m-0 max-w-[240px] md:max-w-none">
      <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
      </div>
      <figcaption className="mt-2 text-bone-dim text-[12px] font-mono uppercase tracking-wider">
        {caption}
      </figcaption>
    </figure>
  )
}
