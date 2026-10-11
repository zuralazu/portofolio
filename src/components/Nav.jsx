import { useEffect, useState } from 'react'
import { m, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ease } from './ui'

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.6 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Nav({ ready }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', 'featured', ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }
  // the featured build belongs to the experience chapter
  const current = active === 'featured' ? 'experience' : active

  return (
    <>
      <m.nav
        className="nav"
        initial={{ y: -90, x: '-50%' }}
        animate={ready ? { y: 0, x: '-50%' } : { y: -90, x: '-50%' }}
        transition={{ duration: 0.9, ease, delay: 0.9 }}
      >
        <button className="nav-logo" onClick={() => go('top')} aria-label="Back to top">
          az.
        </button>
        {sections.map((s) => (
          <button key={s.id} className={`nav-link ${current === s.id ? 'active' : ''}`} onClick={() => go(s.id)}>
            {current === s.id && <m.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            {s.label}
          </button>
        ))}
        <a className="nav-cv" href="/cv-azzura-lazuardy.pdf" download data-cursor="CV">
          CV ↓
        </a>
        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Close' : 'Menu'}
        </button>
        <m.span className="nav-progress" style={{ scaleX: progress }} />
      </m.nav>

      <AnimatePresence>
        {open && (
          <m.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
          >
            {sections.map((s, i) => (
              <m.button
                key={s.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease }}
                onClick={() => go(s.id)}
              >
                <small>0{i + 1}</small>
                {s.label}
              </m.button>
            ))}
            <a className="btn" href="/cv-azzura-lazuardy.pdf" download style={{ marginTop: 24, alignSelf: 'flex-start', color: 'var(--cream)' }}>
              Download CV
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
