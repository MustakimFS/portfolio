'use client'

import { FileText, ExternalLink, Download } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const MAIN_PAPER = {
  title: 'Enhanced Tracking and Reporting of Missing Persons using Knowledge Graph and Ontology Engineering',
  venue: 'IEEE COMPSAC 2025',
  badges: ['27% acceptance rate', 'Toronto, Canada'],
  link: 'https://ieeexplore.ieee.org/document/11126748',
}

const SECONDARY_PAPERS = [
  {
    title: 'Semiconductor Yield Prediction using L1 Regularization and Random Forests',
    type: 'Course Project / Preprint',
    link: '/papers/semiconductor-yield.pdf',
  },
  {
    title: 'PixelDrive: Comparative Analysis of Semantic Segmentation Architectures for Autonomous Driving',
    type: 'Course Project / Preprint',
    link: '/papers/pixeldrive.pdf',
  },
  {
    title: 'Movie Genre Prediction from Plot Summaries using Classification Algorithms',
    type: 'Course Project / Preprint',
    link: '/papers/movie-genre.pdf',
  },
]

export default function Research() {
  const [sectionRef, isInView] = useInView({ threshold: 0.1 })

  return (
    <section
      id="research"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-24"
    >
      {/* Sweep line */}
      <div
        className="absolute top-0 left-0 h-px bg-green-400/40 transition-all duration-[400ms] ease-out"
        style={{ width: isInView ? '100%' : '0%' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Terminal header */}
        <div
          className="flex items-center gap-2 mb-10 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '400ms' }}
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-sm text-gray-500 ml-2">~/research</span>
        </div>

        {/* Hero paper card */}
        <div
          className="mb-10 transition-all duration-500"
          style={{ opacity: isInView ? 1 : 0, transform: isInView ? 'none' : 'translateY(24px)', transitionDelay: '480ms' }}
        >
          <a
            href={MAIN_PAPER.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative p-6 sm:p-8 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {MAIN_PAPER.venue}
              </span>
              {MAIN_PAPER.badges.map((b, i) => (
                <span key={i} className="text-xs font-mono text-gray-400">{b}</span>
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug pr-10">
              {MAIN_PAPER.title}
            </h3>
            <div className="flex items-center gap-2 text-blue-400 font-mono text-sm">
              <ExternalLink className="w-4 h-4" />
              ieeexplore.ieee.org
            </div>
            <div className="absolute top-6 right-6 p-2.5 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Secondary papers */}
        <div className="grid gap-4 sm:grid-cols-3">
          {SECONDARY_PAPERS.map((paper, idx) => (
            <a
              key={idx}
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 rounded-xl border border-gray-800 bg-[#0a0c10] hover:border-gray-700 hover:-translate-y-1 transition-all duration-300 block"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'none' : 'translateY(24px)',
                transition: 'all 500ms ease-out',
                transitionDelay: `${560 + idx * 80}ms`,
              }}
            >
              <div className="absolute top-0 right-0 w-7 h-7 border-t border-r border-gray-800 rounded-tr-xl group-hover:border-emerald-500/50 transition-colors" />
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-emerald-400 transition-colors">
                    {paper.title}
                  </h4>
                  <span className="text-xs font-mono text-gray-500">{paper.type}</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
