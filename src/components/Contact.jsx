import { useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useInView } from 'framer-motion'
import { profile } from '../data'
import { Magnetic, Arrow, Stamp, Sparkle, Butterfly, ease } from './ui'
import { scrollToId } from './Nav'

const lines = [['LET’S', 'WORK', 'TOGETHER'], ['AND', 'CREATE'], ['SOMETHING', 'GREAT!']]

const Icon = {
  in: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />
    </svg>
  ),
  wa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
}

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return <span>Pekanbaru · {now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Jakarta' })} WIB</span>
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  let w = 0
  return (
    <>
      <section className="sec cream" id="contact">
        <Stamp size={180} style={{ right: '4%', top: '60px' }} />
        <Stamp size={160} style={{ left: '-40px', bottom: '80px' }} text="say hi • say hi • say hi • say hi • say hi • " />
        <div className="wrap">
          <h2 className="contact-big" ref={ref} aria-label="Let's work together and create something great!">
            {lines.map((line, li) => (
              <span className="split-line" key={li}>
                {line.map((word) => {
                  const n = w++
                  return (
                    <m.span
                      key={word}
                      style={{ display: 'inline-block', marginRight: '0.2em' }}
                      initial={{ y: '110%', rotate: 6 }}
                      animate={inView ? { y: '0%', rotate: 0 } : {}}
                      transition={{ duration: 0.9, ease, delay: n * 0.06 }}
                      whileHover={{ y: -12, rotate: n % 2 ? 3 : -3, transition: { type: 'spring', stiffness: 400, damping: 10 } }}
                    >
                      {word}
                    </m.span>
                  )
                })}
              </span>
            ))}
          </h2>
          <Sparkle size={30} style={{ right: '18%', top: '42%' }} color="#1c3362" />
          <Butterfly size={34} style={{ right: '30%', top: '24%' }} color="#1c3362" />

          <div className="contact-row">
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Magnetic>
                <button className="btn solid" onClick={copy} data-cursor={copied ? 'Copied!' : 'Copy'}>
                  {copied ? 'Email copied ✓' : 'Copy my email'}
                </button>
              </Magnetic>
              <Magnetic>
                <a className="btn" href="/cv-azzura-lazuardy.pdf" download>
                  Download CV <Arrow />
                </a>
              </Magnetic>
            </div>

            <m.ul
              className="contact-list"
              initial="hide"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            >
              {[
                { ico: Icon.in, label: 'azzura-lazuardy', href: profile.linkedin },
                { ico: Icon.wa, label: profile.phone, href: `https://wa.me/${profile.phone.replace(/\D/g, '')}` },
                { ico: Icon.mail, label: profile.email, href: `mailto:${profile.email}` },
              ].map((c) => (
                <m.li key={c.label} variants={{ hide: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span className="ico">{c.ico}</span>
                    {c.label}
                  </a>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 {profile.name}</span>
        <Clock />
        <button onClick={() => scrollToId('top')}>Back to top ↑</button>
      </footer>

      <AnimatePresence>
        {copied && (
          <m.div className="toast" initial={{ y: 40, x: '-50%', opacity: 0 }} animate={{ y: 0, x: '-50%', opacity: 1 }} exit={{ y: 40, x: '-50%', opacity: 0 }}>
            Email copied to clipboard ✓
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
