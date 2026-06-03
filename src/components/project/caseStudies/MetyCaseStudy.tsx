/**
 * METY Legal Chatbot — full case-study body.
 *
 * Replaces the generic placeholder template for this one project. Mounted by
 * `app/projects/[slug]/page.tsx` when the slug resolves via PROJECT_REGISTRY.
 *
 * Sections (each <section id="…"> matches an entry in `SECTIONS` below so the
 * sticky CaseStudySidebar can highlight the active one):
 *   overview · highlights · context · problem · process · architecture · final · retro
 */
"use client"

import { useState, useRef } from 'react'
import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { TerminalWindow, TerminalLine } from '@/components/windows'

export const METY_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function MetyCaseStudy() {
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
        sans="What it is,"
        accent="and why I built it."
        size="md"
        className="mb-8"
      />

      {/* Original placeholder layout: 3 rows × 2 columns.
          Left cell = Meta (label above value). Right cell = a paragraph that
          describes that row's facet. Keeps the role / stack / timeline
          lookup-able while still reading like prose. */}
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta
          label="My Role"
          value="AI Pipeline Architect"
        />
        <p className="text-bone-muted">
          Sole engineer on the QnA backend, FSPR knowledge-profiling system, rolling
          summarization, document-generation feature, and production architecture
          across 7 sprints on a 6-person team. Rebuilt a 6-node LangGraph pipeline
          into a privacy-first 5-node topology, cut per-query LLM cost{' '}
          <span className="text-bone">82%</span> ($0.024 → $0.0044), and added
          implicit{' '}
          <span className="italic font-serif text-bone">Most Critical Gap</span>{' '}
          targeting on every response with zero user-facing latency.
        </p>

        <Meta
          label="Stack"
          value="Django · FastAPI · LangGraph · Qdrant · MongoDB · GPT-4o / 4o-mini · spaCy · React"
        />
        <p className="text-bone-muted">
          Two-layer architecture: Django owns state and data, FastAPI is stateless
          and has zero database credentials. The 5-node LangGraph pipeline runs RAG
          → Extraction → Anonymization → Reasoning → Formatter; FSPR profiling and
          rolling summarization fire as background daemon threads after every
          response so the user never waits for them.
        </p>

        <Meta
          label="Timeline"
          value="Jan → May 2026 · 7 sprints"
        />
        <p className="text-bone-muted">
          Sponsor engagement with{' '}
          <span className="text-bone">MyEdMaster</span> — they had already beaten
          ChatGPT on a benchmark with their health chatbot and wanted the same
          result for a legal product. Shipped end of May 2026, handed to a
          continuation team, demoed at the ASU SER517 Innovation Showcase. No
          public deployment — IP belongs to MyEdMaster under signed NDA.
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
        sans="METY in three modes,"
        accent="one knowledge profile."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Rebuilt a 6-node LangGraph pipeline into a privacy-first, cost-optimized{' '}
        <span className="text-bone">5-node architecture</span> that serves personalized
        legal guidance across three user modes, cutting per-query LLM cost by{' '}
        <span className="text-bone">82%</span> while adding implicit FSPR knowledge
        profiling on every message with{' '}
        <span className="text-bone">zero user-facing latency impact</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile
          value="82%"
          label="LLM cost reduction"
          sub="$0.024 → $0.0044 / message"
          color="cyan"
        />
        <MetricTile value="5" label="Pipeline nodes" sub="down from 6, linear" color="cyan" />
        <MetricTile value="4 × 20" label="FSPR × topics" sub="profiled implicitly" color="cyan" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="82% LLM cost reduction.">
          Removed the clarification node (one full GPT-4o call that fired
          unconditionally on every message), switched FSPR inference and summarization
          from GPT-4o to GPT-4o-mini (17× cheaper). Old: ~$0.024/msg (3 GPT-4o calls).
          New: ~$0.0044/msg (1 GPT-4o + 2 GPT-4o-mini background).
        </Point>
        <Point title="5-node linear pipeline.">
          RAG → Extraction → Anonymization → Reasoning → Formatter. Each node reads
          from a typed <Code>LegalChatState</Code> dict and writes back partial updates
          that LangGraph merges automatically.
        </Point>
        <Point title="4-dimension FSPR profiling across 20 legal topics.">
          Facts · Strategies · Procedures · Rationales. Built implicitly via async
          background inference on every message — daemon thread fires{' '}
          <em>after</em> the HTTP response is returned so the user never waits for
          profiling.
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
        sans="Legal help is"
        accent="inaccessible for most people."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Options were: pay <span className="text-bone">$300/hour</span> for a lawyer,
        search generic legal websites that assume zero or complete knowledge, or use a
        generic chatbot that gives the same answer regardless of background. No
        existing tool profiled legal knowledge at an individual level and targeted
        responses to close specific knowledge gaps. LegalZoom and Rocket Lawyer are
        form-fillers, not educators.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="r/legaladvice — pinned post"
          quote="We are not your lawyers. Advice here is general. Your situation may be completely different."
          context="4.2M members · generic answers by design"
        />
        <QuoteCard
          source="John Leddo (sponsor) — LinkedIn, Jan 2026"
          quote="A big thanks to our PR person Tony Berry who got our latest chatbot success story (our health chatbot greatly outperformed ChatGPT) featured in 30 newspapers."
          context="Direct sponsor signal — benchmark beat was the target"
        />
        <QuoteCard
          source="Stanford Access to Justice Tech Review · 2023"
          quote="86% of civil legal problems reported by low-income Americans receive inadequate or no legal help."
          context="Market size signal"
        />
        <QuoteCard
          source="LangChain GitHub — context-management issues"
          quote="Long-session coherence is the recurring developer pain — context windows blow out, history gets truncated."
          context="Exactly the problem rolling summarization solves"
        />
        <QuoteCard
          source="OpenAI API community"
          quote="There's no application-layer way to signal what a user already knows."
          context="FSPR addresses this directly"
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
        sans="Six engineers, seven sprints,"
        accent="and six hard constraints."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="NDA-bound deliverable"
          body="All IP belongs to MyEdMaster per signed agreement. Nothing proprietary can be disclosed publicly."
          color="amber"
        />
        <ConstraintCard
          n="2"
          title="6 engineers, 7 two-week sprints"
          body="Features scoped and delivered in strict cycles with sponsor review after each sprint."
          color="amber"
        />
        <ConstraintCard
          n="3"
          title="OpenAI API cost pressure"
          body="Every additional LLM call had to be justified. The clarification node was killed specifically because it fired even when no clarification was needed."
          color="amber"
        />
        <ConstraintCard
          n="4"
          title="No existing legal corpus"
          body="RAG KB built from scratch. Documents chunked at 1200 chars / 200 token overlap, embedded with legal-bert (768d), indexed in Qdrant with payload indexes for domain + jurisdiction filtering."
          color="amber"
        />
        <ConstraintCard
          n="5"
          title="PII in every user input"
          body="Users share real legal situations — names, addresses, financial details. spaCy en_core_web_lg anonymization was required before every LLM call. No exceptions."
          color="amber"
        />
        <ConstraintCard
          n="6"
          title="Local-only deployment"
          body="No cloud budget. Full stack on Docker Compose — but architected to lift cleanly into production whenever the sponsor wanted."
          color="amber"
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Stateless AI layer"
          body="FastAPI holds no state. Django decides what context to send and what to store. Never violated regardless of the shortcut it might offer."
        />
        <PrincipleCard
          title="Zero user-facing latency for enrichment"
          body="FSPR and summarization fire after the HTTP response is sent. The user never waits for knowledge profiling."
        />
        <PrincipleCard
          title="Anonymize before LLM, always"
          body="No modes or exceptions where real PII reaches OpenAI. Anonymization is a data-provenance question, not a node decision."
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
        sans="Three pivots that earned"
        accent="every dollar back."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Killing the clarification node."
          body={
            <>
              The original pipeline had a dedicated clarification node that ran before
              reasoning on every message, using GPT-4o to decide whether to ask a
              clarifying question — but it fired{' '}
              <span className="text-bone">unconditionally</span>, even when the query
              was completely clear. Removed entirely in Sprint 6, flattening the
              pipeline to 5 nodes. Lawyer-style probing was rebuilt inline in the
              reasoning prompt instead. This was the single biggest cost reduction —
              one full GPT-4o call eliminated per message.
            </>
          }
          color="emerald"
        />

        <Pivot
          version="V2"
          title="submit_self_assessment running 4 LLM calls per submission."
          body={
            <>
              The self-assessment evaluation was running KB fetch, AI evaluate call,
              and MongoDB persist <em>inside a for-loop</em> iterating over the four
              FSPR dimensions. Each operation executed four times per submission.
              Caught during Sprint 5 testing when the API bill for a single session was
              4× expected. All three operations moved outside the loop — KB fetched
              once, evaluation called once with all four dimensions passed together,
              persisted once.
            </>
          }
          color="emerald"
        />

        <Pivot
          version="V3"
          title="Document generation producing anonymized names."
          body={
            <>
              The first document-generation attempt produced PDFs with{' '}
              <span className="text-bone">fictional party names</span> because{' '}
              <Code>conversation_summary</Code> (which had passed through the
              anonymization node) was used as context. Fix: pull raw message content
              directly from the <Code>Message</Code> model before anonymization runs,
              bypassing the anonymized summary entirely. Real names appeared
              immediately.
            </>
          }
          color="emerald"
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The JSON code-fence bug
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            In Sprint 7 testing, <Code>ready_to_generate</Code> kept returning false at
            the Django layer even though the AI service was correctly setting it to
            true. Three hours of debugging traced it to the LLM wrapping its JSON
            response in markdown code fences (
            <Code>```json</Code>), causing the JSON parser to fail silently and fall
            through to a raw-text fallback that had no <Code>ready_to_generate</Code>{' '}
            field. Fix: regex strip of code fences before JSON parsing plus a JSON
            extraction fallback using{' '}
            <Code>re.search(r&apos;{'{[\\s\\S]*}'}&apos;, raw)</Code> for mixed-content
            responses.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Pipeline topology"
          beforeLabel="Before — 6 nodes"
          before="Conditional clarification branch firing GPT-4o on every message regardless of necessity."
          afterLabel="After — 5 linear nodes"
          after="RAG → Extraction → Anonymization → Reasoning → Formatter. Lawyer-style probing inline in the reasoning prompt."
          color="emerald"
        />
        <BeforeAfter
          number="3.1"
          title="Per-message cost"
          beforeLabel="Before"
          before="~$0.024 / message · 3 full GPT-4o calls (reason + clarify + history-summarize)"
          afterLabel="After"
          after="~$0.0044 / message · 1 GPT-4o (reason) + 2 GPT-4o-mini background (FSPR + summarize)"
          color="emerald"
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
        sans="State, pipeline, and"
        accent="the algorithms behind it."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The full request lifecycle from browser to response — Django preprocesses
        every message (sanitize via <Code>bleach</Code>, fetch context via{' '}
        <Code>tiktoken</Code> token count, build <Code>user_context</Code>), calls
        FastAPI <Code>/query</Code>, the 5-node LangGraph pipeline runs, the response
        returns, Django persists the LLM message to MongoDB, and{' '}
        <span className="text-bone">two daemon threads</span> fire — one for FSPR
        inference, one for token-aware summarization. Both call GPT-4o-mini and never
        block the user.
      </p>

      {/* Request lifecycle — terminal-style breakdown */}
      <TerminalWindow title="mety: ~/request-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="browser"
            host="client"
            cwd="/chat"
            command='POST /api/chat/{userId}/{chatId}/messages  { "content": "..." }'
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── Django layer ───────────────────────────────────────
              </span>
            }
          />
          <TerminalLine command="sanitize(bleach) → tokenize(tiktoken) → fetch_user_context()" />
          <TerminalLine command="POST  fastapi:8001/query  { history, kb_hint, anonymize:true }" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── FastAPI · LangGraph 5-node pipeline ────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] RAG</span>
                  <span className="text-bone/65"> · Qdrant search · top-k by domain + jurisdiction</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] Extraction</span>
                  <span className="text-bone/65"> · S3 presigned URL · pull KB chunk content</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] Anonymization</span>
                  <span className="text-bone/65"> · spaCy NER strips PERSON, ORG, GPE, LOC</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] Reasoning</span>
                  <span className="text-bone/65"> · GPT-4o · structured JSON response · lawyer probing inline</span>
                </div>
                <div>
                  <span className="text-cyan-400">[5] Formatter</span>
                  <span className="text-bone/65"> · validate JSON · strip fences · fallback re.search</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── back to Django ─────────────────────────────────────
              </span>
            }
          />
          <TerminalLine command="save(Message, role='assistant') → return JsonResponse to browser" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── after response · 2 daemon threads ──────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-0.5 text-[13px]">
                <div>
                  <span className="text-cyan-500/80">↳ thread</span>{' '}
                  <span className="text-bone/65">/fspr/infer · GPT-4o-mini · update 4 dim scores</span>
                </div>
                <div>
                  <span className="text-cyan-500/80">↳ thread</span>{' '}
                  <span className="text-bone/65">/query/summarize · GPT-4o-mini · if tiktoken &gt; threshold</span>
                </div>
              </div>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Full request lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        {/* FSPR scoring */}
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            FSPR scoring (background, per message)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`# Signals (LLM classifies which dim is most revealed)
Know–Know            → 0.80
Know–Don't Know      → 0.40
False Knowledge      → 0.20
Omission             → 0.30

# EMA update per dimension
new_score = current × 0.7  +  signal × 0.3

# Priority weights for Most Critical Gap
False Knowledge       0.40
Omission              0.30
Know–Don't Know       0.20
Irrelevant Knowledge  0.10`}
          </pre>
        </div>

        {/* Self-assessment parallel pipeline */}
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Self-assessment parallel pipeline
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`LLM1  classify_domain()
       │
       ├──┐  (parallel)
LLM2  generate_kb()         ──┐
LLM4  generate_examples()   ──┤
       │                      │
       │       audit (disabled by default)
       │
       └─▶ 4 parallel dimension evaluators
              ↑
       single KB fetch · single persist
       (moved out of the for-loop in V2)`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Algorithms behind the modes." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="Three modes,"
        accent="one cohesive product."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The product shipped as three entry points under one knowledge profile. Below
        are the three frames that show the end-to-end flow, plus a short demo recorded
        from the sponsor-handoff build.
      </p>

      {/* Service hub — establishing shot */}
      <div className="w-full">
        <ZoomableImage
          src="/projects/mety-legal/mode-select.png"
          alt="METY service hub — three modes: tutoring, chat session, generate document"
        />
        <FigureCaption
          number="7.0"
          label="Service hub (three-card entry)."
          kind="image"
        />
      </div>

      {/* Doc gen flow — intake + result, smaller pair side-by-side */}
      <div className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-5 items-stretch">
          <Figure
            src="/projects/mety-legal/doc-generation-ui.png"
            alt="Document type + describe + jurisdiction form"
            number="7.1"
            caption="Intake form."
            imgHeightClass="h-[180px] sm:h-[240px] md:h-[280px]"
          />
          <Figure
            src="/projects/mety-legal/generate-document.png"
            alt="Split-panel document generation — chat on the left, formatted rental agreement on the right"
            number="7.2"
            caption="Split-panel draft."
            imgHeightClass="h-[180px] sm:h-[240px] md:h-[280px]"
            zoomable
            showOverlayLabel={false}
          />
        </div>
        <p className="text-bone-muted text-[14.5px] leading-relaxed mt-6 max-w-2xl">
          <span className="text-bone">Intake-as-form, not free text.</span> The user
          picks a document type, describes what they need in a sentence, confirms
          jurisdiction, and the chat takes over — lawyer-style probing, targeted
          follow-ups, and a context-aware draft that updates in place. Document chats
          are saved separately from regular legal chats so a user can return weeks
          later, find the in-progress NDA, and continue exactly where they left off.
        </p>
      </div>

      {/* Video demo — autoplaying, loop, muted for browser policy compatibility */}
      <div className="mt-14 w-full">
        <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised w-full">
          <video
            src="/projects/mety-legal/broque_demo.mp4"
            className="w-full block h-auto"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <FigureCaption
          number="7.3"
          label="End-to-end demo (sponsor-handoff build)."
          kind="video"
        />
      </div>

      {/* Combined closing notes — text-only, lighter weight than a card */}
      <div className="mt-12 text-bone-muted text-[14px] leading-relaxed max-w-2xl space-y-3">
        <p>
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
            Refresh recovery
          </span>
          On reload, React state is lost — a <Code>useEffect</Code> on{' '}
          <Code>chatId</Code> calls <Code>getDocuments</Code> and rehydrates the
          split panel from MongoDB if a draft exists for that chat.
        </p>
        <p>
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
            Launch
          </span>
          Delivered to MyEdMaster end of May 2026, handed to continuation team.
          Demoed at the <span className="text-bone">ASU SER517 Innovation Showcase</span>.
          No public deployment — IP belongs to MyEdMaster.
        </p>
      </div>
    </section>
  )
}

/** Small wrapper around an inline screenshot with a caption. Constrains width
 *  so case-study images don't all blow up to body width. */
function Figure({
  src,
  alt,
  number,
  caption,
  maxW = '',
  imgHeightClass = '',
  zoomable = false,
  showOverlayLabel = true,
}: {
  src: string
  alt: string
  number: string
  caption: string
  maxW?: string
  imgHeightClass?: string
  zoomable?: boolean
  showOverlayLabel?: boolean
}) {
  return (
    <div className={maxW ? `${maxW} mx-auto` : ''}>
      {zoomable ? (
        <ZoomableImage
          src={src}
          alt={alt}
          showOverlayLabel={showOverlayLabel}
          className={imgHeightClass}
          imgClassName={imgHeightClass ? 'h-full object-cover object-top' : ''}
        />
      ) : (
        <div className={`rounded-xl overflow-hidden border border-ink-border bg-ink-raised ${imgHeightClass}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={`w-full block ${imgHeightClass ? 'h-full object-cover object-top' : ''}`}
            loading="lazy"
          />
        </div>
      )}
      <FigureCaption number={number} label={caption} kind="image" />
    </div>
  )
}

function ZoomableImage({
  src,
  alt,
  showOverlayLabel = true,
  className = '',
  imgClassName = '',
}: {
  src: string
  alt: string
  showOverlayLabel?: boolean
  className?: string
  imgClassName?: string
}) {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({
    transformOrigin: 'center',
    transform: 'scale(1)',
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.2)',
    })
  }

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center',
      transform: 'scale(1)',
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl overflow-hidden border border-ink-border bg-ink-raised group cursor-zoom-in ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full block transition-transform duration-150 ease-out ${imgClassName}`}
        style={zoomStyle}
        loading="lazy"
      />
      {/* Subtle overlay label to guide the user */}
      {showOverlayLabel && (
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono tracking-wider text-bone-muted/85 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none select-none">
          Hover to zoom
        </div>
      )}
    </div>
  )
}

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What worked,"
        accent="what I'd change."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Stateless FastAPI from day one."
            body="Every debugging session, rebuild, and feature addition benefited from the AI service holding no state. Restart the container and nothing breaks. It looked like over-engineering in Sprint 2 and paid off in every sprint after."
          />
          <RetroItem
            head="Structured JSON from the LLM."
            body="Returning answer, detected_topics, confidence_delta, ready_to_generate, and document_context in one call eliminated what would have been 4-5 separate LLM calls per message and made the entire pipeline observable in LangSmith."
          />
          <RetroItem
            head="Background threads with daemon=True."
            body="FSPR and summarization fire after the HTTP response with zero user-facing latency. close_old_connections() discipline was established early so no DB connection issues."
          />
        </RetroColumn>

        <RetroColumn title="Would change">
          <RetroItem
            head="Celery + Redis from Sprint 1."
            body="The fspr_update_in_progress boolean flag works but isn't production-safe — cross-process race conditions are only partially prevented. Celery would have given proper coordination, retries, and monitoring."
          />
          <RetroItem
            head="JWT auth from Sprint 1."
            body="A bare user_id in the URL path inherited to every new endpoint. Retrofitting proper auth now would require touching every view and every frontend API call."
          />
          <RetroItem
            head="Prompt versioning from the start."
            body="Prompts changed in every sprint with no way to A/B test or roll back. A version field on prompt constants and LangSmith experiment tagging would have made prompt iteration data-driven instead of intuition-driven."
          />
        </RetroColumn>
      </div>

      <div className="mt-12 border-l-2 border-emerald-500/30 pl-5 py-3 max-w-2xl">
        <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-2">
          The biggest surprise
        </div>
        <p className="text-bone-muted text-[14.5px] leading-relaxed">
          <span className="text-bone">Anonymization was the source of every weird bug.</span>{' '}
          I expected it to be a straightforward privacy layer. What I didn&apos;t
          expect was how many features silently depended on whether they were reading
          anonymized or raw text — document generation used the anonymized summary and
          produced fictional names; FSPR inference passed anonymized LLM responses to
          the evaluator; the reasoning prompt received anonymized history that then
          produced responses with placeholder names. Every feature that touched
          persisted text had to be individually audited.{' '}
          <span className="italic font-serif text-bone">
            Anonymization isn&apos;t a node decision — it&apos;s a data-provenance
            question that affects every field in every model.
          </span>
        </p>
      </div>
    </section>
  )
}

// ── shared helpers ────────────────────────────────────────────────────────

/** Single-cell Meta block used as the LEFT column of the Overview grid.
 *  Renders as `label` (uppercase eyebrow) stacked above `value` (regular text).
 *  Pair with a `<p>` in the right column for the descriptive prose. */
function Meta({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-1.5">
        {label}
      </div>
      <div className="text-bone text-[14px]">{value}</div>
    </div>
  )
}

function MetricTile({
  value,
  label,
  sub,
  color = 'bone',
}: {
  value: string
  label: string
  sub?: string
  color?: 'cyan' | 'amber' | 'emerald' | 'bone'
}) {
  const colorMap = {
    bone: 'text-bone',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  }
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <div className={`font-sans font-medium ${colorMap[color]} text-3xl tracking-tightish mb-2 leading-none`}>
        {value}
      </div>
      <div className="text-bone-muted text-sm">{label}</div>
      {sub && <div className="text-bone-dim text-xs mt-1.5">{sub}</div>}
    </div>
  )
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-bone font-medium mb-1.5">{title}</div>
      <div className="text-bone-muted">{children}</div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.05] text-bone text-[0.92em] font-mono">
      {children}
    </code>
  )
}

function QuoteCard({
  source,
  quote,
  context,
  spanFull = false,
}: {
  source: string
  quote: string
  context?: string
  spanFull?: boolean
}) {
  return (
    <div
      className={`bg-ink-raised border border-ink-border rounded-xl p-5 ${
        spanFull ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono mb-2">
        {source}
      </div>
      <blockquote className="text-bone text-[14.5px] leading-snug italic font-serif">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {context && (
        <div className="text-bone-muted text-[12px] mt-3">{context}</div>
      )}
    </div>
  )
}

function ConstraintCard({
  n,
  title,
  body,
  color = 'cyan',
}: {
  n: string
  title: string
  body: string
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const colorMap = {
    cyan: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
  }
  const cls = colorMap[color]
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-4 flex items-start gap-3">
      <span className={`w-8 h-8 rounded-md ${cls} flex items-center justify-center text-sm font-mono shrink-0`}>
        {n}
      </span>
      <div>
        <div className="text-bone text-sm font-medium mb-1.5">{title}</div>
        <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
      </div>
    </div>
  )
}

function PrincipleCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-lg p-5">
      <div className="text-bone font-medium text-[14.5px] mb-2 italic font-serif">
        {title}.
      </div>
      <div className="text-bone-muted text-[13px] leading-relaxed">{body}</div>
    </div>
  )
}

function Pivot({
  version,
  title,
  body,
  color = 'cyan',
}: {
  version: string
  title: string
  body: React.ReactNode
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const colorMap = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  }
  return (
    <div className="max-w-2xl">
      <div className="flex items-baseline gap-3 mb-2">
        <span className={`${colorMap[color]} text-[11px] uppercase tracking-eyebrow font-mono`}>
          {version}
        </span>
        <h4 className="text-bone font-medium text-base">{title}</h4>
      </div>
      <p className="text-bone-muted text-[14.5px] leading-relaxed">{body}</p>
    </div>
  )
}

function BeforeAfter({
  number,
  title,
  beforeLabel,
  before,
  afterLabel,
  after,
  color = 'cyan',
}: {
  number: string
  title: string
  beforeLabel: string
  before: string
  afterLabel: string
  after: string
  color?: 'cyan' | 'amber' | 'emerald'
}) {
  const borderMap = {
    cyan: 'border-cyan-500/20',
    amber: 'border-amber-500/20',
    emerald: 'border-emerald-500/20',
  }
  const textMap = {
    cyan: 'text-cyan-300',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
  }
  return (
    <div>
      <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-4 items-stretch">
        <div className="bg-ink-raised border border-ink-border rounded-lg p-4">
          <div className="text-bone-muted text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            {beforeLabel}
          </div>
          <p className="text-bone-muted text-[13px] leading-relaxed">{before}</p>
        </div>
        <div className={`bg-ink-raised border ${borderMap[color]} rounded-lg p-4`}>
          <div className={`${textMap[color]} text-[11px] uppercase tracking-eyebrow font-mono mb-1`}>
            {afterLabel}
          </div>
          <p className="text-bone-muted text-[13px] leading-relaxed">{after}</p>
        </div>
      </div>
      <FigureCaption number={number} label="" kind="diagram" />
    </div>
  )
}

function RetroColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
      <h4 className="text-bone font-medium mb-4 text-sm uppercase tracking-eyebrow">
        {title}
      </h4>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function RetroItem({ head, body }: { head: string; body: string }) {
  return (
    <div>
      <div className="text-bone text-[14px] font-medium mb-1">{head}</div>
      <p className="text-bone-muted text-[13px] leading-relaxed">{body}</p>
    </div>
  )
}
