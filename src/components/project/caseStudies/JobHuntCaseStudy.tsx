/**
 * Job Hunt Dashboard (Electron Job Tracker) — full case-study body.
 *
 * Real facts pulled from the README at
 * github.com/MustakimFS/electron-job-tracker. Stack, design decisions,
 * WebSocket port, AI provider models, and OAuth scope all match the source.
 */
"use client"

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { TerminalWindow, TerminalLine } from '@/components/windows'
import {
  Meta,
  MetricTile,
  Point,
  Code,
  QuoteCard,
  ConstraintCard,
  PrincipleCard,
  Pivot,
  BeforeAfter,
  RetroColumn,
  RetroItem,
  Figure,
} from './_helpers'

export const JOB_HUNT_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function JobHuntCaseStudy() {
  return (
    <div className="space-y-24">
      <Overview />
      <Highlights />
      <Context />
      <Problem />
      <Process />
      <Architecture />
      <FinalDesigns />
      <Retrospective />
    </div>
  )
}

// ── 1. Overview ───────────────────────────────────────────────────────────

function Overview() {
  return (
    <section id="overview" className="scroll-mt-24">
      <SectionLabel className="mb-4">Overview</SectionLabel>
      <HeroHeading
        sans="A local-first job tracker that"
        accent="never leaves my machine."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          A tool I built for myself while job-hunting in spring 2026.{' '}
          <span className="text-bone">Electron 29</span> desktop app that lives
          in the Windows tray, polls Gmail on a schedule with read-only OAuth,
          and uses a pluggable AI provider (Gemini / Claude / OpenAI) to
          classify whether each new email is job-related. Everything is stored
          on my disk; nothing leaves except the Gmail OAuth call itself and —
          if I opt in — the email subject + snippet sent to one chosen LLM for
          classification.
        </p>

        <Meta
          label="Stack"
          value="Electron 29 · Node 18+ · plain HTML / CSS / JS (no framework) · node-cron · googleapis · ws · JSON storage"
        />
        <p className="text-bone-muted">
          Deliberately frameworkless: zero bundler, zero React, zero Tailwind.
          Storage is a JSON file in <Code>app.getPath(&apos;userData&apos;)</Code>.
          Gmail is the official <Code>googleapis</Code> SDK on a read-only
          scope. AI providers are reached over raw HTTPS without any vendor SDK
          so the surface is the same for all three. The wallpaper integration
          talks to the renderer over a local WebSocket on{' '}
          <Code>ws://127.0.0.1:49152</Code>.
        </p>

        <Meta label="Timeline" value="May 2026 · solo · for personal use" />
        <p className="text-bone-muted">
          The app I open every morning during the job search. Daily-task list
          and long-term goals are editable from inside the app, the dashboard
          mirrors live to a{' '}
          <span className="italic font-serif text-bone">
            Wallpaper Engine
          </span>{' '}
          background so the status is on screen even when the app is collapsed
          to tray.
        </p>
      </div>
    </section>
  )
}

// ── 2. Highlights ─────────────────────────────────────────────────────────

function Highlights() {
  return (
    <section id="highlights" className="scroll-mt-24">
      <SectionLabel className="mb-4">Highlights</SectionLabel>
      <HeroHeading
        sans="Local-first, BYO-AI,"
        accent="even live on the desktop wallpaper."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Three properties are the point.{' '}
        <span className="text-bone">It stays on disk</span> — no server, no
        cloud, no telemetry.{' '}
        <span className="text-bone">It&apos;s BYOK across three LLMs</span> —
        Gemini, Anthropic, or OpenAI, switchable from Settings.{' '}
        <span className="text-bone">It paints itself onto the wallpaper</span>{' '}
        via a Wallpaper Engine plugin that listens on a localhost socket and
        re-renders whenever the app state changes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="3" label="AI providers" sub="Gemini · Claude · OpenAI · BYOK" />
        <MetricTile value="0" label="Servers" sub="local-only · JSON in userData" />
        <MetricTile value="ws://" label="Wallpaper transport" sub="127.0.0.1:49152 · two-way" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Read-only Gmail OAuth. Nothing else leaves.">
          The Google sign-in is the only external call required to use the app.
          AI classification is opt-in and goes only to the provider whose key
          you pasted in Settings. If you select &ldquo;None&rdquo;, every
          job-related email lands in the in-app inbox for manual review.
        </Point>
        <Point title="BYOK across three providers, behind one switch.">
          AI provider configs (
          <Code>gemini-2.0-flash</Code>,{' '}
          <Code>claude-haiku-4-5</Code>,{' '}
          <Code>gpt-4o-mini</Code>) live side-by-side in Settings. Keys are
          stored locally; switching providers is one dropdown change, no
          rebuild.
        </Point>
        <Point title="Live wallpaper as a second viewport.">
          A Wallpaper Engine &ldquo;Web&rdquo; wallpaper at{' '}
          <Code>wallpaper/wallpaper.html</Code> connects to the local
          WebSocket and renders the same daily tasks + deadline + sync status
          as the app. Check off a task on the wallpaper and it propagates back
          to the app instantly.
        </Point>
      </div>
    </section>
  )
}

// ── 3. Context ────────────────────────────────────────────────────────────

function Context() {
  return (
    <section id="context" className="scroll-mt-24">
      <SectionLabel className="mb-4">Context</SectionLabel>
      <HeroHeading
        sans="A job search is the worst kind of"
        accent="long-running unindexed inbox."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Six months of applying to roles turns Gmail into a haystack —
        acknowledgments, recruiter outreach, scheduling threads,
        take-home assignments, and rejections all mixed in with everything
        else. Generic trackers (Huntr, Teal) want me to upload everything to
        their cloud. I wanted the opposite: an offline app on my own machine,
        plus the option to spend a few cents on an LLM call only when I
        explicitly choose to.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="r/cscareerquestions · recurring thread"
          quote="How are people tracking 100+ applications without losing their minds?"
          context="The problem this app exists to solve"
        />
        <QuoteCard
          source="Huntr / Teal pricing pages, 2026"
          quote="Free tier limits at ~20 active applications; Pro tier $20-30/mo with cloud sync."
          context="Cost cliff for a 3-6 month search"
        />
        <QuoteCard
          source="OAuth 2.0 best practice"
          quote="Request the narrowest scope that still works. Read-only Gmail is gmail.readonly — don't ask for write access if you only need to read."
          context="The scope this app uses, by design"
        />
        <QuoteCard
          source="Wallpaper Engine workshop"
          quote="Web wallpapers can run arbitrary HTML + JS and connect to local services — the perfect transport for a tray-app status widget."
          context="The integration nobody asks for, but everyone wants"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="Demand signals." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="A productivity tool I'd actually trust"
        accent="with my Gmail."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="Local-first, no exceptions"
          body="Storage is a JSON file in app.getPath('userData'). No SaaS, no backend, no analytics, no telemetry. The OS owns the data file, the app reads and writes it."
        />
        <ConstraintCard
          n="2"
          title="Narrowest possible Gmail scope"
          body="gmail.readonly only. The app must never need write or modify access — that's both a trust boundary and a smaller blast radius if the OAuth token leaks."
        />
        <ConstraintCard
          n="3"
          title="Multi-provider AI without vendor lock"
          body="Users (me, mostly) shouldn't have to commit to one LLM provider. Same classification surface has to work over Gemini, Anthropic, or OpenAI — raw HTTPS, no SDKs."
        />
        <ConstraintCard
          n="4"
          title="No-AI manual fallback"
          body="If the user picks 'None' as the provider, every job-flagged email routes to a manual inbox tab. The app stays useful at $0 AI spend."
        />
        <ConstraintCard
          n="5"
          title="Lives in the tray on Windows"
          body="Starts hidden on boot via Windows' login items, sits in the system tray, polls Gmail on schedule without ever needing focus."
        />
        <ConstraintCard
          n="6"
          title="Live wallpaper as a viewport"
          body="The dashboard state needs to be visible without focusing the app. A Wallpaper Engine wallpaper paints the same tasks + status onto the desktop and stays in sync via WebSocket."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Nothing leaves unless you ask"
          body="Gmail OAuth is the only mandatory call. Email content reaches an AI provider only if a key is pasted and a provider is set as active."
        />
        <PrincipleCard
          title="No framework where one isn't needed"
          body="Plain HTML / CSS / JS in the renderer. Zero bundler, zero build step, zero dependencies between the markup you write and the markup that ships."
        />
        <PrincipleCard
          title="Two viewports, one source of truth"
          body="The renderer process owns app state. The wallpaper is a read-mostly mirror over a local WebSocket. Both reflect the same JSON store underneath."
        />
      </div>
    </section>
  )
}

// ── 5. Process ────────────────────────────────────────────────────────────

function Process() {
  return (
    <section id="process" className="scroll-mt-24">
      <SectionLabel className="mb-4">Process</SectionLabel>
      <HeroHeading
        sans="Three increments that each made"
        accent="the next one possible."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Electron shell + manual inbox."
          body={
            <>
              First milestone: a tray-resident Electron 29 app with a single
              HTML page, a JSON storage adapter, and a manual inbox where I
              could paste subject lines into application records. No Gmail
              integration, no AI. Useful enough to start the search, ugly
              enough to know it needed more.
            </>
          }
        />

        <Pivot
          version="V2"
          title="Gmail sync + AI classification."
          body={
            <>
              Added <Code>googleapis</Code> OAuth and a{' '}
              <Code>node-cron</Code> scheduler that polls Gmail every N
              minutes. Built a small provider abstraction so the same
              <Code>classify(subject, snippet)</Code> call dispatches to
              Gemini, Anthropic, or OpenAI based on the active provider in
              Settings. The job-related ones land tagged in the dashboard; the
              rest get ignored.
            </>
          }
        />

        <Pivot
          version="V3"
          title="Wallpaper Engine live integration."
          body={
            <>
              Stood up a local WebSocket server on{' '}
              <Code>ws://127.0.0.1:49152</Code> inside the Electron main
              process. The Wallpaper Engine wallpaper is just an HTML page
              with a <Code>WebSocket</Code> client that subscribes to state
              updates from the renderer and pushes task-toggle events back.
              The result: my daily tasks and sync status are on screen even
              when the app is collapsed to the tray.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The auto-launch quirk
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            Electron&apos;s <Code>setLoginItemSettings</Code> happily registers
            the app for auto-launch, but{' '}
            <Code>openAsHidden</Code> alone doesn&apos;t hide it on first boot
            after install — Windows shows the window once. Fix was checking{' '}
            <Code>process.argv</Code> for the{' '}
            <Code>--hidden</Code> flag Windows passes on login starts and
            calling <Code>win.hide()</Code> if present. The first launch shows
            the window so you know it&apos;s installed; every subsequent boot
            opens it straight into the tray.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Email classification"
          beforeLabel="Before — V1 manual inbox"
          before="Paste subject lines by hand. Useful but slow — 50 applications a week means a lot of typing."
          afterLabel="After — V2 multi-provider AI"
          after="node-cron pulls new threads every N minutes, dispatches subject + snippet to the active provider (gemini-2.0-flash / claude-haiku-4-5 / gpt-4o-mini), routes the job-tagged ones to the dashboard."
        />
        <BeforeAfter
          number="3.1"
          title="Dashboard visibility"
          beforeLabel="Before"
          before="Have to click the tray icon to see today's tasks or the sync status. Out of sight, out of mind."
          afterLabel="After"
          after="Wallpaper Engine wallpaper renders the same daily tasks + deadline + sync status. Two-way: checking a task on the wallpaper marks it done in the app."
        />
      </div>
    </section>
  )
}

// ── 6. Architecture ───────────────────────────────────────────────────────

function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-24">
      <SectionLabel className="mb-4">Architecture</SectionLabel>
      <HeroHeading
        sans="One process, three surfaces,"
        accent="one JSON file."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The Electron main process owns everything mutable — the JSON store,
        the cron timer, the OAuth tokens, the WebSocket server. The renderer
        process is the operator UI. The wallpaper is a passive listener over
        the local socket. All three see the same state because they all read
        from the same in-process source of truth.
      </p>

      <TerminalWindow title="jobhunt: ~/architecture">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="electron"
            host="main"
            cwd="/"
            command="main process boot"
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] storage</span>
                  <span className="text-bone/65"> load JSON · app.getPath(&apos;userData&apos;)/state.json</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] cron</span>
                  <span className="text-bone/65"> schedule gmail sync · every N min · resettable</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] ws</span>
                  <span className="text-bone/65"> start WebSocket server · 127.0.0.1:49152</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] tray</span>
                  <span className="text-bone/65"> register tray icon + menu · start hidden if --hidden</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── on cron tick ───────────────────────────────────────
              </span>
            }
          />
          <TerminalLine command="gmail.users.messages.list({ q, labelIds, maxResults })" />
          <TerminalLine command="for each new msg → ai.classify(subject, snippet)  // provider = active" />
          <TerminalLine command="if job-related → store.upsert(application) · ws.broadcast(state)" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── on renderer / wallpaper task toggle ────────────────
              </span>
            }
          />
          <TerminalLine command='ws.recv({ type: "task.toggle", id })  → store.update(...)' />
          <TerminalLine command="ws.broadcast(state)   # both viewports refresh" />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Main-process lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            AI provider abstraction
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`// providers/index.js
const PROVIDERS = {
  gemini:    require('./gemini'),     // gemini-2.0-flash
  anthropic: require('./anthropic'),  // claude-haiku-4-5
  openai:    require('./openai'),     // gpt-4o-mini
}

// one shape, three implementations
async function classify(subject, snippet, cfg) {
  if (cfg.provider === 'none') {
    return { jobRelated: null, manual: true }
  }
  const p = PROVIDERS[cfg.provider]
  return await p.classify({
    subject, snippet,
    apiKey: cfg.keys[cfg.provider],
  })
}

// all three speak raw HTTPS — no SDKs, no auth helpers,
// no shared dependency surface between them.`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Wallpaper transport
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`// main process
const wss = new WebSocketServer({
  host: '127.0.0.1',
  port: 49152,
})

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'state', payload: store.snapshot()
  }))
  ws.on('message', (raw) => {
    const m = JSON.parse(raw)
    if (m.type === 'task.toggle') {
      store.toggleTask(m.id)
      broadcast({ type: 'state', payload: store.snapshot() })
    }
  })
})

// wallpaper/wallpaper.html
const ws = new WebSocket('ws://127.0.0.1:49152')
ws.onmessage = (e) => renderState(JSON.parse(e.data))
checkbox.onchange = () => ws.send(...)`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Provider abstraction + wallpaper transport." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="What it looks like"
        accent="every morning at 8am."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The desktop app is intentionally dense — stat cards across the top,
        today&apos;s objectives on the left, this-week progress + long-term
        goals on the right, all editable in-app. The Wallpaper Engine view is
        a slimmer read-mostly mirror of the same state, painted onto the
        desktop and kept in sync over the local WebSocket.
      </p>

      {/* Dashboard — full-width establishing shot */}
      <Figure
        src="/projects/jobhunt/dashboard.png"
        alt="Job Hunt desktop app — Dashboard tab with stat cards, daily objectives, weekly progress, long-term goals"
        number="7.0"
        caption="Dashboard tab — 224 applications tracked, daily objectives + weekly progress + long-term goals."
      />

      {/* Wallpaper Engine live view — full width + text */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 md:gap-10 items-center">
        <Figure
          src="/projects/jobhunt/wallpaper.png"
          alt="Job Hunt wallpaper — live dashboard painted onto the Windows desktop via Wallpaper Engine"
          number="7.1"
          caption="Wallpaper Engine live view."
        />
        <div className="text-bone-muted text-[14.5px] leading-relaxed space-y-3">
          <p>
            <span className="text-bone">The same state, painted onto the
            desktop.</span>{' '}
            A Wallpaper Engine &ldquo;Web&rdquo; wallpaper connects to the
            local WebSocket on <Code>127.0.0.1:49152</Code> and renders the
            stats, today&apos;s objectives, this-week targets, long-term goals,
            and the deadline countdown — all without focusing the app.
          </p>
          <p>
            It&apos;s two-way: checking a task on the wallpaper marks it done
            in the app, and vice versa. Both surfaces read from the same
            in-process JSON store, so they never drift.
          </p>
        </div>
      </div>

      {/* Settings — two detail shots side by side */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Figure
          src="/projects/jobhunt/settings-gmail-ai.png"
          alt="Settings — Gmail connection, AI provider keys, general sync settings"
          number="7.2"
          caption="Settings — Gmail + AI provider + sync config."
        />
        <Figure
          src="/projects/jobhunt/settings-tasks-goals.png"
          alt="Settings — editable daily tasks (count/binary) and long-term goals"
          number="7.3"
          caption="Settings — editable daily tasks + long-term goals."
        />
      </div>

      <p className="text-bone-muted text-[14px] leading-relaxed max-w-2xl mt-10">
        <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
          Local-only · no public URL
        </span>
        Job Hunt is a desktop app, not a hosted site — it lives in the Windows
        tray and reads your Gmail locally. The screenshots above are from the
        running Electron build on developer hardware; daily tasks and goals are
        fully editable in Settings (<Code>count</Code> tasks track a number,{' '}
        <Code>binary</Code> tasks are done / not-done).
      </p>
    </section>
  )
}

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What I'd keep,"
        accent="what I'd ship next."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="No-framework renderer."
            body="Plain HTML / CSS / JS made the renderer faster to iterate on than a React + bundler setup would have. Zero build step, instant reload, no dependency drift. Justified by how small the UI is."
          />
          <RetroItem
            head="Provider abstraction over raw HTTPS."
            body="Skipping vendor SDKs kept the dependency surface tiny and made switching providers a one-file change. Same classify(subject, snippet) call across all three."
          />
          <RetroItem
            head="WebSocket-as-state-bus."
            body="A local-only ws server is enough to keep two viewports (renderer + wallpaper) in sync. No Redux, no Zustand, no IPC ceremony — just JSON messages over a socket."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="Windows-only."
            body="Tray behavior, auto-launch, Wallpaper Engine integration — all Windows-coded. A cross-platform version means rebuilding the auto-launch + wallpaper pieces from scratch for macOS / Linux."
          />
          <RetroItem
            head="No inbox search."
            body="Once 300 applications are in the JSON store, finding a specific company is slower than it should be. Need an in-app filter / search."
          />
          <RetroItem
            head="No calendar integration."
            body="Interview times still live in Google Calendar separately. A read-only calendar feed in the app would let the dashboard surface 'next 3 interviews' alongside the daily tasks."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="macOS port."
            body="Re-implement tray, auto-launch, and a mac wallpaper transport (probably Lively or a custom Swift launcher). The Electron renderer is portable already; only the OS-touching layers need rewriting."
          />
          <RetroItem
            head="Local LLM fallback."
            body="Add an Ollama-backed provider so classification can run fully offline. Pair nicely with the existing 'None' option as a no-cost middle ground."
          />
          <RetroItem
            head="Search + filter inside the app."
            body="Even a SQLite index on company + status + date would make the inbox usable at >100 applications. JSON-array scans don't scale forever."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
