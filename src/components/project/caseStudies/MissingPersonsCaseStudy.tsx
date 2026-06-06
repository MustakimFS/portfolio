/**
 * Missing Persons Knowledge Graph — full case-study body.
 *
 * Pattern mirrors MetyCaseStudy.tsx + AegisflowCaseStudy.tsx. Each
 * <section id="…"> matches an entry in `MISSING_PERSONS_SECTIONS` so the
 * sticky sidebar can highlight the active one. Real facts pulled from the
 * project README and the IEEE COMPSAC 2025 submission; sections marked with
 * `.placeholder-badge` still need user content (specifically: real demo
 * screenshots dropped under /public/projects/missing-persons-kg/).
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

export const MISSING_PERSONS_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'context', label: 'Context' },
  { id: 'problem', label: 'The Problem' },
  { id: 'process', label: 'Process' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'final', label: 'Final Designs' },
  { id: 'retro', label: 'Retrospective' },
]

export default function MissingPersonsCaseStudy() {
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
        sans="A knowledge graph for"
        accent="the people we lose."
        size="md"
        className="mb-5"
      />

      <div className="mb-8">
        <a
          href="https://ieeexplore.ieee.org/document/11126748"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-bone hover:text-bone-muted text-sm font-medium border-b border-bone/20 hover:border-bone/40 pb-0.5 transition-colors"
        >
          Read on IEEE Xplore <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="My Role" value="Continuation engineer & deployer" />
        <p className="text-bone-muted">
          Originally a six-person SER531 team project at ASU under the Semantic
          Web Technologies course. I continued the work solo after the semester:
          rewrote the query layer from a paid Java/Jena GraphDB stack into{' '}
          <span className="text-bone">FastAPI + RDFLib</span>, ported the React
          client to Vite, shipped the whole thing to Vercel + Render free tier,
          and prepared the resulting paper for IEEE COMPSAC 2025.
        </p>

        <Meta
          label="Stack"
          value="Protégé · OWL · RDFLib · SPARQL · FastAPI · React · Vite · Tailwind · NamUs"
        />
        <p className="text-bone-muted">
          The ontology is authored in <Code>Protégé</Code> and serialized to
          Turtle (<Code>result-triples.ttl</Code>). FastAPI loads the graph into
          an in-memory <Code>rdflib.Graph</Code> at boot, then maps incoming REST
          filters to SPARQL queries against it. The React client is a thin
          consumer — table / card toggle, detail view, Google Maps embed for
          last-known location.
        </p>

        <Meta
          label="Timeline"
          value="Spring 2025 (team) · summer continuation · IEEE COMPSAC Aug 2025"
        />
        <p className="text-bone-muted">
          Project shipped to a paying GraphDB at end of SER531; rebuilt on a{' '}
          <span className="text-bone">$0 infra budget</span> over the summer;
          paper accepted at{' '}
          <span className="italic font-serif text-bone">IEEE COMPSAC 2025</span>{' '}
          (Toronto, 27% acceptance rate) under the title{' '}
          <em>
            &ldquo;Enhanced Tracking and Reporting of Missing Persons Using
            Semantic Web Technologies.&rdquo;
          </em>
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
        sans="One ontology,"
        accent="thousands of cases, zero dollars."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-10 max-w-2xl">
        The point of the rebuild was reach: the original GraphDB / Azure stack
        was excellent but cost{' '}
        <span className="text-bone">~$50 / month</span> and would die the moment
        the team stopped paying. Migrating to an in-process RDF graph kept the
        same SPARQL semantics, ran at the same speed, and dropped the operating
        cost to{' '}
        <span className="text-bone">$0 / month</span> on free tiers — a precondition
        for it staying alive long enough to be cited.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <MetricTile value="3,559" label="NamUs cases indexed" sub="California · Texas · Alaska" />
        <MetricTile value="< 100 ms" label="SPARQL query latency" sub="in-memory rdflib.Graph" />
        <MetricTile value="$0 / mo" label="Operating cost" sub="$50 → $0 vs the GraphDB stack" />
      </div>

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="IEEE COMPSAC 2025 publication.">
          Accepted at the 49th annual IEEE Computer Software and Applications
          Conference (Toronto, 27% acceptance rate). The paper documents the
          ontology, the in-memory query architecture, and the lessons from the
          GraphDB → RDFLib migration.
        </Point>
        <Point title="A custom OWL ontology, not a relational schema.">
          Cases, persons, locations, demographics, and case events are all RDF
          classes with typed properties — not foreign keys. That keeps the same
          domain model the original team modeled in Protégé and makes the data
          usable by other semantic-web tools without translation.
        </Point>
        <Point title="REST that speaks SPARQL underneath.">
          The FastAPI layer accepts familiar query params (
          <Code>?county=Fresno&amp;sex=F&amp;age_min=30</Code>) and translates them
          into SPARQL filters against the in-memory graph. The client never sees
          SPARQL, but a separate developer endpoint exposes the raw graph for
          researchers.
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
        sans="The data exists."
        accent="The questions are hard to ask."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        NamUs — the National Missing and Unidentified Persons System — is the
        canonical public dataset, but its search UI was built around looking up{' '}
        <em>a case you already know</em>. Researchers, families, and journalists
        who want to ask compound questions (
        <span className="text-bone">
          &ldquo;missing women in their thirties last seen in central California&rdquo;
        </span>
        ) end up scraping pages or pulling CSVs. A knowledge-graph layer is the
        right abstraction: it speaks the language the data was always going to
        live in.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <QuoteCard
          source="NamUs · NIJ"
          quote="Tens of thousands of new missing-persons cases are entered into NamUs each year, and a large share remain open."
          context="Scale signal — the dataset only grows"
        />
        <QuoteCard
          source="W3C · Semantic Web for Public Data"
          quote="Public-interest datasets benefit from RDF/OWL when querying patterns matter more than row lookups."
          context="The ontology-first argument"
        />
        <QuoteCard
          source="SER531 course brief · ASU"
          quote="Model a real-world domain in OWL. Demonstrate end-to-end queries via SPARQL. Justify the ontology."
          context="The course constraint that started it"
        />
        <QuoteCard
          source="GraphDB pricing — Ontotext, 2025"
          quote="GraphDB Free runs locally; production hosting starts ~$50/mo on standard cloud."
          context="The cost cliff we walked off"
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
        sans="A research-grade graph that has to"
        accent="run on no money."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        <ConstraintCard
          n="1"
          title="The ontology was non-negotiable"
          body="SER531 required OWL classes modeled in Protégé. Relational alternatives were off the table — the deliverable had to be semantic web from the source up."
        />
        <ConstraintCard
          n="2"
          title="No paid cloud budget after the semester"
          body="The original team deployment used GraphDB on Azure at ~$50/mo. Nobody was going to keep paying. To stay published-reproducible, the system had to run on Vercel + Render free tiers — indefinitely."
        />
        <ConstraintCard
          n="3"
          title="Real (not synthetic) NamUs data"
          body="3,559 cases across California, Texas, and Alaska — pulled from NamUs and shaped to fit the ontology. The graph had to load every record at startup without blowing memory on a free-tier dyno."
        />
        <ConstraintCard
          n="4"
          title="SPARQL semantics had to survive the rewrite"
          body="The original Java/Jena queries used SPARQL FILTER + OPTIONAL clauses extensively. The Python rewrite had to keep the exact same query semantics — same results, same ordering, same nulls."
        />
        <ConstraintCard
          n="5"
          title="Reproducible for the IEEE submission"
          body="The paper had to be re-runnable. Triples in the repo, ontology in the repo, queries documented. Anyone reading the paper had to be able to clone and curl /docs."
        />
        <ConstraintCard
          n="6"
          title="A team handoff with no follow-on contract"
          body="Original SER531 team disbanded at end of semester. Continuation work was solo and unfunded — every decision optimized for low maintenance, low cost, long uptime."
        />
      </div>

      <SectionLabel className="mb-4">North-star principles</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <PrincipleCard
          title="The ontology is the source of truth"
          body="Protégé .owl + Turtle triples sit at the center. Everything else — FastAPI, React, hosting — is replaceable around it."
        />
        <PrincipleCard
          title="In-memory beats networked"
          body="At this dataset size, loading the entire graph into rdflib at boot is faster than any external triplestore, and it fits comfortably in a free-tier 512 MB dyno."
        />
        <PrincipleCard
          title="REST on the outside, SPARQL on the inside"
          body="The client doesn't need to know about RDF. Every public endpoint is a normal query string; SPARQL is an implementation detail behind the API."
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
        sans="Three deployments that"
        accent="each killed the previous one."
        size="md"
        className="mb-10"
      />

      <div className="space-y-12">
        <Pivot
          version="V1"
          title="GraphDB on Azure (the SER531 hand-in)."
          body={
            <>
              The team submission ran <Code>GraphDB Free</Code> in a container on an
              Azure VM with a Java/Jena query frontend. It worked, the queries were
              fast, the SPARQL was textbook clean. It also cost about{' '}
              <span className="text-bone">$50 / month</span> and required someone to
              keep paying — a guarantee that the public demo would silently disappear
              once the semester ended.
            </>
          }
        />

        <Pivot
          version="V2"
          title="Apache Jena Fuseki on a free VPS."
          body={
            <>
              First migration attempt: keep Jena, drop the cloud bill. Stood up Fuseki
              on an Oracle Cloud free-tier VM. SPARQL parity was perfect, but free
              tiers go to sleep — cold starts pushed first-query latency past{' '}
              <span className="text-bone">5 s</span> after any quiet period. Not
              acceptable for a public-facing demo a journalist might land on once.
            </>
          }
        />

        <Pivot
          version="V3"
          title="rdflib in-process, FastAPI as the query layer."
          body={
            <>
              Replaced the whole external triplestore with{' '}
              <Code>rdflib.Graph</Code> loaded into FastAPI memory at startup. The
              ontology, instance triples, and inferred axioms all sit in process. SPARQL
              runs against the in-memory graph, returning bindings in{' '}
              <span className="text-bone">&lt; 100 ms</span> from a warm container.
              No external service, no second hop, no monthly bill.
            </>
          }
        />

        <div className="border-l-2 border-[#8c1d40]/40 pl-4 py-2 max-w-2xl">
          <div className="text-[#ffc627] text-[11px] uppercase tracking-eyebrow font-mono mb-1">
            The cold-start trick
          </div>
          <p className="text-bone-muted text-[14.5px] leading-relaxed">
            Render free-tier dynos still sleep after 15 minutes idle, and the first
            request after wake-up has to re-parse{' '}
            <Code>result-triples.ttl</Code> before serving. We added a small{' '}
            <Code>/health</Code> endpoint and a Vercel cron that pings it every 10
            minutes — the dyno stays warm, the graph stays loaded, the public demo
            keeps answering instantly. The cron itself runs free.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mt-12">
        <BeforeAfter
          number="3.0"
          title="Query backend"
          beforeLabel="Before — V1 GraphDB on Azure"
          before="External triplestore container, separate VM, $50/mo, manual restart on OOM."
          afterLabel="After — V3 rdflib in-process"
          after="Loaded into FastAPI memory at startup. Zero external dependencies, $0/mo, container restart auto-reloads the graph."
        />
        <BeforeAfter
          number="3.1"
          title="Operating cost"
          beforeLabel="Before"
          before="~$50 / month on Azure for a GraphDB VM that would die when the team stopped paying."
          afterLabel="After"
          after="$0 / month on Vercel (frontend) + Render (API free tier) — has stayed live continuously since the IEEE submission."
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
        sans="From Protégé ontology to"
        accent="a query in your URL bar."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed mb-8 max-w-2xl">
        The system is intentionally short — one ontology, one TTL serialization,
        one in-memory graph, one API layer, one client. There&apos;s no database
        and no message bus. The simplicity is the point: the paper has to be
        reproducible by a single reader with one <Code>git clone</Code> and one{' '}
        <Code>uvicorn</Code> invocation.
      </p>

      <TerminalWindow title="missing-persons: ~/request-lifecycle">
        <div className="p-5 sm:p-7 space-y-3.5">
          <TerminalLine
            user="browser"
            host="client"
            cwd="/"
            command='GET /api/cases?county=Fresno&sex=F&age_min=30&age_max=40'
          />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── FastAPI · query layer ──────────────────────────────
              </span>
            }
          />
          <TerminalLine command="parse query params → build SPARQL FILTER clauses" />
          <TerminalLine command="graph.query(sparql)  # rdflib.Graph (in memory)" />
          <TerminalLine
            output={
              <div className="space-y-1 text-[13px]">
                <div>
                  <span className="text-[#ffc627]">[1] ?case</span>
                  <span className="text-bone/65"> a :MissingPerson ;</span>
                </div>
                <div>
                  <span className="text-[#ffc627]">[2]</span>
                  <span className="text-bone/65">     :sex ?sex ; :age ?age ;</span>
                </div>
                <div>
                  <span className="text-[#ffc627]">[3]</span>
                  <span className="text-bone/65">     :lastSeenIn ?loc .</span>
                </div>
                <div>
                  <span className="text-[#ffc627]">[4]</span>
                  <span className="text-bone/65"> ?loc :county &quot;Fresno&quot; .</span>
                </div>
                <div>
                  <span className="text-[#ffc627]">[5]</span>
                  <span className="text-bone/65"> FILTER (?sex = &quot;F&quot; &amp;&amp; ?age &gt;= 30 &amp;&amp; ?age &lt;= 40) .</span>
                </div>
              </div>
            }
          />
          <TerminalLine command="serialize bindings → JSON  # demographics + photo + namus URL" />
          <TerminalLine
            output={
              <span className="text-bone-dim italic text-[12.5px]">
                ─── back to client ─────────────────────────────────────
              </span>
            }
          />
          <TerminalLine command='200 OK  [ { case: "MP-12041", ... }, ... ]   # < 100 ms' />
        </div>
      </TerminalWindow>
      <FigureCaption number="6.0" label="Request lifecycle." kind="diagram" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Ontology classes (excerpt)
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`:MissingPerson  a owl:Class .
   :caseId            xsd:string
   :name              xsd:string
   :sex               xsd:string
   :dateOfBirth       xsd:date
   :lastContactDate   xsd:date
   :lastSeenIn        :Location
   :hasDemographics   :Demographics
   :namusUrl          xsd:anyURI

:Location       a owl:Class .
   :city              xsd:string
   :county            xsd:string
   :state             xsd:string
   :lat / :lon        xsd:decimal

:Demographics   a owl:Class .
   :race              xsd:string
   :height_cm         xsd:integer
   :weight_kg         xsd:integer
   :eyeColor          xsd:string`}
          </pre>
        </div>

        <div className="bg-ink-raised border border-ink-border rounded-xl p-6">
          <div className="text-bone-dim text-[11px] uppercase tracking-eyebrow mb-3">
            Deployment topology
          </div>
          <pre className="text-[12.5px] leading-[1.6] text-bone-muted font-mono whitespace-pre-wrap">
{`Protégé (.owl)
   │  serialize
   ▼
result-triples.ttl   (in repo)
   │  load at boot
   ▼
FastAPI  ──  rdflib.Graph  (in process)
   │
   ▼
Render free tier  ←—  /health ping (Vercel cron, 10 min)
   ▲
   │  GET /api/cases?…
   │
React + Vite + Tailwind
   │
Vercel  (static frontend)`}
          </pre>
        </div>
      </div>
      <FigureCaption number="6.1" label="Deployment topology." kind="diagram" />
    </section>
  )
}

// ── 7. Final Designs ──────────────────────────────────────────────────────

function FinalDesigns() {
  return (
    <section id="final" className="scroll-mt-24">
      <SectionLabel className="mb-4">Final Designs</SectionLabel>
      <HeroHeading
        sans="The public surface ships at"
        accent="missing-persons-knowledge-graph.vercel.app."
        size="md"
        className="mb-10"
      />

      <p className="text-bone-muted text-[15px] leading-relaxed max-w-2xl mb-10">
        The deployed product is two surfaces. The frontend at{' '}
        <Code>missing-persons-knowledge-graph.vercel.app</Code> serves the
        search + table + detail UI; the API at{' '}
        <Code>missing-persons-knowledge-graph-1.onrender.com/docs</Code> exposes
        the same data via Swagger. Both are live as of the IEEE submission and
        are kept warm by the cron heartbeat described above.
      </p>

      {/* Two-column block: left = case detail + prose (wider), right = filter (narrower) */}
      <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-6 md:gap-8 items-stretch mb-12">
        {/* Left column — case detail screenshot + two paragraphs below */}
        <div className="flex flex-col">
          <Figure
            src="/projects/missing-persons/case-detail.png"
            alt="Case detail — Maria Munoz, demographics, Google Maps embed, NamUs deep link"
            number="7.0"
            caption="Case detail view."
          />
          <div className="text-bone-muted text-[14px] leading-relaxed space-y-3 mt-5">
            <p>
              <span className="text-bone">Each case renders as a full-page
              detail card.</span>{' '}
              Photo on the left, demographics + case information on the right —
              case number, date of last contact, location, biological sex, race.
              Below that: missing age vs. computed current age, full
              circumstance-of-disappearance narrative, and a Google Maps embed
              pinned to the lat/lon coordinates from the ontology.
            </p>
            <p>
              <span className="text-bone">The filter surface maps REST params to
              SPARQL.</span>{' '}
              Name, Case ID, sex (radio), race (multi-check), missing age range
              (check-bucket), county, city, and cause of disappearance — all
              compound-queryable in one submission. The backend translates every
              selected filter into a SPARQL FILTER clause against the in-memory
              graph and returns results in &lt; 100 ms.
            </p>
            <p>
              This example searches for a white male named John, aged 18–35,
              last seen in Santa Barbara under suspicious circumstances — the
              kind of compound query NamUs&apos;s own search UI was not built for.
            </p>
            <p>
              The &ldquo;View More on NamUs&rdquo; button at the bottom deep-links
              back to the official NamUs case page so the graph serves as a
              discovery layer, not a replacement for the primary source.
            </p>
          </div>
        </div>

        {/* Right column — advanced filter screenshot, stretched to match left column height */}
        <div className="flex flex-col">
          <div className="rounded-xl overflow-hidden border border-ink-border bg-ink-raised flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/missing-persons/advanced-filter.png"
              alt="Filter form — John, Male, White, 18-35, Santa Barbara, Suspicious circumstances"
              className="w-full h-full object-cover object-top block"
              loading="lazy"
            />
          </div>
          <FigureCaption number="7.1" label="Advanced filter — compound SPARQL query." kind="image" />
        </div>
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
        accent="what I'd do differently."
        size="md"
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RetroColumn title="Worked">
          <RetroItem
            head="Ontology-first paid off."
            body="Because the OWL model was the source of truth, swapping Java/Jena → Python/rdflib was a translation, not a redesign. Every query and every result row matched."
          />
          <RetroItem
            head="In-memory at this scale is fine."
            body="3,559 cases fit comfortably in a free-tier dyno with the whole ontology + inferred axioms. The query path is one process; there's no network hop to a triplestore."
          />
          <RetroItem
            head="The cron heartbeat is silly and effective."
            body="Pinging /health every 10 minutes kept the Render free tier warm for the entire IEEE review window without anybody paying anything."
          />
        </RetroColumn>

        <RetroColumn title="Didn't">
          <RetroItem
            head="Cold starts still bite if the cron fails."
            body="If the Vercel cron misses (free-tier rate limits), the first request after a long idle re-parses the TTL. Sub-second-perceived UX briefly becomes 5 seconds."
          />
          <RetroItem
            head="The data scrape is brittle."
            body="NamUs page structure changes occasionally and the original scrape script needs hand-fixes. A proper data-refresh pipeline would have been nice."
          />
          <RetroItem
            head="No federation across states."
            body="Cases live in three states only because that's what SER531 needed for the deliverable. A nationwide graph requires either a more aggressive scrape budget or an actual partnership with NamUs."
          />
        </RetroColumn>

        <RetroColumn title="Next">
          <RetroItem
            head="Public SPARQL endpoint."
            body="Expose a read-only /sparql endpoint so external researchers can run their own queries without going through the REST wrapper. Already prototyped — just needs rate-limiting before it ships."
          />
          <RetroItem
            head="Face-similarity recall."
            body="Add a per-case image embedding and a 'similar appearance' button on the detail page — many missing-persons searches start with a photograph, not a name."
          />
          <RetroItem
            head="Federated identity across datasets."
            body="The same person can show up in NamUs, ChariotPI, and local-PD bulletins under slightly different demographics. An owl:sameAs layer over multiple sources would let the graph answer questions no single dataset can."
          />
        </RetroColumn>
      </div>
    </section>
  )
}
