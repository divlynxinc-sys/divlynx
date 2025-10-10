import { FiGithub, FiLinkedin, FiMail, FiX, FiInstagram } from 'react-icons/fi'
import '../css/footer.css'

export default function Footer(){
  return (
    <footer className="footer-section">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-2.svg" alt="Divlynx" className="footer-logo" />
          <div className="footer-name title">Divlynx Inc</div>
        </div>
        <div className="footer-center muted">© 2023 · All rights reserved</div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/company/divlynx/" target="_blank" rel="noopener" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="https://www.instagram.com/divlynxinc?igsh=bmN1Z2o1eDJvbDZh" target="_blank" rel="noopener" aria-label="Instagram"><FiInstagram /></a>
          <a href="https://x.com/" target="_blank" rel="noopener" aria-label="X"><FiX /></a>
          <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub"><FiGithub /></a>
          <a href="mailto:hello@divlynx.ai" aria-label="Email"><FiMail /></a>
        </div>
      </div>
    </footer>
  )
}