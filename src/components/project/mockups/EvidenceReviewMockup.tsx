/**
 * Multi-Modal Evidence Review — case-study hero mockup.
 *
 * A faux terminal run of the adjudication pipeline (no screenshot yet). The
 * TerminalWindow chrome is supplied by the case-study hero via
 * mockupWindow: 'terminal'.
 */
import { TerminalLine } from '@/components/windows'

export default function EvidenceReviewMockup() {
  return (
    <div className="space-y-1.5">
      <TerminalLine command="evidence-review verify --claim CLM-4471 --lang auto" />
      <TerminalLine output={<span className="text-bone-muted">[perception]   per-image · claim-blind → 6 findings</span>} />
      <TerminalLine output={<span className="text-bone-muted">[forensic]     EXIF scan → 2 edited images · escalate, not reject</span>} />
      <TerminalLine output={<span className="text-bone-muted">[policy]       rules engine → 3 flags · 1 escalation</span>} />
      <TerminalLine output={<span className="text-bone-muted">[adjudicate]   frontier model → structured verdict</span>} />
      <TerminalLine output={<span className="text-emerald-300/80">✓ verdict: REVIEW · confidence 0.71 · lang: hinglish</span>} />
    </div>
  )
}
