"use client"

import { useEffect, useRef } from "react"
import { getEasterHash } from "@/lib/easterHash"

interface RaftBackgroundProps {
  chaosMode?: boolean
}

interface Node {
  id: string
  baseX: number
  baseY: number
  x: number
  y: number
  radius: number
  isLeader: boolean
  phase: number
  speed: number
  opacityPhase: number
  opacitySpeed: number
  // Easter: glitch label
  displayLabel?: string
  labelColor?: string
}

interface Packet {
  fromIndex: number
  toIndex: number
  progress: number
  startTime: number
}

interface HeartbeatRing {
  radius: number
  opacity: number
  startTime: number
}

// Simple character scramble used in canvas draw loop via ref
function scramble(target: string, progress: number): string {
  const chars = '!@#$%^&*<>[]{}|/\\~`'
  return target.split('').map((ch) => {
    if (Math.random() < progress) return ch
    return chars[Math.floor(Math.random() * chars.length)]
  }).join('')
}

export default function RaftBackground({ chaosMode = false }: RaftBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chaosModeRef = useRef(chaosMode)

  // Keep ref in sync without restarting the animation loop
  useEffect(() => {
    chaosModeRef.current = chaosMode
  }, [chaosMode])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let lastHeartbeat = 0
    const heartbeatInterval = 3000
    const packets: Packet[] = []
    const heartbeatRings: HeartbeatRing[] = []

    // Chaos ghost nodes
    let ghostNodes: Node[] = []

    // Node glitch state
    let glitchNodeIndex = -1
    let glitchPhase: 'idle' | 'in' | 'hold' | 'out' = 'idle'
    let glitchPhaseStart = 0
    const GLITCH_MS = 400
    const HOLD_MS = 3000

    const nodePositions = [
      { x: 0.50, y: 0.18, isLeader: true },
      { x: 0.15, y: 0.30, isLeader: false },
      { x: 0.82, y: 0.28, isLeader: false },
      { x: 0.08, y: 0.62, isLeader: false },
      { x: 0.35, y: 0.72, isLeader: false },
      { x: 0.65, y: 0.68, isLeader: false },
      { x: 0.90, y: 0.58, isLeader: false },
      { x: 0.48, y: 0.90, isLeader: false },
    ]

    const followerEdges = [
      [1, 3], [1, 4], [2, 5], [2, 6], [4, 7], [5, 6],
    ]

    let nodes: Node[] = []

    const initNodes = () => {
      nodes = nodePositions.map((pos, i) => ({
        id: `node-${i + 1}`,
        baseX: pos.x * canvas.width,
        baseY: pos.y * canvas.height,
        x: pos.x * canvas.width,
        y: pos.y * canvas.height,
        radius: pos.isLeader ? 11 : 7,
        isLeader: pos.isLeader,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0002,
        opacityPhase: Math.random() * Math.PI * 2,
        opacitySpeed: 0.0004 + Math.random() * 0.0003,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    resize()
    window.addEventListener("resize", resize)

    // Node glitch cycle — starts after 6s, repeats every 15s
    const startGlitchCycle = () => {
      const followerIndices = nodes.map((_, i) => i).filter(i => !nodes[i].isLeader)
      glitchNodeIndex = followerIndices[Math.floor(Math.random() * followerIndices.length)]
      glitchPhase = 'in'
      glitchPhaseStart = performance.now()
    }

    const glitchTimer = setTimeout(() => {
      startGlitchCycle()
      setInterval(startGlitchCycle, 15000)
    }, 6000)

    const drawEdge = (from: Node, to: Node, color: string, width: number, dashed = false) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      if (dashed) { ctx.setLineDash([3, 6]) } else { ctx.setLineDash([]) }
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawNode = (node: Node, time: number, isGhost = false, isHoldPhase = false) => {
      const isChaos = chaosModeRef.current
      const pulse = node.isLeader ? Math.sin(time / (isChaos ? 500 : 1500)) * 0.5 + 0.5 : 0
      const radius = node.isLeader ? 10 + pulse * 2 : node.radius
      const opacity = node.isLeader
        ? 0.7 + pulse * 0.2
        : 0.3 + Math.sin(time * node.opacitySpeed * (isChaos ? 3 : 1) + node.opacityPhase) * 0.125 + 0.125

      // Colors
      let fillColor: string
      let strokeColor: string
      if (isChaos) {
        fillColor = node.isLeader ? `rgba(239,68,68,${opacity})` : `rgba(167,139,250,${opacity})`
        strokeColor = node.isLeader ? 'rgba(239,68,68,0.9)' : 'rgba(167,139,250,0.7)'
      } else if (isHoldPhase) {
        fillColor = `rgba(52,211,153,${opacity})`
        strokeColor = 'rgba(52,211,153,0.9)'
      } else {
        fillColor = node.isLeader ? `rgba(52,211,153,${opacity})` : `rgba(59,130,246,${opacity})`
        strokeColor = node.isLeader ? 'rgba(52,211,153,0.9)' : 'rgba(59,130,246,0.5)'
      }

      if (isGhost) {
        fillColor = fillColor.replace(/[\d.]+\)$/, '0.3)')
        strokeColor = strokeColor.replace(/[\d.]+\)$/, '0.2)')
      }

      if (node.isLeader && !isGhost) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2)
        ctx.fillStyle = isChaos ? 'rgba(239,68,68,0.06)' : 'rgba(52,211,153,0.06)'
        ctx.fill()
      }

      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = node.isLeader ? 1.5 : 1
      ctx.stroke()

      if (isGhost) return

      ctx.textAlign = "center"
      const label = node.displayLabel ?? node.id
      const labelCol = node.labelColor ?? 'rgba(255,255,255,0.25)'

      if (node.isLeader) {
        ctx.font = "10px monospace"
        ctx.fillStyle = isChaos ? 'rgba(239,68,68,0.9)' : 'rgba(52,211,153,0.9)'
        ctx.fillText("LEADER", node.x, node.y - 24)
        ctx.font = "9px monospace"
        ctx.fillStyle = isChaos ? 'rgba(239,68,68,0.5)' : 'rgba(52,211,153,0.5)'
        ctx.fillText("term:4", node.x, node.y + 22)
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.fillText(label, node.x, node.y + 34)
      } else {
        ctx.font = "9px monospace"
        ctx.fillStyle = labelCol
        ctx.fillText(label, node.x, node.y + 18)
      }
    }

    const drawPacket = (packet: Packet) => {
      const from = nodes[packet.fromIndex]
      const to = nodes[packet.toIndex]
      const progress = packet.progress
      const x = from.x + (to.x - from.x) * progress
      const y = from.y + (to.y - from.y) * progress
      let opacity = 0.7
      if (progress < 0.1) opacity = 0.7 * (progress / 0.1)
      else if (progress > 0.85) opacity = 0.7 * ((1 - progress) / 0.15)
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(52,211,153,${opacity * 0.2})`
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(52,211,153,${opacity})`
      ctx.fill()
    }

    const drawHeartbeatRing = (ring: HeartbeatRing) => {
      const leader = nodes[0]
      ctx.beginPath()
      ctx.arc(leader.x, leader.y, ring.radius, 0, Math.PI * 2)
      ctx.strokeStyle = chaosModeRef.current
        ? `rgba(239,68,68,${ring.opacity})`
        : `rgba(52,211,153,${ring.opacity})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isChaos = chaosModeRef.current

      // Update node drift
      nodes.forEach((node) => {
        const speed = isChaos ? node.speed * 3 : node.speed
        const driftX = Math.sin(time * speed + node.phase) * 6
        const driftY = Math.cos(time * speed * 0.8 + node.phase + 1) * 6
        node.x = node.baseX + driftX
        node.y = node.baseY + driftY
      })

      // Update chaos ghost nodes drift
      ghostNodes.forEach((node) => {
        node.x += (Math.random() - 0.5) * 2
        node.y += (Math.random() - 0.5) * 2
      })

      // Heartbeat
      const hbInterval = isChaos ? heartbeatInterval / 3 : heartbeatInterval
      if (time - lastHeartbeat > hbInterval) {
        lastHeartbeat = time
        heartbeatRings.push({ radius: 11, opacity: 0.4, startTime: time })
        for (let i = 1; i < nodes.length; i++) {
          packets.push({ fromIndex: 0, toIndex: i, progress: 0, startTime: time + (i - 1) * 180 })
        }
      }

      // Manage chaos ghost nodes
      if (isChaos && ghostNodes.length === 0) {
        ghostNodes = Array.from({ length: 8 }, (_, i) => ({
          id: `ghost-${i}`,
          baseX: Math.random() * canvas.width,
          baseY: Math.random() * canvas.height,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 5,
          isLeader: false,
          phase: Math.random() * Math.PI * 2,
          speed: 0.001,
          opacityPhase: Math.random() * Math.PI * 2,
          opacitySpeed: 0.001,
        }))
      } else if (!isChaos) {
        ghostNodes = []
      }

      // Update glitch node labels
      if (glitchNodeIndex >= 0 && glitchNodeIndex < nodes.length) {
        const node = nodes[glitchNodeIndex]
        const elapsed = performance.now() - glitchPhaseStart
        const hash8 = getEasterHash()

        if (glitchPhase === 'in') {
          const progress = Math.min(elapsed / GLITCH_MS, 1)
          node.displayLabel = scramble(hash8, progress)
          node.labelColor = `rgba(52,211,153,${0.3 + progress * 0.6})`
          if (progress >= 1) {
            glitchPhase = 'hold'
            glitchPhaseStart = performance.now()
          }
        } else if (glitchPhase === 'hold') {
          node.displayLabel = hash8
          node.labelColor = 'rgba(52,211,153,0.9)'
          if (elapsed >= HOLD_MS) {
            glitchPhase = 'out'
            glitchPhaseStart = performance.now()
          }
        } else if (glitchPhase === 'out') {
          const progress = Math.min(elapsed / GLITCH_MS, 1)
          node.displayLabel = scramble(node.id, progress)
          node.labelColor = `rgba(255,255,255,${0.25 * progress + 0.25 * (1 - progress)})`
          if (progress >= 1) {
            node.displayLabel = undefined
            node.labelColor = undefined
            glitchPhase = 'idle'
            glitchNodeIndex = -1
          }
        }
      }

      // Draw edges
      const edgeOpacity = isChaos ? 0.3 : 0.04
      followerEdges.forEach(([a, b]) => {
        drawEdge(nodes[a], nodes[b], `rgba(255,255,255,${edgeOpacity})`, 0.4, !isChaos)
      })
      for (let i = 1; i < nodes.length; i++) {
        drawEdge(nodes[0], nodes[i], isChaos ? `rgba(239,68,68,0.15)` : 'rgba(52,211,153,0.08)', 0.8)
      }

      // Heartbeat rings
      for (let i = heartbeatRings.length - 1; i >= 0; i--) {
        const ring = heartbeatRings[i]
        const elapsed = time - ring.startTime
        const progress = elapsed / 1500
        if (progress >= 1) { heartbeatRings.splice(i, 1); continue }
        ring.radius = 11 + progress * 49
        ring.opacity = 0.4 * (1 - progress)
        drawHeartbeatRing(ring)
      }

      // Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i]
        if (time < packet.startTime) continue
        packet.progress = (time - packet.startTime) / 1500
        if (packet.progress >= 1) { packets.splice(i, 1); continue }
        drawPacket(packet)
      }

      // Ghost nodes
      ghostNodes.forEach(node => drawNode(node, time, true))

      // Main nodes — pass isHoldPhase for glitching node
      nodes.forEach((node, i) => {
        const isHold = i === glitchNodeIndex && glitchPhase === 'hold'
        drawNode(node, time, false, isHold)
      })

      ctx.font = "9px monospace"
      ctx.textAlign = "left"
      ctx.fillStyle = "rgba(52,211,153,0.18)"
      ctx.fillText("// raft consensus · 8 nodes · leader election active", 12, canvas.height - 12)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
      clearTimeout(glitchTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  )
}
