import { useRef, useState } from 'react'
import { m, useInView } from 'framer-motion'
import { education } from '../data'
import { RevealLines, Stamp, Sparkle, ease } from './ui'

const N = '#1c3362'
const D = '#172b54'
const C = '#f1efea'

function Campus() {
  return (
    <svg viewBox="0 0 200 200">
      <rect width="200" height="200" fill={D} />
      <circle cx="160" cy="44" r="16" fill={C} opacity=".9" />
      <rect x="30" y="92" width="140" height="80" fill={C} />
      <path d="M22 96 L100 52 L178 96 Z" fill={C} />
      {[46, 74, 102, 130].map((x) => (
        <rect key={x} x={x} y="108" width="14" height="52" fill={N} />
      ))}
      <rect x="22" y="168" width="156" height="8" fill={C} />
      <rect x="99" y="22" width="2" height="34" fill={C} />
      <path d="M101 22 h22 l-6 6 6 6 h-22z" fill={C} className="anim-flag" style={{ transformOrigin: '101px 28px' }} />
      <text x="100" y="88" textAnchor="middle" fontFamily="Fredoka" fontWeight="600" fontSize="14" fill={N}>PCR</text>
    </svg>
  )
}

function Cap() {
  return (
    <svg viewBox="0 0 200 200">
      <rect width="200" height="200" fill={D} />
      <path d="M100 58 L178 92 L100 126 L22 92 Z" fill={C} />
      <path d="M58 108 v30 c0 14 84 14 84 0 v-30 l-42 18z" fill={C} opacity=".85" />
      <g className="anim-tassel" style={{ transformOrigin: '150px 100px' }}>
        <path d="M150 100 v44" stroke={C} strokeWidth="3" />
        <rect x="143" y="142" width="14" height="20" rx="3" fill={C} />
      </g>
      <text x="100" y="186" textAnchor="middle" fontFamily="Caveat" fontWeight="700" fontSize="22" fill={C}>b.eng informatics</text>
    </svg>
  )
}

function Gpa() {
  return (
    <svg viewBox="0 0 200 200">
      <rect width="200" height="200" fill={D} />
      <text x="100" y="118" textAnchor="middle" fontFamily="Bebas Neue" fontSize="84" fill={C}>{education.gpa}</text>
      <text x="100" y="146" textAnchor="middle" fontFamily="Fredoka" fontSize="14" fill={C} opacity=".7">CGPA / 4.00</text>
      {[[40, 50], [160, 60], [150, 165], [46, 160]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0-10c.6 5.4 4.2 9.4 10 10-5.8.6-9.4 4.6-10 10-.6-5.4-4.2-9.4-10-10C-4.2-.6-.6-4.6 0-10z" fill={C} className="anim-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
    </svg>
  )
}

const shots = [
  { id: 'campus', Art: Campus, caption: 'pcr, pekanbaru', x: '2%', y: 40, r: -8 },
  { id: 'cap', Art: Cap, caption: 'class of 2026', x: '30%', y: 0, r: 5 },
  { id: 'gpa', Art: Gpa, caption: 'proud moment', x: '18%', y: 210, r: -3 },
]

export default function Education() {
  const zone = useRef(null)
  const inView = useInView(zone, { once: true, margin: '-15% 0px' })
  const [order, setOrder] = useState(shots.map((s) => s.id))
  const front = (id) => setOrder((o) => [...o.filter((x) => x !== id), id])

  return (
    <section className="sec navy" id="education">
      <Stamp size={160} style={{ left: '-40px', bottom: '60px' }} />
      <Stamp size={140} style={{ right: '6%', top: '40px' }} text="learn • grow • repeat • learn • grow • repeat • " />
      <div className="wrap">
        <div className="edu-grid">
          <div>
            <RevealLines className="h-round" lines={['Education', 'Background']} />
            <div className="polaroid-zone" ref={zone}>
              {shots.map(({ id, Art, caption, x, y, r }, i) => (
                <m.figure
                  key={id}
                  className="polaroid"
                  style={{ left: x, top: y, zIndex: order.indexOf(id) + 1 }}
                  initial={{ opacity: 0, y: 200, rotate: r * 4 }}
                  animate={inView ? { opacity: 1, y: 0, rotate: r } : {}}
                  transition={{ type: 'spring', stiffness: 90, damping: 13, delay: i * 0.15 }}
                  drag
                  dragConstraints={zone}
                  dragElastic={0.2}
                  onPointerDown={() => front(id)}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  whileDrag={{ scale: 1.08, rotate: r / 2 }}
                  data-cursor="Drag"
                >
                  <div className="pic">
                    <Art />
                  </div>
                  <figcaption>{caption}</figcaption>
                </m.figure>
              ))}
            </div>
          </div>

          <ul className="edu-list">
            {[
              { yr: education.start.split(' ')[1], title: education.school, text: `${education.start} · Started ${education.degree}` },
              { yr: education.end.split(' ')[1], title: education.degree, text: `${education.end} · CGPA ${education.gpa} / 4.00` },
            ].map((e, i) => (
              <m.li
                key={e.yr}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, ease, delay: i * 0.15 }}
              >
                <div className="yr">{e.yr}</div>
                <h4>{e.title}</h4>
                <p>{e.text}</p>
              </m.li>
            ))}
            <Sparkle size={24} style={{ right: '10%', bottom: '-30px' }} color="#f1efea" />
          </ul>
        </div>
      </div>
    </section>
  )
}
