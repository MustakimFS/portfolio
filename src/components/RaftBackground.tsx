"use client"

import { useEffect, useRef } from "react"

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

export default function RaftBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Node positions as fractions of canvas size
    const nodePositions = [
      { x: 0.50, y: 0.18, isLeader: true },  // node-1 LEADER
      { x: 0.15, y: 0.30, isLeader: false }, // node-2
      { x: 0.82, y: 0.28, isLeader: false }, // node-3
      { x: 0.08, y: 0.62, isLeader: false }, // node-4
      { x: 0.35, y: 0.72, isLeader: false }, // node-5
      { x: 0.65, y: 0.68, isLeader: false }, // node-6
      { x: 0.90, y: 0.58, isLeader: false }, // node-7
      { x: 0.48, y: 0.90, isLeader: false }, // node-8
    ]

    // Follower-to-follower edges (0-indexed)
    const followerEdges = [
      [1, 3], // node-2 to node-4
      [1, 4], // node-2 to node-5
      [2, 5], // node-3 to node-6
      [2, 6], // node-3 to node-7
      [4, 7], // node-5 to node-8
      [5, 6], // node-6 to node-7
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

    const drawEdge = (
      from: Node,
      to: Node,
      color: string,
      width: number,
      dashed: boolean = false
    ) => {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = width
      if (dashed) {
        ctx.setLineDash([3, 6])
      } else {
        ctx.setLineDash([])
      }
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    const drawNode = (node: Node, time: number) => {
      const pulse = node.isLeader
        ? Math.sin(time / 1500) * 0.5 + 0.5
        : 0

      const radius = node.isLeader
        ? 10 + pulse * 2
        : node.radius

      const opacity = node.isLeader
        ? 0.7 + pulse * 0.2
        : 0.3 + Math.sin(time * node.opacitySpeed + node.opacityPhase) * 0.125 + 0.125

      // Outer glow for leader
      if (node.isLeader) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(52,211,153,0.06)"
        ctx.fill()
      }

      // Main node
      ctx.beginPath()
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
      
      if (node.isLeader) {
        ctx.fillStyle = `rgba(52,211,153,${opacity})`
        ctx.fill()
        ctx.strokeStyle = "rgba(52,211,153,0.9)"
        ctx.lineWidth = 1.5
      } else {
        ctx.fillStyle = `rgba(59,130,246,${opacity})`
        ctx.fill()
        ctx.strokeStyle = "rgba(59,130,246,0.5)"
        ctx.lineWidth = 1
      }
      ctx.stroke()

      // Labels
      ctx.textAlign = "center"

      if (node.isLeader) {
        // LEADER label above
        ctx.font = "10px monospace"
        ctx.fillStyle = "rgba(52,211,153,0.9)"
        ctx.fillText("LEADER", node.x, node.y - 24)
        
        // term:4 below
        ctx.font = "9px monospace"
        ctx.fillStyle = "rgba(52,211,153,0.5)"
        ctx.fillText("term:4", node.x, node.y + 22)
        
        // node-1 below that
        ctx.fillStyle = "rgba(255,255,255,0.25)"
        ctx.fillText(node.id, node.x, node.y + 34)
      } else {
        // node-N label below
        ctx.font = "9px monospace"
        ctx.fillStyle = "rgba(255,255,255,0.25)"
        ctx.fillText(node.id, node.x, node.y + 18)
      }
    }

    const drawPacket = (packet: Packet) => {
      const from = nodes[packet.fromIndex]
      const to = nodes[packet.toIndex]
      const progress = packet.progress

      const x = from.x + (to.x - from.x) * progress
      const y = from.y + (to.y - from.y) * progress

      // Fade in over first 10%, fade out over last 15%
      let opacity = 0.7
      if (progress < 0.1) {
        opacity = 0.7 * (progress / 0.1)
      } else if (progress > 0.85) {
        opacity = 0.7 * ((1 - progress) / 0.15)
      }

      // Outer glow
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(52,211,153,${opacity * 0.2})`
      ctx.fill()

      // Inner packet
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(52,211,153,${opacity})`
      ctx.fill()
    }

    const drawHeartbeatRing = (ring: HeartbeatRing) => {
      const leader = nodes[0]
      ctx.beginPath()
      ctx.arc(leader.x, leader.y, ring.radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(52,211,153,${ring.opacity})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions (drift)
      nodes.forEach((node) => {
        const driftX = Math.sin(time * node.speed + node.phase) * 6
        const driftY = Math.cos(time * node.speed * 0.8 + node.phase + 1) * 6
        node.x = node.baseX + driftX
        node.y = node.baseY + driftY
      })

      // Trigger heartbeat
      if (time - lastHeartbeat > heartbeatInterval) {
        lastHeartbeat = time
        
        // Add expanding ring
        heartbeatRings.push({
          radius: 11,
          opacity: 0.4,
          startTime: time,
        })

        // Add packets to each follower, staggered 180ms apart
        for (let i = 1; i < nodes.length; i++) {
          packets.push({
            fromIndex: 0,
            toIndex: i,
            progress: 0,
            startTime: time + (i - 1) * 180,
          })
        }
      }

      // Draw follower-to-follower edges
      followerEdges.forEach(([a, b]) => {
        drawEdge(nodes[a], nodes[b], "rgba(255,255,255,0.04)", 0.4, true)
      })

      // Draw leader-to-follower edges
      for (let i = 1; i < nodes.length; i++) {
        drawEdge(nodes[0], nodes[i], "rgba(52,211,153,0.08)", 0.8)
      }

      // Update and draw heartbeat rings
      for (let i = heartbeatRings.length - 1; i >= 0; i--) {
        const ring = heartbeatRings[i]
        const elapsed = time - ring.startTime
        const duration = 1500
        const progress = elapsed / duration

        if (progress >= 1) {
          heartbeatRings.splice(i, 1)
          continue
        }

        ring.radius = 11 + progress * 49
        ring.opacity = 0.4 * (1 - progress)
        drawHeartbeatRing(ring)
      }

      // Update and draw packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i]
        
        if (time < packet.startTime) continue
        
        const elapsed = time - packet.startTime
        const duration = 1500
        packet.progress = elapsed / duration

        if (packet.progress >= 1) {
          packets.splice(i, 1)
          continue
        }

        drawPacket(packet)
      }

      // Draw nodes
      nodes.forEach((node) => drawNode(node, time))

      // Bottom left corner label
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
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  )
}
