"use client"

import { FileText, ExternalLink, Download } from "lucide-react"
import Link from "next/link"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionWrapper } from "@/components/SectionWrapper"

const MAIN_PAPER = {
  title: "Enhanced Tracking and Reporting of Missing Persons using Knowledge Graph and Ontology Engineering",
  venue: "IEEE COMPSAC 2025",
  stats: ["27% acceptance rate", "Toronto, Canada"],
  link: "https://ieeexplore.ieee.org/document/11126748",
  abstract: "This paper presents a novel approach to tracking and reporting missing persons by integrating disparate NamUs records into a unified Knowledge Graph using Ontology Engineering. Our system achieves sub-100ms SPARQL query latency while eliminating costly graph database infrastructure, enabling faster and more accurate identification across jurisdictions."
}

const ADDITIONAL_PAPERS = [
  { title: "Semiconductor Yield Prediction using L1 Regularization and Random Forests", venue: "Course Project / Preprint", link: "/papers/semiconductor-yield.pdf" },
  { title: "PixelDrive: Comparative Analysis of Semantic Segmentation Architectures for Autonomous Driving", venue: "Course Project / Preprint", link: "/papers/pixeldrive.pdf" },
  { title: "Movie Genre Prediction from Plot Summaries using Classification Algorithms", venue: "Working Paper", link: "/papers/working-paper.pdf" },
]

export function Research() {
  return (
    <SectionWrapper id="research">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
        <div className="mb-10 sm:mb-14">
          <SectionHeading label="~/research" />
        </div>

        {/* Main Paper */}
        <div className="mb-12">
          <div className="relative p-6 sm:p-8 rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/50">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 text-xs font-mono rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">{MAIN_PAPER.venue}</span>
                  {MAIN_PAPER.stats.map((stat, i) => (
                    <span key={i} className="text-xs font-mono text-muted-foreground">{stat}</span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">{MAIN_PAPER.title}</h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed max-w-3xl">{MAIN_PAPER.abstract}</p>
              </div>
              <Link href={MAIN_PAPER.link} target="_blank" rel="noopener noreferrer"
                className="shrink-0 p-3 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Papers */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADDITIONAL_PAPERS.map((paper, idx) => (
            <Link key={idx} href={paper.link} target="_blank" rel="noopener noreferrer"
              className="group relative p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/50 hover:-translate-y-1 block">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r rounded-tr-xl border-border/50 group-hover:border-emerald-500/50 transition-colors" />
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors">{paper.title}</h4>
                  <span className="block text-xs font-mono text-muted-foreground">{paper.venue}</span>
                </div>
              </div>
              <div className="absolute bottom-5 right-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
