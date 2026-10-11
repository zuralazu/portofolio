import { useRef } from 'react'
import { m, useInView } from 'framer-motion'

// Tiny animated mock screens for each project, drawn in navy on cream.
const N = '#1c3362'
const S = 'rgba(28,51,98,.14)'
// Loops only run while the art is on screen; off screen every animation settles instantly.
const looper = (on) => (duration, delay = 0, extra = {}) =>
  on ? { duration, delay, repeat: Infinity, ease: 'easeInOut', ...extra } : { duration: 0 }

function Bar({ x, y, w, h = 6, o = 1 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={N} opacity={o} />
}

const arts = {
  qr: (loop) => (
    <>
      <Bar x={16} y={20} w={60} h={8} />
      <Bar x={16} y={34} w={40} o={0.4} />
      <rect x="35" y="54" width="80" height="80" rx="10" fill={N} />
      {[0, 1, 2, 3, 4].map((i) =>
        [0, 1, 2, 3, 4].map((j) => ((i * 3 + j * 5 + i * j) % 3 ? <rect key={`${i}${j}`} x={49 + i * 11} y={68 + j * 11} width="8" height="8" fill="#f1efea" /> : null)),
      )}
      <m.rect x="40" width="70" height="2.5" fill="#f1efea" animate={{ y: [60, 128, 60] }} transition={loop(2.2)} />
      <rect x="16" y="148" width="118" height="36" rx="8" fill={S} />
      <Bar x={26} y={158} w={50} />
      <Bar x={26} y={170} w={30} o={0.4} />
      <m.circle cx="118" cy="166" r="7" fill={N} animate={{ scale: [0.6, 1, 0.6] }} transition={loop(2.2)} />
    </>
  ),
  cat: (loop) => (
    <>
      <rect x="16" y="18" width="118" height="92" rx="10" fill={N} />
      <path d="M52 78 l4 -34 18 16 h6 l18 -16 4 34z" fill="#f1efea" />
      <ellipse cx="75" cy="78" rx="30" ry="22" fill="#f1efea" />
      <m.g animate={{ scaleY: [1, 0.1, 1] }} transition={loop(3, 0, { times: [0, 0.05, 0.1], ease: 'linear' })} style={{ transformOrigin: '75px 74px' }}>
        <circle cx="64" cy="74" r="3.5" fill={N} />
        <circle cx="86" cy="74" r="3.5" fill={N} />
      </m.g>
      {[0.9, 0.4, 0.2].map((v, i) => (
        <g key={i}>
          <rect x="16" y={126 + i * 22} width="118" height="8" rx="4" fill={S} />
          <m.rect x="16" y={126 + i * 22} height="8" rx="4" fill={N} animate={{ width: [8, 118 * v, 118 * v, 8] }} transition={loop(3.4, i * 0.1)} />
        </g>
      ))}
    </>
  ),
  retail: (loop) => (
    <>
      <Bar x={16} y={20} w={56} h={8} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={16 + (i % 2) * 62} y={38 + Math.floor(i / 2) * 50} width="56" height="42" rx="8" fill={i === 0 ? N : S} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <m.rect
          key={i}
          x={20 + i * 19}
          width="12"
          rx="3"
          fill={N}
          animate={{ height: [10, 18 + ((i * 13) % 34), 10], y: [178, 170 - ((i * 13) % 34), 178] }}
          transition={loop(2.6, i * 0.15)}
        />
      ))}
      <rect x="16" y="190" width="118" height="1.5" fill={N} opacity=".3" />
    </>
  ),
  display: (loop) => (
    <>
      <rect x="12" y="24" width="126" height="92" rx="6" fill={N} />
      <rect x="66" y="116" width="18" height="14" fill={N} />
      <rect x="48" y="130" width="54" height="5" rx="2.5" fill={N} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="22" y={36 + i * 19} width="22" height="11" rx="2" fill="#f1efea" opacity=".85" />
          <rect x="50" y={36 + i * 19} width="78" height="11" rx="2" fill="#f1efea" opacity=".3" />
        </g>
      ))}
      <m.rect x="48" width="82" height="15" rx="3" fill="none" stroke="#f1efea" strokeWidth="2" animate={{ y: [34, 53, 72, 91, 34] }} transition={loop(5)} />
      <Bar x={16} y={154} w={90} />
      <Bar x={16} y={168} w={60} o={0.4} />
      <m.path d="M118 164 l6 -14 6 14 -6 -4z" fill={N} animate={{ rotate: [0, 20, 0] }} style={{ transformOrigin: '124px 160px' }} transition={loop(1.6)} />
    </>
  ),
  jobs: (loop) => (
    <>
      <rect x="12" y="16" width="126" height="86" rx="10" fill={S} />
      <path d="M12 70 Q50 50 80 72 T138 60" fill="none" stroke={N} strokeWidth="1.5" opacity=".4" />
      <path d="M40 16 V102 M96 16 V102" stroke={N} strokeWidth="1" opacity=".2" />
      <m.g animate={{ y: [0, -8, 0] }} transition={loop(1.4)}>
        <path d="M75 34 c-11 0 -18 8 -18 17 c0 12 18 28 18 28 s18 -16 18 -28 c0 -9 -7 -17 -18 -17z" fill={N} />
        <circle cx="75" cy="51" r="6" fill="#f1efea" />
      </m.g>
      {[0, 1, 2].map((i) => (
        <m.g key={i} initial={{ x: 0 }} animate={{ x: [0, 4, 0] }} transition={loop(2, i * 0.3)}>
          <rect x="12" y={114 + i * 28} width="126" height="22" rx="6" fill={i === 0 ? N : S} />
          <circle cx="24" cy={125 + i * 28} r="5" fill={i === 0 ? '#f1efea' : N} opacity=".8" />
          <rect x="34" y={122 + i * 28} width={50 + i * 12} height="6" rx="3" fill={i === 0 ? '#f1efea' : N} opacity=".7" />
        </m.g>
      ))}
    </>
  ),
  cafe: (loop) => (
    <>
      {[0, 1, 2].map((i) => (
        <m.path
          key={i}
          d={`M${58 + i * 14} 50 c-6 -8 6 -14 0 -24`}
          stroke={N}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, -6, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={loop(2, i * 0.3)}
        />
      ))}
      <path d="M44 58 h62 l-6 46 a10 10 0 0 1 -10 9 h-30 a10 10 0 0 1 -10 -9z" fill={N} />
      <path d="M106 66 h6 a10 10 0 0 1 0 22 h-8" fill="none" stroke={N} strokeWidth="5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="16" y={128 + i * 20} width="118" height="14" rx="4" fill={S} />
          <Bar x={22} y={132 + i * 20} w={40} />
          <m.text x="128" y={139 + i * 20} textAnchor="end" fontFamily="Fredoka" fontSize="9" fill={N} animate={{ opacity: [1, 0.3, 1] }} transition={loop(2.4, i * 0.4)}>
            {['+24', '−8', '+12'][i]}
          </m.text>
        </g>
      ))}
    </>
  ),
  trophy: (loop) => (
    <>
      <m.g animate={{ rotate: [-4, 4, -4] }} style={{ transformOrigin: '75px 100px' }} transition={loop(2.4)}>
        <path d="M52 26 h46 v22 a23 23 0 0 1 -46 0z" fill={N} />
        <path d="M52 32 h-10 a10 10 0 0 0 10 16 M98 32 h10 a10 10 0 0 1 -10 16" fill="none" stroke={N} strokeWidth="4" />
        <rect x="70" y="70" width="10" height="14" fill={N} />
        <rect x="58" y="84" width="34" height="8" rx="2" fill={N} />
      </m.g>
      {['approved', 'review', 'approved'].map((s, i) => (
        <g key={i}>
          <rect x="16" y={110 + i * 26} width="118" height="20" rx="6" fill={S} />
          <Bar x={24} y={117 + i * 26} w={44} />
          <m.rect
            x="92"
            y={114 + i * 26}
            width="36"
            height="12"
            rx="6"
            stroke={N}
            strokeWidth="1.5"
            animate={{ fill: s === 'approved' ? [N, N] : ['rgba(0,0,0,0)', N, 'rgba(0,0,0,0)'] }}
            transition={loop(2.6, i * 0.3)}
          />
        </g>
      ))}
    </>
  ),
}

export default function ScreenArt({ kind, preserve = 'xMidYMid slice' }) {
  const ref = useRef(null)
  const on = useInView(ref)
  return (
    <svg ref={ref} viewBox="0 0 150 200" preserveAspectRatio={preserve} aria-hidden>
      <rect width="150" height="200" fill="#f1efea" />
      {/* remount on visibility change so the loops restart cleanly */}
      <g key={String(on)}>{arts[kind](looper(on))}</g>
    </svg>
  )
}
