import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import '../css/hero.css'

export default function Hero() {
  const words = ['Seamlessly', 'Intelligently', 'Securely', 'Efficiently', 'Dynamically', 'Scalably', 'Precisely']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, 5000) // change every ~5s including slight delay
    return () => clearInterval(id)
  }, [])
  return (
    <section id="top" className="hero">
      <div className="hero__bg-stacks" />
      <div className="vignette" />
      <div className="noise" />
      <div className="particles-bg" />
      <div className="hero__columns">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="hero__content">
          {/*<div className="hero__badge"><span className="dot" /> NEW GEN AI AUTOMATION PARTNER</div>*/}
          <h1 className="hero__title">
            <span className="muted">AI-Driven</span> Solutions. <span className="muted">Growth</span> Simplified{' '}
            <span className="hero__word-rotator">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  className="hero__em"
                  style={{ display: 'inline-block' }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
                >
                  {words[index]}.
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
          <p className="hero__subtitle">Expertise in Design, Development, and Digital Strategy</p>
          <div className="cta">
            <a href="#contact" className="btn--hero">Book a Meeting</a>
            <a href="mailto:divlynx.inc@gmail.com" className="btn--hero" aria-label="Drop an email">Drop an Email</a>
          </div>
        </motion.div>

        <div className="hero__tstack">
          <motion.div className="hero__tcard glass-liquid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}>
            <div className="hero__tdate">Nov 14th, 2024</div>
            <p className="hero__tquote">“One of the best working experience, kudos to divlynx inc.”</p>
            <div className="hero__tstars">★★★★★</div>
            <div className="hero__tauthor">After Realism</div>
            <div className="hero__tsource">Australia</div>
          </motion.div>
          <motion.div className="hero__tcard glass-liquid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}>
            <div className="hero__tdate">March 3rd, 2024</div>
            <p className="hero__tquote">“ We enjoyed working with divlynx and will likely have additional jobs for them in the future.”</p>
            <div className="hero__tstars">★★★★★</div>
            <div className="hero__tauthor">Elclub</div>
            <div className="hero__tsource">USA</div>
          </motion.div>
          <motion.div className="hero__tcard glass-liquid" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}>
            <div className="hero__tdate">Nov 18th, 2023</div>
            <p className="hero__tquote">“Execution was swift, outcomes exceeded expectations - strong recommendations!”</p>
            <div className="hero__tstars">★★★★★</div>
            <div className="hero__tauthor">MetaStore</div>
            <div className="hero__tsource">Pakistan</div>
          </motion.div>
          {/* Mobile-only duplicate to fill 2×2 grid */}
          <motion.div className="hero__tcard glass-liquid tcard--mobile-dup" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}>
            <div className="hero__tdate">March 3rd, 2024</div>
            <p className="hero__tquote">“ We enjoyed working with divlynx and will likely have additional jobs for them in the future.”</p>
            <div className="hero__tstars">★★★★★</div>
            <div className="hero__tauthor">Elclub</div>
            <div className="hero__tsource">USA</div>
          </motion.div>
          <div className="hero__stats">
            <div className="hero__stat">30+ Projects</div>
            <div className="hero__stat">20+ Clients</div>
            <div className="hero__stat">2+ Years</div>
          </div>
          <div className="hero__trust">
            <span className="hero__trust-label">Trusted by</span>
            <div className="hero__trust-logos">
              <img src="/after-realism.png" alt="After Realism logo" />
              <img src="/metastore.webp" alt="Metastore logo" />
              <img src="/elclub.png" alt="El Club logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}