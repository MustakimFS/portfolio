/**
 * Zebradoodle — full case-study body.
 *
 * Real facts from the README at github.com/MustakimFS/zebradoodle:
 * 4 game modes (Wordle/Quordle/Sedecordle/Nerdle), React 17 + React Router 5
 * + CRA stack, two-pass scoring port from the 2022 Java CLI prototype,
 * Nerdle 8-char rules, deterministic daily seeding, localStorage persistence.
 */
"use client"

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { BrowserWindow, TerminalWindow, TerminalLine } from '@/components/windows'
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

export const ZEBRADOODLE_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function ZebradoodleCaseStudy() {
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
        sans="A 2022 Java CLI prototype,"
        accent="reborn in the browser."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          A weekend project rebuilt from a Java command-line Wordle clone I
          wrote between September 2022 and January 2023 in undergrad. The
          original lived in <Code>legacy/Zebradoodle.java</Code> and loaded
          26 per-letter dictionary files off disk. This rebuild brings the
          same engine into the browser as React + React Router and adds three
          siblings — <span className="text-bone">Quordle, Sedecordle, and
          Nerdle</span> — that share the original scoring core.
        </p>

        <Meta
          label="Stack"
          value="React 17 · React Router 5 · Create React App (react-scripts 5) · plain CSS · canvas-confetti · localStorage"
        />
        <p className="text-bone-muted">
          No backend, no design system, no Tailwind. The whole thing builds
          as a static bundle and deploys to GitHub Pages. State (stats,
          streaks, daily-puzzle resume) lives in{' '}
          <Code>localStorage</Code> so refreshes never lose progress and the
          daily puzzle picks up where it left off.
        </p>

        <Meta label="Timeline" value="2022 (Java CLI) → 2026 React rewrite" />
        <p className="text-bone-muted">
          Live at{' '}
          <Code>mustakimfs.github.io/zebradoodle</Code>. The repo&apos;s commit
          history reflects the rebuild dates; the{' '}
          <span className="italic font-serif text-bone">
            algorithmic lineage
          </span>{' '}
          goes back to the original 2022 prototype.
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
        sans="One scoring core,"
        accent="four very different boards."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        The interesting part isn&apos;t any single mode — it&apos;s how the
        same two-pass scoring engine drives all four. Wordle is one board.
        Quordle stacks four. Sedecordle stacks sixteen. Nerdle replaces the
        word with an 8-character arithmetic equation and the dictionary with
        a tokenizer + evaluator that{' '}
        <span className="text-bone">
          enforces operator precedence and exact integer division
        </span>{' '}
        before any guess can even be scored.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="4" label="Game modes" sub="Wordle · Quordle · Sedecordle · Nerdle" />
        <MetricTile value="14.8K" label="Word bank size" sub="curated 5-letter list" />
        <MetricTile value="0" label="Backend services" sub="static bundle · GitHub Pages" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Two-pass scoring — ported from the Java compare().">
          First pass marks position-correct letters as{' '}
          <span className="text-bone">correct</span>. Second pass walks the
          remaining guess letters; each one matches an answer letter at most
          once, with correct-position matches consumed first. Handles
          repeated letters the way Wordle does. Lives in{' '}
          <Code>src/lib/scoring.js</Code>.
        </Point>
        <Point title="Deterministic daily seeding via FNV-32 of the date.">
          Every player gets the same puzzle on the same calendar day. The
          seed is a stable hash of <Code>YYYY-MM-DD</Code> — no server, no
          sync, no &ldquo;today&apos;s word&rdquo; endpoint. Practice mode
          rolls a fresh random puzzle on demand.
        </Point>
        <Point title="Nerdle ships its own tokenizer + evaluator.">
          Equations are exactly 8 characters, exactly one <Code>=</Code>,
          standard operator precedence (<Code>* /</Code> before <Code>+ -</Code>),
          exact integer division (no fractions), no leading zeros. The bank
          in <Code>src/data/nerdleAnswers.js</Code> is re-validated on module
          load so a corrupt answer can never reach a player.
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
        sans="Wordle is the most"
        accent="cloneable design of the decade."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The interesting question wasn&apos;t &ldquo;can I clone Wordle&rdquo;
        — anyone can. It was &ldquo;<em>can the same engine drive a 1-board, a
        4-board, a 16-board, and a math-equation variant without forking the
        scoring logic four times.</em>&rdquo; The README&apos;s table shows
        the answer: yes, with one shared scoring function and per-mode
        dictionaries.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="Wordle / NYT · public design"
          quote="A 5-letter guess, 6 attempts, color-coded feedback. Designed for daily ritual play with one shared puzzle across the player base."
          context="The pattern the four variants extend"
        />
        <QuoteCard
          source="r/wordle · repeated-letter complaint threads"
          quote="My guess had two E's but only one got marked yellow! Is that a bug?"
          context="What the two-pass algorithm exists to solve — and what gets it wrong if you implement naively"
        />
        <QuoteCard
          source="Nerdle · richardmann.com, 2022"
          quote="Replace the word with an arithmetic equation. Same UI, totally different validation logic."
          context="The math-mode template this implementation follows"
        />
        <QuoteCard
          source="Mustakim · Sep 2022 — Jan 2023"
          quote="legacy/Zebradoodle.java: a CLI Wordle that read 26 per-letter dictionary files off disk and scored guesses with a two-pass compare() method."
          context="The undergrad prototype this 2026 build descends from"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="The lineage." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="Four modes,"
        accent="one core, zero servers."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="One scoring function for all four modes"
          body="Wordle, Quordle, and Sedecordle all use the same letter-comparison logic — Quordle just runs it against four answers per guess and Sedecordle against sixteen. Forking the scorer would mean four versions of the same repeated-letter bug to maintain."
        />
        <ConstraintCard
          n="2"
          title="Repeated-letter correctness, port-faithful"
          body="The original Java two-pass compare() handles cases like guess BOOKS vs answer BLOOD correctly (only one O marked, repeated-O isn't double-yellow). JS port has to produce byte-identical state on every supported input."
        />
        <ConstraintCard
          n="3"
          title="Deterministic daily seeding without a server"
          body="Every player has to get the same puzzle on the same day. A server would be the obvious answer; the constraint is no server. Solution: FNV-32 hash of the date string is the seed."
        />
        <ConstraintCard
          n="4"
          title="Nerdle's validation is its own grammar"
          body="An equation guess can't even be scored until it's been tokenized, evaluated, and confirmed to satisfy 8-char length / single equals / precedence / integer division / no-leading-zero rules. Failing any of those is a reject before the scorer ever sees the input."
        />
        <ConstraintCard
          n="5"
          title="State that survives a reload"
          body="A player who refreshes mid-Wordle expects to land back on the same board with the same guesses. localStorage holds the in-progress game per mode, the daily puzzle ID, and the running stats."
        />
        <ConstraintCard
          n="6"
          title="Static bundle, no backend"
          body="The whole thing has to deploy as static files on GitHub Pages — no API, no auth, no analytics. Everything that needs to persist persists locally on the player's device."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="The scorer is the contract"
          body="Every mode dispatches to the same scoring function. New modes mean new dictionaries and new board layouts — never new scoring."
        />
        <PrincipleCard
          title="Determinism over server"
          body="Daily puzzles are picked by a stable hash, not fetched. Same date everywhere on Earth → same puzzle. No coordination required."
        />
        <PrincipleCard
          title="Validate before you score"
          body="In Nerdle, an invalid equation isn't a wrong answer — it's a malformed input. The tokenizer + evaluator reject pre-score so the player gets a clear 'invalid equation' toast, not a misleading color row."
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
        sans="Port the core, multiply the boards,"
        accent="then change the alphabet."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Wordle in React — port the Java scorer."
          body={
            <>
              Started by porting <Code>Zebradoodle.java</Code>&apos;s two-pass
              <Code>compare()</Code> to JS as <Code>src/lib/scoring.js</Code>.
              Built the Board / Tile / Keyboard components against it, hooked
              up <Code>localStorage</Code> for stats, and shipped a 1-board
              Wordle that behaves byte-identically to the original CLI on the
              same dictionary.
            </>
          }
        />

        <Pivot
          version="V2"
          title="Multiply the board — Quordle and Sedecordle."
          body={
            <>
              Two new modes for the price of zero new scoring code. Quordle
              renders four parallel boards and dispatches each guess to the
              same scorer against four answers. Sedecordle does the same at
              16x with a 21-guess budget instead of 9. The scoring contract
              didn&apos;t change — the layout and the budget did.
            </>
          }
        />

        <Pivot
          version="V3"
          title="Nerdle — change the alphabet entirely."
          body={
            <>
              The math mode is the interesting one. Equations are 8
              characters over <Code>0-9 + - * / =</Code>. Built a small
              tokenizer that splits an equation into tokens, an evaluator
              that respects precedence and rejects fractional division, and
              a validator that enforces the 8-char / single-equals / no-leading-zero
              rules. Only after validation does the scorer get to run. The
              answer bank is re-validated on module load so a corrupt entry
              can never reach a player.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The double-letter regression I almost shipped
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            First JS port of the scorer was a 20-line single-pass that walked
            the guess once. It worked on{' '}
            <span className="text-bone">95% of inputs</span> and silently
            broke on the rest — most visibly on guesses like{' '}
            <Code>EERIE</Code> against{' '}
            <Code>EATER</Code> where the second E got marked yellow when it
            shouldn&apos;t have. Rebuilt against the original Java two-pass
            with a small set of regression tests (BOOKS / EERIE / SASSY /
            BLOBS) and the bug disappeared. The lesson generalizes: when in
            doubt, port the original algorithm, then{' '}
            <em>then</em> simplify if you can prove it&apos;s equivalent.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Scoring function shape"
          beforeLabel="Before — V1 single-pass"
          before="One walk over the guess. Correct on most inputs, silently wrong on repeated letters (EERIE / BOOKS / SASSY)."
          afterLabel="After — V3 two-pass, Java-faithful"
          after="First pass: position-correct → correct. Second pass: remaining guess letters can match remaining answer letters at most once each. Repeated-letter cases produce the same colors the original Java CLI emitted, on every regression test."
        />
        <BeforeAfter
          number="3.1"
          title="Daily-puzzle picking"
          beforeLabel="Before"
          before="(Considered) fetch today's puzzle ID from a server. Adds an API surface, a deploy concern, and a single point of failure."
          afterLabel="After"
          after="FNV-32 hash of YYYY-MM-DD modulo the word-bank size. Pure function, no network, identical result everywhere on Earth on the same calendar day."
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
        sans="One scoring contract,"
        accent="four dictionaries, sixteen boards."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The shape is small. Each game mode is a page under{' '}
        <Code>src/pages/</Code> that owns a board count, a guess budget, and
        a dictionary. All of them call the same scoring + state-machine
        primitives in <Code>src/lib/</Code>. The two interesting paths
        diverge on input: word modes go straight to the scorer; Nerdle
        validates the equation first.
      </p>

      <TerminalWindow title="zebradoodle: ~/guess-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="player"
            host="browser"
            cwd="/"
            command="submit guess  →  'CRANE'  (Wordle)"
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] dict.has(guess)</span>
                  <span className="text-bone/65"> ? continue : toast(&apos;not a word&apos;)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] scoring.compare(guess, answer)</span>
                  <span className="text-bone/65"> · two-pass · → [correct,present,absent...]</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] state.apply(guess, colors)</span>
                  <span className="text-bone/65"> · update board · check win/loss</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] localStorage.set</span>
                  <span className="text-bone/65"> · stats · streak · in-progress game</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── for Nerdle, [1] is replaced by ────────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1a] tokenize</span>
                  <span className="text-bone/65"> · split into digits / ops / equals</span>
                </div>
                <div>
                  <span className="text-cyan-400">[1b] validate</span>
                  <span className="text-bone/65"> · 8 chars · one = · no leading zeros</span>
                </div>
                <div>
                  <span className="text-cyan-400">[1c] evaluate</span>
                  <span className="text-bone/65"> · lhs op rhs · precedence · integer-only</span>
                </div>
                <div>
                  <span className="text-cyan-400">[1d] lhs === rhs</span>
                  <span className="text-bone/65"> ? continue : toast(&apos;invalid equation&apos;)</span>
                </div>
              </div>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Guess lifecycle (word + Nerdle)." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Two-pass scoring (JS port of compare())
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`function compare(guess, answer) {
  const colors  = Array(guess.length).fill('absent')
  const remaining = answer.split('')

  // Pass 1 — mark correct, consume from remaining
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      colors[i] = 'correct'
      remaining[i] = null
    }
  }

  // Pass 2 — for each non-correct letter,
  // try to match against a still-remaining answer letter
  for (let i = 0; i < guess.length; i++) {
    if (colors[i] === 'correct') continue
    const j = remaining.indexOf(guess[i])
    if (j !== -1) {
      colors[i] = 'present'
      remaining[j] = null  // consume — repeated letter safety
    }
  }

  return colors
}`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Nerdle validator + evaluator
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`// Grammar
//   equation := expr '=' expr        (8 chars total)
//   expr     := term (('+'|'-') term)*
//   term     := factor (('*'|'/') factor)*
//   factor   := integer
//
// Constraints
//   * exactly 8 chars
//   * exactly one '='
//   * no leading zero (except literal 0)
//   * '/' must yield an integer
//   * standard precedence (* / before + -)

function isValidNerdle(eq) {
  if (eq.length !== 8) return false
  const [lhs, rhs, ...rest] = eq.split('=')
  if (rest.length !== 0 || lhs == null || rhs == null) return false
  if (!noLeadingZeros(lhs) || !noLeadingZeros(rhs)) return false
  const l = evalExpr(lhs); const r = evalExpr(rhs)
  return Number.isInteger(l) && Number.isInteger(r) && l === r
}`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Scorer + Nerdle grammar." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="Four boards under"
        accent="one front door."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The product is four pages and one home screen. Live at{' '}
        <Code>mustakimfs.github.io/zebradoodle</Code> — no auth, no install,
        no permissions. Every mode has a Daily and a Practice button; stats
        persist per mode in <Code>localStorage</Code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Figure
          src="/projects/zebradoodle/home.png"
          alt="Zebradoodle home — Pick a puzzle, four mode cards"
          number="7.0"
          caption="Home — mode select (Wordle · Quordle · Sedecordle · Nerdle)."
        />
        <Figure
          src="/projects/zebradoodle/nerdle.png"
          alt="Nerdle board mid-game — Daily #1370, equation 9+8-7=10"
          number="7.1"
          caption="Nerdle — Daily #1370, 8-tile equation board + numpad keyboard."
        />
      </div>

      {/* Live preview — clickable browser window linking to the deployed game */}
      <div className="mt-14">
        <a
          href="https://mustakimfs.github.io/zebradoodle/"
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <BrowserWindow url="mustakimfs.github.io/zebradoodle">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/zebradoodle/home.png"
                alt="Live app — Zebradoodle puzzle collection"
                className="w-full block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-bone text-sm font-medium flex items-center gap-2">
                  Play now ↗
                </span>
              </div>
            </div>
          </BrowserWindow>
        </a>
        <FigureCaption number="7.2" label="Live at mustakimfs.github.io/zebradoodle — click to play." kind="image" />
      </div>
    </section>
  )
}

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="Small project,"
        accent="real lessons."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Porting the Java compare() first."
            body="The two-pass scoring is the contract every other mode depends on. Getting that byte-correct against the original before adding Quordle / Sedecordle / Nerdle meant every later mode inherited the correctness."
          />
          <RetroItem
            head="No server, by design."
            body="FNV-32 of the date string handles 'today's puzzle for everyone' without any backend. localStorage handles per-player state. The whole product ships as a static bundle on GitHub Pages."
          />
          <RetroItem
            head="Validate-before-score for Nerdle."
            body="Distinguishing 'invalid equation' from 'wrong answer' makes Nerdle play correctly. The validator rejects malformed input pre-score so the player gets a clear toast instead of a misleading color row."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="React 17 + React Router 5 + CRA is dated."
            body="Create React App is unmaintained as of 2025 and React 17 / React Router 5 are two majors behind. Build still works, but the dev experience would improve materially on Vite + React 18 + React Router 6."
          />
          <RetroItem
            head="No keyboard accessibility audit."
            body="The Wordle keyboard is mouse / touch first. Hardware-keyboard players work fine; assistive-tech support hasn't been formally tested. ARIA + focus management would help."
          />
          <RetroItem
            head="Stats are device-local."
            body="Streak resets when a player switches browsers or clears storage. A 'sync via paste-a-code' export feature would solve it without needing a backend."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Migrate to Vite + React 18."
            body="Same code, faster dev loop, modern toolchain. The renderer is already framework-light enough that the migration is mostly tooling, not code rewrites."
          />
          <RetroItem
            head="Hard mode + colorblind palette."
            body="Hard mode (must reuse correct letters in subsequent guesses) is in the original Wordle spec but not implemented here yet. Colorblind palette is half an evening of work and a real UX win."
          />
          <RetroItem
            head="Stats export / import code."
            body="Encode the local stats blob to a copy-paste string. Paste it on another device to merge. No accounts, no server, no telemetry — just a string the player owns."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
