import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import '../css/contact.css'
import { FiGithub, FiLinkedin, FiMail, FiX } from 'react-icons/fi'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ sending: false, success: null, error: null })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  // Position background white glows for desktop and mobile
  useEffect(() => {
    const applyGlows = () => {
      const el = document.getElementById('contact')
      if (!el) return
      const isMobile = window.matchMedia('(max-width: 800px)').matches
      if (isMobile) {
        // Stack glows vertically for small screens
        el.style.setProperty('--glow1x', '50%')
        el.style.setProperty('--glow1y', '24%')
        el.style.setProperty('--glow2x', '50%')
        el.style.setProperty('--glow2y', '76%')
      } else {
        // Desktop: top-left and bottom-right framing the form
        el.style.setProperty('--glow1x', '28%')
        el.style.setProperty('--glow1y', '24%')
        el.style.setProperty('--glow2x', '78%')
        el.style.setProperty('--glow2y', '68%')
      }
    }
    applyGlows()
    window.addEventListener('resize', applyGlows)
    return () => window.removeEventListener('resize', applyGlows)
  }, [])

  const emailRegex = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, [])
  const nameRegex = useMemo(() => /^[A-Za-z ]{2,50}$/ , [])
  const sanitize = (s) => s
    .replace(/[<>]/g, '')
    .replace(/\b(script|onerror|onload|javascript:|data:)/gi, '')

  const validateField = (field, value) => {
    const v = sanitize(value).trim()
    if (field === 'name') {
      if (!v) return 'Please enter a valid name.'
      if (!nameRegex.test(v)) return 'Please enter a valid name.'
      if (v.length < 2 || v.length > 50) return 'Please enter a valid name.'
      return ''
    }
    if (field === 'email') {
      if (!v) return 'Please enter a valid email address.'
      if (!emailRegex.test(v)) return 'Please enter a valid email address.'
      return ''
    }
    if (field === 'message') {
      if (!v) return 'Message must be between 10 and 1000 characters.'
      if (v.length < 10 || v.length > 1000) return 'Message must be between 10 and 1000 characters.'
      return ''
    }
    return ''
  }

  const validateAll = (data) => ({
    name: validateField('name', data.name),
    email: validateField('email', data.email),
    message: validateField('message', data.message),
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const onBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validate all fields before sending
    const nextErrors = validateAll(form)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })
    const hasErrors = Object.values(nextErrors).some(Boolean)
    if (hasErrors) { return }
    setStatus({ sending: true, success: null, error: null })

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      const toEmail = import.meta.env.VITE_CONTACT_TO_EMAIL || 'divlynx.inc@gmail.com'

      // Helper: open webmail compose in a new browser tab (Gmail/Outlook/Yahoo)
      const webmailFallback = () => {
        const subject = encodeURIComponent(`Website Contact – ${sanitize(form.name).trim()}`)
        const body = encodeURIComponent(
          `From: ${sanitize(form.name).trim()} <${sanitize(form.email).trim()}>
\n\n${sanitize(form.message).trim()}`
        )
        const userEmail = sanitize(form.email).trim().toLowerCase()
        let provider = 'gmail'
        if (userEmail.includes('outlook') || userEmail.endsWith('@hotmail.com') || userEmail.endsWith('@live.com')) {
          provider = 'outlook'
        } else if (userEmail.endsWith('@yahoo.com')) {
          provider = 'yahoo'
        }
        let url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${subject}&body=${body}&tf=1`
        if (provider === 'outlook') {
          url = `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(toEmail)}&subject=${subject}&body=${body}`
        } else if (provider === 'yahoo') {
          url = `https://compose.mail.yahoo.com/?to=${encodeURIComponent(toEmail)}&subject=${subject}&body=${body}`
        }
        window.open(url, '_blank', 'noopener,noreferrer')
        setStatus({ sending:false, success:'Opened your web mail in a new tab to send.', error:null })
      }

      if (!serviceId || !templateId || !publicKey) {
        // Attempt webmail compose so users can still reach us without env setup
        webmailFallback()
        return
      }

      const templateParams = {
        from_name: sanitize(form.name).trim(),
        reply_to: sanitize(form.email).trim(),
        message: sanitize(form.message).trim(),
        to_email: toEmail,
      }

      await emailjs.send(serviceId, templateId, templateParams, { publicKey })
      setStatus({ sending:false, success:'Thanks! Your message has been sent successfully.', error:null })
      setForm({ name:'', email:'', message:'' })
      setErrors({ name:'', email:'', message:'' })
      setTouched({ name:false, email:false, message:false })
    } catch (err) {
      setStatus({ sending:false, success:null, error: err?.message || 'Failed to send. Please try again later.' })
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h3 className="title-section contact-title">Let’s Build the Future of Intelligence Together.</h3>
          <p className="muted">Ready to innovate with AI? Let’s talk.</p>
        </motion.div>

        <div className="grid-2">
          <form className="contact-form glass-liquid panel" onSubmit={handleSubmit} noValidate>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Your full name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={50}
              pattern="^[A-Za-z ]{2,50}$"
              aria-invalid={Boolean(errors.name)}
              aria-describedby="name-error"
              className={errors.name && touched.name ? 'input-error' : ''}
            />
            {errors.name && touched.name && (
              <p id="name-error" className="error-text">{errors.name}</p>
            )}
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="name@company.com"
              autoComplete="email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              aria-invalid={Boolean(errors.email)}
              aria-describedby="email-error"
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && (
              <p id="email-error" className="error-text">{errors.email}</p>
            )}
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="Tell us about your project—goals, timeline, and scope."
              required
              minLength={10}
              maxLength={1000}
              aria-invalid={Boolean(errors.message)}
              aria-describedby="message-error"
              className={errors.message && touched.message ? 'input-error' : ''}
            />
            {errors.message && touched.message && (
              <p id="message-error" className="error-text">{errors.message}</p>
            )}
            <button type="submit" className="btn--hero" disabled={status.sending || Object.values(validateAll(form)).some(Boolean)}>
              {status.sending ? 'Sending…' : 'Send Message'}
            </button>
            {status.error && <p className="form-status error">{status.error}</p>}
            {status.success && <p className="form-status success">{status.success}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}