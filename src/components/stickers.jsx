// Die-cut style stickers: thick paper outline, flat navy/cream fills.
const N = '#1c3362'
const D = '#0f1d3a'
const P = '#fbfaf7'
const C = '#f1efea'

export function Cassette({ w = 190 }) {
  return (
    <svg width={w} viewBox="0 0 200 130">
      <rect x="4" y="4" width="192" height="122" rx="14" fill={P} />
      <rect x="12" y="12" width="176" height="106" rx="9" fill={D} />
      <rect x="26" y="22" width="148" height="40" rx="5" fill={C} />
      <text x="36" y="40" fontFamily="Caveat" fontWeight="700" fontSize="17" fill={N}>flutter mix '26</text>
      <text x="36" y="56" fontFamily="Fredoka" fontSize="10" fill={N} opacity=".7">SIDE A · build &amp; ship</text>
      <rect x="52" y="70" width="96" height="30" rx="15" fill={C} opacity=".16" />
      {[76, 124].map((cx) => (
        <g key={cx} className="anim-spin" style={{ transformOrigin: `${cx}px 85px`, animationDuration: '3s' }}>
          <circle cx={cx} cy="85" r="11" fill={C} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <rect key={a} x={cx - 1.5} y="76" width="3" height="5" fill={D} transform={`rotate(${a} ${cx} 85)`} />
          ))}
        </g>
      ))}
      <path d="M40 118 l10 -12 h100 l10 12" fill="none" stroke={C} strokeOpacity=".3" strokeWidth="2" />
    </svg>
  )
}

export function Disc({ w = 120 }) {
  return (
    <svg width={w} viewBox="0 0 120 120" className="anim-spin" style={{ animationDuration: '6s' }}>
      <circle cx="60" cy="60" r="58" fill={P} />
      <circle cx="60" cy="60" r="52" fill={D} />
      {[44, 36, 28].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke={C} strokeOpacity=".14" />
      ))}
      <path d="M60 14 A46 46 0 0 1 104 46" stroke={C} strokeOpacity=".35" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="60" r="18" fill={C} />
      <circle cx="60" cy="60" r="5" fill={D} />
    </svg>
  )
}

export function Terminal({ w = 200 }) {
  return (
    <svg width={w} viewBox="0 0 200 120">
      <rect x="4" y="4" width="192" height="112" rx="14" fill={P} />
      <rect x="12" y="12" width="176" height="96" rx="8" fill={N} />
      <rect x="12" y="12" width="176" height="20" rx="8" fill={D} />
      {[24, 36, 48].map((x) => (
        <circle key={x} cx={x} cy="22" r="3.5" fill={C} opacity=".55" />
      ))}
      <text x="22" y="54" fontFamily="ui-monospace, monospace" fontSize="12" fill={C}>$ flutter run</text>
      <text x="22" y="72" fontFamily="ui-monospace, monospace" fontSize="11" fill={C} opacity=".6">✓ Built app.apk</text>
      <text x="22" y="90" fontFamily="ui-monospace, monospace" fontSize="11" fill={C} opacity=".6">hello, world!</text>
      <rect x="112" y="81" width="7" height="12" fill={C} className="anim-blink" />
    </svg>
  )
}

export function QRSticker({ w = 104 }) {
  // fixed pseudo-random pattern so it renders the same every time
  const cells = '1011010011101001011100101101001110100101101011001011100101'
  return (
    <svg width={w} viewBox="0 0 100 112">
      <rect x="2" y="2" width="96" height="108" rx="12" fill={P} />
      <rect x="10" y="10" width="80" height="80" rx="6" fill={C} />
      {[[16, 16], [62, 16], [16, 62]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="22" height="22" rx="3" fill={N} />
          <rect x={x + 5} y={y + 5} width="12" height="12" rx="1.5" fill={C} />
          <rect x={x + 8} y={y + 8} width="6" height="6" fill={N} />
        </g>
      ))}
      {Array.from(cells).map((b, i) =>
        b === '1' ? <rect key={i} x={42 + (i % 6) * 7} y={42 + Math.floor(i / 6) * 5.2} width="5" height="4" fill={N} /> : null,
      )}
      <text x="50" y="104" textAnchor="middle" fontFamily="Caveat" fontWeight="700" fontSize="14" fill={N}>scan me!</text>
    </svg>
  )
}

export function StarBadge({ w = 96, label = 'intern ×3' }) {
  return (
    <svg width={w} viewBox="0 0 100 100">
      <path
        fill={P}
        d="M50 0l11 16 19-5 1 19 18 8-9 17 9 17-18 8-1 19-19-5-11 16-11-16-19 5-1-19-18-8 9-17-9-17 18-8 1-19 19 5z"
      />
      <path
        fill={N}
        transform="translate(50 50) scale(.86) translate(-50 -50)"
        d="M50 0l11 16 19-5 1 19 18 8-9 17 9 17-18 8-1 19-19-5-11 16-11-16-19 5-1-19-18-8 9-17-9-17 18-8 1-19 19 5z"
      />
      <text x="50" y="57" textAnchor="middle" fontFamily="Caveat" fontWeight="700" fontSize="19" fill={C}>{label}</text>
    </svg>
  )
}
