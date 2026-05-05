"use client"

import { PERSONAL } from "@/lib/data"
import { Mail, Github, Linkedin, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SectionHeading } from "@/components/SectionHeading"
import { AnimateIn } from "@/components/AnimateIn"

export function Contact() {
  const links = [
    {
      name: "Email",
      value: PERSONAL.email,
      href: `mailto:${PERSONAL.email}`,
      icon: <Mail className="w-5 h-5" />,
      color: "text-rose-400 group-hover:text-rose-400",
      border: "group-hover:border-rose-500/50"
    },
    {
      name: "LinkedIn",
      value: "mustakim-shikalgar",
      href: PERSONAL.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: "text-blue-400 group-hover:text-blue-400",
      border: "group-hover:border-blue-500/50"
    },
    {
      name: "GitHub",
      value: "MustakimFS",
      href: PERSONAL.github,
      icon: <Github className="w-5 h-5" />,
      color: "text-slate-300 group-hover:text-white",
      border: "group-hover:border-slate-400/50"
    },
    {
      name: "Resume",
      value: "Download PDF",
      href: PERSONAL.resume,
      icon: <FileText className="w-5 h-5" />,
      color: "text-emerald-400 group-hover:text-emerald-400",
      border: "group-hover:border-emerald-500/50"
    }
  ]

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-12 lg:px-20">

        <div className="mb-10 sm:mb-14 text-center flex flex-col items-center">
          <SectionHeading label="~/contact" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-2">Let&apos;s Connect</h2>
          <p className="text-muted-foreground font-mono text-sm max-w-lg mx-auto">
            I&apos;m always open to discussing distributed systems, AI infrastructure, or new opportunities. Feel free to reach out.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {links.map((link, idx) => (
            <AnimateIn key={link.name} delay={idx * 100}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 ${link.border}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-secondary/50 ${link.color}`}>
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{link.name}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{link.value}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
              </Link>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
