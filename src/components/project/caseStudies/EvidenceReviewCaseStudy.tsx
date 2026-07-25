/**
 * Multi-Modal Evidence Review, compact case-study body.
 *
 * A timed-hackathon build (HackerRank Orchestrate). Kept intentionally short
 * and low-key: what it is, the approach, and what worked. No competition
 * score or leaderboard rank by design.
 */
"use client"

import HeroHeading from '@/components/typography/HeroHeading'
import SectionLabel from '@/components/typography/SectionLabel'
import { Meta, Point, Code } from './_helpers'

export const EVIDENCE_REVIEW_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'approach', label: 'Approach' },
  { id: 'retro', label: 'Retrospective' },
]

export default function EvidenceReviewCaseStudy() {
  return (
    <div className="space-y-24">
      <Overview />
      <Approach />
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
        sans="Verify the claim,"
        accent="don't just trust the image."
        size="md"
        className="mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-8 gap-y-6 text-[15px] leading-relaxed">
        <Meta label="Format" value="Timed hackathon · HackerRank Orchestrate · ~20-hour build" />
        <p className="text-bone-muted">
          A damage-claim verification system built under a tight time box. The
          task: decide whether a set of images actually supports an insurance
          damage claim. Instead of one monolithic vision-language call, I
          decomposed it into <span className="text-bone">claim-blind per-image
          perception</span> feeding a policy engine and an adjudication stage, so
          each part could be reasoned about and tuned independently.
        </p>

        <Meta
          label="Stack"
          value="Vision-Language Models · EXIF forensics · Ollama (local) · frontier model (final) · HackerRank Orchestrate"
        />
        <p className="text-bone-muted">
          Model-agnostic by design: all development ran against local{' '}
          <span className="text-bone">Ollama</span> models, with a frontier model
          reserved only for the final scored output. The pipeline handled
          multilingual claims (English, Hindi, Hinglish, Spanish) and shipped
          with prompt-injection defenses on the untrusted claim text.
        </p>
      </div>
    </section>
  )
}

// ── 2. Approach ───────────────────────────────────────────────────────────

function Approach() {
  return (
    <section id="approach" className="scroll-mt-24">
      <SectionLabel className="mb-4">Approach</SectionLabel>
      <HeroHeading
        sans="Decompose the judgment,"
        accent="then make it defensible."
        size="md"
        className="mb-10"
      />

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Claim-blind perception.">
          Each image is described on its own, without knowing what the claim
          asserts, so the perception stage can&apos;t be led toward the answer.
          Those neutral findings feed a separate policy engine that applies the
          adjudication rules.
        </Point>
        <Point title="A deterministic forensic layer.">
          An <Code>EXIF</Code> analysis pass escalates scrutiny on edited images
          rather than auto-rejecting them. The data showed edit signals on both
          fraudulent and legitimate claims, so &ldquo;edited&rdquo; is treated as
          a reason to look closer, not a verdict.
        </Point>
        <Point title="Model-agnostic, local-first.">
          The whole system is provider-agnostic. Local Ollama models drove
          development and iteration; a frontier model was swapped in only for the
          final scored run, keeping the loop fast and cheap.
        </Point>
        <Point title="Multilingual + injection-hardened.">
          Claims arrive in English, Hindi, Hinglish, and Spanish. The claim text
          is untrusted input, so the prompts are hardened against injection
          attempts that try to talk the adjudicator into approving.
        </Point>
      </div>
    </section>
  )
}

// ── 3. Retrospective ──────────────────────────────────────────────────────

function Retrospective() {
  return (
    <section id="retro" className="scroll-mt-24">
      <SectionLabel className="mb-4">Retrospective</SectionLabel>
      <HeroHeading
        sans="What the decomposition"
        accent="bought me."
        size="md"
        className="mb-8"
      />

      <div className="space-y-5 text-[14.5px] leading-relaxed text-bone-muted max-w-2xl">
        <Point title="Structure beat a single big prompt.">
          Splitting perception, policy, and adjudication meant each stage was
          debuggable on its own under time pressure, and the claim-blind boundary
          removed a whole class of the model talking itself into the claim.
        </Point>
        <Point title="The forensic insight was the differentiator.">
          Treating an edit signal as an escalation rather than an automatic
          rejection is the decision I&apos;d keep. It came straight from looking
          at the data instead of assuming edited means fraudulent.
        </Point>
      </div>
    </section>
  )
}
