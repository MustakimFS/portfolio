import { TerminalLine } from '@/components/windows'

/**
 * De Bruijn Genome Assembler homepage / case-study hero mockup.
 *
 * Renders the *content* of a TerminalWindow — chrome supplied by
 * ProjectShowcase / the case-study page via `mockupWindow: 'terminal'`.
 *
 * Six-second vignette of the README's actual example output:
 *   1. `java -jar genome-toolkit assemble data/dataset1.txt --stats`
 *   2. Reading 33,609 reads, building de Bruijn graph (k=20)
 *   3. Tip removal, bubble resolution
 *   4. Eulerian cycle → 5,396 bp · 99.9% coverage · ~2s
 */
export default function GenomeAssemblerMockup() {
  return (
    <div className="p-5 sm:p-8 space-y-3 min-h-[280px] text-[13px]">
      <TerminalLine command="java -jar genome-toolkit-1.0.0.jar assemble data/dataset1.txt --stats" />
      <TerminalLine
        output={
          <div className="space-y-0.5 text-bone/75 leading-tight">
            <div>Reading reads from: <span className="text-bone-dim">data/dataset1.txt</span></div>
            <div>Loaded <span className="text-bone">33,609</span> reads</div>
            <div>Assembling genome with <span className="text-emerald-300/85">k=20</span> …</div>
          </div>
        }
      />

      <TerminalLine
        output={
          <div className="space-y-0.5 text-bone/70 leading-tight pl-1">
            <div><span className="text-emerald-300/70">✔</span> de Bruijn graph built · <span className="text-bone-dim">111,283 v · 111,624 e</span></div>
            <div><span className="text-emerald-300/70">✔</span> tip removal · <span className="text-bone-dim">18 dead-ends pruned</span></div>
            <div><span className="text-emerald-300/70">✔</span> bubble resolution · <span className="text-bone-dim">2 resolved by coverage</span></div>
            <div><span className="text-emerald-300/70">✔</span> Eulerian cycle · <span className="text-bone-dim">Hierholzer&apos;s, iterative</span></div>
            <div><span className="text-emerald-300/70">✔</span> circular trim · <span className="text-bone-dim">overlap detected</span></div>
          </div>
        }
      />

      <TerminalLine
        output={
          <pre className="text-[12.5px] leading-[1.55] text-bone/85 m-0 whitespace-pre-wrap">
{`Assembly Result:
  Genome length:    5,396 bases    (phiX174 ref: 5,386 → 99.9% coverage)
  Input reads:      33,609
  Graph vertices:   111,283
  Graph edges:      111,624
  Tips removed:     18
  Bubbles resolved: 2
  Assembly time:    1,812 ms`}
          </pre>
        }
      />
    </div>
  )
}
