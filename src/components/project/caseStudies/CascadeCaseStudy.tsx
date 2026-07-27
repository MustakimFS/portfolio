/**
 * Cascade, full case-study body.
 *
 * Graph Intelligence Platform (in active development, June 2026). All numbers
 * below are real and verifiable from the project's evaluation harness, ADRs,
 * and persisted artifacts. Final Designs uses real captures of the live
 * Cascade Console (public/projects/cascade/).
 */
"use client"

import type { ReactNode } from 'react'
import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { TerminalWindow, TerminalLine, CodeEditorWindow } from '@/components/windows'
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

export const CASCADE_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function CascadeCaseStudy() {
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
        sans="The graph grows itself."
        accent="The forecaster stays honest."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Full-stack architect · sole engineer" />
        <p className="text-bone-muted">
          Designed and built the entire stack: a schema-driven Python backend
          (<span className="text-bone">FastAPI</span>, LightGBM, a PyTorch GNN,
          NetworkX), a leak-free evaluation harness, and an interactive{' '}
          <span className="text-bone">Next.js</span> graph workspace with a
          force-directed canvas and background training jobs. Solo build.
        </p>

        <Meta
          label="Stack"
          value="Python · FastAPI · LightGBM · PyTorch · NetworkX · scikit-learn · Next.js · APScheduler · Ollama / NVIDIA NIM / Anthropic"
        />
        <p className="text-bone-muted">
          Cascade is a domain-agnostic{' '}
          <span className="text-bone">graph intelligence platform</span>. Given
          any networked entity, it builds a living knowledge graph of everything
          that influences it, trains quantile forecasters on that graph,
          validates them out-of-sample, and writes a structured decision brief
          automatically. Every node type, edge type, prediction target, and UI
          panel is declared in YAML, so a new domain is a config file, not a
          code change.
        </p>

        <Meta label="Timeline" value="~4 weeks active · June 2026 · in development" />
        <p className="text-bone-muted">
          The thesis is that a decision scientist&apos;s weekly workflow
          (refresh the influence model, re-fit forecasters, validate, brief
          stakeholders) is{' '}
          <span className="italic font-serif text-bone">
            fully automatable if you build it right.
          </span>{' '}
          Cascade ships three production worlds (an 86-node equity and macro
          market graph, a logistics hub network, and a stock-equity demo) and an
          autonomous analyst loop that runs the whole pipeline on a schedule. No
          public launch yet; built toward a decision-science portfolio review.
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
        sans="Graph-aware forecasting,"
        accent="evaluated honestly."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Cascade built the infrastructure for leak-free, graph-aware time-series
        forecasting and automated the full decision-science loop: expand the
        influence graph, retrain, backtest, and write the brief, as a scheduled
        pipeline. The headline result is measured inside the disruption window
        where graph context is supposed to help, and reported exactly where it
        does not. Every design decision is captured across 22 architecture
        decision records.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="7-19%" label="MAE reduction" sub="logistics, h=1-4 · vs own-history baseline" />
        <MetricTile value="210,475" label="Training bars" sub="10-year lookback · 86 nodes" />
        <MetricTile value="52 → 78%" label="Band coverage" sub="raw → conformal-calibrated" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Graph context earns its place, per domain.">
          On the logistics network, graph-structure features cut short-horizon
          error by 7-19% (h=1-4), decaying back to the baseline at longer
          horizons exactly as disruption-propagation theory predicts. On daily
          equities it does not: in 0 of 18 target evaluations did a graph
          configuration beat the own-history baseline. Graph structure helped
          logistics, not markets, and that negative result ships in the report
          instead of being hidden.
        </Point>
        <Point title="LightGBM over the GNN, on the evidence.">
          Head-to-head on logistics, gradient-boosted trees beat the temporal
          GNN (<Code>0.098</Code> vs <Code>0.151</Code> MAE), so LightGBM stays
          the default and the GNN is the long-train path, not the headline.
          Every result runs through purged, embargoed time-series
          cross-validation.
        </Point>
        <Point title="Honest uncertainty, not false confidence.">
          Raw LightGBM <Code>q10</Code>/<Code>q90</Code> bands were badly
          overconfident (52% coverage against an 80% target). Conformalized
          Quantile Regression with purged calibration slices brought that to
          71-78% across multi-window evaluation. Forecasts now ship a band you
          can trust.
        </Point>
        <Point title="A workflow, not a demo.">
          The autonomous analyst loop wires every component into one scheduled
          pipeline (<Code>expand → retrain → backtest → forecast → brief →
          persist</Code>) so a dated decision brief appears with zero human
          intervention.
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
        sans="Most forecasting demos quietly"
        accent="train on the future."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Logistics and decision-science teams run manual weekly cadences: someone
        pulls data from several sources, engineers features, fits a model,
        eyeballs a backtest, and writes a stakeholder brief. There is no standard
        tooling for it. Meanwhile most portfolio projects in this space commit
        the same sin: they shuffle time-series rows, test on data the model has
        effectively already seen, and quote accuracy numbers that collapse under
        honest evaluation. The gap is an automated, rigorous platform that tells
        the truth about what graphs actually help predict.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="Lopez de Prado · Advances in Financial ML (2018)"
          quote="Purge and embargo your folds, or your backtest is fiction."
          context="The book that put purged k-fold CV into practitioners' vocabulary. It directly motivates Cascade's purged chronological split."
        />
        <QuoteCard
          source="Kaggle M5 Forecasting · 42M rows (2020)"
          quote="Gradient-boosted trees beat every deep model on tabular forecasting."
          context="Public winning write-ups validate the GBM-first framing; the GNN stays the long-train path, not the default."
        />
        <QuoteCard
          source="ML practitioner forums · time-series + overfitting"
          quote="My LSTM crushes the backtest but dies live."
          context="Dozens of threads where random splits on time-series silently leak the future. The default failure mode this project refuses to ship."
          spanFull
        />
      </div>
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="Build it so the truth is"
        accent="cheaper than the lie."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Five constraints shaped every architectural decision. The hard one is
        the second: honest evaluation had to be the path of least resistance, or
        it would quietly erode the first time a number looked disappointing.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        <ConstraintCard
          n="1"
          title="Zero domain hardcoding"
          body={
            <>
              Every entity (a stock, a hub, a macro indicator) is schema-defined.
              Adding a new world is a YAML file, never a Python change. The
              schema is the contract.
            </>
          }
        />
        <ConstraintCard
          n="2"
          title="Honest evaluation, non-negotiable"
          body={
            <>
              No random train/test splits. All results use purged chronological
              splits; any claim of skill must clear a Pesaran-Timmermann
              significance test.
            </>
          }
        />
        <ConstraintCard
          n="3"
          title="Free-tier data only"
          body={
            <>
              Public data sources for personal research, no paid API budget.
              Every edge weight is a measured trailing correlation, not a model
              assumption.
            </>
          }
        />
        <ConstraintCard
          n="4"
          title="Simultaneous multi-entity access"
          body={
            <>
              The API serves concurrent worlds (stocks and freight at once)
              without one tab freezing another. Heavy CPU work runs in{' '}
              <Code>asyncio.to_thread</Code> with per-entity locks.
            </>
          }
        />
        <ConstraintCard
          n="5"
          title="LLM provider portability"
          body={
            <>
              Keys live in the server environment, never the browser. The client
              swaps Ollama, NVIDIA NIM, and Anthropic at runtime without a
              restart.
            </>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Graph context earns its place"
          body="If the graph does not improve the forecast in a domain, that result is reported, not buried. The honest finding is in the portfolio."
        />
        <PrincipleCard
          title="Automation must be auditable"
          body="Every number in an LLM-written brief is derived from the backtester. The model narrates structured output; it cannot invent a figure."
        />
        <PrincipleCard
          title="Data, not compute, moves accuracy"
          body="The architecture makes the 'more data' lever (longer history, more nodes, finer frequency) the easiest thing to pull."
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
        sans="Four pivots, each one"
        accent="a result I didn't want."
        size="md"
        className="mb-10"
      />

      <div className="space-y-8 mb-14">
        <Pivot
          version="V1"
          title="The suspiciously clean number"
          body={
            <>
              The first ablation used random row shuffles and reported an 11.4%
              MAE improvement on logistics. Too clean. The diagnosis: training on
              the future, testing on the past. Switching to purged chronological
              evaluation everywhere dropped it to an honest 4.4% overall (7-19%
              at short horizons). A weaker number, a far stronger story.
            </>
          }
        />
        <Pivot
          version="V2"
          title="Node2Vec memorized instead of generalizing"
          body={
            <>
              Adding 128-dim structural embeddings to the 11-node stock model
              measurably degraded out-of-sample performance on FDX. With that
              few nodes, the embeddings memorize node identity. Fix: a
              schema flag, <Code>use_embeddings: false</Code> for small graphs,
              on for the 60+ node logistics network where structural roles
              actually generalize.
            </>
          }
        />
        <Pivot
          version="V3"
          title="What does my trained model actually know?"
          body={
            <>
              Users training models had no visibility into what was trained. I
              added a <Code>model_info</Code> endpoint and a Model card in the UI
              showing family, profile, tree count, calibration method, coverage,
              and a top-feature importance chart. An invisible process became an
              inspectable artifact.
            </>
          }
        />
        <Pivot
          version="V4"
          title="From pieces to a pipeline"
          body={
            <>
              Every component existed in isolation: living graph, retrained
              models, backtester, LLM client. Wiring them into a scheduled{' '}
              <Code>analyst_loop</Code> (expand, retrain, backtest, forecast,
              brief, persist) is the moment the project went from an interesting
              demo to something that replaces a human workflow.
            </>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <BeforeAfter
          number="5.0"
          title="Calibration"
          before="Raw q10/q90 bands at 52% coverage. Falsely tight, overconfident."
          after="CQR-calibrated to 71-78% coverage. Honest uncertainty."
        />
        <BeforeAfter
          number="5.1"
          title="Capability matrix"
          before="Every entity showed Optimize, Shock, Seed, Expand. Clutter."
          after="Schema-driven tabs: logistics shows Optimize, equities do not."
        />
        <BeforeAfter
          number="5.2"
          title="Training depth"
          before="42,945 bars, 2-year lookback. One regime."
          after="210,475 bars, 10-year lookback across multiple regimes."
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
        sans="One pipeline, declared in"
        accent="YAML, run on a schedule."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Data flows in one direction: a YAML schema drives a feature builder over
        the graph, a quantile model, conformal calibration, a purged backtester,
        and finally the analyst loop that narrates the result. Swap the schema
        and the same pipeline retargets to a new domain.
      </p>

      <div className="space-y-4 mb-10 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Schema engine.">
          <Code>EntitySchema.from_dict</Code> turns a YAML file into node types,
          edge types, prediction targets, capabilities, and UI panels. Zero
          domain logic lives in Python.
        </Point>
        <Point title="Feature builder + graph context.">
          Per-node time series joined with graph-structure features and (above a
          size gate) Node2Vec embeddings. Edge weights are measured trailing
          correlations.
        </Point>
        <Point title="Forecast + calibrate.">
          LightGBM quantile models (<Code>q10</Code>/<Code>q50</Code>/
          <Code>q90</Code>) wrapped in Conformalized Quantile Regression, with a
          PyTorch temporal GNN as the long-train path.
        </Point>
        <Point title="Backtest + brief.">
          A purged chronological, multi-window backtester with PT significance,
          feeding an LLM that narrates strictly from structured output.
        </Point>
      </div>

      <div className="space-y-6">
        <div>
          <CodeEditorWindow filename="schemas/logistics.yaml" language="yaml" showLineNumbers={false}>
            <pre className="text-[12.5px] leading-[1.6] m-0 font-mono">
              <code>
                <Y c="# Adding a domain is config, not code.">{'\n'}</Y>
                <K>entity</K>
                <P>: </P>
                <S>logistics_network</S>
                {'\n'}
                <K>node_types</K>
                <P>: [</P>
                <S>hub</S>
                <P>, </P>
                <S>lane</S>
                <P>, </P>
                <S>carrier</S>
                <P>, </P>
                <S>weather</S>
                <P>, </P>
                <S>fuel</S>
                <P>]</P>
                {'\n'}
                <K>edge_types</K>
                <P>: [</P>
                <S>feeds</S>
                <P>, </P>
                <S>delays</S>
                <P>, </P>
                <S>correlates</S>
                <P>]</P>
                {'\n'}
                <K>target</K>
                <P>: </P>
                <S>delay_hours</S>
                {'\n'}
                <K>use_embeddings</K>
                <P>: </P>
                <V>true</V>
                <Y c="   # 60+ nodes, roles generalize">{''}</Y>
                {'\n'}
                <K>capabilities</K>
                <P>: [</P>
                <S>forecast</S>
                <P>, </P>
                <S>backtest</S>
                <P>, </P>
                <S>optimize</S>
                <P>]</P>
              </code>
            </pre>
          </CodeEditorWindow>
          <FigureCaption number="6.0" label="Zero-hardcoding: a world is a YAML file." kind="diagram" />
        </div>

        <div>
          <TerminalWindow title="cascade@analyst: ~/core/analyst_loop.py">
            <div className="space-y-1.5">
              <TerminalLine command="cascade run-cycle --world logistics_network" />
              <TerminalLine output={<span className="text-bone-muted">[1/6] expand     graph 86 → 88 nodes, 167 → 171 edges</span>} />
              <TerminalLine output={<span className="text-bone-muted">[2/6] retrain    LightGBM quantile · 780 trees · 44.5s</span>} />
              <TerminalLine output={<span className="text-bone-muted">[3/6] backtest   purged · multi-window · PT p=0.03</span>} />
              <TerminalLine output={<span className="text-bone-muted">[4/6] forecast   h=1-4 · MAE -12.7% vs baseline</span>} />
              <TerminalLine output={<span className="text-bone-muted">[5/6] brief      narrated from structured output</span>} />
              <TerminalLine output={<span className="text-emerald-300/80">[6/6] persist    reports/2026-06-16-logistics.md ✓</span>} />
            </div>
          </TerminalWindow>
          <FigureCaption number="6.1" label="The autonomous analyst loop, one scheduled cycle." kind="diagram" />
        </div>
      </div>
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="The workspace,"
        accent="end to end."
        size="md"
        className="mb-6"
      />
      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        The live Cascade Console: the influence graph, the node inspector with
        causal edge metadata, the model and backtest panels, the autonomous
        analyst loop, and the provider settings that keep it portable.
      </p>

      <div className="grid grid-cols-1 gap-10">
        <Figure
          src="/projects/cascade/graph-canvas.png"
          alt="Markets knowledge graph with the AMZN node inspector open, showing degree, news sentiment, and leading-edge causal metadata (SPY to AMZN, granger_p 0.0002, causal_support true)"
          number="7.0"
          caption="Markets graph (86 nodes), AMZN inspector with leading-edge causal metadata."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Figure
            src="/projects/cascade/backtest-panel.png"
            alt="FDX node inspector with 168-hour price history and the backtest tab showing the LightGBM plus deep GNN training panel"
            number="7.1"
            caption="Node inspector, price history, and the LightGBM + GNN training panel."
          />
          <Figure
            src="/projects/cascade/reports-page.png"
            alt="Analyst reports page: the autonomous expand-retrain-backtest-forecast-brief loop with a dated brief and an out-of-sample backtest table"
            number="7.2"
            caption="Autonomous analyst loop: dated brief, honest summary, out-of-sample backtest."
          />
        </div>
        <Figure
          src="/projects/cascade/graph-expansion.gif"
          alt="Expanding the influence graph: new nodes and edges animate into the force-directed canvas"
          number="7.3"
          caption="Expanding the graph: new nodes and edges animate onto the force-directed canvas."
        />
        <Figure
          src="/projects/cascade/settings-drawer.png"
          alt="Settings drawer with runtime LLM provider switching between Ollama, NVIDIA NIM, and Anthropic, and data connectors read from .env"
          number="7.4"
          caption="Runtime provider switching (Ollama / NVIDIA NIM / Anthropic); keys live in .env, never the browser."
        />
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
        sans="The negative result became"
        accent="the credibility."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <RetroColumn title="What worked">
          <RetroItem
            head="Schema-driven everything"
            body="Putting all domain knowledge in YAML from day one is what kept the project coherent as it grew. Adding the third world took a config file and one restart, zero code."
          />
          <RetroItem
            head="Honest results as the story"
            body="The finding that the graph does not beat the baseline on daily equity direction became the differentiating claim: the backtests are leak-free enough to rediscover market efficiency, which is exactly what a trustworthy evaluation should find."
          />
          <RetroItem
            head="The autonomous analyst loop"
            body="Wiring existing pieces into a scheduled pipeline with a dated, persisted brief turned the project from an interesting demo into something that replaces a workflow."
          />
        </RetroColumn>

        <RetroColumn title="What I'd do differently">
          <RetroItem
            head="Multi-window backtests from the start"
            body="A single-split result in one trend regime looked encouraging but was misleading. The honest multi-window evaluation was far flatter and took two iterations to retire the optimistic single-split view; on daily equity direction the result is statistically indistinguishable from chance, which is the correct finding to report rather than a headline."
          />
          <RetroItem
            head="Concurrency model up front"
            body="The asyncio.to_thread + per-entity lock design was retrofitted into six endpoints after concurrent tabs froze each other. It should have been in the first route."
          />
          <RetroItem
            head="Gate embeddings earlier"
            body="A use_embeddings: false default below ~40 nodes would have prevented the -9.8pp FDX regression entirely."
          />
        </RetroColumn>
      </div>

      <div className="bg-ink-raised border border-ink-border rounded-xl p-6 max-w-3xl">
        <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-2 font-mono">
          One surprise
        </div>
        <p className="text-bone-muted text-[14.5px] leading-relaxed">
          The lead-lag feature shift made the forecast{' '}
          <span className="text-bone">worse</span>. The Granger engine correctly
          recovers planted structure on synthetic logistics data (including a
          3-hour weather-to-delay lead), but using that discovered lag to shift
          each neighbor&apos;s signal dropped the logistics improvement from 4.21%
          to 2.64%. A node&apos;s composite signal averages attributes with
          different natural lags, so one global shift misaligns the rest. Causal
          discovery is valuable as edge metadata; exploiting it in predictions
          needs per-attribute lagged features, not a single composite shift. The
          gap between &ldquo;causally discovered&rdquo; and &ldquo;predictively
          useful&rdquo; was the biggest technical surprise of the project.
        </p>
      </div>
    </section>
  )
}

// ── Tiny YAML syntax helpers (scoped to this file) ─────────────────────────

function K({ children }: { children: ReactNode }) {
  return <span className="text-[#8aa0ff]">{children}</span>
}
function S({ children }: { children: ReactNode }) {
  return <span className="text-[#9bd6a0]">{children}</span>
}
function V({ children }: { children: ReactNode }) {
  return <span className="text-[#e0a96d]">{children}</span>
}
function P({ children }: { children: ReactNode }) {
  return <span className="text-bone-dim">{children}</span>
}
function Y({ c, children }: { c: string; children?: ReactNode }) {
  return (
    <span className="text-bone-faint italic">
      {c}
      {children}
    </span>
  )
}
