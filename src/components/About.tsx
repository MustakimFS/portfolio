"use client"

import { PERSONAL } from "@/lib/data"
import { MapPin, Briefcase, GraduationCap } from "lucide-react"
import { SectionHeading } from "@/components/SectionHeading"
import { SectionWrapper } from "@/components/SectionWrapper"

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 py-20 sm:py-28">
        <div className="mb-10 sm:mb-14">
          <SectionHeading label="~/about" />
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          <div className="flex-1 space-y-6 text-base sm:text-lg leading-relaxed text-foreground/90 font-mono">
            <p>
              Hi, I&apos;m {PERSONAL.name.split(' ')[0]}. I&apos;m currently studying for my MS in Software Engineering at Arizona State University.
            </p>
            <p>
              Beyond academia, I&apos;m the Technical Architecture Lead at METY Legal, where I lead a 6-person engineering team building AI legal assistants. I enjoy the challenge of designing distributed systems that are both resilient and efficient, and I love bridging the gap between theoretical machine learning and practical, user-facing applications.
            </p>
            <p>
              When I&apos;m not writing code or reading research papers, you can usually find me tackling difficult LeetCode problems or exploring how to make distributed consensus algorithms just a little bit faster.
            </p>
          </div>

          <div className="w-full md:w-72 space-y-6">
            <div className="p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
              <h3 className="font-mono text-sm text-muted-foreground mb-4">{"// "} current_status</h3>
              <ul className="space-y-4 font-mono text-sm">
                <li className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-emerald-400 mt-1" />
                  <div>
                    <span className="block text-foreground">Technical Architecture Lead</span>
                    <span className="block text-muted-foreground/80">METY Legal · Leading team of 6</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-blue-400 mt-1" />
                  <div>
                    <span className="block text-foreground">MS Software Engineering</span>
                    <span className="block text-muted-foreground/80">Arizona State Univ. · GPA 3.75</span>
                    <span className="block text-muted-foreground/80">Graduating May 2026</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-400 mt-1" />
                  <div>
                    <span className="block text-foreground">Location</span>
                    <span className="block text-muted-foreground/80">{PERSONAL.location}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
