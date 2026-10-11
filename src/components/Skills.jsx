import { lazy, Suspense, useRef, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { skillCategories, softSkills, aiTools, languages } from '../data'
import { RevealLines, Stamp, Sparkle, ease } from './ui'

const Keyboard = lazy(() => import('./Keyboard'))

function CatButton({ cat, active, onClick, delay }) {
  return (
    <m.button
      className={`cat ${active ? 'active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay }}
      whileHover={{ x: 6 }}
    >
      <h4>
        <i />
        {cat.label}
      </h4>
      <p>{cat.sub}</p>
    </m.button>
  )
}

export default function Skills() {
  const [active, setActive] = useState(null)
  const box = useRef(null)
  const near = useInView(box, { once: true, margin: '400px 0px' })
  const visible = useInView(box)
  const current = skillCategories.find((c) => c.id === active)
  const toggle = (id) => setActive((a) => (a === id ? null : id))
  const left = skillCategories.slice(0, 2)
  const right = skillCategories.slice(2)

  return (
    <section className="sec cream" id="skills">
      <Stamp size={160} style={{ right: '-40px', top: '50px' }} />
      <Stamp size={150} style={{ left: '-50px', bottom: '120px' }} text="debug • deploy • repeat • debug • deploy • repeat • " />
      <div className="wrap">
        <div className="skills-top">
          <RevealLines className="h-round" lines={['Skills &', 'Expertise']} />
          <p className="body-serif">Every key on this board is something I work with. Press one — or pick a category — to light up the stack.</p>
        </div>

        <div className={`skills-grid`}>
          <div className={`cats ${active ? 'dim' : ''}`}>
            {left.map((c, i) => (
              <CatButton key={c.id} cat={c} active={active === c.id} onClick={() => toggle(c.id)} delay={i * 0.08} />
            ))}
          </div>
          <div className="kb-box" ref={box}>
            <Suspense fallback={null}>{near && <Keyboard active={active} running={visible} onPick={(id) => setActive(id)} />}</Suspense>
            <span className="kb-hint">press a key ↑</span>
            <Sparkle size={22} style={{ left: '8%', top: '12%' }} color="#1c3362" />
            <Sparkle size={14} style={{ right: '10%', top: '22%' }} delay={1} color="#1c3362" />
          </div>
          <div className={`cats ${active ? 'dim' : ''}`}>
            {right.map((c, i) => (
              <CatButton key={c.id} cat={c} active={active === c.id} onClick={() => toggle(c.id)} delay={0.16 + i * 0.08} />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <m.div key={active || 'none'} className="skill-items" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            {current ? (
              current.items.map((s, i) => (
                <m.span
                  key={s}
                  className="chip fill"
                  initial={{ opacity: 0, y: 16, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.04 }}
                >
                  {s}
                </m.span>
              ))
            ) : (
              <span className="body-serif" style={{ color: 'var(--ink-soft)' }}>
                Nothing selected yet — go on, press a key.
              </span>
            )}
          </m.div>
        </AnimatePresence>

        <div className="skills-extra">
          {[
            ['soft skills', softSkills],
            ['ai-assisted dev', aiTools],
            ['languages', languages],
          ].map(([title, list], i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            >
              <h5>{title}</h5>
              <div className="row">
                {list.map((s) => (
                  <m.span key={s} className="chip" whileHover={{ y: -3, rotate: -2 }}>
                    {s}
                  </m.span>
                ))}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
