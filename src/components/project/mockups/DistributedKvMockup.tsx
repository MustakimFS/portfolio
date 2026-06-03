/**
 * Distributed KV Store — homepage card thumbnail.
 *
 * Uses the actual portfolio-capture screenshot (the Raft cluster topology
 * diagram) as a static PNG so the card always renders the real project UI.
 * The terminal chrome is supplied by ProjectShowcase via mockupWindow: 'terminal'.
 */
/* eslint-disable @next/next/no-img-element */
export default function DistributedKvMockup() {
  return (
    <img
      src="/projects/distributed-kv/thumbnail-distributed-kv-store.png"
      alt="Distributed KV Store — Raft cluster topology showing 5 nodes with node3 as leader"
      className="w-full block"
      loading="lazy"
    />
  )
}
