import React from 'react'

export default function ScrollHint({ target, ariaLabel = 'Scroll to next section', className = '' }) {
  const onClick = (e) => {
    e.preventDefault()
    if (!target) return
    const el = document.querySelector(target)
    if (el) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      try { history.replaceState(null, '', target) } catch {}
    }
  }
  return (
    <a
      href={target || '#'}
      className={`scroll-hint scroll-hint--circle ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg className="scroll-hint__arrow" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}