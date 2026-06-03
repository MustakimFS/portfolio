/**
 * Job Hunt Dashboard (Electron) — homepage / case-study hero mockup.
 *
 * Mimics the Electron desktop app: a faux window with a top sync-status
 * strip, a left-side daily-tasks checklist, a right-side recent-applications
 * list, and a footer with the wallpaper-WebSocket status. Visuals only;
 * no real Gmail data.
 */
export default function JobHuntMockup() {
  return (
    <div className="bg-[#0e1014] min-h-[320px] text-bone font-sans">
      {/* Top status strip */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between text-[12px] font-mono">
        <div className="flex items-baseline gap-3">
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10px]">
            Gmail
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block" />
            <span className="text-bone/85">synced 2 min ago</span>
          </span>
          <span className="text-bone-dim">·</span>
          <span className="text-bone-muted">14 new · 3 job-related</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-bone-dim uppercase tracking-eyebrow text-[10px]">
            AI
          </span>
          <span className="text-bone/85">gemini-2.0-flash</span>
        </div>
      </div>

      {/* Two-column body: tasks + applications */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] divide-y md:divide-y-0 md:divide-x divide-white/5">
        {/* Daily tasks */}
        <div className="p-5">
          <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono mb-3">
            Today · 3 of 5 done
          </div>
          <div className="space-y-2 text-[13px]">
            {TASKS.map(t => (
              <div key={t.label} className="flex items-baseline gap-2">
                <span
                  className={`w-3 h-3 rounded-sm shrink-0 mt-0.5 ${
                    t.done
                      ? 'bg-emerald-400/70 border border-emerald-400/80'
                      : 'border border-white/15'
                  }`}
                />
                <span
                  className={
                    t.done
                      ? 'text-bone-dim line-through decoration-bone-dim/50'
                      : 'text-bone/90'
                  }
                >
                  {t.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono">
            Deadline · in 14 days
          </div>
          <div className="text-bone text-[13px] mt-1 italic font-serif">
            Apply to 50 SDE roles
          </div>
        </div>

        {/* Recent applications */}
        <div className="p-5">
          <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono mb-3">
            Inbox · auto-classified
          </div>
          <div className="space-y-2.5 text-[12.5px]">
            {APPS.map(a => (
              <div key={a.from} className="grid grid-cols-[1fr_auto] gap-3">
                <div className="min-w-0">
                  <div className="text-bone/90 truncate">{a.from}</div>
                  <div className="text-bone-dim text-[11px] truncate">
                    {a.subject}
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-eyebrow px-1.5 py-0.5 rounded shrink-0 self-start ${
                    STATUS_STYLE[a.status]
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer — wallpaper WebSocket */}
      <div className="px-5 py-3 border-t border-white/5 flex items-baseline justify-between text-[10px] font-mono text-bone-dim uppercase tracking-eyebrow">
        <span>tray · auto-launch · local-only</span>
        <span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 inline-block mr-1.5 align-middle" />
          wallpaper · ws://127.0.0.1:49152
        </span>
      </div>
    </div>
  )
}

const TASKS = [
  { label: 'Reach out to 3 referrals',                  done: true  },
  { label: 'Apply to 5 SDE roles',                      done: true  },
  { label: 'LeetCode: 2 mediums, 1 hard',               done: true  },
  { label: 'Update LinkedIn with METY case study',      done: false },
  { label: 'Mock interview · system design',            done: false },
]

const APPS = [
  { from: 'Stripe',      subject: 'Re: SWE New Grad — Phone screen scheduled',     status: 'screen' as const },
  { from: 'Anthropic',   subject: 'Application received · Software Engineer',       status: 'applied' as const },
  { from: 'CockroachDB', subject: 'Take-home: distributed systems exercise',        status: 'task'    as const },
  { from: 'Datadog',     subject: 'Unfortunately we won’t be moving forward',  status: 'rejected' as const },
]

const STATUS_STYLE: Record<string, string> = {
  screen:   'bg-emerald-400/[0.08] text-emerald-300/85 border border-emerald-400/20',
  applied:  'bg-amber-400/[0.06]   text-amber-300/80   border border-amber-400/20',
  task:     'bg-cyan-400/[0.06]    text-cyan-300/80    border border-cyan-400/20',
  rejected: 'bg-white/[0.04]       text-bone-dim       border border-white/10',
}
