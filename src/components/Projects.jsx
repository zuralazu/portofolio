import { useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { projects } from '../data'
import { RevealLines, Arrow, Stamp, ease } from './ui'
import ScreenArt from './ScreenArt'

const tilts = [-2.5, 1.5, -1, 2, -1.8, 1.2, -2]

function Modal({ index, onClose, onNav }) {
  const p = projects[index]

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', key)
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', key)
      window.__lenis?.start()
    }
  }, [onClose, onNav])

  return (
    <m.div className="modal-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-lenis-prevent>
      <m.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, rotate: -3, opacity: 0 }}
        animate={{ y: 0, rotate: 0, opacity: 1 }}
        exit={{ y: 60, rotate: 2, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <AnimatePresence mode="wait">
          <m.div key={index} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35, ease }}>
            <span className="kicker">
              {p.kind} · {p.period}
            </span>
            <h3 className="h-round">{p.title}</h3>
            <p className="sub">{p.subtitle}</p>
            <div className="modal-art">
              <ScreenArt kind={p.art} preserve="xMidYMid meet" />
            </div>
            <ul>
              {p.points.map((pt, i) => (
                <m.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }}>
                  {pt}
                </m.li>
              ))}
            </ul>
            <div className="tags">
              {p.stack.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </m.div>
        </AnimatePresence>
        <div className="modal-nav">
          <button className="btn" onClick={() => onNav(-1)}>
            <Arrow style={{ transform: 'rotate(180deg)' }} /> Prev
          </button>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <button className="btn" onClick={() => onNav(1)}>
            Next <Arrow />
          </button>
        </div>
      </m.div>
    </m.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(0)
  const [openIdx, setOpenIdx] = useState(null)
  const nav = useCallback((d) => setOpenIdx((i) => (i + d + projects.length) % projects.length), [])
  const close = useCallback(() => setOpenIdx(null), [])
  const p = projects[active]

  return (
    <section className="sec navy" id="projects">
      <Stamp size={150} style={{ right: '-30px', top: '80px' }} text="ship it • ship it • ship it • ship it • " />
      <div className="wrap">
        <div className="proj-grid">
          <div className="proj-side">
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                className="proj-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="kicker">
                  {String(active + 1).padStart(2, '0')} · {p.kind} · {p.period}
                </span>
                <h3>{p.title}</h3>
                <p className="sub">{p.subtitle}</p>
                <ul>
                  {p.points.slice(0, 3).map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="tags">
                  {p.stack.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
            <RevealLines className="h-cond" lines={['Previous', 'Projects']} />
          </div>

          <div className="tiles">
            {projects.map((proj, i) => (
              <m.button
                key={proj.title}
                className={`tile ${active === i ? 'active' : ''}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setOpenIdx(i)}
                data-cursor="Open"
                initial={{ opacity: 0, y: 60, rotate: tilts[i] * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilts[i] }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ type: 'spring', stiffness: 110, damping: 15, delay: (i % 3) * 0.08 }}
                whileHover={{ rotate: 0, y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="screen" style={{ display: 'block' }}>
                  <ScreenArt kind={proj.art} />
                </span>
                <span className="cap">
                  {proj.title}
                  <small>{proj.kind}</small>
                </span>
              </m.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{openIdx !== null && <Modal index={openIdx} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  )
}
