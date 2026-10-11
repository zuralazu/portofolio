import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { keycaps } from '../data'
import { setCursorLabel } from './ui'

const COLS = 5
const ROWS = 4
const STEP = 1.12
const NAVY = new THREE.Color('#1c3362')
const PAPER = new THREE.Color('#fbfaf7')

function Key({ label, cat, col, row, active, ripple, onPick }) {
  const ref = useRef()
  const mat = useRef()
  const txt = useRef()
  const [hovered, setHovered] = useState(false)
  const x = (col - (COLS - 1) / 2) * STEP
  const z = (row - (ROWS - 1) / 2) * STEP
  const tmp = useMemo(() => new THREE.Color(), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    let y = Math.sin(t * 1.8 + (col + row) * 0.7) * 0.05
    const r = ripple.current
    if (r) {
      const dist = Math.hypot(col - r.col, row - r.row)
      const dt = t - r.t
      const wave = Math.sin(dist * 1.6 - dt * 9) * Math.exp(-dt * 2.2) * Math.max(0, 1 - Math.abs(dist - dt * 5.5) / 2.5)
      y += wave * 0.35
    }
    if (hovered) y -= 0.2
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y, 0.25)
    const on = active === cat
    mat.current.color.lerp(on ? NAVY : PAPER, 0.12)
    txt.current.color = tmp.copy(on ? PAPER : NAVY)
  })

  return (
    <group ref={ref} position={[x, 0, z]}>
      <RoundedBox
        args={[0.98, 0.5, 0.98]}
        radius={0.14}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          setCursorLabel('Press')
        }}
        onPointerOut={() => {
          setHovered(false)
          setCursorLabel('')
        }}
        onClick={(e) => {
          e.stopPropagation()
          onPick(cat, col, row)
        }}
      >
        <meshStandardMaterial ref={mat} color={PAPER} roughness={0.55} />
      </RoundedBox>
      <Text ref={txt} font="/fonts/fredoka-600.woff" position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={label.length > 6 ? 0.17 : 0.21} color="#1c3362" anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  )
}

function Board({ active, onPick }) {
  const group = useRef()
  const ripple = useRef(null)
  const clock = useRef(0)

  useFrame(({ pointer, clock: c }) => {
    clock.current = c.elapsedTime
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.82 - pointer.y * 0.12, 0.05)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.25, 0.05)
  })

  const pick = (cat, col, row) => {
    ripple.current = { col, row, t: clock.current }
    onPick(cat)
  }

  return (
    <group ref={group} rotation={[0.82, 0, 0]}>
      <RoundedBox args={[COLS * STEP + 0.4, 0.4, ROWS * STEP + 0.4]} radius={0.18} smoothness={4} position={[0, -0.32, 0]}>
        <meshStandardMaterial color="#1c3362" roughness={0.5} />
      </RoundedBox>
      {keycaps.map(([label, cat], i) => (
        <Key key={label} label={label} cat={cat} col={i % COLS} row={Math.floor(i / COLS)} active={active} ripple={ripple} onPick={pick} />
      ))}
    </group>
  )
}

export default function Keyboard({ active, onPick, running = true }) {
  return (
    <Canvas frameloop={running ? 'always' : 'never'} resize={{ offsetSize: true }} camera={{ position: [0, 0, 8.4], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.6} />
      <directionalLight position={[2, 6, 4]} intensity={1.8} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Board active={active} onPick={onPick} />
    </Canvas>
  )
}
