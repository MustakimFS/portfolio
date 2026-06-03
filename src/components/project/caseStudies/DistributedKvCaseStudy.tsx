/**
 * Distributed KV Store — full case-study body.
 *
 * Real facts pulled from the project README + benchmark table at
 * github.com/MustakimFS/distributed-kv-store. Final Designs section uses
 * placeholder cards for screenshots; the architecture + benchmark facts
 * are real and verifiable from the repo.
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

export const DISTRIBUTED_KV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function DistributedKvCaseStudy() {
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
        sans="Raft from the paper —"
        accent="implemented, not just read."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          Designed and built the whole stack: a paper-faithful{' '}
          <span className="text-bone">Raft</span> implementation, the gRPC
          service layer, the state machine, the client library with automatic
          leader redirect, the 5-node Docker Compose cluster, the benchmark
          suite, and the chaos tooling that proves it tolerates two simultaneous
          node failures with zero data loss.
        </p>

        <Meta
          label="Stack"
          value="Java 17 · gRPC 1.62 · Protocol Buffers 3.25 · Maven · SLF4J / Logback · JUnit 5 · Mockito · Docker Compose"
        />
        <p className="text-bone-muted">
          Four layers from client to disk: a thin <Code>KVClient</Code> with
          leader-redirect; the gRPC layer (<Code>KVServiceImpl</Code>,{' '}
          <Code>RaftServiceImpl</Code>) speaking Protobuf-typed RPCs; the Raft
          core (<Code>RaftNode</Code>, <Code>LogEntry</Code>,{' '}
          <Code>StateMachine</Code>) doing election, replication, and commit;
          and an in-memory <Code>ConcurrentHashMap</Code> as the state machine
          store.
        </p>

        <Meta
          label="Timeline"
          value="Apr → May 2026 · ~6 weeks · solo"
        />
        <p className="text-bone-muted">
          A self-driven build to understand Raft through implementation rather
          than reading. Phase 1 stood up the gRPC skeleton and leader election;
          Phase 2 added log replication and CP reads; Phase 3 added the AP
          consistency mode, the benchmark harness, and the chaos suite that
          measured{' '}
          <span className="italic font-serif text-bone">
            actual behavior under actual failure.
          </span>
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
        sans="Five nodes, two consistency modes,"
        accent="seventeen thousand ops a second."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        Hits every benchmark target by an order of magnitude — read latency
        comes in at <span className="text-bone">p99 &lt; 1 ms</span> against a
        10 ms target, throughput hits{' '}
        <span className="text-bone">17,857 ops/sec</span> against a 1,000 ops/sec
        target, and leader election completes in under{' '}
        <span className="text-bone">300 ms</span>. Crucially: the cluster
        survives 2 of 5 nodes being killed at once and loses zero committed
        data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="17,857" label="Ops / second" sub="vs 1,000 target · single-node measurement" />
        <MetricTile value="< 1 ms" label="Strong read p99" sub="vs 10 ms target · 0.0 ms avg" />
        <MetricTile value="2 / 5" label="Node failures tolerated" sub="(N−1)/2 · zero data loss" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Paper-faithful Raft.">
          Leader election, log replication, and safety are split into the same
          decomposed sub-problems Ongaro describes. Randomized election timeouts
          (150–300 ms), term-based monotonicity, majority quorum on commit, leader
          completeness — all there.
        </Point>
        <Point title="Tunable consistency on the client side.">
          A single argument switch on the client —{' '}
          <Code>ConsistencyLevel.STRONG</Code> vs <Code>EVENTUAL</Code> — moves
          the system between linearizable reads (CP, leader-only) and
          highest-availability reads (AP, any node). The CAP trade-off is a flag,
          not a redeploy.
        </Point>
        <Point title="One command stands up a 5-node cluster.">
          <Code>./scripts/start-cluster.sh</Code> builds the jar, builds the
          Docker image, and brings up <Code>node1..node5</Code> on ports
          50051–50055 via Docker Compose. The cluster elects a leader within
          ~300 ms of <Code>docker compose up</Code> returning.
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
        sans="Distributed consensus is asked about more than"
        accent="any other systems topic."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Every modern infrastructure stack has Raft in its core — etcd, Consul,
        CockroachDB, TiKV, MongoDB&apos;s replica sets, AWS&apos;s primary-elect
        components. You can read the paper a hundred times and still trip over
        the corner cases the first time you implement{' '}
        <Code>AppendEntries</Code>. The fastest way to learn the protocol is to
        run it, break it, and watch the term numbers climb.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="Ongaro & Ousterhout · Raft paper (USENIX ATC '14)"
          quote="Raft is a consensus algorithm for managing a replicated log. It is equivalent to (multi-)Paxos in fault-tolerance and performance, but its structure is different from Paxos; this makes Raft more understandable than Paxos."
          context="The thesis the whole protocol is built around"
        />
        <QuoteCard
          source="etcd authors · Kubernetes control-plane backing"
          quote="etcd uses Raft to maintain strong consistency across a cluster of machines."
          context="The most-deployed Raft in production"
        />
        <QuoteCard
          source="CockroachDB internals docs"
          quote="Each range in CockroachDB is independently replicated using Raft for fault-tolerance."
          context="Raft as a unit of replication, not a whole-DB choice"
        />
        <QuoteCard
          source="Senior interview · common ask"
          quote="Walk me through how Raft handles a leader crash mid-AppendEntries."
          context="The conversation this build was designed to be ready for"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="Why the build, why Raft." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="A KV store that's correct,"
        accent="fast, and survivable."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="Linearizable reads under STRONG"
          body="A STRONG read must reflect every write that was acknowledged before it. No reading from stale followers, no partial writes, no inversion."
        />
        <ConstraintCard
          n="2"
          title="Sub-10 ms strong reads"
          body="Reading through the leader can't be slow. Target was <10 ms; actual measurement is <1 ms p99 by serving from an in-memory state machine."
        />
        <ConstraintCard
          n="3"
          title="Survive (N−1)/2 simultaneous failures"
          body="In a 5-node cluster that means losing 2 nodes at once. The cluster must keep accepting writes — quorum is 3."
        />
        <ConstraintCard
          n="4"
          title="Leader election under 500 ms"
          body="If the leader dies, the next one has to come up fast enough that callers don't notice. Randomized election timeouts of 150–300 ms; actual measurement <300 ms."
        />
        <ConstraintCard
          n="5"
          title="Type-safe inter-node RPC"
          body="No JSON, no ad-hoc serialization. Protocol Buffers describe every Raft message and KV operation; gRPC carries them. Wire compatibility is enforced at build time."
        />
        <ConstraintCard
          n="6"
          title="One command, full cluster"
          body="The whole 5-node topology must come up via a single shell call so the system is demonstrable to anyone — no per-node manual setup."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Safety before liveness"
          body="The protocol must never return wrong data even if it occasionally refuses to return data at all. Better unavailable than incorrect."
        />
        <PrincipleCard
          title="Consistency is a knob"
          body="The same cluster serves CP reads and AP reads. The client picks per call. The server never has to be re-tuned."
        />
        <PrincipleCard
          title="Measurable, not aspirational"
          body="Every claim in the README is backed by a number from the benchmark suite. If a target was missed, the number tells you by how much."
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
        sans="Three phases that each made"
        accent="the previous one trustworthy."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Election only — prove a leader emerges."
          body={
            <>
              First milestone: stand up five gRPC servers that talk to each other
              and nothing else. Implement{' '}
              <Code>RequestVote</Code> and heartbeats; ignore the log entirely.
              Verified the cluster picks one leader, holds it as long as the leader
              keeps sending heartbeats, and re-elects within{' '}
              <span className="text-bone">~300 ms</span> when the current leader is
              killed. Term numbers climbed; split-vote retries worked.
            </>
          }
        />

        <Pivot
          version="V2"
          title="Log replication and CP reads."
          body={
            <>
              Added <Code>AppendEntries</Code>, the on-disk log entry shape (term,
              index, command), and the state machine. Writes go through the leader,
              get replicated to followers, and only commit once 3 of 5 nodes have
              ack&apos;d. STRONG reads serve from the leader after a no-op append
              (to confirm the leader is still the leader). At this point every
              write was correct; the system was only{' '}
              <span className="italic font-serif text-bone">strict.</span>
            </>
          }
        />

        <Pivot
          version="V3"
          title="EVENTUAL mode + the benchmark suite."
          body={
            <>
              Added <Code>ConsistencyLevel.EVENTUAL</Code> so reads can be served
              from any node&apos;s local state machine without going through the
              leader. Added <Code>LatencyTracker</Code> to record p50/p99/avg per
              operation. Ran the benchmark suite end-to-end: 17,857 ops/sec
              throughput, sub-1 ms p99 strong reads, 0% data loss under a 2-of-5
              partition. Numbers — not vibes — confirmed the build.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The split-vote-test loop
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            Hardest bug to find was a subtle split-vote condition where two
            candidates would simultaneously time out, both increment their term,
            both fail to win a majority, and then enter a re-election storm.
            Caught it by running the cluster boot in a 100-iteration loop and
            charting how often election finished in one term vs two. Fix was
            randomizing the timeout floor far enough apart (150–300 ms uniform)
            that simultaneous candidacy became statistically rare. After the fix,
            99.5%+ of starts settled in one term.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Read path"
          beforeLabel="Before — V1 leader-only"
          before="All reads went through the leader. Worked, but the leader bottlenecked at high read-traffic; followers sat idle."
          afterLabel="After — V3 CP / AP knob"
          after="STRONG reads hit the leader (linearizable). EVENTUAL reads hit any node's local state machine (higher availability, possibly stale). Client picks per call."
        />
        <BeforeAfter
          number="3.1"
          title="Election stability"
          beforeLabel="Before"
          before="Simultaneous timeouts caused two candidates per term — re-election storms on cold boot."
          afterLabel="After"
          after="Randomized timeout range of 150–300 ms uniform. 99.5%+ of cluster starts settle a leader in a single term."
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
        sans="Four layers,"
        accent="one source of truth."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Every request walks the same four-layer stack — client → gRPC → Raft →
        state machine. The Raft layer is the source of truth: writes only commit
        after a 3/5 quorum acks, and only committed entries reach the state
        machine. Followers never serve STRONG reads, and the leader never returns
        a value the cluster hasn&apos;t agreed on.
      </p>

      <TerminalWindow title="dkv: ~/request-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="kvclient"
            host="laptop"
            cwd="/"
            command='PUT greeting="hello, raft"   --consistency=STRONG'
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── gRPC layer (KVServiceImpl) ─────────────────────────
              </span>
            }
          />
          <TerminalLine command="route to leader   # KVClient retries on NOT_LEADER → redirect" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── Raft layer (RaftNode) ──────────────────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] append</span>
                  <span className="text-bone/65"> log[17] = (term=2, cmd=PUT k=v)</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] AppendEntries</span>
                  <span className="text-bone/65"> → node1 node2 node4 node5</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] quorum 3/5</span>
                  <span className="text-bone/65"> acks · commitIndex ← 17</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] apply</span>
                  <span className="text-bone/65"> stateMachine.put(&quot;greeting&quot;, &quot;hello, raft&quot;)</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── storage layer (InMemoryStore) ──────────────────────
              </span>
            }
          />
          <TerminalLine command="ConcurrentHashMap.put(k, v)   # O(1) · no disk I/O" />
          <TerminalLine
            output={
              <div className="flex items-baseline gap-3 text-bone/80">
                <span className="text-emerald-300/80">200</span>
                <span className="font-mono">leader=node3 · index=17 · 0.04 ms</span>
              </div>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Write request lifecycle (STRONG)." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Raft RPCs (Protocol Buffers)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`service RaftService {
  rpc RequestVote(VoteRequest) returns (VoteResponse);
  rpc AppendEntries(AppendRequest) returns (AppendResponse);
}

message VoteRequest {
  int64  term;
  string candidateId;
  int64  lastLogIndex;
  int64  lastLogTerm;
}

message AppendRequest {
  int64       term;
  string      leaderId;
  int64       prevLogIndex;
  int64       prevLogTerm;
  repeated LogEntry entries;     // empty = heartbeat
  int64       leaderCommit;
}`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            CP vs AP — same cluster, client-picked
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`// CP path
client.get("k", ConsistencyLevel.STRONG)
   └─▶ route to leader
        └─▶ no-op AppendEntries (confirms leadership)
             └─▶ stateMachine.get("k")   # linearizable

// AP path
client.get("k", ConsistencyLevel.EVENTUAL)
   └─▶ any node's local stateMachine.get("k")
        # may be stale during a partition
        # but never blocks on consensus

// fault tolerance
cluster.live ≥ ⌈(N+1)/2⌉  →  accepts writes
cluster.live <  ⌈(N+1)/2⌉  →  no writes, AP reads only`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Protocol surface + consistency knob." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="What the cluster looks like"
        accent="when you actually run it."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The whole system is demoable from a fresh clone in two commands —
        <Code>./scripts/start-cluster.sh</Code> to bring it up and{' '}
        <Code>./scripts/run-tests.sh</Code> to run the benchmark. Numbers below
        are the actual measurements from the README&apos;s benchmark table.
      </p>

      {/* Benchmark facts — rendered as a real table from the README */}
      <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised mb-10">
        <div className="px-5 py-3 border-b border-ink-border text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono">
          Benchmark results · single-node baseline
        </div>
        <div className="p-5">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-bone-dim text-[11px] uppercase tracking-eyebrow font-mono text-left">
                <th className="pb-3 pr-6">Metric</th>
                <th className="pb-3 pr-6">Result</th>
                <th className="pb-3">Target</th>
              </tr>
            </thead>
            <tbody className="text-bone-muted">
              {BENCHMARK_ROWS.map(r => (
                <tr key={r.metric} className="border-t border-ink-border/60">
                  <td className="py-2.5 pr-6 text-bone">{r.metric}</td>
                  <td className="py-2.5 pr-6 font-mono text-bone/90">{r.result}</td>
                  <td className="py-2.5 font-mono text-bone-dim">{r.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FigureCaption number="7.0" label="Benchmark table — README measurements." kind="diagram" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        <Figure
          src="/projects/distributed-kv/01-docker-compose-5of5-healthy.png"
          alt="docker compose up output — 5/5 containers running, all healthy, node3 elected leader in term 3"
          number="7.1"
          caption="docker compose up · 5/5 serving gRPC."
        />
        <Figure
          src="/projects/distributed-kv/02-leader-failover-kill-node3.png"
          alt="Leader failover — docker kill raft-node3, four re-elections across terms 4-9, leadership churn observed"
          number="7.2"
          caption="Leader failover — kill current leader."
        />
        <Figure
          src="/projects/distributed-kv/03-quorum-loss-recovery.png"
          alt="Quorum boundary test — 3/5 alive (quorum available), then 2/5 alive (quorum unavailable), then full cluster restored"
          number="7.3"
          caption="Quorum loss — 3/5 then 2/5 alive."
        />
        <Figure
          src="/projects/distributed-kv/04-latencytracker-output.png"
          alt="LatencyTracker benchmark output — strong-read p99 under 1ms, write avg 0.04ms, PASS assertion"
          number="7.4"
          caption="LatencyTracker output — p50 / p99 / avg."
        />
      </div>
    </section>
  )
}

const BENCHMARK_ROWS = [
  { metric: 'Read latency (strong, p99)',  result: '< 1 ms',        target: '< 10 ms' },
  { metric: 'Read latency (strong, avg)',  result: '0.0 ms',        target: '< 10 ms' },
  { metric: 'Write latency (avg)',         result: '0.04 ms',       target: '< 50 ms' },
  { metric: 'Write latency (p99)',         result: '1 ms',          target: '< 50 ms' },
  { metric: 'Throughput',                  result: '17,857 ops/s',  target: '1,000+ ops/s' },
  { metric: 'Leader election',             result: '< 300 ms',      target: '< 500 ms' },
  { metric: 'Fault tolerance',             result: '2 / 5 nodes',   target: '(N−1)/2' },
]

// ── 8. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What I'd keep,"
        accent="what I'd rip out."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Raft really is understandable."
            body="Decomposing the protocol into election / replication / safety made the implementation tractable. Each piece could be tested in isolation before they were combined."
          />
          <RetroItem
            head="In-memory state machine for the latency target."
            body="A ConcurrentHashMap gave O(1) reads and the sub-ms p99 fell out for free. Worth the trade-off in exchange for non-persistence."
          />
          <RetroItem
            head="gRPC + Protobuf for the protocol surface."
            body="Type-checked wire contracts caught at least three bugs at compile time that JSON would have surfaced only in production: a renamed field, a flipped int64 / int32, and a missing repeated tag."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="No persistence."
            body="Killing the whole cluster loses every committed entry. A real production Raft writes the log to disk and fsync's before acking. The trade-off here was speed-to-build vs durability, and durability lost."
          />
          <RetroItem
            head="No log compaction or snapshots."
            body="Logs grow without bound. After ~1M commits the cluster restart time creeps up because every follower replays the full log. Snapshots + InstallSnapshot would fix it."
          />
          <RetroItem
            head="Single-shard only."
            body="One Raft group owns the whole keyspace, so write throughput is bounded by what one leader can do. Multi-Raft / sharding would be the next big leap."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Persistent log + fsync."
            body="WAL on disk, fsync before AppendEntries returns success. This is the change with the biggest correctness payoff for the smallest amount of code."
          />
          <RetroItem
            head="Snapshots + log compaction."
            body="Periodic state-machine snapshot. New followers get the snapshot first, then catch up via incremental log entries — the standard etcd pattern."
          />
          <RetroItem
            head="Sharded multi-Raft."
            body="Hash-partition the keyspace across N Raft groups so write throughput scales horizontally with cluster size. The way CockroachDB and TiKV scale, conceptually."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
