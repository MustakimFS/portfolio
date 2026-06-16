/**
 * Cascade — homepage card + case-study hero mockup.
 *
 * A faux "graph intelligence" workspace rendered entirely in SVG + DOM (no
 * screenshot yet): a force-directed influence graph on the left, a node
 * inspector + forecast band + model card on the right. Built to match the
 * warm-black palette; node colors echo the per-type legend.
 *
 * Swap this for a real screenshot later by replacing the body with an <img>
 * (see DistributedKvMockup / SemiconductorMockup for the pattern).
 */

type NodeType = 'equity' | 'macro' | 'commodity' | 'etf'

const TYPE_COLOR: Record<NodeType, string> = {
  equity: '#6c8cff',
  macro: '#b388ff',
  commodity: '#ffb066',
  etf: '#4dd0a7',
}

interface GNode {
  id: string
  x: number
  y: number
  r: number
  t: NodeType
  label?: boolean
}

// Hand-placed layout in a 400 × 250 viewBox — AMZN is the high-degree hub.
const NODES: GNode[] = [
  { id: 'AMZN', x: 205, y: 128, r: 13, t: 'equity', label: true },
  { id: 'AAPL', x: 132, y: 86, r: 8, t: 'equity', label: true },
  { id: 'FDX', x: 278, y: 92, r: 9, t: 'equity', label: true },
  { id: 'UPS', x: 312, y: 150, r: 7, t: 'equity' },
  { id: 'WTI', x: 250, y: 198, r: 7, t: 'commodity' },
  { id: 'USD', x: 118, y: 176, r: 7, t: 'macro' },
  { id: 'SPY', x: 84, y: 124, r: 8, t: 'etf' },
  { id: 'CPI', x: 168, y: 210, r: 6, t: 'macro' },
  { id: 'RTL', x: 326, y: 206, r: 6, t: 'macro' },
  { id: 'XLI', x: 348, y: 108, r: 7, t: 'etf' },
  { id: 'JET', x: 304, y: 54, r: 6, t: 'commodity' },
  { id: 'VIX', x: 56, y: 74, r: 6, t: 'macro' },
]

const N = Object.fromEntries(NODES.map(n => [n.id, n]))

// [from, to, isShock]
const EDGES: Array<[string, string, boolean]> = [
  ['AMZN', 'AAPL', false],
  ['AMZN', 'FDX', true],
  ['AMZN', 'SPY', false],
  ['AMZN', 'WTI', false],
  ['AMZN', 'XLI', false],
  ['FDX', 'UPS', true],
  ['FDX', 'JET', true],
  ['FDX', 'WTI', false],
  ['UPS', 'RTL', false],
  ['SPY', 'VIX', false],
  ['SPY', 'USD', false],
  ['AAPL', 'VIX', false],
  ['CPI', 'USD', false],
  ['CPI', 'AMZN', false],
  ['XLI', 'FDX', false],
  ['RTL', 'AMZN', true],
]

export default function CascadeMockup() {
  return (
    <div className="flex flex-col bg-[#0d0d0f] text-bone min-h-[300px]">
      {/* Top bar: world tabs + counts */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          {['markets', 'logistics', 'equity'].map((w, i) => (
            <span
              key={w}
              className={`px-2 py-1 rounded-md border ${
                i === 0
                  ? 'bg-white/[0.07] border-white/15 text-bone'
                  : 'border-transparent text-bone-dim'
              }`}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-bone-dim">
          <span>86 nodes</span>
          <span className="text-bone-faint">·</span>
          <span>167 edges</span>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Graph canvas */}
        <div className="relative flex-1 min-w-0">
          <svg viewBox="0 0 400 250" className="w-full h-full block" preserveAspectRatio="xMidYMid meet">
            <defs>
              <marker id="csc-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#3a3a3a" />
              </marker>
              <radialGradient id="csc-hub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8aa0ff" />
                <stop offset="100%" stopColor="#5b6cff" />
              </radialGradient>
            </defs>

            {/* Edges */}
            {EDGES.map(([a, b, shock], i) => {
              const from = N[a]
              const to = N[b]
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={shock ? '#6c8cff' : '#2a2a2e'}
                  strokeWidth={shock ? 1.3 : 0.8}
                  strokeOpacity={shock ? 0.7 : 1}
                  strokeDasharray={shock ? '3 3' : undefined}
                  markerEnd="url(#csc-arrow)"
                >
                  {shock && (
                    <animate
                      attributeName="stroke-dashoffset"
                      from="12"
                      to="0"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  )}
                </line>
              )
            })}

            {/* Nodes */}
            {NODES.map(n => {
              const isHub = n.id === 'AMZN'
              return (
                <g key={n.id}>
                  {isHub && (
                    <circle cx={n.x} cy={n.y} r={n.r + 6} fill="none" stroke="#6c8cff" strokeWidth="1" strokeOpacity="0.35">
                      <animate attributeName="r" values={`${n.r + 4};${n.r + 9};${n.r + 4}`} dur="3s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.4;0.05;0.4" dur="3s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={n.r}
                    fill={isHub ? 'url(#csc-hub)' : TYPE_COLOR[n.t]}
                    fillOpacity={isHub ? 1 : 0.92}
                    stroke="#0d0d0f"
                    strokeWidth="1.5"
                  />
                  {n.label && (
                    <text
                      x={n.x}
                      y={n.y - n.r - 4}
                      textAnchor="middle"
                      fontSize="8"
                      fontFamily="monospace"
                      fill="#cfcfcf"
                    >
                      {n.id}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-3 flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-mono text-bone-dim">
            {(Object.keys(TYPE_COLOR) as NodeType[]).map(t => (
              <span key={t} className="inline-flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: TYPE_COLOR[t] }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Inspector / forecast / model card */}
        <div className="hidden sm:flex flex-col w-[208px] shrink-0 border-l border-white/[0.06] p-3.5 gap-3 text-[11px]">
          {/* Node inspector */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono text-bone">AMZN</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#6c8cff]/15 text-[#9fb2ff] border border-[#6c8cff]/25">
                equity
              </span>
            </div>
            <div className="flex items-center justify-between text-bone-dim font-mono">
              <span>degree</span>
              <span className="text-bone-muted">26</span>
            </div>
            <div className="flex items-center justify-between text-bone-dim font-mono mt-0.5">
              <span>sentiment</span>
              <span className="text-emerald-300/80">+0.18</span>
            </div>
          </div>

          {/* Forecast band */}
          <div>
            <div className="text-bone-dim font-mono text-[9px] uppercase tracking-wider mb-1.5">
              Forecast · q10 / q50 / q90
            </div>
            <svg viewBox="0 0 180 56" className="w-full block">
              <path d="M0,40 C40,34 80,30 120,22 L180,12 L180,30 C140,40 80,46 40,50 L0,52 Z" fill="#6c8cff" fillOpacity="0.14" />
              <path d="M0,46 C40,42 80,40 120,33 L180,22" fill="none" stroke="#9fb2ff" strokeWidth="1.4" />
              <path d="M0,40 C40,34 80,30 120,22 L180,12" fill="none" stroke="#6c8cff" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="2 2" />
            </svg>
            <div className="flex items-center justify-between text-bone-dim font-mono mt-1">
              <span>P(up) 1d</span>
              <span className="text-bone-muted">0.54</span>
            </div>
          </div>

          {/* Model card */}
          <div className="mt-auto rounded-lg border border-white/[0.07] bg-white/[0.02] p-2.5 font-mono text-[9.5px] leading-relaxed text-bone-dim">
            <div className="text-bone-muted mb-1">model card</div>
            <div>LightGBM · quantile</div>
            <div>780 trees · 300k rows</div>
            <div>CQR · 78% coverage</div>
          </div>
        </div>
      </div>
    </div>
  )
}
