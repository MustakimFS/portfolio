/**
 * AegisFlow — full case-study body.
 *
 * Real facts pulled from:
 *   - README.md — tagline, capability table, repo layout, quickstart, engineering principles
 *   - ARCHITECTURE.md — system decomposition, data flow happy path (9 steps),
 *     reliability engine / confidence formula, circuit breaker, storage model,
 *     observability (trace skeleton + Prometheus metric families), security, deployment
 *   - docs/adr/0002-event-bus-nats.md — verbatim rationale for NATS over Kafka/PG
 *   - docker-compose.yml — exact 14-service topology, port assignments, image versions
 *   - Makefile — bootstrap / up / seed / demo / test / lint / typecheck targets
 */

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import FigureCaption from '@/components/project/FigureCaption'
import { TerminalWindow, TerminalLine, CodeEditorWindow, Tok } from '@/components/windows'
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

export const AEGISFLOW_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function AegisflowCaseStudy() {
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
        sans="Deterministic reliability for"
        accent="non-deterministic AI systems."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Solo Architect & Engineer" />
        <p className="text-bone-muted">
          Designed the microservice topology and all service contracts.
          Implemented all seven services, the shared{' '}
          <Code>aegis_core</Code> library (circuit breaker, Pydantic schemas,
          Prometheus metric definitions, structured logging), the full
          OpenTelemetry → Prometheus → Grafana → Tempo observability stack,
          the chaos-injection engine, and the three ADRs that document every
          infrastructure decision.
        </p>

        <Meta
          label="Stack"
          value="Python 3.12 · FastAPI · NATS JetStream · Postgres / pgvector · Redis · OpenTelemetry · Prometheus · Grafana · Tempo · Docker Compose · Kubernetes (Kustomize)"
        />
        <p className="text-bone-muted">
          AegisFlow sits between your application and any LLM provider. Every
          model output passes through a{' '}
          <span className="text-bone">4-axis confidence scorer</span>{' '}
          (structural validity + semantic grounding + validator critique +
          provider history) combined with a diminishing-returns anomaly penalty
          into a single <Code>[0, 1]</Code> score. Based on the score, the
          system accepts, repairs, retries, falls back, or rejects — without
          the calling application knowing any of it.
        </p>

        <Meta label="Timeline" value="Feb → May 2026 · ~3 months · solo" />
        <p className="text-bone-muted">
          Full 14-container stack boots via{' '}
          <Code>make up</Code> (<Code>docker compose up -d --build</Code>),
          all services pass <Code>/healthz</Code> + <Code>/readyz</Code>,
          chaos scenarios verified end-to-end, Grafana dashboards rendering
          live data from the mock provider. Kubernetes manifests ship in{' '}
          <Code>infra/k8s/</Code> with dev + prod overlays. Open-source under
          MIT at{' '}
          <Code>github.com/MustakimFS/aegisflow</Code>.
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
        sans="AegisFlow —"
        accent="reliability engineering for models that lie."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Seven microservices, a four-axis confidence model, and a chaos engine
        that stress-tests fallback paths before production traffic ever does.
        Every execution is event-sourced: given the same trace ID and a frozen
        model snapshot, the system reproduces the run bit-for-bit.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile
          value="7"
          label="Microservices"
          sub="14 containers · 1 make up"
        />
        <MetricTile
          value="4-axis"
          label="Confidence model"
          sub="+ diminishing-returns anomaly penalty"
        />
        <MetricTile
          value="6"
          label="Chaos failure modes"
          sub="injectable per-provider, on demand"
        />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="7 microservices, 14 containers, 1 command.">
          Gateway, orchestrator, reliability, guardrails, memory, replay, and
          chaos — each with its own Dockerfile, <Code>/healthz</Code>,{' '}
          <Code>/readyz</Code>, and Prometheus <Code>/metrics</Code>. Plus
          Postgres (pgvector), Redis, NATS, OTEL collector, Prometheus, Tempo,
          Grafana. <Code>make up</Code> brings up everything.
        </Point>
        <Point title="4-axis confidence scoring.">
          <Code>structural_score</Code> (JSON parse) +{' '}
          <Code>grounding_score</Code> (token-Jaccard vs retrieved context) +{' '}
          <Code>critique_score</Code> (validator rubric) +{' '}
          <Code>historical_provider_score</Code> (rolling 5-min success rate),
          minus a diminishing-returns <Code>anomaly_penalty</Code> →{' '}
          <Code>1 - exp(-0.5 * n_flags)</Code>. Weights are
          workflow-configurable.
        </Point>
        <Point title="6 injectable failure modes.">
          Latency spikes, timeouts, synthetic 5xx, malformed JSON,
          hallucinations, refusals — injectable on any provider via the chaos
          service API without touching provider code. Disabled by default;
          opt-in per test run.
        </Point>
        <Point title="Event-sourced replay.">
          Every input, output, score, retry, and fallback decision is appended
          to the NATS JetStream event log. <Code>GET /v1/replay/{'{trace_id}'}</Code>{' '}
          walks the full trace for post-incident debugging.
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
        sans="LLMs are in production —"
        accent="reliability is still ad-hoc."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Traditional backend infrastructure assumes failures are{' '}
        <em>categorical</em> — a request either succeeded or it didn&apos;t.
        LLM systems break that assumption: a &ldquo;successful&rdquo; 200
        response can still be wrong, malformed, or unsafe. SDKs had retry
        logic for rate limits but nothing for{' '}
        <span className="text-bone">semantic failures</span>. No open-source
        tool addressed the full surface: structural validation + grounding
        checks + provider failover + deterministic trace replay.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="GitHub · langchain-ai/langchain #15808"
          quote="Output parsers silently swallow malformed JSON and return None."
          context="Top-voted open issue — default = fail closed, no repair, no signal"
        />
        <QuoteCard
          source="Reddit · r/LocalLLaMA"
          quote="How do you handle hallucinations in production? — Top-voted answer: 'prompt harder and add a retry loop.'"
          context="The state of the art before reliability-as-infrastructure"
        />
        <QuoteCard
          source="a16z 'State of AI' · 2024"
          quote="Inconsistent or unexpected model outputs is the #1 production pain point for teams running LLMs at scale."
          context="Survey from a16z — the pain is industry-wide"
        />
        <QuoteCard
          source="OpenAI API · status + community · 2024–2025"
          quote="Unexpected content-type, truncated JSON mid-object, output structure changed across model versions."
          context="Forums full of teams discovering this only after it broke production"
        />
        <QuoteCard
          source="AegisFlow README — 'Why this exists'"
          quote="Service meshes, retries, circuit breakers, and schema validators all assume failures are categorical — a request either succeeded or it didn't. LLM systems break that assumption."
          context="The thesis the whole platform is built around"
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
        sans="Five hard constraints,"
        accent="one architecture that survives them."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="8 GB VRAM ceiling"
          body="Local inference tops out at 7–8B parameter models. The entire reliability pipeline had to add under 200 ms of overhead or it would dominate inference latency on the RTX 4070."
        />
        <ConstraintCard
          n="2"
          title="No shared in-process state"
          body="Services communicate only over HTTP + NATS. Every confidence score, guardrail check, and memory retrieval is a network round-trip. Each service has to fail open gracefully."
        />
        <ConstraintCard
          n="3"
          title="Local model JSON non-compliance"
          body="Qwen3 and DeepSeek R1 wrap outputs in ```json fences ~40% of the time and prepend prose prefixes another 10–15%. The guardrail repairer had to handle these before any structural repair."
        />
        <ConstraintCard
          n="4"
          title="No ground-truth labels"
          body="Confidence scoring had no labeled dataset to calibrate against. Grounding uses token Jaccard as a fast proxy (not embedding similarity) — a deliberate trade-off documented in the code."
        />
        <ConstraintCard
          n="5"
          title="Solo build constraint"
          body="Every service had to be completable and fully understandable by one person. Architecture complexity was a liability, not an asset. The shared aegis_core library kept the surface consistent."
        />
      </div>

      <SectionLabel className="mb-4">Engineering principles (from the README)</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Failure is the default"
          body="Every cross-service call goes through a circuit breaker; every agent output is treated as untrusted until validated. If a downstream is unreachable, the orchestrator returns a neutral score and continues."
        />
        <PrincipleCard
          title="Determinism through replay"
          body="Every execution is event-sourced. Given the same trace ID and a frozen model snapshot, the system reproduces the run bit-for-bit."
        />
        <PrincipleCard
          title="Observability is not optional"
          body="A code path without a trace span, a metric, and a structured log doesn't get merged. Every /healthz, /readyz, /metrics endpoint was live from day one."
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
        sans="Five iterations,"
        accent="each one earned by a failure."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="The monolith that couldn't be chaos-tested."
          body={
            <>
              V1 was a single FastAPI app with reliability scoring, guardrails,
              and memory in-process. The immediate problem: you can&apos;t
              inject chaos into part of a monolith without affecting the whole
              thing. I wanted to test the guardrail repairer with 100%
              malformed JSON, but doing so in-process corrupted the reliability
              scorer&apos;s provider history stats. The split into
              microservices came directly from that failure — each service now
              gets its own chaos surface. ADR-0001 documents the decision.
            </>
          }
        />

        <Pivot
          version="V2"
          title="The confidence formula that couldn't catch hallucinations."
          body={
            <>
              First formula weighted all four components equally at 0.25. A
              model returning perfect JSON but hallucinating scored 0.75 —
              well above the 0.30 minimum threshold. Fix was structural:
              downweight history (0.10), add a separate anomaly penalty
              subtracted <em>after</em> the weighted sum, and use diminishing
              returns <Code>1 - exp(-0.5 * n)</Code> so a single anomaly
              doesn&apos;t kill the score but five anomalies can&apos;t be
              overcome by perfect JSON. Final weights:{' '}
              <Code>
                0.30·structural + 0.30·grounding + 0.20·critique +
                0.10·history − 0.30·anomaly
              </Code>
              .
            </>
          }
        />

        <Pivot
          version="V3"
          title="NATS JetStream over Postgres LISTEN/NOTIFY."
          body={
            <>
              Started with Postgres LISTEN/NOTIFY for the event bus — already
              in the stack, one fewer service. Hit the wall when the replay
              service needed fan-out to multiple consumers simultaneously.
              LISTEN/NOTIFY doesn&apos;t survive consumer disconnects and has
              no replay semantics. NATS JetStream solved both in one binary
              with no ZooKeeper — at-least-once delivery plus hierarchical
              subject wildcards (<Code>workflow.*.completed</Code>). The full
              rationale is in{' '}
              <span className="text-bone">ADR-0002</span>:
            </>
          }
        />

        {/* ADR-0002 excerpt */}
        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            ADR-0002 · NATS JetStream over Kafka
          </div>
          <div className="text-bone-muted text-[14px] leading-relaxed space-y-2">
            <p>
              <span className="text-bone">1. Operational footprint.</span> NATS
              runs as a single binary with no ZooKeeper / KRaft to manage. For a
              platform that targets self-hosting in customer K8s clusters, the
              lower op cost wins.
            </p>
            <p>
              <span className="text-bone">2. Latency.</span> NATS pub-sub
              round-trip is sub-millisecond. Kafka&apos;s batching adds
              5–50 ms even at low throughput.
            </p>
            <p>
              <span className="text-bone">3. Subjects vs. topics.</span> NATS
              supports hierarchical wildcards (
              <Code>workflow.*.completed</Code>), which maps cleanly onto
              trace-driven fan-out.
            </p>
            <p>
              <span className="text-bone">4. Alternatives rejected:</span>{' '}
              Apache Kafka (heavyweight, 5% of capability used), AWS SQS+SNS
              (vendor lock-in), Postgres LISTEN/NOTIFY (no fan-out, no
              disconnect survival).
            </p>
          </div>
        </div>

        <Pivot
          version="V4"
          title="Chaos that made testing impossible."
          body={
            <>
              First chaos config had 30% failure probability across all
              providers. The happy path became unreachable — every test run hit
              at least one failure, making baselines impossible. Pulled back to
              conservative defaults: primary-blip 5%, json-corruption 10%,
              latency-spike 20% — all disabled by default and opt-in per test
              run via the chaos service API.
            </>
          }
        />

        <Pivot
          version="V5"
          title="Discovering local-model JSON behavior empirically."
          body={
            <>
              The assumption was that <Code>```json</Code> fence wrapping was
              an edge case. In practice, ~40% of Qwen3 outputs and a similar
              fraction of DeepSeek R1 outputs arrived fenced. The prose prefix
              (&quot;Here is the JSON:&quot;) was another surprise at 10–15%.
              Both are now <span className="text-bone">first-order</span>{' '}
              operations in the repair pipeline, not afterthoughts.
            </>
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        <BeforeAfter
          number="3.0"
          title="JSON error handling"
          before={
            <>
              <Code>json.loads(raw)</Code> → <Code>JSONDecodeError</Code> →
              return <Code>None</Code>. Silent failure, no signal to caller.
            </>
          }
          after={
            <>
              6-step repair pipeline returning{' '}
              <Code>RepairResult(parsed=…, was_repaired=True, repairs=[…])</Code>
              . Caller knows exactly what was fixed.
            </>
          }
        />
        <BeforeAfter
          number="3.1"
          title="Provider failure path"
          before={
            <>
              <Code>raise UpstreamTimeout</Code> → unhandled exception → 500.
              No recovery, no observability.
            </>
          }
          after="Circuit breaker records the failure → reliability engine scores → routing tree evaluates → fallback chain advances (primary → secondary → rule-based) → Prometheus FALLBACKS counter increments → event-sourced to NATS."
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
        sans="The reliability loop —"
        accent="one request, seven services."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The data flow below is from <Code>ARCHITECTURE.md</Code> §3 &ldquo;Happy
        path.&rdquo; Nine steps, synchronous gRPC/HTTP on the request path,
        asynchronous NATS JetStream for fan-out, audit, replay, and chaos
        triggers.
      </p>

      <TerminalWindow title="aegisflow: ~/request-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="client"
            host="caller"
            cwd="/v1/workflows"
            command='POST  { "workflow": "research_summarize", "policies": {...} }'
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── 9-step happy path (ARCHITECTURE.md §3) ─────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-amber-300/85">[1] gateway</span>
                  <span className="text-bone/65"> · JWT verify · rate-limit (Redis token bucket) · trace ID minted</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[2] orchestrator</span>
                  <span className="text-bone/65"> · resolve workflow DAG · run record PENDING in Postgres</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[3] memory</span>
                  <span className="text-bone/65"> · pgvector top-k retrieval · rerank · attach to context</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[4] LLM invoke</span>
                  <span className="text-bone/65"> · circuit breaker · adaptive retry (full jitter) · timeout budget</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[5] reliability</span>
                  <span className="text-bone/65"> · 4-axis score → ACCEPT / RETRY / FALLBACK / REJECT</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[6] guardrails</span>
                  <span className="text-bone/65"> · JSON repair · schema validation · PII sanitization</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[7] decision</span>
                  <span className="text-bone/65"> · ≥0.75 accept · ≥0.50 repair-retry · ≥0.30 fallback · else reject</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[8] replay</span>
                  <span className="text-bone/65"> · event-source full trace to NATS JetStream</span>
                </div>
                <div>
                  <span className="text-amber-300/85">[9] response</span>
                  <span className="text-bone/65"> · trace_id + confidence + fallback_depth + retries</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <pre className="text-[12.5px] leading-[1.55] text-bone/85 m-0 whitespace-pre-wrap">
{`{ "run_id": "01KT5PJWTS8PYS3RSKBM29849P", "status": "succeeded",
  "confidence": 0.379, "fallback_depth": 1, "retries": 0,
  "trace_id": "703e552f7a2cc84580ff3eb9fc9dc35b" }`}
              </pre>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Full request lifecycle (ARCHITECTURE.md §3)." kind="diagram" />

      {/* Service decomposition table from ARCHITECTURE.md §2 */}
      <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised mt-12 mb-4">
        <div className="px-5 py-3 border-b border-ink-border text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono">
          System decomposition (ARCHITECTURE.md §2)
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono text-left">
                <th className="pb-2 pr-4">Service</th>
                <th className="pb-2 pr-4">Process model</th>
                <th className="pb-2 pr-4">Persistence</th>
                <th className="pb-2">Scaling axis</th>
              </tr>
            </thead>
            <tbody className="text-bone-muted">
              {SERVICE_TABLE.map(r => (
                <tr key={r.svc} className="border-t border-ink-border/60">
                  <td className="py-2 pr-4 text-bone font-mono">{r.svc}</td>
                  <td className="py-2 pr-4">{r.model}</td>
                  <td className="py-2 pr-4">{r.persist}</td>
                  <td className="py-2">{r.scale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FigureCaption number="6.1" label="Service table — each owns one reliability concern." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Confidence formula (ARCHITECTURE.md §4)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`confidence =
   w1 · structural_score       # JSON parse: 1.0 / 0.5 / 0.0
 + w2 · grounding_score        # token-Jaccard vs retrieved ctx
 + w3 · critique_score         # validator rubric [0,1]
 + w4 · historical_provider    # rolling 5-min success rate
 - w5 · anomaly_penalty        # 1 - exp(-0.5 * n_flags)

# Defaults (workflow-configurable):
#   w1=0.30  w2=0.30  w3=0.20  w4=0.10  w5=0.30

decision:
  ≥ 0.75  → ACCEPT
  ≥ 0.50  → REPAIR_AND_RETRY
  ≥ 0.30  → FALLBACK_PROVIDER
  < 0.30  → REJECT`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Circuit breaker (aegis_core)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`CLOSED ─(failure_ratio > 0.5 in window)─► OPEN
OPEN ──(cooldown elapsed: 15s→30s→…→120s)──► HALF_OPEN
HALF_OPEN ─(probe success)─► CLOSED
HALF_OPEN ─(probe failure)─► OPEN (double cooldown)

# Failure = 5xx, timeout, connection error.
# Low-confidence outputs are NOT failures at this
# layer — they're handled by the reliability engine.

# Per-provider, per-model.
# Implemented in libs/aegis_core/circuit_breaker.py`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.2" label="Scoring + recovery primitives." kind="diagram" />

      {/* Prometheus metrics from ARCHITECTURE.md §7 */}
      <div className="bg-ink-raised border border-ink-border rounded-xl p-6 mt-12">
        <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
          Prometheus metric families (ARCHITECTURE.md §7)
        </div>
        <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`aegisflow_workflow_duration_seconds{workflow,status}     # histogram
aegisflow_agent_invocations_total{agent,provider,outcome} # counter
aegisflow_reliability_confidence{workflow}                # histogram
aegisflow_circuit_state{provider,model}                   # gauge 0/1/2
aegisflow_retries_total{provider,reason}                  # counter
aegisflow_fallback_total{from_provider,to_provider}       # counter
aegisflow_tokens_total{provider,direction}                # counter
aegisflow_memory_recall_at_k{k}                           # histogram
aegisflow_chaos_injections_total{scenario}                # counter`}
        </pre>
      </div>
      <FigureCaption number="6.3" label="Every metric the Grafana dashboard consumes." kind="diagram" />

      {/* Chaos failure modes */}
      <div className="mt-12">
        <CodeEditorWindow filename="services/chaos/scenarios.py" language="py" lineCount={8}>
          <pre className="text-[13px] leading-[1.55] m-0">
            <code>
              {Tok.keyword('class ')}
              {Tok.type('FailureMode')}
              {Tok.punct('(')}
              {Tok.type('StrEnum')}
              {Tok.punct('):')}
              {'\n  '}
              {Tok.variable('LATENCY')}         {Tok.punct('= ')}{Tok.string('"latency"')}
              {'         '}
              {Tok.comment('# inject N ms latency spike')}
              {'\n  '}
              {Tok.variable('TIMEOUT')}         {Tok.punct('= ')}{Tok.string('"timeout"')}
              {'         '}
              {Tok.comment('# drop the request on the floor')}
              {'\n  '}
              {Tok.variable('PROVIDER_5XX')}    {Tok.punct('= ')}{Tok.string('"provider_5xx"')}
              {'    '}
              {Tok.comment('# synthetic upstream failure')}
              {'\n  '}
              {Tok.variable('MALFORMED_JSON')}  {Tok.punct('= ')}{Tok.string('"malformed_json"')}
              {'  '}
              {Tok.comment('# wrap or truncate the output')}
              {'\n  '}
              {Tok.variable('HALLUCINATION')}   {Tok.punct('= ')}{Tok.string('"hallucination"')}
              {'   '}
              {Tok.comment('# valid shape, fabricated content')}
              {'\n  '}
              {Tok.variable('REFUSAL')}         {Tok.punct('= ')}{Tok.string('"refusal"')}
              {'         '}
              {Tok.comment("# 'I can't help with that' patterns")}
            </code>
          </pre>
        </CodeEditorWindow>
        <FigureCaption number="6.4" label="Six injectable failure modes." kind="diagram" />
      </div>
    </section>
  )
}

const SERVICE_TABLE = [
  { svc: 'gateway',       model: 'stateless · async',       persist: 'Redis (rate-limit)',              scale: 'request rate' },
  { svc: 'orchestrator',  model: 'stateless · async',       persist: 'Postgres (runs) · NATS',          scale: 'concurrent workflows' },
  { svc: 'reliability',   model: 'stateless · CPU-bound',   persist: '— (in-memory windows)',           scale: 'scoring throughput' },
  { svc: 'guardrails',    model: 'stateless · CPU-bound',   persist: '—',                               scale: 'validation throughput' },
  { svc: 'memory',        model: 'stateful read replicas',  persist: 'Postgres + pgvector · S3',        scale: 'retrieval QPS' },
  { svc: 'replay',        model: 'stateful append-only',    persist: 'Postgres (event store) · S3',     scale: 'event ingestion' },
  { svc: 'chaos',         model: 'stateless',               persist: 'Redis (active scenarios)',         scale: '—' },
]

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="What shipped —"
        accent="and what shipping means here."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        Everything below is captured from the running stack — no mockups. The
        boot transcript, the Grafana dashboard, a real workflow response, and
        the chaos-driven fallback + guardrails repair, in order.
      </p>

      {/* 7.0 — make up boot + docker ps */}
      <Figure
        src="/projects/aegisflow/01-make-up-containers.png"
        alt="make up — 14/14 aegisflow containers healthy, docker ps showing real ports"
        number="7.0"
        caption="make up → 14/14 containers healthy in 41.8s · docker ps with real port mappings."
      />

      {/* 7.1 — Grafana overview dashboard */}
      <div className="mt-14">
        <Figure
          src="/projects/aegisflow/04-aegisflow-overview-dashboard.png"
          alt="Grafana aegisflow-overview dashboard — throughput, fallback counter, confidence histogram, circuit breaker gauge, token counters"
          number="7.1"
          caption="Grafana aegisflow-overview — auto-provisioned from aegisflow-overview.json."
        />
        <p className="text-bone-muted text-[14.5px] leading-relaxed max-w-2xl mt-5">
          Every panel reads a real Prometheus metric: workflow throughput,
          fallback counter, reliability rejection rate, average + histogram of
          confidence, P50/P95 duration, circuit-breaker state gauge,
          hallucination flags/sec, and token counters. Avg confidence sits at{' '}
          <Code>0.376</Code> here because the demo runs against the mock
          provider with chaos enabled — the system is doing exactly what it
          should: scoring low and falling back.
        </p>
      </div>

      {/* 7.2 — real workflow response */}
      <div className="mt-14">
        <Figure
          src="/projects/aegisflow/02-make-demo-curl-response.png"
          alt="curl POST /v1/workflows — real response with run_id, trace_id, confidence 0.379, fallback true"
          number="7.2"
          caption="make demo → POST /v1/workflows — a real workflow response."
        />
        <p className="text-bone-muted text-[14.5px] leading-relaxed max-w-2xl mt-5">
          <span className="text-bone">Real fields, real values.</span>{' '}
          <Code>confidence: 0.379</Code> lands below the accept and retry
          thresholds, so the routing tree walks the fallback chain
          (<Code>fallback_depth: 1</Code>) and the orchestrator returns the
          deterministic rule-based fallback —{' '}
          <em>&ldquo;All primary providers exhausted; returning deterministic
          fallback.&rdquo;</em> The caller still gets a structured{' '}
          <Code>status: succeeded</Code> with a <Code>trace_id</Code> that keys
          straight into the replay event stream. No exception, no 500 — the
          failure is handled, not leaked.
        </p>
      </div>

      {/* 7.3 — chaos + guardrails repair */}
      <div className="mt-14">
        <Figure
          src="/projects/aegisflow/03-chaos-fallback-repair.png"
          alt="Enable json-corruption chaos scenario, run demo, guardrails /v1/validate returns repaired=true with the exact repairs applied"
          number="7.3"
          caption="Chaos json-corruption enabled → guardrails /v1/validate exposes repaired=true + the exact repairs."
        />
        <p className="text-bone-muted text-[14.5px] leading-relaxed max-w-2xl mt-5">
          <span className="text-bone">Structure over values.</span>{' '}
          Enabling the <Code>json-corruption</Code> chaos scenario (probability
          0.1, all providers) forces malformed output through the guardrails
          repair path. The <Code>/v1/validate</Code> endpoint returns{' '}
          <Code>repaired: true</Code> and lists every operation it applied —
          here <Code>stripped_prose_prefix</Code>,{' '}
          <Code>stripped_trailing_text</Code>, and{' '}
          <Code>removed_trailing_commas</Code>. The repairer only ever fixes
          syntax; if the structure still won&apos;t parse it returns a hard
          error rather than fabricating a payload.
        </p>
      </div>

      {/* Honest framing */}
      <div className="mt-14 text-bone-muted text-[14px] leading-relaxed max-w-2xl space-y-3">
        <p>
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10.5px] font-mono mr-2">
            Launch · honest framing
          </span>
          This is a portfolio project, open-source under MIT. No external
          users, no production traffic. Verified working on developer hardware,
          all services pass <Code>/healthz</Code> + <Code>/readyz</Code>,
          Grafana renders live metrics from the mock provider, and the chaos
          scenarios above were captured end-to-end. Saying so directly is
          stronger than inflating.
        </p>
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
        sans="What worked,"
        accent="what I'd change."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="'Fail open' as a design rule, not a guideline."
            body="Every except httpx.RequestError returns a neutral value and logs rather than raising. I never needed all 14 services running to work on one — reliability down = neutral scores, memory down = empty retrieval. Isolation was free."
          />
          <RetroItem
            head="The shared aegis_core library."
            body="CircuitBreaker, Pydantic schemas, Prometheus metric definitions, and structured logging in one package. Every service had consistent instrumentation from the first line — Grafana dashboards had real data the first time they loaded."
          />
          <RetroItem
            head="ADRs before the code."
            body="ADR-0002 forced me to articulate the NATS vs. Kafka vs. LISTEN/NOTIFY tradeoffs in writing before implementing. When LISTEN/NOTIFY hit the fan-out wall three weeks later, the decision was already documented and the switch took a day instead of a week."
          />
        </RetroColumn>

        <RetroColumn title="Would change">
          <RetroItem
            head="Start with integration tests, not unit tests."
            body="The interesting bugs were all at service boundaries: repairer changing the output shape the scorer expected, replay event payload not matching the diff endpoint's assumption. Unit tests per service missed all of these."
          />
          <RetroItem
            head="Implement the NATS bus wrapper first."
            body="JetStream is wired in docker-compose but aegis_core.bus is still marked TODO (per ADR-0002 'Revisit when' section). The replay service currently receives events over HTTP rather than subscribing to the event stream."
          />
          <RetroItem
            head="Use a real embedding model from day one."
            body="Memory service has pgvector infra and cosine similarity, but the dev stack uses mock embeddings — grounding scores are consequently meaningless in practice. Wiring all-MiniLM-L6-v2 via Ollama would make the confidence scores semantically real."
          />
        </RetroColumn>
      </div>

      <div className="mt-12 border-l-2 border-amber-500/30 pl-5 py-3 max-w-2xl">
        <div className="text-amber-300 text-[11px] uppercase tracking-eyebrow font-mono mb-2">
          The biggest surprise
        </div>
        <p className="text-bone-muted text-[14.5px] leading-relaxed">
          <span className="text-bone">
            Local Ollama models wrap JSON in markdown fences far more often
            than any documentation suggests.
          </span>{' '}
          The assumption was &quot;occasional edge case — maybe 5%.&quot;
          Empirically it was closer to <span className="text-bone">40%</span>{' '}
          from Qwen3 and DeepSeek R1. The prose prefix (&quot;Here is the
          JSON:&quot;) hit another 10–15%.{' '}
          <span className="italic font-serif text-bone">
            The guardrails service isn&apos;t a last-resort fallback —
            it&apos;s a required post-processor for local models.
          </span>
        </p>
      </div>
    </section>
  )
}
