import { useEffect, useState } from 'react'
import { m, animate } from 'framer-motion'
import { ease } from './ui'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    })
    return () => controls.stop()
  }, [onDone])

  return (
    <m.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease }}>
      <div className="loader-word" aria-hidden>
        {'hello!'.split('').map((c, i) => (
          <m.span
            key={i}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: [80, -18, 0], opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: i * 0.08 }}
          >
            {c}
          </m.span>
        ))}
      </div>
      <span className="loader-name">azzura lazuardy</span>
      <span className="loader-count">{String(count).padStart(3, '0')}</span>
    </m.div>
  )
}
