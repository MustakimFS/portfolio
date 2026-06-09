/**
 * "Now" — what Mustakim is actively building + ideas he's exploring.
 *
 * This is the easy-to-edit source for the homepage "Now" section. Update
 * NOW_BUILDING when active work changes and IDEAS as new explorations come
 * up. Keep it short — this is a snapshot of the present, not an archive.
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
}

/** Active work — the things being built right now. */
export const NOW_BUILDING: NowItem[] = [
  {
    title: 'Knowledge-Graph Prediction for Logistics',
    blurb:
      'Most logistics models score each shipment in isolation, but the real signal lives in the relationships between hubs, lanes, carriers, and events. I model the network as a knowledge graph and use link prediction to forecast disruptions from its structure: where delays will cascade, which routes are about to bottleneck, and which shipments are quietly at risk, all before it surfaces in the tracking data.',
    status: 'in progress',
    tags: ['Knowledge Graphs', 'Link Prediction', 'GNNs', 'Logistics ML', 'Python'],
  },
  {
    title: 'Local companion models',
    blurb:
      'Self-hosting local LLMs that pair-program and automate the day-to-day, with a small harness that stress-tests them and tracks hallucination rate per prompt template. Swapping a model becomes a measurement, not a guess.',
    status: 'ongoing',
    tags: ['Local LLMs', 'Ollama', 'Evaluation', 'Reliability'],
  },
]

/** Ideas & explorations — looser, things being thought through. */
export const IDEAS: string[] = [
  'Reliability scoring for agent tool-calls: extending AegisFlow’s confidence model from single outputs to multi-step agent runs.',
  'Graph-native retrieval that returns provenance and relationships, not just text chunks, so RAG can explain why an answer holds.',
  'Predicting failure before it happens: turning the logistics knowledge graph into an early-warning signal for cascading disruptions.',
]
