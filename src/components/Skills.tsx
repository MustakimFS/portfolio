"use client"

import { SKILLS } from "@/lib/data"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionWrapper } from "@/components/SectionWrapper"

const categoryIcons: Record<string, JSX.Element> = {
  "Languages": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Backend & Systems": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "AI / ML": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Frontend": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "Data & Infra": (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const categoryColors: Record<string, string> = {
  "Languages": "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
  "Backend & Systems": "text-blue-400 border-blue-500/30 bg-blue-500/5",
  "AI / ML": "text-violet-400 border-violet-500/30 bg-violet-500/5",
  "Frontend": "text-amber-400 border-amber-500/30 bg-amber-500/5",
  "Data & Infra": "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
}

const tagColors: Record<string, string> = {
  "Languages": "hover:bg-emerald-500/20 hover:border-emerald-500/50",
  "Backend & Systems": "hover:bg-blue-500/20 hover:border-blue-500/50",
  "AI / ML": "hover:bg-violet-500/20 hover:border-violet-500/50",
  "Frontend": "hover:bg-amber-500/20 hover:border-amber-500/50",
  "Data & Infra": "hover:bg-cyan-500/20 hover:border-cyan-500/50",
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">


      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
        {/* Section header - terminal style */}
        <div className="mb-12 sm:mb-16">
          <SectionHeading label="~/skills" />
          <div className="font-mono text-sm sm:text-base text-muted-foreground">
            <span className="text-primary">export</span>
            <span className="text-foreground"> const </span>
            <span className="text-emerald-400">techStack</span>
            <span className="text-muted-foreground"> = </span>
            <span className="text-muted-foreground">{"{"}</span>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skillGroup, idx) => (
            <div key={skillGroup.category} className="group relative">
                {/* Code block container */}
                <div className={`relative p-5 sm:p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-border hover:-translate-y-1`}>
                  {/* Corner accent */}
                  <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r rounded-tr-xl ${categoryColors[skillGroup.category]?.split(' ')[1] || 'border-primary/30'}`} />
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={categoryColors[skillGroup.category]?.split(' ')[0] || 'text-primary'}>
                      {categoryIcons[skillGroup.category]}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      <span className="text-muted-foreground/60">{"//"} </span>
                      {skillGroup.category}
                    </span>
                  </div>
                  {/* Skills as tags */}
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill.name}
                        className={`px-3 py-1.5 text-sm font-mono rounded-md border border-border/50 bg-secondary/30 text-foreground/90 transition-all duration-200 cursor-default ${tagColors[skillGroup.category]}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Line number decoration */}
                <div className="absolute -left-4 top-6 hidden lg:block font-mono text-xs text-muted-foreground/30">
                  {String(idx + 1).padStart(2, '0')}
                </div>
            </div>
          ))}
        </div>

        {/* Closing brace */}
        <div className="mt-12 font-mono text-sm sm:text-base text-muted-foreground">
          <span className="text-muted-foreground">{"}"}</span>
          <span className="text-muted-foreground/40">;</span>
        </div>

        {/* Bottom comment */}
        <div className="mt-6 font-mono text-xs sm:text-sm text-muted-foreground/60">
          <span className="text-muted-foreground/40">{"// "}</span>
          Always learning, always building
        </div>
      </div>
    </SectionWrapper>
  )
}
