'use client'

import { useEffect, useRef, useState } from 'react'
import KonamiCanvas from '@/components/KonamiCanvas'
import FluidLabel from '@/components/FluidLabel'
import { setEasterHash } from '@/lib/easterHash'
import { PERSONAL } from '@/lib/data'
import { FEATURED_PROJECTS, ARCHIVED_PROJECTS, ALL_PROJECTS } from '@/lib/projects'
import { timeAgo } from '@/lib/liveData'

// ── Constants ─────────────────────────────────────────────────────────────

const SECRET_WORDS = ['phantom', 'ghost', 'cipher', 'void', 'glitch', 'specter', 'echo', 'flux']
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const GRAFFITI_TAGS = [
  { text: '1337',                    style: { top: '12%',  left: '8%',  fontSize: '3rem',   color: '#ffd700', '--rot': '-12deg' } as React.CSSProperties, delay: 0.05 },
  { text: 'h4x0r',                   style: { top: '18%',  right: '6%', fontSize: '2.4rem', color: '#ff6b35', '--rot': '8deg'   } as React.CSSProperties, delay: 0.08 },
  { text: '404:\nnormal\nnot found', style: { bottom: '22%', left: '4%', fontSize: '1.6rem', color: '#00e5ff', '--rot': '-6deg', whiteSpace: 'pre', lineHeight: 1.2 } as React.CSSProperties, delay: 0.1 },
  { text: 'EZ GG',                   style: { bottom: '14%', right: '7%', fontSize: '2.8rem', color: '#69ff47', '--rot': '10deg' } as React.CSSProperties, delay: 0.12 },
  { text: 'was here',                style: { top: '62%',  left: '3%',  fontSize: '1.4rem', color: '#ea80fc', '--rot': '-8deg' } as React.CSSProperties, delay: 0.06 },
  { text: '░▒▓ l33t ▓▒░',           style: { top: '75%',  right: '4%', fontSize: '1.3rem', color: '#ff4081', '--rot': '5deg'  } as React.CSSProperties, delay: 0.09 },
]

function rot13(s: string) {
  return s.replace(/[a-zA-Z]/g, c => {
    const base = c >= 'a' ? 97 : 65
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

// ── Component ─────────────────────────────────────────────────────────────

/**
 * Global easter egg layer. Mount once at root layout level.
 *
 * Features (preserved from the original portfolio):
 *   - Backtick (`) toggles a fake terminal in the bottom-right
 *   - Konami code (↑↑↓↓←→←→BA) triggers a graffiti overlay
 *   - A rot13-encoded secret word rotates per session; typing it in the
 *     terminal triggers "chaos mode" (page shake) and reveals a new secret
 *   - Terminal commands: help, whoami, ls, open <section>, sudo hire-me,
 *     clear, exit
 */
export default function EasterEggsLayer() {
  const [chaosMode, setChaosMode] = useState(false)
  const [shakeMode, setShakeMode] = useState(false)
  const [termOpen, setTermOpen] = useState(false)
  const [termLines, setTermLines] = useState<string[]>([
    'mustakim@portfolio ~ $ type "help" for commands',
    'mustakim@portfolio ~ $',
  ])
  const [termInput, setTermInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const [konamiActive, setKonamiActive] = useState(false)
  const [konamiFading, setKonamiFading] = useState(false)

  // Live data (fetched client-side from the same API routes the Info page uses)
  const [lcStats, setLcStats] = useState<{
    total: number
    ranking: number
    topPercentage: number
    rating: number
  } | null>(null)
  const [ghCommits, setGhCommits] = useState<
    { repo: string; message: string; sha: string; time: string }[] | null
  >(null)

  const secretWordRef = useRef<string>(SECRET_WORDS[0])
  const termEndRef = useRef<HTMLDivElement>(null)
  const termInputRef = useRef<HTMLInputElement>(null)
  const konamiRef = useRef<string[]>([])

  // Init session hash with a random rot13 secret
  useEffect(() => {
    const word = SECRET_WORDS[Math.floor(Math.random() * SECRET_WORDS.length)]
    secretWordRef.current = word
    setEasterHash('[' + rot13(word) + ']')
  }, [])

  // Pull live LeetCode + GitHub data once on mount. Client-side fetch of the
  // same /api routes the Info page renders from — fails silently so the
  // terminal still works (whoami / commits fall back to static text).
  useEffect(() => {
    let cancelled = false
    fetch('/api/leetcode')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d) setLcStats(d) })
      .catch(() => {})
    fetch('/api/github')
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (!cancelled && d?.commits) setGhCommits(d.commits) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  // Apply shake to body when active so the WHOLE page shakes
  useEffect(() => {
    if (shakeMode) {
      document.body.classList.add('shake-it')
      return () => document.body.classList.remove('shake-it')
    }
  }, [shakeMode])

  // Global keyboard listeners
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault()
        setTermOpen(v => !v)
      }
      if (e.key === 'Escape') setTermOpen(false)

      konamiRef.current = [...konamiRef.current, e.key].slice(-KONAMI.length)
      if (konamiRef.current.join(',') === KONAMI.join(',')) {
        konamiRef.current = []
        setKonamiActive(true)
        setKonamiFading(false)
        setTimeout(() => setKonamiFading(true), 5500)
        setTimeout(() => {
          setKonamiActive(false)
          setKonamiFading(false)
        }, 6100)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll terminal to bottom on new lines
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
        ...prev,
        echo,
        'available commands:',
        '  whoami              who is mustakim',
        '  ls                  list the filesystem',
        '  ls projects         list every case study',
        '  cat <project>       open a project case study',
        '  open <section>      work · info · more',
        '  commits             recent github commits (live)',
        '  resume              open resume (pdf)',
        '  github              open github profile',
        '  linkedin            open linkedin profile',
        '  leetcode            open leetcode profile',
        '  sudo hire-me        ;)',
        '  clear               clear terminal',
        '  exit                close terminal',
        '// 💡 secrets exist. some are hidden in plain sight.',
        'mustakim@portfolio ~ $',
      ])
      return
    }

    if (cmd === 'whoami') {
      const lc = lcStats
        ? `${lcStats.total.toLocaleString()} solved · #${lcStats.ranking.toLocaleString()} · contest top ${lcStats.topPercentage}%`
        : 'top 15% globally · 815+ solved'
      addLines(
        echo,
        PERSONAL.name,
        '──────────────────────────────',
        `role        ${PERSONAL.title}`,
        'degree      MS Software Engineering @ ASU',
        'gpa         3.75 / 4.0',
        'research    IEEE COMPSAC 2025 · published',
        `leetcode    ${lc}${lcStats ? '  (live)' : ''}`,
        `location    ${PERSONAL.location}`,
        'status      seeking full-time SDE roles · May 2026',
      )
      return
    }

    if (cmd === 'ls' || cmd.startsWith('ls ') || cmd === 'projects') {
      const arg = cmd === 'projects' ? 'projects' : cmd.replace(/^ls\s*/, '').trim().replace(/\/$/, '')
      if (arg === 'projects') {
        addLines(
          echo,
          `# featured (${FEATURED_PROJECTS.length})`,
          ...FEATURED_PROJECTS.map(p => `  ${p.id.padEnd(20)}${p.title}`),
          '',
          `# more work (${ARCHIVED_PROJECTS.length})`,
          ...ARCHIVED_PROJECTS.map(p => `  ${p.id.padEnd(20)}${p.title}`),
          '',
          '// try: cat <name>   e.g. cat aegisflow',
        )
        return
      }
      if (arg && arg !== '.') {
        addLines(echo, `ls: ${arg}: No such directory`, '// try "ls" or "ls projects"')
        return
      }
      addLines(
        echo,
        `drwxr-xr-x  projects/      ${ALL_PROJECTS.length} case studies — run "ls projects"`,
        '-rw-r--r--  about.md       run "open info"',
        '-rw-r--r--  resume.pdf     run "resume"',
        '-rw-r--r--  contact.txt    run "sudo hire-me"',
      )
      return
    }

    if (cmd.startsWith('open ')) {
      const target = cmd.replace('open ', '').trim()
      const valid: Record<string, string> = {
        work: '/',
        home: '/',
        projects: '/',
        info: '/info',
        about: '/info',
        more: '/#more-work',
        'more-work': '/#more-work',
      }
      const href = valid[target]
      if (href) {
        addLines(echo, `// navigating to ${href}`)
        setTimeout(() => {
          window.location.href = href
        }, 600)
      } else {
        addLines(echo, `open: ${target}: No such section`, '// sections: work · info · more')
      }
      return
    }

    if (cmd.startsWith('cat ')) {
      const slug = cmd.replace('cat ', '').trim().replace(/\/$/, '')
      const proj = ALL_PROJECTS.find(p => p.id === slug)
      if (proj) {
        addLines(echo, `// opening ${proj.title} → /projects/${proj.id}`)
        setTimeout(() => {
          window.location.href = `/projects/${proj.id}`
        }, 600)
      } else {
        addLines(
          echo,
          `cat: ${slug || '<empty>'}: No such project`,
          '// run "ls projects" to see valid names',
        )
      }
      return
    }

    if (cmd === 'commits' || cmd === 'git log') {
      if (!ghCommits) {
        addLines(echo, '// fetching recent commits… try again in a second')
        return
      }
      if (ghCommits.length === 0) {
        addLines(echo, '// no recent public commits found')
        return
      }
      addLines(
        echo,
        ...ghCommits.slice(0, 5).map(
          c => `  ${(c.sha || '').padEnd(9)}${(c.repo || '').slice(0, 22).padEnd(24)}${c.message}`,
        ),
        '',
        `// latest: ${timeAgo(ghCommits[0].time)} · github.com/MustakimFS`,
      )
      return
    }

    // Open an external profile / resume in a new tab. Runs synchronously
    // inside the Enter keydown so the popup isn't blocked.
    const LINKS: Record<string, string> = {
      github: PERSONAL.github,
      linkedin: PERSONAL.linkedin,
      leetcode: PERSONAL.leetcode,
      ieee: PERSONAL.ieee,
      resume: PERSONAL.resume,
    }
    if (LINKS[cmd]) {
      addLines(echo, `// opening ${LINKS[cmd]}`)
      window.open(LINKS[cmd], '_blank', 'noopener,noreferrer')
      return
    }

    if (cmd === 'sudo hire-me') {
      setTermLines(prev => [
        ...prev,
        echo,
        '[sudo] password for recruiter:',
        'authenticating...',
        'access granted.',
        '',
        `opening: ${PERSONAL.email}`,
        'mustakim@portfolio ~ $',
      ])
      setTimeout(() => {
        window.location.href = `mailto:${PERSONAL.email}`
      }, 800)
      return
    }

    // Secret word → chaos mode
    if (cmd === secretWordRef.current) {
      const newWord = SECRET_WORDS.filter(w => w !== secretWordRef.current)[
        Math.floor(Math.random() * (SECRET_WORDS.length - 1))
      ]
      secretWordRef.current = newWord
      setEasterHash('[' + rot13(newWord) + ']')
      setTermLines(prev => [
        ...prev,
        echo,
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
      setTimeout(() => {
        setShakeMode(false)
        setChaosMode(false)
      }, 3000)
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
    <>
      {/* Terminal toggle — expand-on-hover fluid pill, bottom-right */}
      <div className="fixed bottom-4 right-4 z-50">
        <FluidLabel
          size="sm"
          expand
          onClick={() => setTermOpen(v => !v)}
          title="Press ` to toggle terminal"
          ariaLabel="Toggle terminal"
          icon={
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-bone"
              aria-hidden="true"
            >
              <path d="M2.5 4 L5 6.5 L2.5 9" />
              <path d="M6.5 10 L11 10" />
            </svg>
          }
          trailingIcon={
            <kbd className="font-mono text-[10px] text-bone-dim leading-none">`</kbd>
          }
        >
          <span className="font-mono text-bone-muted tracking-wider">terminal</span>
        </FluidLabel>
      </div>

      {/* Konami graffiti overlay */}
      {konamiActive && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center pointer-events-none select-none ${
            konamiFading ? 'graffiti-out' : ''
          }`}
          style={{ background: 'rgba(0,0,0,0.55)' }}
        >
          <KonamiCanvas active={konamiActive} />
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
          <div
            className="graffiti-tag relative text-center"
            style={{ '--rot': '-3deg' } as React.CSSProperties}
          >
            <div
              className="font-black leading-none tracking-tighter"
              style={{
                fontFamily: "'Impact','Arial Black',sans-serif",
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                color: '#ffd700',
                WebkitTextStroke: '3px #ff6b00',
                textShadow: '0 0 40px #ffd700cc, 0 0 80px #ffd70055, 4px 5px 0 #000',
                animationDelay: '0s',
              }}
            >
              Congratulations!!!
            </div>
            <div
              className="font-black leading-none tracking-tighter"
              style={{
                fontFamily: "'Impact','Arial Black',sans-serif",
                fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
                color: '#ea80fc',
                WebkitTextStroke: '2px #9c27b0',
              }}
            >
              You are a nerd too.
            </div>
            <div
              className="mt-3 font-mono text-sm tracking-widest"
              style={{ color: '#69ff4799', textShadow: '0 0 10px #69ff47' }}
            >
              ↑↑↓↓←→←→BA · achievement unlocked
            </div>
          </div>
        </div>
      )}

      {/* Terminal overlay — real-terminal palette (no neon greens) */}
      {termOpen && (
        <div
          className="fixed bottom-20 right-4 z-[100] w-[28rem] h-80 bg-[#0c0c0d] border border-ink-border rounded-lg shadow-2xl shadow-black/70 flex flex-col font-mono text-[12.5px] overflow-hidden"
          onClick={() => termInputRef.current?.focus()}
        >
          {/* Title bar — same macOS chrome as project windows */}
          <div className="window-chrome flex items-center gap-1.5 px-3 py-2 shrink-0 border-b border-black/40">
            <button
              onClick={e => {
                e.stopPropagation()
                setTermOpen(false)
              }}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition"
              aria-label="Close terminal"
            />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="mx-auto text-bone-dim text-[11px] select-none">
              mustakim@portfolio: ~
            </span>
            <span className="w-12 shrink-0" aria-hidden="true" />
          </div>

          {/* Output area */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-0.5 text-bone/85">
            {termLines.map((line, i) => {
              // Detect command-echo lines and split them so the prompt prefix
              // and the command text get distinct (subdued) colors.
              const promptMatch = line.match(/^(mustakim@portfolio)( ~ )(\$)(.*)$/)
              if (promptMatch) {
                const [, prompt, path, sigil, rest] = promptMatch
                return (
                  <div key={i} className="flex flex-wrap items-baseline gap-x-1">
                    <span className="text-[#7b9b80]">{prompt}</span>
                    <span className="text-bone-dim">:</span>
                    <span className="text-[#7d92a8]">~</span>
                    <span className="text-bone-dim">{sigil}</span>
                    <span className="text-bone/95">{rest}</span>
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  className={
                    line.startsWith('//')
                      ? 'text-bone-dim italic'
                      : line.startsWith('[')
                      ? 'text-[#d3c08a]' /* warm amber, subdued */
                      : 'text-bone/80'
                  }
                >
                  {line || ' '}
                </div>
              )
            })}
            <div ref={termEndRef} />
          </div>

          {/* Input row */}
          <div className="flex items-center px-3.5 py-2.5 border-t border-black/40 shrink-0 bg-[#0a0a0b]">
            <span className="text-[#7b9b80] mr-1">mustakim@portfolio</span>
            <span className="text-bone-dim mr-1">:</span>
            <span className="text-[#7d92a8] mr-1">~</span>
            <span className="text-bone-dim mr-2">$</span>
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
              className="flex-1 bg-transparent text-bone outline-none caret-bone placeholder:text-bone-dim/50"
              placeholder="type a command…"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
        </div>
      )}

      {/* Subtle chaos-mode tint — only renders when secret word is typed */}
      {chaosMode && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[150] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.06) 0%, transparent 60%)',
          }}
        />
      )}
    </>
  )
}
