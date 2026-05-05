"use client"

import { useState, useEffect } from "react"
import PortfolioOS from "@/components/PortfolioOS"
import { PERSONAL } from "@/lib/data"
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
    <div className="min-h-screen bg-[#060810] text-gray-300 font-mono p-6 selection:bg-green-500/30 selection:text-green-200">
      <header className="mb-12 pt-8">
        <h1 className="text-2xl font-bold text-green-400 mb-2">{PERSONAL.name}</h1>
        <p className="text-gray-400 mb-4">{PERSONAL.title}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          I work at the intersection of distributed systems, machine learning, and full-stack engineering. Currently pursuing my MS in Software Engineering at ASU while leading technical architecture at METY Legal.
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
          <div className="p-4 border border-gray-800 rounded bg-[#0a0c10]">
            <h3 className="text-green-400 font-bold mb-1">METY Legal Chatbot</h3>
            <p className="text-xs text-gray-500 mb-3">AI / Full Stack</p>
            <p className="text-sm mb-4">AI legal assistant with two user modes. Rebuilt LangGraph pipeline from 6 nodes to 5, cutting LLM calls per message from 2 to 1.</p>
            <span className="text-xs text-gray-600">Private — NDA</span>
          </div>

          <div className="p-4 border border-gray-800 rounded bg-[#0a0c10]">
            <h3 className="text-green-400 font-bold mb-1">Distributed Key-Value Store</h3>
            <p className="text-xs text-gray-500 mb-3">Distributed Systems</p>
            <p className="text-sm mb-4">Fault-tolerant KV store implementing Raft consensus for leader election and log replication across 5-node cluster.</p>
            <a href="https://github.com/MustakimFS/distributed-kv-store" className="text-xs text-blue-400 flex items-center gap-1">
              <ExternalLink className="w-3 h-3" /> View on GitHub
            </a>
          </div>

          <div className="p-4 border border-gray-800 rounded bg-[#0a0c10]">
            <h3 className="text-green-400 font-bold mb-1">Missing Persons Knowledge Graph</h3>
            <p className="text-xs text-gray-500 mb-3">Research / Full Stack</p>
            <p className="text-sm mb-4">Knowledge graph of 10K+ NamUs records. Replaced $50/month GraphDB with FastAPI + RDFLib achieving sub-100ms SPARQL queries at zero infra cost.</p>
            <div className="flex gap-4">
               <a href="https://missing-persons-knowledge-graph.vercel.app/" className="text-xs text-blue-400 flex items-center gap-1">
                 <ExternalLink className="w-3 h-3" /> Demo
               </a>
               <a href="https://ieeexplore.ieee.org/document/11126748" className="text-xs text-blue-400 flex items-center gap-1">
                 <ExternalLink className="w-3 h-3" /> IEEE
               </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-8 border-t border-gray-800 pb-12">
        <p className="text-xs text-gray-600 text-center">
          For the full interactive OS experience, please visit on a desktop device.
        </p>
      </footer>
    </div>
  )
}
