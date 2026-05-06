"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { PROJECTS, SKILLS, PERSONAL, ACHIEVEMENTS } from '@/lib/data'
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
  type: "terminal" | "about" | "projects" | "skills" | "research" | "contact" | "leetcode"
  isOpen: boolean
  isMinimized: boolean
  isMaximized?: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
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
  const [leetcodeData, setLeetcodeData] = useState({ total: 815, hard: 126 })
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

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        restoreWindow("terminal")
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
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
      x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - Math.min(950, typeof window !== "undefined" ? window.innerWidth * 0.9 : 950) / 2),
      y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - 310),
      width: Math.min(950, typeof window !== "undefined" ? window.innerWidth * 0.9 : 950),
      height: 620,
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

  const toggleMaximize = (windowId: string) => {
    bringToFront(windowId)
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w
        if (w.isMaximized) {
          const isTerm = w.type === "terminal"
          const defaultW = isTerm ? Math.min(950, typeof window !== "undefined" ? window.innerWidth * 0.9 : 950) : 860
          const defaultH = isTerm ? 620 : 580
          const defaultX = Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - defaultW / 2)
          const defaultY = Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - defaultH / 2)
          return { ...w, isMaximized: false, width: defaultW, height: defaultH, x: defaultX, y: defaultY }
        } else {
          const maxW = typeof window !== "undefined" ? window.innerWidth * 0.95 : 1200
          const maxH = typeof window !== "undefined" ? window.innerHeight * 0.9 : 800
          const maxX = typeof window !== "undefined" ? (window.innerWidth - maxW) / 2 : 50
          const maxY = typeof window !== "undefined" ? (window.innerHeight - maxH) / 2 : 50
          return { ...w, isMaximized: true, width: maxW, height: maxH, x: maxX, y: maxY }
        }
      })
    )
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
      x: Math.max(50, (typeof window !== "undefined" ? window.innerWidth : 1200) / 2 - (type === "terminal" ? Math.min(950, (typeof window !== "undefined" ? window.innerWidth * 0.9 : 950)) : 860) / 2 + offset),
      y: Math.max(50, (typeof window !== "undefined" ? window.innerHeight : 800) / 2 - (type === "terminal" ? 310 : 290) + offset),
      width: type === "terminal" ? Math.min(950, (typeof window !== "undefined" ? window.innerWidth * 0.9 : 950)) : 860,
      height: type === "terminal" ? 620 : 580,
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
        "// 💡 there are easter eggs hidden in this portfolio"
      )
    } else if (trimmed === "whoami") {
      output.push(
        PERSONAL.name,
        "─────────────────────────────────────",
        `role      ${PERSONAL.title}`,
        "degree    MS Software Engineering @ ASU",
        "gpa       3.75 / 4.0",
        `location  ${PERSONAL.location}`,
        "status    seeking full-time SDE roles",
        `leetcode  ${leetcodeData.total} solved · ${leetcodeData.hard} hard`,
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
        "-rw-r--r--  ieee-paper.pdf",
        "-rw-r--r--  leetcode.profile"
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
    } else if (trimmed === "open leetcode") {
      openWindow("leetcode", "~/leetcode")
      output.push("opening ~/leetcode...")
    } else if (trimmed === "connect") {
      openWindow("contact", "~/contact")
      output.push("opening ~/contact...")
    } else if (trimmed === "resume") {
      output.push("downloading resume.pdf...")
      if (typeof window !== "undefined") {
        window.open(PERSONAL.resume, "_blank")
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
        `opening: ${PERSONAL.email}`
      )
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = `mailto:${PERSONAL.email}`
        }
      }, 1000)
    } else if (trimmed.startsWith("cat ")) {
      const section = trimmed.replace("cat ", "")
      if (section === "about") {
        output.push(
          "// about.txt",
          `name: ${PERSONAL.name}`,
          `role: ${PERSONAL.title}`,
          "education: MS Software Engineering @ ASU (GPA 3.75)",
          "current: Technical Architecture Lead @ METY Legal"
        )
      } else if (section === "skills") {
        output.push(
          "// skills.txt",
          ...SKILLS.map(s => `${s.category}: ${s.items.map(i => i.name).join(", ")}`)
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
        <div className="text-green-400 text-lg">{PERSONAL.name}</div>
        <div className="text-gray-500">{PERSONAL.title}</div>
      </div>
      <p className="text-gray-400 leading-relaxed">
        {PERSONAL.bio}
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
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
          → {PERSONAL.github.replace("https://", "")}
        </a>
        <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
          → {PERSONAL.linkedin.replace("https://www.", "")}
        </a>
        <a href={`mailto:${PERSONAL.email}`} className="block text-blue-400 hover:underline">
          → {PERSONAL.email}
        </a>
        <a href={PERSONAL.leetcode} target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline">
          → {PERSONAL.leetcode.replace("https://", "")}
        </a>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="p-6 font-mono text-sm text-gray-300 space-y-3 overflow-y-auto max-h-[calc(100%-2rem)]">
      <div className="text-gray-500 mb-4 text-xs">// select a project to expand</div>
      {PROJECTS.map((project, idx) => (
        <div key={project.id} className="border border-gray-700 rounded-md overflow-hidden">
          <button
            onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            className="w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-colors flex items-center gap-4"
          >
            <span className="text-gray-600 w-6 text-xs">{String(idx).padStart(2, '0')}</span>
            <span className="flex-1 text-green-400 font-medium">{project.title}</span>
            <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-400 hidden sm:inline">{project.category}</span>
            <span className="text-yellow-400 text-sm font-medium">{project.metrics[0]?.value}</span>
            <span className="text-gray-600 text-xs ml-1">{expandedProject === project.id ? '▲' : '▼'}</span>
          </button>
          {expandedProject === project.id && (
            <div className="px-6 py-5 border-t border-gray-700 bg-gray-900/40 space-y-4">
              <div className="text-gray-500 text-xs tracking-wide">{project.subtitle}</div>
              <p className="text-gray-300 leading-relaxed text-sm">{project.description}</p>
              {!isRecruiter && (
                <div className="grid grid-cols-3 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-gray-800/60 rounded px-3 py-2">
                      <div className="text-green-400 font-medium text-base">{m.value}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-800 rounded-sm text-gray-400 border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 text-xs pt-1 border-t border-gray-800">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                    ↗ GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1">
                    ↗ Live Demo
                  </a>
                )}
                {project.paper && (
                  <a href={project.paper} target="_blank" rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1">
                    ↗ Paper
                  </a>
                )}
                {project.ieee && (
                  <a href={project.ieee} target="_blank" rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                    ↗ IEEE
                  </a>
                )}
                {project.note && (
                  <span className="text-gray-600 italic">{project.note}</span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const renderSkills = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-4">
      {SKILLS.map((skillGroup) => (
        <div key={skillGroup.category}>
          <div className="text-gray-500 mb-2">{`// ${skillGroup.category}`}</div>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill) => (
              <span key={skill.name} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-green-400 text-xs">
                {skill.name}
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
          href={PERSONAL.ieee}
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
        <a href={`mailto:${PERSONAL.email}`} className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">email</span>
          <span className="text-green-400 group-hover:underline">{PERSONAL.email}</span>
        </a>
        <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">linkedin</span>
          <span className="text-blue-400 group-hover:underline">{PERSONAL.linkedin.replace("https://www.", "")}</span>
        </a>
        <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
          <span className="text-gray-500">github</span>
          <span className="text-blue-400 group-hover:underline">{PERSONAL.github.replace("https://", "")}</span>
        </a>
        <a href={PERSONAL.resume} target="_blank" className="flex items-center gap-3 p-2 border border-gray-700 rounded hover:bg-gray-800/50 group">
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

  const renderLeetcode = () => (
    <div className="p-4 font-mono text-sm text-gray-300 space-y-4">
      <div className="text-gray-500">{"// mustakim @ leetcode"}</div>
      <div className="text-gray-400">─────────────────────────────────────</div>
      <div className="grid grid-cols-[100px_1fr] gap-1">
        <div className="text-gray-500">solved</div>
        <div className="text-green-400">{leetcodeData.total} problems</div>
        <div className="text-gray-500">hard</div>
        <div className="text-green-400">{leetcodeData.hard} solved</div>
        <div className="text-gray-500">rank</div>
        <div className="text-yellow-400">top 15% globally</div>
      </div>
      <div className="text-gray-400">─────────────────────────────────────</div>
      <a href={PERSONAL.leetcode} target="_blank" rel="noopener noreferrer" className="block text-blue-400 hover:underline mt-4">
        → {PERSONAL.leetcode.replace("https://", "")}
      </a>
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
      case "leetcode":
        return renderLeetcode()
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
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          restoreWindow("terminal")
        }
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
              className="h-8 bg-[#1a1d24] flex items-center px-3 cursor-default"
              onMouseDown={(e) => startDrag(win.id, e)}
            >
              <div className="flex gap-2 mr-4">
                {win.type !== "terminal" ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      closeWindow(win.id)
                    }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer relative group/btn"
                  >
                    <span className="opacity-0 group-hover/btn:opacity-100 bg-gray-900 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded absolute top-6 left-0 whitespace-nowrap z-50 transition-opacity">close</span>
                  </button>
                ) : (
                  <div className="w-3 h-3 rounded-full bg-red-500/30 cursor-not-allowed relative group/btn">
                    <span className="opacity-0 group-hover/btn:opacity-100 bg-gray-900 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded absolute top-6 left-0 whitespace-nowrap z-50 transition-opacity">protected</span>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(win.id)
                  }}
                  className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer relative group/btn"
                >
                  <span className="opacity-0 group-hover/btn:opacity-100 bg-gray-900 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded absolute top-6 left-0 whitespace-nowrap z-50 transition-opacity">minimize</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMaximize(win.id)
                  }}
                  className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer relative group/btn"
                >
                  <span className="opacity-0 group-hover/btn:opacity-100 bg-gray-900 text-gray-300 text-[10px] font-mono px-2 py-0.5 rounded absolute top-6 left-0 whitespace-nowrap z-50 transition-opacity">maximize</span>
                </button>
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
                className={`px-3 py-1 text-sm font-mono rounded transition-colors ${win.isMinimized
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
