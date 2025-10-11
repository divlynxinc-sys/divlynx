import { FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi'
import '../css/footer.css'

export default function Footer(){
  const toEmail = import.meta.env.VITE_CONTACT_TO_EMAIL || 'divlynx.inc@gmail.com'
  const defaultWebmail = (import.meta.env.VITE_DEFAULT_WEBMAIL || 'gmail').toLowerCase()
  const composeUrl = (() => {
    const subject = encodeURIComponent('Hello from DivLynx website')
    const body = ''
    if (defaultWebmail === 'outlook') {
      return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(toEmail)}&subject=${subject}&body=${body}`
    }
    if (defaultWebmail === 'yahoo') {
      return `https://compose.mail.yahoo.com/?to=${encodeURIComponent(toEmail)}&subject=${subject}&body=${body}`
    }
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(toEmail)}&su=${subject}&body=${body}&tf=1`
  })()
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-2.svg" alt="Divlynx" className="footer-logo" />
          <div className="footer-name title">Divlynx Inc</div>
        </div>
        <div className="footer-center muted">© 2023 · All rights reserved</div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/company/divlynx/" target="_blank" rel="noopener" aria-label="LinkedIn" className="footer-social--linkedin"><FiLinkedin /></a>
          <a href="https://www.instagram.com/divlynxinc?igsh=bmN1Z2o1eDJvbDZh" target="_blank" rel="noopener" aria-label="Instagram" className="footer-social--instagram"><FiInstagram /></a>
          <a href={composeUrl} target="_blank" rel="noopener" aria-label="Email" className="footer-social--email footer-email-pill"><FiMail /> <span className="footer-email-text">{toEmail}</span></a>
        </div>
      </div>
    </footer>
  )
}