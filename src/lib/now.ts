/**
 * "Now", what Mustakim is actively building + ideas he's exploring.
 *
 * This is the easy-to-edit source for the homepage "Now" section. Update
 * NOW_BUILDING when active work changes and IDEAS as new explorations come
 * up. Keep it short, this is a snapshot of the present, not an archive.
 */

export interface NowItem {
  /** Project / work title. */
  title: string
  /** One or two sentences on what it is and where it's at. */
  blurb: string
  /** Short status chip, e.g. "in progress", "prototyping", "exploring". */
  status?: string
  /** A few tech / topic tags. */
  tags?: string[]
  /** Optional internal link to a full case study. */
  href?: string
}

/** Active work, the things being built right now. */
export const NOW_BUILDING: NowItem[] = [
  {
    title: 'Cascade: Knowledge-Graph Intelligence for Logistics',
    blurb:
      'A platform that models a logistics network as a live knowledge graph and propagates shocks through it (a snowstorm at one hub, a fuel spike, a retail-sales miss) to forecast where delays will cascade, which routes are about to bottleneck, and which shipments are quietly at risk, all before it surfaces in the tracking data. Graph-context features already cut short-horizon forecast error by 7-19% on logistics, with conformalized prediction intervals for honest uncertainty. Now hardening the autonomous analyst loop that expands the graph, retrains, backtests leak-free, and writes a decision brief on its own.',
    status: 'in progress',
    tags: ['Knowledge Graphs', 'Graph Neural Networks', 'LightGBM', 'Conformal Prediction', 'Operations Research', 'FastAPI', 'Python'],
    href: '/projects/cascade',
  },
  {
    title: 'Local companion models',
    blurb:
      'Self-hosting local LLMs that pair-program and automate the day-to-day, with a small harness that stress-tests them and tracks hallucination rate per prompt template. Swapping a model becomes a measurement, not a guess.',
    status: 'ongoing',
    tags: ['Local LLMs', 'Ollama', 'Evaluation', 'Reliability'],
  },
]

/** Ideas & explorations, looser, things being thought through. */
export const IDEAS: string[] = [
  'Reliability scoring for agent tool-calls: extending AegisFlow’s confidence model from single outputs to multi-step agent runs.',
  'Graph-native retrieval that returns provenance and relationships, not just text chunks, so RAG can explain why an answer holds.',
  'Predicting failure before it happens: turning the logistics knowledge graph into an early-warning signal for cascading disruptions.',
]
