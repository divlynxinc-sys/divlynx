import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const topAnchor = document.getElementById('top-anchor')
    const footer = document.querySelector('.footer-section')

    // Observe the top anchor: when it is NOT intersecting, show the button
    let topObs
    if (topAnchor) {
      topObs = new IntersectionObserver(([entry]) => {
        setVisible(!entry.isIntersecting)
      }, { root: null, threshold: 0 })
      topObs.observe(topAnchor)
    } else {
      // Fallback: show after 150px if anchor missing
      const onScroll = () => setVisible((window.scrollY || 0) > 150)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      // Cleanup attached later
      topObs = { disconnect: () => window.removeEventListener('scroll', onScroll) }
    }

    // Observe footer to lift the button when footer is near/visible
    let footObs
    if (footer) {
      footObs = new IntersectionObserver(([entry]) => {
        setLifted(entry.isIntersecting)
      }, { root: null, threshold: 0, rootMargin: '0px 0px -72px 0px' })
      footObs.observe(footer)
    }

    return () => {
      try { topObs && topObs.disconnect && topObs.disconnect() } catch {}
      try { footObs && footObs.disconnect && footObs.disconnect() } catch {}
    }
  }, [])

  const onClick = () => {
    const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

    // Try native smooth scroll first
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      setTimeout(() => {
        const newY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        if (Math.abs(newY - currentY) < 1) rafScroll()
      }, 120)
      return
    } catch {}

    // Fallback to rAF animation targeting both html and body (iOS Safari)
    rafScroll()
  }

  const rafScroll = () => {
    const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const duration = 600
    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
    const startTime = performance.now()
    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutQuad(progress)
      const next = Math.max(0, Math.round(start * (1 - eased)))
      // Write to both roots to be robust across browsers
      document.documentElement.scrollTop = next
      document.body.scrollTop = next
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' is-visible' : ''}${lifted ? ' is-lifted' : ''}`}
      aria-label="Back to top"
      onClick={onClick}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}