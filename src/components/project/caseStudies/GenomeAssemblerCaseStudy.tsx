/**
 * De Bruijn Genome Assembler — full case-study body.
 *
 * Real facts pulled from the README at
 * github.com/MustakimFS/debruijn-genome-assembler. Example output, benchmark
 * numbers, CLI flags, and pipeline stages all match the source.
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

export const GENOME_ASSEMBLER_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function GenomeAssemblerCaseStudy() {
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
        sans="Reassemble a genome from"
        accent="thirty-three thousand fragments."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Sole engineer" />
        <p className="text-bone-muted">
          End-to-end build: Java CLI assembler, Spring Boot REST API, React +
          Vite frontend, Docker packaging, deployed split-stack to Render
          (backend) + Vercel (frontend). Implements{' '}
          <span className="text-bone">de Bruijn graph construction</span>,{' '}
          <span className="text-bone">Hierholzer&apos;s Eulerian cycle</span>,
          and error correction via tip removal + bubble resolution — all from
          the bioinformatics primary literature, no library shortcuts.
        </p>

        <Meta
          label="Stack"
          value="Java 17 · Spring Boot 3 · Maven · React · Vite · Docker · Render · Vercel"
        />
        <p className="text-bone-muted">
          One assembler jar drives a CLI ({' '}
          <Code>java -jar genome-toolkit-1.0.0.jar assemble ...</Code>) and the
          REST endpoint inside the Spring Boot service. The React frontend is a
          thin drag-and-drop client over the same API. Two assembly modes ship
          — the de Bruijn pipeline as primary, and a greedy maximum
          suffix-prefix overlap assembler as a baseline.
        </p>

        <Meta label="Timeline" value="Apr 2026 · solo" />
        <p className="text-bone-muted">
          Lives at{' '}
          <Code>debruijn-genome-assembler.vercel.app</Code>. Validates on the
          phi X174 bacteriophage reference — the canonical small-bacteriophage
          genome for sequencing tools —{' '}
          <span className="italic font-serif text-bone">
            reconstructing 5,396 bp from 33,609 reads in under two seconds.
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
        sans="A de Bruijn assembler that"
        accent="finishes in under two seconds."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        On the phi X174 benchmark (5,386 bp reference, 33,609 reads) the
        pipeline reconstructs{' '}
        <span className="text-bone">5,396 bases</span> at{' '}
        <span className="text-bone">99.9% coverage</span>, traverses a graph of
        ~111K edges via an iterative Hierholzer&apos;s implementation, and
        finishes in ~2 seconds on a laptop. Tip removal prunes 18 dead-end
        branches; bubble resolution picks the higher-coverage path on 2
        competing parallels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="99.9%" label="Coverage (phi X174)" sub="5,396 bp assembled · 5,386 bp ref" />
        <MetricTile value="33,609" label="Input reads → graph" sub="111K vertices · 111K edges" />
        <MetricTile value="~2 s" label="End-to-end runtime" sub="laptop · k=20 · Java 17" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="The pipeline is the algorithm, not a library wrapper.">
          K-mer extraction, graph construction, tip removal, bubble resolution,
          Eulerian traversal, and circular trim are all hand-implemented from
          the source bioinformatics literature. <Code>SPAdes</Code> and{' '}
          <Code>Velvet</Code> are referenced for verification, not imported.
        </Point>
        <Point title="Two assemblers, one CLI.">
          The same jar runs the de Bruijn pipeline (
          <Code>assemble</Code>) and a greedy overlap baseline (
          <Code>overlap</Code>). The overlap mode exists so the graph-based
          mode has something to be compared against.
        </Point>
        <Point title="Web UI for non-engineers.">
          Drop a FASTA or plain-reads file into the React frontend, pick a
          k-mer size, watch the assembly result and download the genome. Same
          algorithm, no terminal required.
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
        sans="Genome assembly is"
        accent="graph algorithms with a dictionary."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        Modern sequencers don&apos;t produce genomes — they produce millions of
        short reads, each 100–300 bp, that have to be stitched back into the
        original sequence. The classic computer-science answer is the{' '}
        <span className="text-bone">de Bruijn graph</span>: every k-mer becomes
        a vertex, every (k+1)-mer becomes an edge, and an Eulerian traversal
        of the graph reconstructs the source. Production tools like SPAdes
        and Velvet are de Bruijn at their core, with a couple of decades of
        engineering on top of the basic structure.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="Compeau, Pevzner, Tesler · Nature Biotechnology, 2011"
          quote="How to apply de Bruijn graphs to genome assembly — the canonical reference for the algorithmic approach this project implements."
          context="The paper this toolkit follows"
        />
        <QuoteCard
          source="Hierholzer, 1873"
          quote="Construct an Eulerian circuit in a graph by depth-first edge traversal with backtracking on dead ends — used in iterative form here for memory safety on the 111K-edge graph."
          context="The traversal algorithm at the core"
        />
        <QuoteCard
          source="SPAdes / Velvet · production assemblers"
          quote="State-of-the-art short-read assemblers use de Bruijn graphs with error correction (tip removal + bubble resolution) and multi-k assembly."
          context="The blueprint this project follows on the toolkit side"
        />
        <QuoteCard
          source="phi X174 — Sanger, 1977"
          quote="First DNA-based genome ever sequenced — 5,386 bp. Still the canonical small benchmark for any new assembler."
          context="The reference this toolkit validates against"
          spanFull
        />
      </div>
      <FigureCaption number="1.0" label="The algorithmic lineage." kind="diagram" />
    </section>
  )
}

// ── 4. The Problem ────────────────────────────────────────────────────────

function Problem() {
  return (
    <section id="problem" className="scroll-mt-24">
      <SectionLabel className="mb-4">The Problem</SectionLabel>
      <HeroHeading
        sans="A de Bruijn assembler"
        accent="from the paper, not a wrapper."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="Implement the algorithm, not import it"
          body="The whole point of the build was understanding-through-implementation. No SPAdes wrapper, no Bio4j shortcut. K-mer extraction, graph construction, tip removal, bubble resolution, and Eulerian traversal are all hand-rolled in Java."
        />
        <ConstraintCard
          n="2"
          title="Memory safety on ~111K edges"
          body="A recursive Hierholzer's blows the JVM stack on a graph this size. The traversal has to be iterative — explicit stack + edge-consumed bitmap."
        />
        <ConstraintCard
          n="3"
          title="Error correction without overcorrection"
          body="Real reads have sequencing errors that become tips and bubbles in the graph. Remove them too aggressively and the genome gets fragmented; not enough and the assembly stays wrong. Configurable thresholds, validated against phi X174 coverage."
        />
        <ConstraintCard
          n="4"
          title="Two input formats, one pipeline"
          body="Plain reads (one per line) and FASTA (with sliding-window read simulation from a reference). Both must produce the same graph for the same content."
        />
        <ConstraintCard
          n="5"
          title="N-bases break k-mer indexing"
          body="Reads containing N (ambiguous base) corrupt the (k-1)-mer vertex set if passed through. Filter before graph construction; transparent to the user."
        />
        <ConstraintCard
          n="6"
          title="One toolkit, two surfaces"
          body="Same jar serves the CLI for power users and the REST API behind the React frontend. Drag-and-drop UI for non-engineers; --stats output for everyone else."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="Iterative over recursive"
          body="On graphs this size, recursion is a stack-overflow waiting for the right input. Every traversal in the pipeline is iterative with explicit state."
        />
        <PrincipleCard
          title="Verifiable against a reference"
          body="The whole reason phi X174 is the benchmark is that you can compare assembled output to a known ground truth. 99.9% coverage isn't a vibe; it's a string match."
        />
        <PrincipleCard
          title="Two assemblers for one comparison"
          body="A greedy overlap baseline exists only so the de Bruijn pipeline has something to be measurably better than. Algorithms without baselines are folklore."
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
        sans="Build the graph, walk the cycle,"
        accent="clean the noise."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="Greedy overlap baseline."
          body={
            <>
              Started with the simpler algorithm — pairwise maximum
              suffix-prefix overlap merging. Works on short read sets and is
              easy to verify by hand, but scales{' '}
              <Code>O(n²)</Code> on the number of reads. Kept it in the jar
              under the <Code>overlap</Code> subcommand as the comparison
              baseline.
            </>
          }
        />

        <Pivot
          version="V2"
          title="De Bruijn graph + recursive Hierholzer."
          body={
            <>
              First de Bruijn implementation. K-mer extraction, vertex / edge
              construction, and a textbook recursive Hierholzer&apos;s
              traversal. Assembled correctly on toy inputs (~1K edges) and
              promptly stack-overflowed at full phi X174 scale (~111K edges).
              The algorithm was right; the implementation was wrong.
            </>
          }
        />

        <Pivot
          version="V3"
          title="Iterative Hierholzer + error correction."
          body={
            <>
              Rewrote the traversal as an explicit-stack iterative
              implementation. Added tip removal (dead-end branches shorter than
              a configurable depth threshold) and bubble resolution (parallel
              paths between the same two vertices, resolved by coverage
              comparison). Now finishes phi X174 in{' '}
              <span className="text-bone">~2 seconds</span> at{' '}
              <span className="text-bone">99.9% coverage</span>, prunes 18
              tips, resolves 2 bubbles.
            </>
          }
        />

        <div className="border-l-2 border-emerald-500/30 pl-4 py-2 max-w-2xl">
          <div className="text-emerald-400 text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The circular-trim gotcha
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            phi X174 is a circular genome — the assembled string starts and
            ends with the same k-1 prefix because the Eulerian cycle closes on
            itself. The first version of the output left those duplicated
            bases in place and reported{' '}
            <span className="text-bone">5,416 bp</span> instead of 5,396. Fix:
            detect the overlap window between the head and tail of the
            assembled string and trim it, controllable via{' '}
            <Code>--no-trim</Code> for non-circular references.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Hierholzer's implementation"
          beforeLabel="Before — V2 recursive"
          before="Recursive depth-first traversal. Beautiful 12-line implementation that stack-overflows on any non-trivial graph. JVM gives up around 64K depth."
          afterLabel="After — V3 iterative"
          after="Explicit Deque<Edge> stack + visited bitmap. Same algorithm, no recursion. Handles 111K-edge phi X174 graph in 1.8 seconds with stable memory footprint."
        />
        <BeforeAfter
          number="3.1"
          title="Reported genome length"
          beforeLabel="Before"
          before="5,416 bp on phi X174. Algorithm correct, output wrong — duplicated head/tail bases from the circular topology."
          afterLabel="After"
          after="5,396 bp at 99.9% coverage. Circular-trim detects the head/tail overlap and removes it. --no-trim flag for non-circular inputs."
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
        sans="Seven stages,"
        accent="one Eulerian walk."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The de Bruijn pipeline is seven deterministic stages — every stage
        consumes a typed input from the previous one and produces a typed
        output for the next. No hidden mutation, no global state. Same code
        powers the CLI and the REST endpoint.
      </p>

      <TerminalWindow title="genome-toolkit: ~/pipeline">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="cli"
            host="laptop"
            cwd="/"
            command="assemble data/dataset1.txt --stats   # k=20"
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── assembly pipeline ───────────────────────────────────
              </span>
            }
          />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-cyan-400">[1] extract</span>
                  <span className="text-bone/65"> k-mers from reads · filter N-bases · k=20</span>
                </div>
                <div>
                  <span className="text-cyan-400">[2] build</span>
                  <span className="text-bone/65"> de Bruijn graph · (k-1)-mer vertices, k-mer edges</span>
                </div>
                <div>
                  <span className="text-cyan-400">[3] tips</span>
                  <span className="text-bone/65"> remove dead-end branches · depth threshold</span>
                </div>
                <div>
                  <span className="text-cyan-400">[4] bubbles</span>
                  <span className="text-bone/65"> resolve parallel paths · keep higher-coverage</span>
                </div>
                <div>
                  <span className="text-cyan-400">[5] euler</span>
                  <span className="text-bone/65"> iterative Hierholzer · explicit-stack DFS</span>
                </div>
                <div>
                  <span className="text-cyan-400">[6] trim</span>
                  <span className="text-bone/65"> detect circular head/tail overlap · trim duplicate</span>
                </div>
                <div>
                  <span className="text-cyan-400">[7] emit</span>
                  <span className="text-bone/65"> assembled genome · graph stats · runtime</span>
                </div>
              </div>
            }
          />
          <TerminalLine
            output={
              <div className="flex items-baseline gap-3 text-bone/80">
                <span className="text-emerald-300/80">done</span>
                <span className="font-mono">5,396 bp · 99.9% cov · 1,812 ms · 18 tips · 2 bubbles</span>
              </div>
            }
          />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Pipeline lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Iterative Hierholzer's
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`Deque<Vertex>  stack  = new ArrayDeque<>();
List<Edge>     trail  = new ArrayList<>();
BitSet         used   = new BitSet(edges.size());

stack.push(startVertex);

while (!stack.isEmpty()) {
    Vertex v = stack.peek();
    Edge next = graph.unusedOutgoing(v, used);

    if (next == null) {                // dead-end → backtrack
        trail.add(graph.incoming(v));
        stack.pop();
    } else {                           // walk forward
        used.set(next.id());
        stack.push(next.dest());
    }
}

// trail is the Eulerian circuit in reverse
Collections.reverse(trail);`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            CLI surface
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`# Primary mode
genome-toolkit assemble <reads-file> [options]

  -k <size>     k-mer size (default 20)
  -o <file>     write assembled genome to file
  --no-trim     disable circular trim
  --no-tips     disable tip removal
  --stats       print assembly statistics

# Baseline mode
genome-toolkit overlap <reads-file>
  # greedy maximum suffix-prefix overlap merging
  # O(n²) on reads — for small-set comparison only

# Inputs
  reads.txt     one read per line
  ref.fasta     FASTA — sliding-window simulated reads`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Traversal + CLI surface." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="A drag-and-drop UI in front of"
        accent="the same assembler."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        Two surfaces, one engine. The CLI is the truth-teller — every flag,
        every stat, full reproducibility. The web UI at{' '}
        <Code>debruijn-genome-assembler.vercel.app</Code> wraps the same jar
        behind a Spring Boot REST endpoint, accepts file drops, and renders
        the same assembly result + downloadable genome.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Figure
          src="/projects/genome-assembler/landing.png"
          alt="Genome Assembler — drag-and-drop landing with k-mer size and demo data button"
          number="7.0"
          caption="Web UI — drag-and-drop landing."
        />
        <Figure
          src="/projects/genome-assembler/demo-loaded.png"
          alt="Demo data loaded — dataset1.txt, 0.02 KB, ready to assemble"
          number="7.1"
          caption="Demo data loaded — one click to assemble."
        />
      </div>

      <div className="mt-8">
        <Figure
          src="/projects/genome-assembler/assembly-complete.png"
          alt="Assembly complete — 5,396 bp, 33,609 reads, 26,455 ms, genome sequence preview"
          number="7.2"
          caption="Assembly complete — 5,396 bp from 33,609 reads, sequence preview + download."
        />
      </div>

      {/* Live preview — clickable browser window linking to deployed app */}
      <div className="mt-14">
        <a
          href="https://debruijn-genome-assembler.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <BrowserWindow url="debruijn-genome-assembler.vercel.app">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/projects/genome-assembler/landing.png"
                alt="Live app — De Bruijn Genome Assembler"
                className="w-full block"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-bone text-sm font-medium flex items-center gap-2">
                  Open live app ↗
                </span>
              </div>
            </div>
          </BrowserWindow>
        </a>
        <FigureCaption number="7.3" label="Live at debruijn-genome-assembler.vercel.app — click to open." kind="image" />
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
        sans="What survived,"
        accent="what I'd assemble differently."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Iterative traversal scaled where recursion didn't."
            body="Same Hierholzer's algorithm, two implementations. Recursive stack-overflowed at 111K edges; iterative finishes in 1.8 seconds and uses bounded heap. The lesson generalizes well beyond bioinformatics."
          />
          <RetroItem
            head="The greedy baseline justified the de Bruijn build."
            body="Without an in-repo comparison, 'I implemented de Bruijn' is folklore. With it, you can show the O(n²) overlap behavior on the same input and explain why the graph pays off."
          />
          <RetroItem
            head="One jar, two surfaces."
            body="The CLI and the REST API share the same assembler class. Bug fixes land in both at once; behavior is provably identical."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="Only validated on phi X174."
            body="Small bacteriophage at ~5.4kb is the toy dataset. Anything closer to a real bacterial genome (~5 Mb) needs more careful memory management — and probably multi-k assembly."
          />
          <RetroItem
            head="No paired-end support."
            body="Real Illumina sequencing produces paired reads with known insert sizes — invaluable for resolving repeats. The current pipeline treats every read independently."
          />
          <RetroItem
            head="Render cold start hurts the demo."
            body="The Spring Boot backend on Render free tier sleeps after 15 minutes idle and takes ~10 seconds to warm. First-load impression of the demo is worse than the assembler deserves."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Multi-k assembly."
            body="SPAdes-style — assemble at several k values, merge results. Larger k for long unique stretches, smaller k where coverage drops. Standard move for scaling beyond toy genomes."
          />
          <RetroItem
            head="Paired-read scaffolding."
            body="Use insert-size information to bridge across repeats that single reads can't resolve. The classic next-step after a working de Bruijn core."
          />
          <RetroItem
            head="Always-warm backend."
            body="Migrate the Render service to a paid tier or a fly.io always-warm container so the first demo click responds in ~200ms, not 10 seconds."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
