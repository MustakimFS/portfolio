"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import RaftBackground from "./RaftBackground"

function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) return `${interval}y ago`
  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) return `${interval}mo ago`
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) return `${interval}d ago`
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) return `${interval}h ago`
  interval = Math.floor(seconds / 60)
  if (interval >= 1) return `${interval}m ago`
  return `${Math.floor(seconds)}s ago`
}

// Types
interface WindowState {
  id: string
  title: string
  type: "terminal" | "about" | "projects" | "skills" | "research" | "contact"
  isOpen: boolean
  isMinimized: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

interface Project {
  id: string
  title: string
  category: string
  subtitle: string
  description: string
  metrics: { label: string; value: string }[]
  tags: string[]
  github: string | null
  demo?: string | null
  paper?: string | null
  ieee?: string | null
  note?: string
}

// Data
const PROJECTS: Project[] = [
  {
    id: "mety-legal",
    title: "METY Legal Chatbot",
    category: "AI / Full Stack",
    subtitle: "LangGraph · Django · React · FastAPI",
    description:
      "AI legal assistant with two user modes. Rebuilt LangGraph pipeline from 6 nodes to 5, cutting LLM calls per message from 2 to 1. FSPR knowledge profiling, lawyer-style probing, rolling summarization.",
    metrics: [
      { label: "Cost per query", value: "$0.0008" },
      { label: "Cost reduction", value: "85%" },
      { label: "Legal domains", value: "9" },
    ],
    tags: ["LangGraph", "Django", "React", "FastAPI", "MongoDB", "GPT-4o-mini"],
    github: null,
    demo: null,
    note: "Private — NDA",
  },
  {
    id: "distributed-kv",
    title: "Distributed Key-Value Store",
    category: "Distributed Systems",
    subtitle: "Raft Consensus · gRPC · Java · Docker",
    description:
      "Fault-tolerant KV store implementing Raft consensus for leader election and log replication across 5-node cluster. Tunable CP vs AP consistency.",
    metrics: [
      { label: "Cluster nodes", value: "5" },
      { label: "Read latency", value: "<10ms" },
      { label: "Consistency", value: "Strong" },
    ],
    tags: ["Java", "Raft", "gRPC", "Docker"],
    github: "https://github.com/MustakimFS/distributed-kv-store",
    demo: null,
  },
  {
    id: "semiconductor",
    title: "Semiconductor Yield Predictor",
    category: "Machine Learning",
    subtitle: "Random Forest · L1 Selection · Streamlit",
    description:
      "Binary classification for wafer pass/fail on severely imbalanced dataset. L1 regularization for dimensionality reduction then Random Forest with balanced class weighting.",
    metrics: [
      { label: "Recall", value: "76%" },
      { label: "ROC-AUC", value: "0.81" },
      { label: "Features", value: "590→113" },
    ],
    tags: ["Python", "scikit-learn", "Streamlit"],
    github: "https://github.com/MustakimFS/semiconductor-yield-optimizer",
    paper: "/papers/semiconductor-yield.pdf",
  },
  {
    id: "pixeldrive",
    title: "PixelDrive: Road Scene Segmentation",
    category: "Computer Vision",
    subtitle: "U-Net · SegNet · DeepLabV3+ · TensorFlow",
    description:
      "Semantic segmentation for autonomous driving. Compared U-Net, SegNet, DeepLabV3+ on 13-class Carla dataset. Fixed 7 critical bugs in original codebase.",
    metrics: [
      { label: "mIoU", value: "95.50%" },
      { label: "Inference", value: "45 FPS" },
      { label: "Classes", value: "13" },
    ],
    tags: ["Python", "TensorFlow", "Keras", "U-Net"],
    github: "https://github.com/MustakimFS/pixeldrive-segmentation",
    demo: "https://huggingface.co/spaces/mustakimfs/pixelDrive",
    paper: "/papers/pixeldrive.pdf",
  },
  {
    id: "missing-persons",
    title: "Missing Persons Knowledge Graph",
    category: "Research / Full Stack",
    subtitle: "RDF · SPARQL · FastAPI · React",
    description:
      "Knowledge graph of 10K+ NamUs records. Replaced $50/month GraphDB with FastAPI + RDFLib achieving sub-100ms SPARQL queries at zero infra cost.",
    metrics: [
      { label: "Records", value: "10K+" },
      { label: "Query latency", value: "<100ms" },
      { label: "Infra cost", value: "$0" },
    ],
    tags: ["RDF", "SPARQL", "FastAPI", "React"],
    github: "https://github.com/MustakimFS",
    demo: "https://missing-persons-knowledge-graph.vercel.app/",
    ieee: "https://ieeexplore.ieee.org/document/11126748",
    paper: "/papers/missing-persons-kg.pdf",
  },
  {
    id: "genome-assembler",
    title: "De Bruijn Genome Assembler",
    category: "Systems / Algorithms",
    subtitle: "Java · Spring Boot · Graph Algorithms",
    description:
      "Genome assembler with 99.9% coverage on phiX174 using de Bruijn graphs and Eulerian cycle traversal. Error correction: tip removal and bubble detection.",
    metrics: [
      { label: "Coverage", value: "99.9%" },
      { label: "Genome", value: "5,386bp" },
      { label: "Dataset", value: "phiX174" },
    ],
    tags: ["Java", "Spring Boot", "Graph Algorithms"],
    github: "https://github.com/MustakimFS",
    demo: "https://debruijn-genome-assembler.vercel.app/",
  },
]

const SKILLS = {
  Languages: ["Java", "Python", "TypeScript", "C++", "SQL"],
  "Backend & Systems": ["Spring Boot", "Django", "FastAPI", "gRPC", "Raft Consensus"],
  "AI/ML": ["LangChain/LangGraph", "scikit-learn", "PyTorch", "RAG Pipelines", "Knowledge Graphs"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Streamlit"],
  "Data & Infra": ["MongoDB", "PostgreSQL", "Docker", "Redis", "Kafka"],
}

const BOOT_SEQUENCE = [
  "Initializing mustakim.dev...",
  "Loading modules............. done",
  "Mounting filesystems........ done",
  "",
  "MS/OS v1.0.0 — mustakim shikalgar",
  "Type 'help' for available commands",
  "───────────────────────────────────",
  "mustakim@portfolio ~ $",
]

export default function PortfolioOS() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [zIndexCounter, setZIndexCounter] = useState(100)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [terminalInput, setTerminalInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isBooting, setIsBooting] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [isRecruiter, setIsRecruiter] = useState(false)
  const [leetcodeData, setLeetcodeData] = useState({ total: "815", hard: "126" })
  const [githubData, setGithubData] = useState({ repo: "distributed-kv-store", message: "feat: quorum reads", time: new Date().toISOString() })

  useEffect(() => {
    fetch('/api/leetcode').then(res => res.json()).then(data => setLeetcodeData(data)).catch(console.error)
    fetch('/api/github').then(res => res.json()).then(data => setGithubData(data)).catch(console.error)
  }, [])

  const terminalOutputRef = useRef<HTMLDivElement>(null)
  const terminalInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<{ windowId: string; startX: number; startY: number; windowX: number; windowY: number } | null>(null)

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Boot sequence
  useEffect(() => {
    let currentLine = 0
    const bootLines: string[] = []

    const typeNextLine = () => {
      if (currentLine < BOOT_SEQUENCE.length) {
        bootLines.push(BOOT_SEQUENCE[currentLine])
        setTerminalOutput([...bootLines])
        currentLine++
        setTimeout(typeNextLine, 80)
      } else {
        setIsBooting(false)
      }
    }

    // Open terminal on load
    const terminalWindow: WindowState = {
      id: "terminal",
      title: "terminal",
      type: "terminal",
      isOpen: true,
      isMinimized: false,
      x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 300),
      y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 200),
      width: 600,
      height: 400,
      zIndex: 100,
    }
    setWindows([terminalWindow])

    setTimeout(typeNextLine, 500)
  }, [])

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight
    }
  }, [terminalOutput])

  // Drag handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return
    const { windowId, startX, startY, windowX, windowY } = dragRef.current
    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, x: Math.max(0, windowX + deltaX), y: Math.max(0, windowY + deltaY) }
          : w
      )
    )
  }, [])

  const handleMouseUp = useCallback(() => {
    dragRef.current = null
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseMove])

  const startDrag = (windowId: string, e: React.MouseEvent) => {
    const win = windows.find((w) => w.id === windowId)
    if (!win) return

    dragRef.current = {
      windowId,
      startX: e.clientX,
      startY: e.clientY,
      windowX: win.x,
      windowY: win.y,
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    bringToFront(windowId)
  }

  const bringToFront = (windowId: string) => {
    const newZ = zIndexCounter + 1
    setZIndexCounter(newZ)
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, zIndex: newZ } : w)))
  }

  const openWindow = (type: WindowState["type"], title: string) => {
    const existingWindow = windows.find((w) => w.type === type)
    if (existingWindow) {
      setWindows((prev) =>
        prev.map((w) => (w.id === existingWindow.id ? { ...w, isOpen: true, isMinimized: false, zIndex: zIndexCounter + 1 } : w))
      )
      setZIndexCounter((z) => z + 1)
      return
    }

    const offset = windows.filter((w) => w.isOpen).length * 30
    const newWindow: WindowState = {
      id: `${type}-${Date.now()}`,
      title,
      type,
      isOpen: true,
      isMinimized: false,
      x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - 260 + offset),
      y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 210 + offset),
      width: type === "terminal" ? 600 : 520,
      height: type === "terminal" ? 400 : 420,
      zIndex: zIndexCounter + 1,
    }
    setZIndexCounter((z) => z + 1)
    setWindows((prev) => [...prev, newWindow])
  }

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId))
  }

  const minimizeWindow = (windowId: string) => {
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w)))
  }

  const restoreWindow = (windowId: string) => {
    bringToFront(windowId)
    setWindows((prev) => prev.map((w) => (w.id === windowId ? { ...w, isMinimized: false } : w)))
  }

  // Terminal commands
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const output = [...terminalOutput, `mustakim@portfolio ~ $ ${cmd}`]

    if (trimmed === "help") {
      output.push(
        "available commands:",
        "  whoami          who is mustakim",
        "  open about      about window",
        "  open projects   projects window",
        "  open skills     skills window",
        "  open research   research window",
        "  connect         contact window",
        "  ls              list everything",
        "  cat [section]   print section inline",
        "  resume          download resume",
        "  clear           clear terminal",
        "  easter          👀"
      )
    } else if (trimmed === "whoami") {
      output.push(
        "mustakim shikalgar",
        "─────────────────────────────────────",
        "role      Software Engineer",
        "degree    MS Software Engineering @ ASU",
        "gpa       3.75 / 4.0",
        "location  Tempe, Arizona",
        "status    seeking full-time SDE roles",
        `leetcode  ${leetcodeData.total} solved`,
        "",
        "currently: Technical Architecture Lead @ METY Legal",
        "building:  distributed systems · ml pipelines · rag",
        "",
        '"I work at the intersection of distributed systems,',
        ' machine learning, and full-stack engineering."'
      )
    } else if (trimmed === "status") {
      const daysUptime = Math.floor((new Date().getTime() - new Date("2023-08-15").getTime()) / (1000 * 60 * 60 * 24))
      output.push(
        "// system status",
        "─────────────────────────────",
        `leetcode    ${leetcodeData.total} solved · ${leetcodeData.hard} hard`,
        `github      ${githubData.repo} · ${githubData.message}`,
        `location    Tempe, AZ · ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Phoenix" })}`,
        `uptime      ${daysUptime} days`,
        "─────────────────────────────",
        "// all systems operational"
      )
      openWindow("terminal", "~/status")
    } else if (trimmed === "mode recruiter") {
      setIsRecruiter(true)
      output.push("// recruiter mode: showing simplified view")
    } else if (trimmed === "mode engineer") {
      setIsRecruiter(false)
      output.push("// engineer mode: restored full metrics view")
    } else if (trimmed === "ls") {
      output.push(
        "drwxr-xr-x  about/",
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  skills/",
        "drwxr-xr-x  research/",
        "-rw-r--r--  resume.pdf",
        "-rw-r--r--  contact.txt",
        "-rw-r--r--  ieee-paper.pdf"
      )
    } else if (trimmed.startsWith("open ")) {
      const target = trimmed.replace("open ", "")
      if (["about", "projects", "skills", "research"].includes(target)) {
        openWindow(target as any, `~/${target}`)
        output.push(`opening ~/${target}...`)
      } else if (PROJECTS.some(p => p.id === target)) {
        openWindow("projects", `~/projects/${target}`)
        setExpandedProject(target)
        output.push(`opening ~/projects/${target}...`)
      } else {
        output.push(`open: ${target}: No such file or directory`)
      }
    } else if (trimmed === "connect") {
      openWindow("contact", "~/contact")
      output.push("opening ~/contact...")
    } else if (trimmed === "resume") {
      output.push("downloading resume.pdf...")
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank")
      }
    } else if (trimmed === "clear") {
      setTerminalOutput(["mustakim@portfolio ~ $"])
      setTerminalInput("")
      return
    } else if (trimmed === "easter") {
      output.push(
        "(っ◔◡◔)っ ♥",
        "you found it. here's a secret:",
        "",
        "the missing persons KG paper was accepted on my birthday.",
        "27% acceptance rate. worth it.",
        "",
        "type 'sudo hire-me' if you agree."
      )
    } else if (trimmed === "sudo hire-me") {
      output.push(
        "[sudo] password for recruiter:",
        "authenticating...........",
        "access granted.",
        "",
        "initiating hiring sequence...",
        "opening: shikalgar.mustakim@gmail.com"
      )
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "mailto:shikalgar.mustakim@gmail.com"
        }
      }, 1000)
    } else if (trimmed.startsWith("cat ")) {
      const section = trimmed.replace("cat ", "")
      if (section === "about") {
        output.push(
          "// about.txt",
          "name: Mustakim Shikalgar",
          "role: Software Engineer",
          "education: MS Software Engineering @ ASU (GPA 3.75)",
          "current: Technical Architecture Lead @ METY Legal"
        )
      } else if (section === "skills") {
        output.push(
          "// skills.txt",
          "Languages: Java, Python, TypeScript, C++, SQL",
          "Backend: Spring Boot, Django, FastAPI, gRPC",
          "AI/ML: LangChain, PyTorch, RAG, Knowledge Graphs",
          "Frontend: React, Next.js, Tailwind CSS"
        )
      } else {
        output.push(`cat: ${section}: No such file or directory`)
      }
    } else if (trimmed === "") {
      // Empty command, just show prompt
    } else {
      output.push(`command not found: ${cmd}`, "try 'help' for available commands")
    }

    output.push("mustakim@portfolio ~ $")
    setTerminalOutput(output)
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(terminalInput)
      setTerminalInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex] || "")
      } else {
        setHistoryIndex(-1)
        setTerminalInput("")
      }
    }
  }

  // Window content renderers
  const renderAbout = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-4">
      <div>
        <div className="text-green-400 text-lg">Mustakim Shikalgar</div>
        <div className="text-gray-500">Software Engineer</div>
      </div>
      <p className="text-gray-400 leading-relaxed">
        I work at the intersection of distributed systems, machine learning, and full-stack engineering. Currently pursuing my MS in Software Engineering at Arizona State University while leading technical architecture at METY Legal.
      </p>
      <div className="border-t border-gray-700 pt-3 space-y-1">
        <div className="text-gray-500">{"// education"}</div>
        <div className="flex justify-between">
          <span>Arizona State University</span>
          <span className="text-gray-500">May 2026</span>
        </div>
        <div className="text-gray-400">MS Software Engineering</div>
        <div className="text-green-400">GPA: 3.75 / 4.0</div>
      </div>
      <div className="border-t border-gray-700 pt-3 space-y-1">
        <div className="text-gray-500">{"// current role"}</div>
        <div>Technical Architecture Lead</div>
        <div className="text-gray-400">METY Legal · Leading 6-person team</div>
      </div>
      <div className="border-t border-gray-700 pt-3 space-y-2">
        <div className="text-gray-500">{"// links"}</div>
        <a href="https://github.com/MustakimFS" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
          → github.com/MustakimFS
        </a>
        <a href="https://www.linkedin.com/in/mustakim-shikalgar" target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
          → linkedin.com/in/mustakim-shikalgar
        </a>
        <a href="mailto:shikalgar.mustakim@gmail.com" className="block text-blue-400 hover:underline">
          → shikalgar.mustakim@gmail.com
        </a>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-2 overflow-y-auto max-h-[340px]">
      <div className="text-gray-500 mb-3">{"// select a project to expand"}</div>
      {PROJECTS.map((project, idx) => (
        <div key={project.id} className="border border-gray-700 rounded">
          <button
            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            className="w-full text-left p-2 hover:bg-gray-800/50 transition-colors flex items-center gap-3"
          >
            <span className="text-gray-500 w-5">{idx}</span>
            <span className="flex-1 text-green-400">{project.title}</span>
            <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400">{project.category}</span>
            <span className="text-yellow-400 text-xs">{project.metrics[0]?.value}</span>
          </button>
          {expandedProject === project.id && (
            <div className="p-3 border-t border-gray-700 bg-gray-900/50 space-y-3">
              <div className="text-gray-400 text-xs">{project.subtitle}</div>
              <p className="text-gray-300">{project.description}</p>
              {!isRecruiter && (
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((m) => (
                    <span key={m.label} className="text-xs px-2 py-1 bg-gray-800 rounded">
                      <span className="text-gray-500">{m.label}:</span> <span className="text-green-400">{m.value}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 bg-gray-700 rounded text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-xs">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    [GitHub]
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    [Demo]
                  </a>
                )}
                {project.paper && (
                  <a href={project.paper} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    [Paper]
                  </a>
                )}
                {project.ieee && (
                  <a href={project.ieee} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    [IEEE]
                  </a>
                )}
                {project.note && <span className="text-gray-500">{project.note}</span>}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderSkills = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-4">
      {Object.entries(SKILLS).map(([category, skills]) => (
        <div key={category}>
          <div className="text-gray-500 mb-2">{`// ${category}`}</div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-green-400 text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderResearch = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-4">
      <div className="border border-green-500/30 rounded p-3 bg-green-500/5">
        <div className="text-green-400 flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-green-500/20 rounded text-xs">IEEE COMPSAC 2025</span>
          <span className="text-gray-500 text-xs">27% acceptance</span>
        </div>
        <div className="text-gray-200 mb-2">
          Enhanced Tracking and Reporting of Missing Persons using Knowledge Graph and Ontology Engineering
        </div>
        <div className="text-gray-500 text-xs mb-2">Toronto, Canada</div>
        <a
          href="https://ieeexplore.ieee.org/document/11126748"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-xs"
        >
          → View on IEEE Xplore
        </a>
      </div>
      <div className="text-gray-500">{"// other papers"}</div>
      <div className="space-y-2">
        <a href="/papers/semiconductor-yield.pdf" target="_blank" className="block p-2 border border-gray-700 rounded hover:bg-gray-800/50">
          <div className="text-gray-300">Semiconductor Yield Prediction</div>
          <div className="text-gray-500 text-xs">Machine Learning · Binary Classification</div>
        </a>
        <a href="/papers/pixeldrive.pdf" target="_blank" className="block p-2 border border-gray-700 rounded hover:bg-gray-800/50">
          <div className="text-gray-300">PixelDrive: Road Scene Segmentation</div>
          <div className="text-gray-500 text-xs">Computer Vision · Semantic Segmentation</div>
        </a>
        <a href="/papers/working-paper.pdf" target="_blank" className="block p-2 border border-gray-700 rounded hover:bg-gray-800/50">
          <div className="text-gray-300">Movie Genre Prediction</div>
          <div className="text-gray-500 text-xs">Working Paper · NLP</div>
        </a>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-3">
      <div className="text-gray-500">{"// reach out"}</div>
      <div className="space-y-2">
        <a href="mailto:shikalgar.mustakim@gmail.com" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">email</span>
          <span className="text-green-400 group-hover:underline">shikalgar.mustakim@gmail.com</span>
        </a>
        <a href="https://www.linkedin.com/in/mustakim-shikalgar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">linkedin</span>
          <span className="text-blue-400 group-hover:underline">linkedin.com/in/mustakim-shikalgar</span>
        </a>
        <a href="https://github.com/MustakimFS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">github</span>
          <span className="text-blue-400 group-hover:underline">github.com/MustakimFS</span>
        </a>
        <a href="/resume.pdf" target="_blank" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">resume</span>
          <span className="text-yellow-400 group-hover:underline">download resume.pdf</span>
        </a>
      </div>
    </div>
  )

  const renderTerminal = () => (
    <div className="flex flex-col h-full bg-[#0a0c10] font-mono text-sm">
      <div
        ref={terminalOutputRef}
        className="flex-1 p-3 overflow-y-auto"
        onClick={() => terminalInputRef.current?.focus()}
      >
        {terminalOutput.map((line, idx) => {
          const isPrompt = line.includes("mustakim@portfolio")
          const isComment = line.startsWith("//")
          return (
            <div
              key={idx}
              className={`${isPrompt ? "text-green-400" : isComment ? "text-gray-600" : "text-gray-300"} whitespace-pre-wrap`}
            >
              {line}
            </div>
          )
        })}
      </div>
      {!isBooting && (
        <div className="flex items-center px-3 pb-3 text-green-400">
          <span className="mr-2">{">"}</span>
          <input
            ref={terminalInputRef}
            type="text"
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-200 caret-green-400"
            autoFocus
            spellCheck={false}
          />
          <span className="w-2 h-4 bg-green-400 animate-pulse" />
        </div>
      )}
    </div>
  )

  const renderWindowContent = (win: WindowState) => {
    switch (win.type) {
      case "terminal":
        return renderTerminal()
      case "about":
        return renderAbout()
      case "projects":
        return renderProjects()
      case "skills":
        return renderSkills()
      case "research":
        return renderResearch()
      case "contact":
        return renderContact()
      default:
        return null
    }
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none"
      style={{
        backgroundColor: "#060810",
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Raft Background Animation */}
      <RaftBackground />

      {/* Windows */}
      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((win) => (
          <div
            key={win.id}
            className="absolute rounded-lg overflow-hidden shadow-2xl border border-gray-700/50 animate-in zoom-in-95 fade-in duration-150"
            style={{
              left: win.x,
              top: win.y,
              width: win.width,
              height: win.height,
              zIndex: win.zIndex,
            }}
            onClick={() => bringToFront(win.id)}
          >
            {/* Title bar */}
            <div
              className="h-8 bg-[#1a1d24] flex items-center px-3 cursor-move"
              onMouseDown={(e) => startDrag(win.id, e)}
            >
              <div className="flex gap-2 mr-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(win.id)
                  }}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(win.id)
                  }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400"
                />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm font-mono">{win.title}</span>
            </div>
            {/* Content */}
            <div className="bg-[#0d0f14] h-[calc(100%-2rem)] overflow-auto">{renderWindowContent(win)}</div>
          </div>
        ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#0d0f14]/95 border-t border-gray-800 flex items-center px-4 backdrop-blur-sm">
        <div className="text-green-400 font-mono text-sm font-bold mr-6">MS.dev</div>
        <div className="flex gap-2 flex-1">
          {windows
            .filter((w) => w.isOpen)
            .map((win) => (
              <button
                key={win.id}
                onClick={() => (win.isMinimized ? restoreWindow(win.id) : bringToFront(win.id))}
                className={`px-3 py-1 text-sm font-mono rounded transition-colors ${
                  win.isMinimized
                    ? "bg-gray-800/50 text-gray-500 hover:bg-gray-700/50"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                {win.title}
              </button>
            ))}
        </div>
        <div className="mr-4" style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(52,211,153,0.5)" }}>
          last commit: {githubData.repo} · {timeAgo(githubData.time)}
        </div>
        <div className="text-gray-500 font-mono text-sm">
          {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
