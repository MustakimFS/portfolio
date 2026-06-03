/**
 * Zebradoodle homepage / case-study hero mockup.
 *
 * A Wordle board mid-game: 5×6 grid with the first three guesses colored
 * (correct / present / absent) and the rest empty. Below it, a slice of
 * the keyboard with the same color states. The puzzle word is RAFTS
 * because of course it is.
 */
export default function ZebradoodleMockup() {
  return (
    <div className="bg-[#0e0f12] min-h-[320px] text-bone font-sans flex flex-col items-center justify-center px-6 py-7 gap-5">
      {/* Header */}
      <div className="w-full max-w-md flex items-baseline justify-between">
        <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono">
          Wordle · daily · streak 12
        </div>
        <div className="text-bone text-base">
          <span className="font-serif italic">Zebradoodle</span>
        </div>
        <div className="text-bone-dim text-[10px] uppercase tracking-eyebrow font-mono">
          quordle · sedecordle · nerdle
        </div>
      </div>

      {/* Wordle 5×6 grid */}
      <div className="grid grid-cols-5 gap-1.5 w-full max-w-[280px]">
        {BOARD.flat().map((cell, i) => (
          <div
            key={i}
            className={`aspect-square rounded-[3px] flex items-center justify-center text-base font-medium uppercase tracking-tight ${TILE_STYLE[cell.state]}`}
          >
            {cell.letter}
          </div>
        ))}
      </div>

      {/* Keyboard slice */}
      <div className="w-full max-w-md space-y-1">
        {KEYBOARD.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map(k => (
              <div
                key={k.key}
                className={`px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-[3px] text-[11px] font-medium uppercase ${KEY_STYLE[k.state]}`}
              >
                {k.key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Game state — target word RAFTS, guesses CRANE → SLATE → RAFTS ──── */

type State = 'correct' | 'present' | 'absent' | 'empty'
const CELL = (letter: string, state: State) => ({ letter, state })

const BOARD: Array<Array<{ letter: string; state: State }>> = [
  [CELL('C', 'absent'),  CELL('R', 'present'), CELL('A', 'present'), CELL('N', 'absent'),  CELL('E', 'absent')],
  [CELL('S', 'present'), CELL('L', 'absent'),  CELL('A', 'present'), CELL('T', 'present'), CELL('E', 'absent')],
  [CELL('R', 'correct'), CELL('A', 'correct'), CELL('F', 'correct'), CELL('T', 'correct'), CELL('S', 'correct')],
  [CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty')],
  [CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty')],
  [CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty'),   CELL('',  'empty')],
]

const TILE_STYLE: Record<State, string> = {
  correct: 'bg-[#5ab36a] text-white border border-[#5ab36a]',
  present: 'bg-[#caa84d] text-white border border-[#caa84d]',
  absent:  'bg-[#3a3a3c] text-bone/80 border border-[#3a3a3c]',
  empty:   'bg-transparent border border-white/10',
}

const KEYBOARD: Array<Array<{ key: string; state: State }>> = [
  [
    { key: 'Q', state: 'empty' },
    { key: 'W', state: 'empty' },
    { key: 'E', state: 'absent' },
    { key: 'R', state: 'correct' },
    { key: 'T', state: 'correct' },
    { key: 'Y', state: 'empty' },
    { key: 'U', state: 'empty' },
    { key: 'I', state: 'empty' },
    { key: 'O', state: 'empty' },
    { key: 'P', state: 'empty' },
  ],
  [
    { key: 'A', state: 'correct' },
    { key: 'S', state: 'correct' },
    { key: 'D', state: 'empty' },
    { key: 'F', state: 'correct' },
    { key: 'G', state: 'empty' },
    { key: 'H', state: 'empty' },
    { key: 'J', state: 'empty' },
    { key: 'K', state: 'empty' },
    { key: 'L', state: 'absent' },
  ],
  [
    { key: 'Z', state: 'empty' },
    { key: 'X', state: 'empty' },
    { key: 'C', state: 'absent' },
    { key: 'V', state: 'empty' },
    { key: 'B', state: 'empty' },
    { key: 'N', state: 'absent' },
    { key: 'M', state: 'empty' },
  ],
]

const KEY_STYLE: Record<State, string> = {
  correct: 'bg-[#5ab36a] text-white',
  present: 'bg-[#caa84d] text-white',
  absent:  'bg-[#3a3a3c] text-bone/60',
  empty:   'bg-white/[0.08] text-bone/85',
}
