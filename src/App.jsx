import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, LazyMotion } from 'framer-motion'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Featured from './components/Featured'
import Contact from './components/Contact'
import { Cursor } from './components/ui'

const loadFeatures = () => import('./motion-features').then((r) => r.default)

export default function App() {
  const [ready, setReady] = useState(false)
  const done = useCallback(() => setReady(true), [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) })
    window.__lenis = lenis
    let id
    const raf = (time) => {
      lenis.raf(time)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden'
    if (ready) window.__lenis?.start()
    else window.__lenis?.stop()
  }, [ready])

  return (
    <LazyMotion features={loadFeatures} strict>
      <Cursor />
      <AnimatePresence>{!ready && <Loader onDone={done} />}</AnimatePresence>
      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Featured />
        <Contact />
      </main>
    </LazyMotion>
  )
}
