'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Research from '@/components/Research'
import Contact from '@/components/Contact'
import RaftBackground from '@/components/RaftBackground'
import { setEasterHash } from '@/lib/easterHash'
import { PERSONAL } from '@/lib/data'

// ── Easter utilities ──────────────────────────────────────────────────────

const SECRET_WORDS = ['phantom', 'ghost', 'cipher', 'void', 'glitch', 'specter', 'echo', 'flux']

function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, c => {
    const base = c >= 'a' ? 97 : 65
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

// Graffiti tags scattered around the screen
const GRAFFITI_TAGS = [
  { text: '1337',            style: { top: '12%',  left: '8%',  fontSize: '3rem',  color: '#00fff7', '--rot': '-12deg' } as React.CSSProperties, delay: 0.15 },
  { text: 'h4x0r',          style: { top: '18%',  right: '6%', fontSize: '2.4rem', color: '#ff2d78', '--rot': '8deg'  } as React.CSSProperties, delay: 0.25 },
  { text: '404:\nnormal\nnot found', style: { bottom: '22%', left: '4%', fontSize: '1.6rem', color: '#ffe600', '--rot': '-6deg', whiteSpace: 'pre', lineHeight: 1.2 } as React.CSSProperties, delay: 0.35 },
  { text: 'EZ GG',          style: { bottom: '14%', right: '7%', fontSize: '2.8rem', color: '#39ff14', '--rot': '10deg' } as React.CSSProperties, delay: 0.45 },
  { text: 'was here',       style: { top: '62%',  left: '3%',  fontSize: '1.4rem', color: '#b388ff', '--rot': '-8deg' } as React.CSSProperties, delay: 0.2  },
  { text: '░▒▓ l33t ▓▒░',  style: { top: '75%',  right: '4%', fontSize: '1.3rem', color: '#ff9800', '--rot': '5deg'  } as React.CSSProperties, delay: 0.3  },
]

// ── Component ─────────────────────────────────────────────────────────────

export default function Page() {
  const [chaosMode, setChaosMode] = useState(false)
  const [shakeMode, setShakeMode] = useState(false)
  const [termOpen, setTermOpen] = useState(true)
  const [termLines, setTermLines] = useState<string[]>([
    'mustakim@portfolio ~ $ type "help" for commands',
    'mustakim@portfolio ~ $',
  ])
  const [termInput, setTermInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)

  // Konami graffiti state
  const [konamiActive, setKonamiActive] = useState(false)
  const [konamiFading, setKonamiFading] = useState(false)

  const secretWordRef = useRef<string>(SECRET_WORDS[0])
  const termEndRef = useRef<HTMLDivElement>(null)
  const termInputRef = useRef<HTMLInputElement>(null)
  const konamiRef = useRef<string[]>([])

  // Init session hash
  useEffect(() => {
    const word = SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)]
    secretWordRef.current = word
    setEasterHash('[' + rot13(word) + ']')
  }, [])

  // Backtick toggle + konami
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        setTermOpen(v => !v)
      }
      if (e.key === 'Escape') setTermOpen(false)

      // Konami — graffiti overlay
      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length)
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        konamiRef.current = []
        setKonamiActive(true)
        setKonamiFading(false)
        // Start fade-out after 3.5s, remove after 4s
        setTimeout(() => setKonamiFading(true), 3500)
        setTimeout(() => { setKonamiActive(false); setKonamiFading(false) }, 4100)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll terminal to bottom
  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [termLines])

  // Focus input when terminal opens
  useEffect(() => {
    if (termOpen) setTimeout(() => termInputRef.current?.focus(), 50)
  }, [termOpen])

  function addLines(...lines: string[]) {
    setTermLines(prev => [...prev, ...lines, 'mustakim@portfolio ~ $'])
  }

  function scrollToSection(id: string) {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  function executeCommand(raw: string) {
    const cmd = raw.trim().toLowerCase()
    const echo = `mustakim@portfolio ~ $ ${raw}`

    if (cmd === '') {
      setTermLines(prev => [...prev, echo])
      return
    }

    setHistory(h => [raw, ...h])
    setHistIdx(-1)

    if (cmd === 'clear') {
      setTermLines(['mustakim@portfolio ~ $'])
      return
    }

    if (cmd === 'exit') {
      setTermLines(prev => [...prev, echo, '// terminal closed'])
      setTermOpen(false)
      return
    }

    if (cmd === 'help') {
      setTermLines(prev => [
        ...prev, echo,
        'available commands:',
        '  whoami              who is mustakim',
        '  ls                  list sections',
        '  open [section]      scroll to section',
        '  sudo hire-me        ;)',
        '  clear               clear terminal',
        '  exit                close terminal',
        '// 💡 secrets exist. some are hidden in plain sight.',
        'mustakim@portfolio ~ $',
      ])
      return
    }

    if (cmd === 'whoami') {
      addLines(
        echo,
        PERSONAL.name,
        '──────────────────────────────',
        `role      ${PERSONAL.title}`,
        'degree    MS Software Engineering @ ASU',
        'gpa       3.75 / 4.0',
        `location  ${PERSONAL.location}`,
        'status    seeking full-time SDE roles',
      )
      return
    }

    if (cmd === 'ls') {
      addLines(
        echo,
        'drwxr-xr-x  about/',
        'drwxr-xr-x  projects/',
        'drwxr-xr-x  skills/',
        'drwxr-xr-x  research/',
        '-rw-r--r--  contact.txt',
        '-rw-r--r--  resume.pdf',
      )
      return
    }

    if (cmd.startsWith('open ')) {
      const target = cmd.replace('open ', '').trim()
      const valid = ['about', 'projects', 'skills', 'research', 'contact', 'hero']
      if (valid.includes(target)) {
        scrollToSection(target)
        addLines(echo, `// scrolling to ~/${target}`)
      } else {
        addLines(echo, `open: ${target}: No such section`)
      }
      return
    }

    if (cmd === 'sudo hire-me') {
      setTermLines(prev => [
        ...prev, echo,
        '[sudo] password for recruiter:',
        'authenticating...',
        'access granted.',
        '',
        `opening: ${PERSONAL.email}`,
        'mustakim@portfolio ~ $',
      ])
      setTimeout(() => { window.location.href = `mailto:${PERSONAL.email}` }, 800)
      return
    }

    // Secret word — triggers easter mode
    if (cmd === secretWordRef.current) {
      const newWord = SECRET_WORDS.filter(w => w !== secretWordRef.current)[
        Math.floor(Math.random() * (SECRET_WORDS.length - 1))
      ]
      secretWordRef.current = newWord
      setEasterHash('[' + rot13(newWord) + ']')

      setTermLines(prev => [
        ...prev, echo,
        '',
        '// access granted',
        '// you found the signal',
        '',
        '// chaos mode: ACTIVATED',
        '// the system has shifted. a new signal exists.',
        '// look for it.',
        '',
        'mustakim@portfolio ~ $',
      ])
      setChaosMode(true)
      setShakeMode(true)
      setTimeout(() => { setShakeMode(false); setChaosMode(false); window.location.reload() }, 3000)
      return
    }

    // Rot13 hint
    if (cmd === rot13(secretWordRef.current)) {
      addLines(
        echo,
        '// this input appears to be encoded',
        '// hint: rot13 · try rot13.com',
      )
      return
    }

    addLines(echo, `command not found: ${raw}`, "try 'help' for available commands")
  }

  return (
    <main className={`relative min-h-screen bg-[#060810]${shakeMode ? ' shake-it' : ''}`}>
      <RaftBackground chaosMode={chaosMode} />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Research />
        <Contact />
      </div>

      {/* Hint dot */}
      <div
        className="fixed bottom-4 right-4 z-50 w-2 h-2 rounded-full bg-green-400/40 animate-pulse cursor-pointer"
        onClick={() => setTermOpen(v => !v)}
        title="Press ` to open terminal"
      />

      {/* ── Konami graffiti overlay ── */}
      {konamiActive && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center pointer-events-none select-none ${konamiFading ? 'graffiti-out' : ''}`}
          style={{ background: 'rgba(0,0,0,0.55)' }}
        >
          {/* Scattered tags */}
          {GRAFFITI_TAGS.map((tag, i) => (
            <span
              key={i}
              className="graffiti-tag absolute font-black tracking-tight drop-shadow-[0_0_12px_currentColor]"
              style={{
                ...tag.style,
                fontFamily: "'Impact','Arial Black',sans-serif",
                textShadow: `0 0 20px ${(tag.style as React.CSSProperties & { color: string }).color}88, 2px 3px 0 #000`,
                animationDelay: `${tag.delay}s`,
              }}
            >
              {tag.text}
            </span>
          ))}

          {/* Main centrepiece */}
          <div
            className="graffiti-tag relative text-center"
            style={{ '--rot': '-3deg' } as React.CSSProperties}
          >
            <div
              className="font-black leading-none tracking-tighter"
              style={{
                fontFamily: "'Impact','Arial Black',sans-serif",
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                color: '#fff',
                WebkitTextStroke: '3px #ff2d78',
                textShadow: '0 0 40px #ff2d78aa, 0 0 80px #ff2d7855, 4px 5px 0 #000',
                animationDelay: '0s',
              }}
            >
              CONGRATS
            </div>
            <div
              className="font-black leading-none tracking-tighter"
              style={{
                fontFamily: "'Impact','Arial Black',sans-serif",
                fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                color: '#00fff7',
                WebkitTextStroke: '2px #0088aa',
                textShadow: '0 0 30px #00fff7aa, 4px 5px 0 #000',
              }}
            >
              U R A NERD TOO
            </div>
            <div
              className="mt-3 font-mono text-sm tracking-widest"
              style={{ color: '#ffe60099', textShadow: '0 0 10px #ffe600' }}
            >
              ↑↑↓↓←→←→BA · achievement unlocked
            </div>
          </div>
        </div>
      )}

      {/* Terminal overlay */}
      {termOpen && (
        <div
          className="fixed bottom-8 right-8 z-[100] w-96 h-72 bg-[#060810] border border-gray-700 rounded-lg shadow-2xl shadow-black/60 flex flex-col font-mono text-xs overflow-hidden"
          onClick={() => termInputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a0c10] border-b border-gray-800 shrink-0">
            <button
              onClick={e => { e.stopPropagation(); setTermOpen(false) }}
              className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-gray-500">~/portfolio</span>
          </div>

          {/* Output */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
            {termLines.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith('mustakim@portfolio') ? 'text-green-400' :
                  line.startsWith('//') ? 'text-gray-600' :
                  line.startsWith('[') ? 'text-amber-400' :
                  'text-gray-300'
                }
              >
                {line || ' '}
              </div>
            ))}
            <div ref={termEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center px-3 py-2 border-t border-gray-800 shrink-0">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={termInputRef}
              value={termInput}
              onChange={e => setTermInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  executeCommand(termInput)
                  setTermInput('')
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  const newIdx = Math.min(histIdx + 1, history.length - 1)
                  setHistIdx(newIdx)
                  setTermInput(history[newIdx] ?? '')
                } else if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const newIdx = Math.max(histIdx - 1, -1)
                  setHistIdx(newIdx)
                  setTermInput(newIdx === -1 ? '' : history[newIdx] ?? '')
                } else if (e.key === 'Escape') {
                  setTermOpen(false)
                }
              }}
              className="flex-1 bg-transparent text-gray-200 outline-none caret-green-400"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      )}
    </main>
  )
}
