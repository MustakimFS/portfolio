"use client"

import { useState, useEffect } from "react"
import PortfolioOS from "@/components/PortfolioOS"
import { PERSONAL, PROJECTS } from "@/lib/data"
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react"

export default function Page() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768)
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  if (isMobile === null) {
    return <div className="h-screen w-screen bg-[#060810]" />
  }

  if (!isMobile) {
    return <PortfolioOS />
  }

  // Mobile fallback
  return (
    <div className="min-h-screen bg-[#060810] text-gray-300 font-mono p-6 selection:bg-green-500/30 selection:text-green-200 overflow-y-auto">
      <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-3 mb-8 mt-2">
        <p className="text-green-400 font-mono text-xs text-center">
          ↑ desktop version available — open on PC for full OS experience
        </p>
      </div>
      <header className="mb-12 pt-8">
        <h1 className="text-2xl font-bold text-green-400 mb-2">{PERSONAL.name}</h1>
        <p className="text-gray-400 mb-4">{PERSONAL.title}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {PERSONAL.bio}
        </p>

        <div className="flex flex-col gap-3 text-sm">
          <a href={PERSONAL.github} className="flex items-center gap-2 text-blue-400">
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a href={PERSONAL.linkedin} className="flex items-center gap-2 text-blue-400">
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
          <a href={`mailto:${PERSONAL.email}`} className="flex items-center gap-2 text-blue-400">
            <Mail className="w-4 h-4" /> Email
          </a>
          <a href={PERSONAL.resume} className="flex items-center gap-2 text-yellow-400">
            <FileText className="w-4 h-4" /> Resume
          </a>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-gray-500 mb-4">{"// projects"}</h2>
        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <div key={project.id} className="p-4 border border-gray-800 rounded bg-[#0a0c10]">
              <h3 className="text-green-400 font-bold mb-1">{project.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{project.category}</p>
              <p className="text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.metrics.map(m => (
                  <span key={m.label} className="text-xs bg-gray-900 px-2 py-1 rounded text-gray-400 border border-gray-800">
                    <span className="text-gray-500">{m.label}:</span> <span className="text-green-400">{m.value}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-800 rounded-sm text-gray-400 border border-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 mt-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 flex items-center gap-1 hover:text-blue-300">
                    <ExternalLink className="w-3 h-3" /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 flex items-center gap-1 hover:text-green-300">
                    <ExternalLink className="w-3 h-3" /> Demo
                  </a>
                )}
                {project.paper && (
                  <a href={project.paper} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-400 flex items-center gap-1 hover:text-yellow-300">
                    <ExternalLink className="w-3 h-3" /> Paper
                  </a>
                )}
                {project.ieee && (
                  <a href={project.ieee} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 flex items-center gap-1 hover:text-purple-300">
                    <ExternalLink className="w-3 h-3" /> IEEE
                  </a>
                )}
                {project.note && (
                  <span className="text-xs text-gray-600 italic">
                    {project.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-8 border-t border-gray-800 pb-12">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6">
          <p className="text-green-400 font-mono text-xs mb-1">// better on desktop</p>
          <p className="text-gray-400 text-sm">
            This portfolio runs a full terminal OS experience on desktop — draggable windows, live Raft consensus visualization, hidden easter eggs, and interactive commands.
          </p>
          <p className="text-gray-500 text-xs mt-2">Open on a PC or laptop for the full experience.</p>
        </div>
      </footer>
    </div>
  )
}
