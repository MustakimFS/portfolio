"use client"

import { useState } from "react"
import { PROJECTS } from "@/lib/data"
import { ExternalLink, Github, FileText, Lock } from "lucide-react"
import { SectionWrapper } from "@/components/SectionWrapper"

const ALL_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))]

const CATEGORY_TAG: Record<string, string> = {
  "AI / Full Stack":       "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Distributed Systems":   "bg-blue-500/10   text-blue-400   border-blue-500/20",
  "Machine Learning":      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Computer Vision":       "bg-cyan-500/10   text-cyan-400   border-cyan-500/20",
  "Research / Full Stack": "bg-amber-500/10  text-amber-400  border-amber-500/20",
  "Systems / Algorithms":  "bg-rose-500/10   text-rose-400   border-rose-500/20",
}

const CATEGORY_GLOW: Record<string, string> = {
  "AI / Full Stack":       "border-violet-500/50 shadow-violet-500/10",
  "Distributed Systems":   "border-blue-500/50   shadow-blue-500/10",
  "Machine Learning":      "border-emerald-500/50 shadow-emerald-500/10",
  "Computer Vision":       "border-cyan-500/50   shadow-cyan-500/10",
  "Research / Full Stack": "border-amber-500/50  shadow-amber-500/10",
  "Systems / Algorithms":  "border-rose-500/50   shadow-rose-500/10",
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered =
    activeCategory === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeCategory)

  return (
    <SectionWrapper id="projects" tall>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Terminal header ── */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-t-lg bg-card/40 border border-b-0 border-border/50">
            <span className="font-mono text-xs text-muted-foreground">~/projects</span>
          </div>
          <div className="p-5 sm:p-7 rounded-lg rounded-tl-none bg-card/20 border border-border/50">
            <div className="font-mono text-sm text-muted-foreground mb-5">
              <span className="text-violet-400">const</span>{" "}
              <span className="text-foreground">projects</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-amber-400">await</span>{" "}
              <span className="text-blue-400">fetchProjects</span>
              <span className="text-muted-foreground">(</span>
              <span className="text-emerald-400">&quot;{activeCategory.toLowerCase()}&quot;</span>
              <span className="text-muted-foreground">);</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setHoveredId(null) }}
                  className={`px-3 py-1.5 rounded font-mono text-xs transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-secondary/30 text-muted-foreground border-border/50 hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, idx) => {
            const isHov   = hoveredId === project.id
            const tagCls  = CATEGORY_TAG[project.category]  ?? "bg-secondary/50 text-muted-foreground border-border/30"
            const glowCls = CATEGORY_GLOW[project.category] ?? ""

            // Determine which row this card is in (desktop 3-col layout)
            const row = Math.floor(idx / 3)
            const hovIdx = filtered.findIndex(p => p.id === hoveredId)
            const hovRow = hovIdx !== -1 ? Math.floor(hovIdx / 3) : -1
            const sameRow = hovRow === row && hoveredId !== null && !isHov

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={[
                  "rounded-xl border transition-all duration-300 ease-out overflow-hidden",
                  isHov
                    ? `bg-card/80 shadow-lg ${glowCls}`
                    : sameRow
                    ? "border-border/30 bg-card/20 opacity-50"
                    : "border-border/50 bg-card/30",
                ].join(" ")}
              >
                {/* ── Compact (always visible) ── */}
                <div className="p-5">
                  {/* Index + Category */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {project.note && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono border bg-amber-500/10 text-amber-500/80 border-amber-500/20">
                          NDA
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${tagCls}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base sm:text-lg text-foreground leading-snug mb-1">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-mono text-xs text-muted-foreground mb-5 truncate">
                    {project.subtitle}
                  </p>

                  {/* Hero metric */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-foreground">
                      {project.metrics[0].value}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      {project.metrics[0].label}
                    </span>
                  </div>
                </div>

                {/* ── Expanded (revealed on hover) ── */}
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    isHov ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 space-y-4 border-t border-border/20 pt-4">

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* All metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      {project.metrics.map(m => (
                        <div
                          key={m.label}
                          className="p-2 rounded-lg bg-background/60 border border-border/30 text-center"
                        >
                          <div className="font-mono text-sm font-bold text-foreground">{m.value}</div>
                          <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary/60 text-foreground/70 border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {/* NDA note instead of GitHub for private projects */}
                      {project.note ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-amber-500/10 text-amber-500/80 border border-amber-500/20">
                          <Lock className="w-3.5 h-3.5" />
                          Private — NDA
                        </span>
                      ) : project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-secondary/50 text-foreground hover:bg-secondary border border-border/50 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Source
                        </a>
                      ) : null}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}

                      {project.paper && (
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-secondary/50 text-foreground hover:bg-secondary border border-border/50 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Paper
                        </a>
                      )}

                      {project.ieee && (
                        <a
                          href={project.ieee}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          IEEE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 font-mono text-xs text-muted-foreground/40 text-center">
          <span className="text-muted-foreground/30">{"// "}</span>
          {filtered.length} project{filtered.length === 1 ? "" : "s"} · hover to expand
        </div>
      </div>
    </SectionWrapper>
  )
}
