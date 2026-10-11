import { useRef } from 'react'
import { m, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile, about, stats, education } from '../data'
import { RevealLines, CountUp, Stamp, Sparkle, ease } from './ui'

function IdBadge() {
  const zone = useRef(null)
  const inView = useInView(zone, { once: true, margin: '-20% 0px' })
  const x = useMotionValue(0)
  const rotate = useSpring(useTransform(x, [-220, 220], [28, -28]), { stiffness: 120, damping: 8 })

  return (
    <div className="badge-zone" ref={zone}>
      <m.div
        initial={{ y: -520 }}
        animate={inView ? { y: 0 } : {}}
        transition={{ type: 'spring', stiffness: 70, damping: 9 }}
        style={{ position: 'absolute', top: 0, display: 'flex', justifyContent: 'center' }}
      >
        <div className="anim-sway" style={{ transformOrigin: '50% -40px' }}>
          <m.div
            className="id-wrap"
            style={{ x, rotate }}
            drag
            dragSnapToOrigin
            dragElastic={0.4}
            dragConstraints={{ left: -160, right: 160, top: -40, bottom: 120 }}
            dragTransition={{ bounceStiffness: 140, bounceDamping: 9 }}
            data-cursor="Swing"
            whileTap={{ scale: 0.98 }}
          >
            <div className="lanyard" />
            <div className="clip" />
            <div className="id-card">
              <div className="hole" />
              <div className="id-photo">
                <img src="/img/face.webp" width="480" height="480" alt={profile.name} loading="lazy" decoding="async" draggable="false" />
                <span className="mono">az.</span>
                <Sparkle size={20} style={{ right: 14, top: 14 }} color="#f1efea" />
              </div>
              <h3>{profile.name}</h3>
              <p>{profile.role}</p>
              <div className="id-row">
                <span>{education.school.split(' ').slice(0, 2).join(' ')}</span>
                <span>’26</span>
              </div>
            </div>
          </m.div>
        </div>
      </m.div>
    </div>
  )
}

export default function About() {
  return (
    <section className="sec cream" id="about">
      <Stamp size={170} style={{ left: '-50px', top: '60px' }} />
      <Stamp size={190} style={{ right: '-60px', bottom: '40px' }} />
      <div className="wrap">
        <div className="about-grid">
          <IdBadge />
          <div className="about-copy">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Sparkle size={28} style={{ left: '46%', top: '-30px' }} color="#1c3362" />
              <RevealLines className="h-round" lines={['About me']} />
            </div>
            {about.map((p, i) => (
              <m.p
                key={i}
                className="body-serif"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.1 }}
              >
                {p}
              </m.p>
            ))}
            <div className="about-stats">
              {stats.map((s, i) => (
                <m.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.08 }}
                >
                  <strong>
                    <CountUp value={s.value} decimals={s.decimals || 0} />
                    {s.suffix}
                  </strong>
                  <span>{s.label}</span>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
