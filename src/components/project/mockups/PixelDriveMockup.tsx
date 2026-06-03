/**
 * PixelDrive homepage / case-study hero mockup.
 *
 * Mimics the real Gradio app at huggingface.co/spaces/mustakimfs/pixelDrive:
 * three side-by-side panels (Input · Mask · Overlay) with a class-breakdown
 * panel underneath. Visuals are CSS gradients — illustrative of what the
 * deployed app shows, not the actual model output.
 */
export default function PixelDriveMockup() {
  return (
    <div className="bg-[#0f0f0f] min-h-[320px] text-bone font-sans">
      {/* Title strip */}
      <div className="px-5 py-4 border-b border-white/5 flex items-baseline justify-between">
        <div>
          <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono mb-1">
            U-Net · 256 × 256 · 13 classes · TensorFlow
          </div>
          <div className="text-bone text-lg">
            <span className="font-serif italic">PixelDrive</span>
            <span className="text-bone-dim mx-2">·</span>
            <span className="text-bone-muted text-[14px]">Road Scene Segmentation</span>
          </div>
        </div>
        <div className="text-bone-dim text-[11px] font-mono">mIoU 79.33%</div>
      </div>

      {/* Three-panel output row */}
      <div className="px-5 py-4 grid grid-cols-3 gap-2">
        <Panel
          label="Input"
          src="/projects/pixeldrive/input.png"
        />
        <Panel
          label="Mask"
          src="/projects/pixeldrive/mask.png"
        />
        <Panel
          label="Overlay"
          src="/projects/pixeldrive/overlay.png"
        />
      </div>

      {/* Class breakdown — mini legend */}
      <div className="px-5 py-3 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-[11px] font-mono">
        {LEGEND.map(c => (
          <div key={c.name} className="flex items-baseline gap-2 text-bone-muted">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ background: c.color }}
            />
            <span className="text-bone/85 truncate">{c.name}</span>
            <span className="text-bone-dim ml-auto">{c.pct}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Panel({ label, src }: { label: string; src: string }) {
  return (
    <div className="relative">
      <div className="aspect-square rounded-md overflow-hidden border border-white/5 bg-[#141414]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-sm bg-black/60 backdrop-blur-sm text-[9px] font-mono uppercase tracking-eyebrow text-bone/80">
        {label}
      </div>
    </div>
  )
}

const LEGEND = [
  { name: 'Road',         color: '#9b6cc7', pct: '38.2%' },
  { name: 'Building',     color: '#5b8def', pct: '21.0%' },
  { name: 'Vegetation',   color: '#91d96a', pct: '14.7%' },
  { name: 'Sky',          color: '#4ec3e6', pct: '10.1%' },
  { name: 'Car',          color: '#ff7a90', pct: ' 7.3%' },
  { name: 'Sidewalk',     color: '#ffa84d', pct: ' 4.6%' },
  { name: 'Pedestrian',   color: '#ffe066', pct: ' 2.1%' },
  { name: 'Traffic Sign', color: '#4dd0a7', pct: ' 1.4%' },
]

