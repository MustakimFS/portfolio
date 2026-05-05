import Nav from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import { Research } from '@/components/Research'
import { Contact } from '@/components/Contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Research />
      <Contact />
    </main>
  )
}
