import { useEffect, useId, useRef, useState } from 'react'
import { m, useMotionValue, useSpring, useInView, animate, useScroll, useTransform } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

export const Arrow = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* Custom cursor (blend-mode difference so it reads on navy and cream).
   Elements with data-cursor="Label" show a filled label ring. */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 280, damping: 26, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 280, damping: 26, mass: 0.5 })
  const [state, setState] = useState({ hover: false, label: '' })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => {
      const labelled = e.target.closest('[data-cursor]')
      const interactive = e.target.closest('a, button, [role="button"]')
      setState({ hover: !!(labelled || interactive), label: labelled?.dataset.cursor || '' })
    }
    const label = (e) => setState({ hover: !!e.detail, label: e.detail })
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('cursorlabel', label)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('cursorlabel', label)
    }
  }, [x, y])

  return (
    <>
      <m.div className="cursor-dot" style={{ x, y }} />
      <m.div className={`cursor-ring ${state.label ? 'is-label' : state.hover ? 'is-hover' : ''}`} style={{ x: rx, y: ry }}>
        {state.label}
      </m.div>
    </>
  )
}

export const setCursorLabel = (label) => window.dispatchEvent(new CustomEvent('cursorlabel', { detail: label }))

/* Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <m.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y, display: 'inline-block' }}>
      {children}
    </m.div>
  )
}

/* Reveals text line-by-line, sliding up from a mask. */
export function RevealLines({ lines, as: Tag = 'h2', className, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span className="split-line" key={i}>
          <m.span
            initial={{ y: '110%', rotate: 4 }}
            animate={inView ? { y: '0%', rotate: 0 } : {}}
            transition={{ duration: 1, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  )
}

/* Counts from 0 to value when scrolled into view. */
export function CountUp({ value, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState((0).toFixed(decimals))
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 1.8, ease, onUpdate: (v) => setDisplay(v.toFixed(decimals)) })
    return () => controls.stop()
  }, [inView, value, decimals])
  return <span ref={ref}>{display}</span>
}

/* Circular handwritten text badge that spins slowly and speeds up with scroll. */
export function Stamp({ text = "it's coding with azzura • it's coding with azzura • ", size = 170, style }) {
  const id = useId().replace(/:/g, '')
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (v) => v * 0.12)
  return (
    <m.svg className="stamp" width={size} height={size} viewBox="0 0 200 200" style={{ rotate, ...style }} aria-hidden>
      <defs>
        <path id={id} d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
      </defs>
      <g style={{ transformOrigin: '100px 100px', animation: 'spin 24s linear infinite' }}>
        <text fill="currentColor" style={{ fontSize: 21 }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </g>
    </m.svg>
  )
}

/* Four-point twinkling star (CSS keyframes, runs on the compositor). */
export function Sparkle({ size = 22, delay = 0, style, color = 'currentColor' }) {
  return (
    <svg className="sparkle anim-twinkle" width={size} height={size} viewBox="0 0 24 24" style={{ animationDelay: `${delay}s`, ...style }} aria-hidden>
      <path fill={color} d="M12 0c.7 6.3 5 10.9 12 12-7 1.1-11.3 5.7-12 12-.7-6.3-5-10.9-12-12C7 10.9 11.3 6.3 12 0z" />
    </svg>
  )
}

/* Small butterfly that flaps its wings and drifts (CSS keyframes). */
export function Butterfly({ size = 30, delay = 0, style, color = 'currentColor' }) {
  return (
    <div className="sparkle anim-drift" style={{ animationDelay: `${delay}s`, ...style }} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 40 40" style={{ overflow: 'visible' }}>
        <g className="anim-flap" style={{ animationDelay: `${delay}s` }}>
          <path fill={color} d="M20 20C14 6 3 6 4 14s9 8 16 6zM20 20C26 6 37 6 36 14s-9 8-16 6zM20 20c-5 3-11 8-8 13s7-3 8-13zM20 20c5 3 11 8 8 13s-7-3-8-13z" />
        </g>
        <rect x="19" y="13" width="2" height="15" rx="1" fill={color} />
      </svg>
    </div>
  )
}

/* Hand-drawn arrow that draws itself when it enters view. */
export function HandArrow({ d = 'M4 8 C 24 2, 44 10, 56 34', flip = false, delay = 0, play = true }) {
  return (
    <svg viewBox="0 0 64 44" style={{ transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden>
      <m.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : {}}
        transition={{ duration: 0.9, ease, delay }}
      />
      <m.path
        d="M46 32 L56 34 L57 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : {}}
        transition={{ duration: 0.35, ease, delay: delay + 0.8 }}
      />
    </svg>
  )
}

/* Wrapper that makes decorations draggable inside a bounding ref, with a playful pickup. */
export function Sticker({ children, bounds, style, rotate = 0, delay = 0, play = true, className = '' }) {
  return (
    <m.div
      className={`sticker ${className}`}
      style={style}
      drag
      dragConstraints={bounds}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
      initial={{ scale: 0, rotate: rotate - 30 }}
      animate={play ? { scale: 1, rotate } : {}}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay }}
      whileHover={{ scale: 1.08, rotate: rotate + 6 }}
      whileDrag={{ scale: 1.15, rotate: rotate - 8, zIndex: 20 }}
      data-cursor="Drag"
    >
      {children}
    </m.div>
  )
}
