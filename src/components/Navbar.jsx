import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiLinkedin, FiMenu, FiMoreVertical, FiInstagram } from 'react-icons/fi'
import '../css/navbar.css'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Vision', href: '#vision' },
  { label: 'About', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  // Robust outside-click handler for mobile and desktop
  useEffect(() => {
    const handleOutside = (e) => {
      if (!open) return
      const panel = document.querySelector('.drawer__panel')
      const toggleBtn = document.querySelector('.navbar__toggle')
      // Ignore clicks/taps on the toggle button itself
      if (toggleBtn && toggleBtn.contains(e.target)) return
      // Close only if the event target is outside the panel
      if (panel && !panel.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handleOutside, { passive: true })
    document.addEventListener('touchstart', handleOutside, { passive: true })
    return () => {
      document.removeEventListener('click', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [open])
  const handleNavClick = (e, href) => {
    // Intercept default anchor to ensure smooth scroll and proper offset
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      // Update URL hash without reflowing
      history.replaceState(null, '', href)
      setOpen(false)
    }
  }
  return (
    <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="navbar glass-liquid">
      <div className="navbar__wrap">
        <a href="#top" className="navbar__brand" aria-label="Divlynx Home" onClick={(e)=>handleNavClick(e,'#top')}>
          <img src="/divlynx-logo.png" alt="Divlynx" className="navbar__logo" />
        </a>
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.href}><a href={item.href} className="navbar__link" onClick={(e)=>handleNavClick(e,item.href)}>{item.label}</a></li>
          ))}
        </ul>
        <div className="navbar__actions">
          <a href="https://www.linkedin.com/company/divlynx/" target="_blank" rel="noopener" className="btn--nav btn--linkedin" title="LinkedIn"><FiLinkedin /> <span className="hide-sm">LinkedIn</span></a>
          <a href="https://www.instagram.com/divlynxinc?igsh=bmN1Z2o1eDJvbDZh" target="_blank" rel="noopener" className="btn--nav btn--instagram" title="Instagram">
            <FiInstagram /> <span className="hide-sm">Instagram</span>
          </a>
        </div>
        <button className={`navbar__toggle${open ? ' is-open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={()=>setOpen((v)=>!v)}>
          <span className="toggle-lines" aria-hidden>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
        </button>
      </div>
      <div className={`navbar__drawer${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open} onClick={()=>setOpen(false)}>
        <aside className="drawer__panel" onClick={(e)=>e.stopPropagation()}>
          <ul className="drawer__menu">
            {navItems.filter((item)=>item.href !== '#vision').map((item) => (
              <li key={item.href}><a href={item.href} className="drawer__link" onClick={(e)=>handleNavClick(e,item.href)}>{item.label}</a></li>
            ))}
          </ul>
        </aside>
      </div>
    </motion.nav>
  )
}