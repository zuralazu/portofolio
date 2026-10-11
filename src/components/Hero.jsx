import { lazy, Suspense, useRef } from 'react'
import { m, useInView, useScroll, useTransform } from 'framer-motion'
import { profile, heroLabels } from '../data'
import { ease, Magnetic, Arrow, Sparkle, Butterfly, HandArrow, Sticker, Stamp } from './ui'
import { Cassette, Disc, Terminal, QRSticker, StarBadge } from './stickers'
import { scrollToId } from './Nav'

// start downloading the 3D chunk while the loader is still on screen
const phoneChunk = import('./HeroPhone')
const HeroPhone = lazy(() => phoneChunk)

const word = 'portfolio'
// playful baseline like a hand-set headline
const tilt = [-8, 4, -3, 6, -5, 3, -6, 5, -2]
const lift = [6, -4, 2, -8, 4, -2, 6, -6, 0]

const labelSpots = [
  { style: { left: 'calc(50% - 400px)', top: '24%' }, arrow: { d: 'M4 10 C 24 2, 44 8, 58 32' } },
  { style: { left: 'calc(50% - 470px)', top: '74%' }, arrow: { d: 'M4 30 C 22 38, 42 34, 58 10' } },
  { style: { right: 'calc(50% - 400px)', top: '30%', flexDirection: 'row-reverse' }, arrow: { d: 'M4 10 C 24 2, 44 8, 58 32', flip: true } },
  { style: { right: 'calc(50% - 420px)', top: '70%', flexDirection: 'row-reverse' }, arrow: { d: 'M4 30 C 22 38, 42 34, 58 10', flip: true } },
]

export default function Hero({ ready }) {
  const ref = useRef(null)
  const stage = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const wordY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const phoneY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const visible = useInView(ref)

  return (
    <header className="sec navy hero" id="top" ref={ref}>
      <div className="hero-stage" ref={stage}>
        <Stamp size={150} style={{ left: '-30px', bottom: '8%' }} />
        <Stamp size={130} text="build • design • ship • build • design • ship • " style={{ right: '22%', top: '9%' }} />

        <m.h1 className="hero-word" style={{ y: wordY }} aria-label={`${profile.name} portfolio`}>
          {word.split('').map((c, i) => (
            <m.span
              key={i}
              className="ch"
              initial={{ y: 160, opacity: 0, rotate: tilt[i] * 3 }}
              animate={ready ? { y: lift[i], opacity: 1, rotate: tilt[i] } : {}}
              transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.15 + i * 0.06 }}
              whileHover={{ y: lift[i] - 30, rotate: -tilt[i], transition: { type: 'spring', stiffness: 500, damping: 9 } }}
            >
              {c}
            </m.span>
          ))}
        </m.h1>

        <div className="hero-phone">
          <m.div
            style={{ y: phoneY, width: '100%', height: '100%' }}
            initial={{ opacity: 0, rotate: -12 }}
            animate={ready ? { opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 1.2, ease, delay: 0.5 }}
          >
            <Suspense fallback={null}>{ready && <HeroPhone active={visible} />}</Suspense>
            <span className="phone-tip">drag to tilt · tap to switch</span>
          </m.div>
        </div>

        {heroLabels.map((l, i) => (
          <m.div
            key={l}
            className="hero-label"
            style={labelSpots[i].style}
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 + i * 0.15 }}
          >
            <span>{l}</span>
            <HandArrow {...labelSpots[i].arrow} delay={1.2 + i * 0.15} play={ready} />
          </m.div>
        ))}

        <Sticker className="hide-sm" bounds={stage} style={{ left: '4%', top: '16%' }} rotate={-12} delay={0.9} play={ready}>
          <Cassette w={180} />
        </Sticker>
        <Sticker className="hide-sm" bounds={stage} style={{ right: '4%', top: '15%' }} rotate={9} delay={1} play={ready}>
          <Terminal w={190} />
        </Sticker>
        <Sticker bounds={stage} style={{ left: '7%', bottom: '4%' }} rotate={0} delay={1.1} play={ready}>
          <Disc w={110} />
        </Sticker>
        <Sticker bounds={stage} style={{ right: '9%', bottom: '5%' }} rotate={-8} delay={1.2} play={ready}>
          <QRSticker w={96} />
        </Sticker>
        <Sticker className="hide-sm" bounds={stage} style={{ right: '22%', bottom: '2%' }} rotate={14} delay={1.3} play={ready}>
          <StarBadge w={90} />
        </Sticker>

        <Sparkle size={26} style={{ left: '30%', top: '16%' }} color="#f1efea" />
        <Sparkle size={16} style={{ left: '20%', top: '58%' }} delay={0.8} color="#f1efea" />
        <Sparkle size={20} style={{ right: '28%', top: '62%' }} delay={1.4} color="#f1efea" />
        <Sparkle size={14} style={{ right: '16%', top: '45%' }} delay={0.4} color="#f1efea" />
        <Butterfly size={30} style={{ left: '36%', top: '74%' }} color="#f1efea" />
        <Butterfly size={24} style={{ right: '33%', top: '18%' }} delay={1.2} color="#f1efea" />
      </div>

      <m.div
        className="hero-foot"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 1.3 }}
      >
        <p className="who">
          <strong>{profile.name}</strong>
          {profile.role} · {profile.location}
        </p>
        <div className="scroll">
          scroll down
          <span className="anim-bob">↓</span>
        </div>
        <div className="right">
          <Magnetic>
            <button className="btn solid" onClick={() => scrollToId('projects')}>
              See my work <Arrow />
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn" onClick={() => scrollToId('contact')}>
              Say hello <Arrow />
            </button>
          </Magnetic>
        </div>
      </m.div>
    </header>
  )
}
