'use client'
import { useEffect, useRef } from 'react'

// Positions match the GRAFFITI_TAGS in page.tsx (as fraction of screen)
const SPRAY_SPOTS = [
  { rx: 0.08, ry: 0.14, color: '#ffd700', r: 80 },
  { rx: 0.92, ry: 0.20, color: '#ff6b35', r: 70 },
  { rx: 0.05, ry: 0.76, color: '#00e5ff', r: 90 },
  { rx: 0.91, ry: 0.84, color: '#69ff47', r: 75 },
  { rx: 0.04, ry: 0.63, color: '#ea80fc', r: 60 },
  { rx: 0.94, ry: 0.76, color: '#ff4081', r: 65 },
]

const COLORS = ['#ffd700', '#ff6b35', '#ea80fc', '#69ff47', '#00e5ff', '#ff4081', '#ffffff']

function hexAlpha(hex: string, a: number) {
  return hex + Math.floor(a * 255).toString(16).padStart(2, '0')
}

function sprayDots(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  color: string, radius: number, count: number,
) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    // Gaussian-ish falloff: more dots near center
    const r = radius * Math.sqrt(Math.random())
    const px = cx + Math.cos(angle) * r
    const py = cy + Math.sin(angle) * r
    const alpha = 0.08 + Math.random() * 0.55
    const size = 0.4 + Math.random() * 3
    ctx.beginPath()
    ctx.arc(px, py, size, 0, Math.PI * 2)
    ctx.fillStyle = hexAlpha(color, alpha)
    ctx.fill()
  }
}

function drip(ctx: CanvasRenderingContext2D, cx: number, cy: number, color: string) {
  const len = 30 + Math.random() * 80
  const width = 2 + Math.random() * 4
  const grad = ctx.createLinearGradient(cx, cy, cx, cy + len)
  grad.addColorStop(0, hexAlpha(color, 0.7))
  grad.addColorStop(1, hexAlpha(color, 0))
  ctx.beginPath()
  ctx.moveTo(cx - width / 2, cy)
  ctx.lineTo(cx + width / 2, cy)
  ctx.lineTo(cx + width / 4, cy + len)
  ctx.lineTo(cx - width / 4, cy + len)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  color: string; alpha: number
  size: number; decay: number
  trail: { x: number; y: number }[]
}

interface Rocket {
  x: number; y: number; targetY: number
  vy: number; color: string
  trail: { x: number; y: number }[]
  done: boolean
}

export default function KonamiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const particles = useRef<Particle[]>([])
  const rockets = useRef<Rocket[]>([])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)

    // ── Draw spray paint splatters once ──────────────────────────
    ctx.clearRect(0, 0, W, H)
    SPRAY_SPOTS.forEach(s => {
      const cx = s.rx * W
      const cy = s.ry * H
      sprayDots(ctx, cx, cy, s.color, s.r, 600)
      // A few drips below each spot
      for (let d = 0; d < 4; d++) {
        drip(ctx, cx + (Math.random() - 0.5) * s.r * 0.6, cy + s.r * 0.3, s.color)
      }
    })
    // Extra random splatter across the whole bg
    for (let i = 0; i < 8; i++) {
      const cx = 0.05 * W + Math.random() * 0.9 * W
      const cy = 0.05 * H + Math.random() * 0.9 * H
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      sprayDots(ctx, cx, cy, col, 20 + Math.random() * 50, 80)
    }

    // ── Fireworks helpers ─────────────────────────────────────────
    function explode(x: number, y: number, color: string) {
      const count = 90 + Math.floor(Math.random() * 50)
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
        const speed = 1.5 + Math.random() * 5.5
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          color,
          alpha: 1,
          size: 1.5 + Math.random() * 2.5,
          decay: 0.010 + Math.random() * 0.009,
          trail: [],
        })
      }
    }

    function launch() {
      const x = W * (0.15 + Math.random() * 0.7)
      const targetY = H * (0.08 + Math.random() * 0.42)
      rockets.current.push({
        x, y: H, targetY,
        vy: -(10 + Math.random() * 8),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
        done: false,
      })
    }

    // Initial volley
    for (let i = 0; i < 3; i++) launch()
    intervalRef.current = setInterval(() => {
      launch()
      if (Math.random() > 0.35) launch()
    }, 350)

    // ── Animation loop ────────────────────────────────────────────
    function tick() {
      // Fade with semi-transparent fill so spray paint shows through
      ctx.fillStyle = 'rgba(0,0,0,0.13)'
      ctx.fillRect(0, 0, W, H)

      // Rockets
      rockets.current = rockets.current.filter(r => {
        if (r.done) return false
        r.trail.push({ x: r.x, y: r.y })
        if (r.trail.length > 10) r.trail.shift()
        r.y += r.vy
        r.trail.forEach((p, i) => {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = hexAlpha(r.color, (i / r.trail.length) * 0.8)
          ctx.fill()
        })
        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color)
          // Burst ring
          const secondColor = COLORS[Math.floor(Math.random() * COLORS.length)]
          explode(r.x + (Math.random() - 0.5) * 20, r.y + (Math.random() - 0.5) * 20, secondColor)
          r.done = true
        }
        return !r.done
      })

      // Particles
      particles.current = particles.current.filter(p => {
        p.trail.push({ x: p.x, y: p.y })
        if (p.trail.length > 5) p.trail.shift()
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.07   // gravity
        p.vx *= 0.985
        p.alpha -= p.decay
        if (p.alpha <= 0) return false

        p.trail.forEach((tp, i) => {
          ctx.beginPath()
          ctx.arc(tp.x, tp.y, p.size * (i / p.trail.length) * 0.7, 0, Math.PI * 2)
          ctx.fillStyle = hexAlpha(p.color, p.alpha * (i / p.trail.length) * 0.6)
          ctx.fill()
        })
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = hexAlpha(p.color, p.alpha)
        ctx.fill()
        return true
      })

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(intervalRef.current)
      particles.current = []
      rockets.current = []
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
