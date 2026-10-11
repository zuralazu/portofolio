import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion'
import { featured } from '../data'
import { RevealLines, Sparkle, Butterfly, ease } from './ui'

const N = '#1c3362'
const S = 'rgba(28,51,98,.12)'

function ModuleScreen({ idx }) {
  const mod = featured.modules[idx]
  return (
    <m.div
      key={idx}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -60, opacity: 0 }}
      transition={{ duration: 0.45, ease }}
      style={{ position: 'absolute', inset: '50px 16px 16px' }}
    >
      <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
        Step {idx + 1} of {featured.modules.length}
      </div>
      <div style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.1, marginTop: 4 }}>{mod.name}</div>
      <div style={{ height: 6, borderRadius: 3, background: S, marginTop: 12, overflow: 'hidden' }}>
        <m.div
          style={{ height: '100%', background: N, borderRadius: 3 }}
          initial={{ width: `${(idx / featured.modules.length) * 100}%` }}
          animate={{ width: `${((idx + 1) / featured.modules.length) * 100}%` }}
          transition={{ duration: 0.8, ease }}
        />
      </div>
      {idx === 0 ? (
        <div style={{ marginTop: 16, height: 120, borderRadius: 14, background: N, position: 'relative', overflow: 'hidden' }}>
          {[22, 40, 58, 76].map((t, i) => (
            <div key={t} style={{ position: 'absolute', left: 16, top: t, height: 7, width: `${70 - i * 12}%`, borderRadius: 4, background: 'rgba(241,239,234,.5)' }} />
          ))}
          <div className="anim-scan" style={{ position: 'absolute', left: 8, right: 8, top: 10, height: 2, background: '#f1efea' }} />
        </div>
      ) : (
        <div style={{ marginTop: 16, height: 120, borderRadius: 14, background: S, display: 'grid', placeItems: 'center' }}>
          <m.svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke={N} strokeWidth="1.4" initial={{ scale: 0.6, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }}>
            <rect x="3" y="9" width="18" height="7" rx="3" />
            <path d="M6 9l2-4h8l2 4" />
            <circle cx="7.5" cy="17" r="2" fill={N} />
            <circle cx="16.5" cy="17" r="2" fill={N} />
          </m.svg>
        </div>
      )}
      <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
        {[0, 1, 2, 3].map((i) => (
          <m.div
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 10, background: '#fbfaf7' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <m.span
              style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${N}`, flex: 'none' }}
              initial={{ background: 'rgba(0,0,0,0)' }}
              animate={{ background: N }}
              transition={{ delay: 0.5 + i * 0.25 }}
            />
            <span style={{ height: 6, borderRadius: 3, background: N, opacity: 0.6, width: `${80 - i * 13}%` }} />
          </m.div>
        ))}
      </div>
    </m.div>
  )
}

export default function Featured() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 960px)').matches)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const inView = useInView(ref)
  const count = featured.modules.length

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)')
    const on = () => setMobile(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // desktop: scroll drives the steps; mobile: auto-advance
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (mobile) return
    // React bails out when the step hasn't changed, so this only re-renders 6 times
    setIdx(Math.min(count - 1, Math.floor(v * count)))
  })
  useEffect(() => {
    if (!mobile || !inView) return
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 2600)
    return () => clearInterval(t)
  }, [mobile, inView, count])

  return (
    <section className="sec navy feat" id="featured" ref={ref}>
      <div className="feat-sticky">
        <div className="feat-inner">
          <div className="feat-head">
            <span className="kicker">Featured build · {featured.company}</span>
            <RevealLines className="h-cond" lines={['Vehicle', 'Inspection App']} style={{ marginTop: 12 }} />
            <p className="body-serif">{featured.intro}</p>
            <div className="feat-bar">
              <m.div style={{ scaleX: mobile ? (idx + 1) / count : scrollYProgress }} />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Sparkle size={26} style={{ left: -40, top: 30 }} color="#f1efea" />
            <Butterfly size={28} style={{ right: -50, bottom: 80 }} color="#f1efea" />
            <div className="phone2d anim-sway" style={{ animationDuration: '6s' }}>
              <div className="scr">
                <AnimatePresence mode="popLayout">
                  <ModuleScreen idx={idx} key={idx} />
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ul className="mod-list">
            {featured.modules.map((mod, i) => (
              <m.li key={mod.name} animate={{ opacity: i === idx ? 1 : 0.35, x: i === idx ? 10 : 0 }} transition={{ duration: 0.4, ease }}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h5>{mod.name}</h5>
                  <AnimatePresence initial={false}>
                    {i === idx && (
                      <m.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
                        {mod.desc}
                      </m.p>
                    )}
                  </AnimatePresence>
                </div>
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
