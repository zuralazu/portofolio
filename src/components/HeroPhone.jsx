import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, RoundedBox, Float } from '@react-three/drei'
import * as THREE from 'three'
import { setCursorLabel } from './ui'

const W = 540
const H = 1140
const NAVY = '#1c3362'
const CREAM = '#f1efea'
const PAPER = '#fbfaf7'
const SOFT = '#8792aa'
const screens = ['Vehicle Inspection', 'Fire Equipment', 'Cat Classifier']

function rr(ctx, x, y, w, h, r, fill) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.fillStyle = fill
  ctx.fill()
}

function text(ctx, str, x, y, size, color, weight = 500, align = 'left') {
  ctx.font = `${weight} ${size}px Fredoka, system-ui, sans-serif`
  ctx.fillStyle = color
  ctx.textAlign = align
  ctx.fillText(str, x, y)
}

function drawInspection(ctx, t) {
  const p = (t * 0.18) % 1.25
  const progress = Math.min(p, 1)
  text(ctx, 'Hi, Inspector', 40, 190, 26, SOFT)
  text(ctx, 'Vehicle Inspection', 40, 236, 40, NAVY, 600)
  rr(ctx, 40, 270, W - 80, 200, 28, NAVY)
  // progress ring
  ctx.lineWidth = 16
  ctx.strokeStyle = 'rgba(241,239,234,.2)'
  ctx.beginPath()
  ctx.arc(140, 370, 58, 0, Math.PI * 2)
  ctx.stroke()
  ctx.strokeStyle = CREAM
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(140, 370, 58, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress)
  ctx.stroke()
  text(ctx, `${Math.round(progress * 100)}%`, 140, 382, 30, CREAM, 600, 'center')
  text(ctx, 'Modules done', 230, 352, 24, 'rgba(241,239,234,.7)')
  text(ctx, `${Math.floor(progress * 6)} / 6`, 230, 400, 48, CREAM, 600)
  const mods = ['Document OCR', 'Vehicle Documents', 'Interior', 'Exterior', 'Engine & Transmission', 'Undercarriage']
  mods.forEach((m, i) => {
    const y = 510 + i * 84
    rr(ctx, 40, y, W - 80, 70, 20, PAPER)
    const done = progress * 6 > i + 0.5
    ctx.beginPath()
    ctx.arc(84, y + 35, 15, 0, Math.PI * 2)
    ctx.lineWidth = 3
    ctx.strokeStyle = NAVY
    ctx.stroke()
    if (done) {
      ctx.fillStyle = NAVY
      ctx.fill()
      ctx.strokeStyle = CREAM
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.moveTo(77, y + 35)
      ctx.lineTo(82, y + 41)
      ctx.lineTo(92, y + 29)
      ctx.stroke()
    }
    text(ctx, m, 116, y + 44, 25, NAVY, 500)
  })
}

function drawFire(ctx, t) {
  text(ctx, 'Scan equipment', 40, 190, 26, SOFT)
  text(ctx, 'Fire Equipment', 40, 236, 40, NAVY, 600)
  const s = 340
  const x = (W - s) / 2
  const y = 290
  rr(ctx, x, y, s, s, 30, NAVY)
  // corner brackets
  ctx.strokeStyle = CREAM
  ctx.lineWidth = 8
  ctx.lineCap = 'round'
  const c = 46
  const m = 34
  ;[
    [x + m, y + m, 1, 1],
    [x + s - m, y + m, -1, 1],
    [x + m, y + s - m, 1, -1],
    [x + s - m, y + s - m, -1, -1],
  ].forEach(([px, py, dx, dy]) => {
    ctx.beginPath()
    ctx.moveTo(px, py + c * dy)
    ctx.lineTo(px, py)
    ctx.lineTo(px + c * dx, py)
    ctx.stroke()
  })
  // fake QR
  ctx.fillStyle = 'rgba(241,239,234,.85)'
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) if ((i * 7 + j * 3 + i * j) % 3 === 0) ctx.fillRect(x + 100 + i * 16, y + 100 + j * 16, 12, 12)
  const ly = y + m + ((Math.sin(t * 2) + 1) / 2) * (s - m * 2)
  ctx.fillStyle = CREAM
  ctx.fillRect(x + 30, ly - 2, s - 60, 4)
  rr(ctx, 40, 680, W - 80, 250, 28, PAPER)
  text(ctx, 'APAR-07', 72, 740, 34, NAVY, 600)
  text(ctx, 'Detected via QR', 72, 778, 22, SOFT)
  ;[['Pressure', 'OK'], ['Nozzle', 'OK'], ['Expires', '2027']].forEach(([k, v], i) => {
    text(ctx, k, 72, 834 + i * 34, 23, SOFT)
    text(ctx, v, W - 72, 834 + i * 34, 23, NAVY, 600, 'right')
  })
}

function drawCat(ctx, t) {
  text(ctx, 'Upload a photo', 40, 190, 26, SOFT)
  text(ctx, 'Cat Classifier', 40, 236, 40, NAVY, 600)
  rr(ctx, 40, 270, W - 80, 330, 28, NAVY)
  // simple cat face
  const cx = W / 2
  const cy = 450
  ctx.fillStyle = CREAM
  ctx.beginPath()
  ctx.moveTo(cx - 95, cy - 40)
  ctx.lineTo(cx - 80, cy - 135)
  ctx.lineTo(cx - 25, cy - 80)
  ctx.lineTo(cx + 25, cy - 80)
  ctx.lineTo(cx + 80, cy - 135)
  ctx.lineTo(cx + 95, cy - 40)
  ctx.closePath()
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(cx, cy, 110, 90, 0, 0, Math.PI * 2)
  ctx.fill()
  const blink = Math.sin(t * 3) > 0.96 ? 2 : 14
  ctx.fillStyle = NAVY
  ctx.beginPath()
  ctx.ellipse(cx - 40, cy - 10, 10, blink, 0, 0, Math.PI * 2)
  ctx.ellipse(cx + 40, cy - 10, 10, blink, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(cx - 9, cy + 18)
  ctx.lineTo(cx + 9, cy + 18)
  ctx.lineTo(cx, cy + 28)
  ctx.fill()
  const grow = Math.min(((t * 0.4) % 1.4) / 0.8, 1)
  ;[['Persian', 0.92], ['Bengal', 0.05], ['Siamese', 0.03]].forEach(([k, v], i) => {
    const y = 650 + i * 100
    text(ctx, k, 40, y, 26, NAVY, 500)
    text(ctx, `${Math.round(v * 100 * grow)}%`, W - 40, y, 26, NAVY, 600, 'right')
    rr(ctx, 40, y + 18, W - 80, 18, 9, 'rgba(28,51,98,.12)')
    rr(ctx, 40, y + 18, Math.max(18, (W - 80) * v * grow), 18, 9, NAVY)
  })
}

function drawScreen(ctx, idx, t) {
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)
  text(ctx, '9:41', 56, 70, 26, NAVY, 600)
  rr(ctx, W - 110, 52, 54, 24, 7, NAVY)
  ;[drawInspection, drawFire, drawCat][idx](ctx, t)
  // tab dots
  screens.forEach((_, i) => rr(ctx, W / 2 - 50 + i * 40, H - 90, i === idx ? 36 : 16, 12, 6, i === idx ? NAVY : 'rgba(28,51,98,.25)'))
  text(ctx, 'tap to switch app', W / 2, H - 40, 22, SOFT, 500, 'center')
}

function Phone() {
  const group = useRef()
  const st = useRef({ idx: 0, spin: 0, switched: true, hover: 0, hovered: false, acc: 1 })
  const [ctx, texture] = useMemo(() => {
    const cv = document.createElement('canvas')
    cv.width = W
    cv.height = H
    const tex = new THREE.CanvasTexture(cv)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return [cv.getContext('2d'), tex]
  }, [])

  useFrame(({ clock, pointer }, dt) => {
    const s = st.current
    // the screen only needs ~30fps; redrawing a 540×1140 canvas every frame is wasteful
    s.acc += dt
    if (s.acc > 1 / 30 || s.spin > 0) {
      s.acc = 0
      drawScreen(ctx, s.idx, clock.elapsedTime)
      texture.needsUpdate = true
    }
    // tap: full spin, swap screen halfway through
    if (s.spin > 0) {
      s.spin = Math.max(0, s.spin - dt * 1.6)
      if (!s.switched && s.spin < 0.5) {
        s.idx = (s.idx + 1) % screens.length
        s.switched = true
      }
    }
    const e = 1 - s.spin
    const spinAngle = s.spin > 0 ? Math.PI * 2 * (1 - Math.pow(1 - e, 3)) : 0
    s.hover = THREE.MathUtils.lerp(s.hover, s.hovered ? 1 : 0, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35, 0.06)
    group.current.children[0].rotation.y = spinAngle
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.2, 0.06)
    group.current.scale.setScalar(1 + s.hover * 0.04)
  })

  return (
    <group ref={group}>
      <group
        onClick={(e) => {
          e.stopPropagation()
          const s = st.current
          if (s.spin === 0) {
            s.spin = 1
            s.switched = false
          }
        }}
        onPointerOver={() => {
          st.current.hovered = true
          setCursorLabel('Tap')
        }}
        onPointerOut={() => {
          st.current.hovered = false
          setCursorLabel('')
        }}
      >
        <RoundedBox args={[1.62, 3.34, 0.17]} radius={0.2} smoothness={6}>
          <meshStandardMaterial color="#13244a" roughness={0.35} metalness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.087]}>
          <planeGeometry args={[1.48, 3.14]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* dynamic island */}
        <mesh position={[0, 1.42, 0.09]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.045, 0.22, 6, 12]} />
          <meshBasicMaterial color="#0b1630" />
        </mesh>
        {/* side buttons */}
        <mesh position={[0.82, 0.6, 0]}>
          <boxGeometry args={[0.03, 0.4, 0.06]} />
          <meshStandardMaterial color="#13244a" />
        </mesh>
        <mesh position={[-0.82, 0.8, 0]}>
          <boxGeometry args={[0.03, 0.24, 0.06]} />
          <meshStandardMaterial color="#13244a" />
        </mesh>
        {/* back plate monogram */}
        <mesh position={[0, 0.9, -0.087]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.22, 40]} />
          <meshBasicMaterial color={CREAM} />
        </mesh>
      </group>
    </group>
  )
}

export default function HeroPhone({ active = true }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} resize={{ offsetSize: true }} camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} />
      <PresentationControls global={false} snap speed={1.4} polar={[-0.4, 0.4]} azimuth={[-0.9, 0.9]} cursor={false}>
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
          <Phone />
        </Float>
      </PresentationControls>
    </Canvas>
  )
}
