import { motion } from 'framer-motion'
import '../css/services.css'
import ScrollHint from './ScrollHint'
import { FiCloud, FiDatabase, FiCpu, FiSmartphone, FiGitBranch, FiMessageCircle, FiSearch, FiLayers, FiCode, FiUpload, FiTrendingUp } from 'react-icons/fi'

const services = [
  { icon: FiCpu, title: 'AI & Machine Learning', desc: 'Models that learn and optimize with real-world data.' },
  { icon: FiMessageCircle, title: 'LLMs & NLP', desc: 'Language intelligence for chat, summarization, and automation.' },
  { icon: FiSmartphone, title: 'Web & Mobile Development', desc: 'High-performance apps with modern UX and secure APIs.' },
  { icon: FiGitBranch, title: 'MLOps & DevOps', desc: 'CI/CD pipelines, model deployment and observability.' },
  { icon: FiCloud, title: 'Cloud Infrastructure & Automation', desc: 'Scalable infra, IaC and cost-optimized environments.' },
  { icon: FiDatabase, title: 'Data Engineering & Insights', desc: 'Pipelines, warehousing and decision-ready analytics.' },
]

export default function Services() {
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/'
  const handleProposalClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#contact')
    if (target) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
      history.replaceState(null, '', '#contact')
    }
  }
  return (
    <section id="services" className="section services-section">
      <div className="container text-center">
        <h3 className="title-section mb-lg">Our Services</h3>
        {/*<p className="services-subtitle" style={{ textAlign:'center', marginBottom:'24px' }}>We provide expert solutions.</p>*/}
        <div className="grid-3">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
          className="service-card glass-liquid"
        >
          <s.icon className="feature-icon" />
          <h4>{s.title}</h4>
          <p className="muted">{s.desc}</p>
          <a href="#contact" className="btn--hero" aria-label="Tell us about your project" onClick={handleProposalClick}>Tell us about your project</a>
          <a href={calendlyUrl} target="_blank" rel="noopener" className="btn--hero" aria-label="Book a meeting on Calendly" style={{ marginTop: '8px' }}>Book a Meeting</a>
        </motion.div>
      ))}
    </div>
        {/* Subheading for process */}
        <h4 className="services-subheading">User Journey</h4>

        {/* Process timeline */}
        <div className="services-process">
          <div className="process-step glass-liquid"><FiSearch className="process-icon" /> <span>Discover</span></div>
          <div className="process-step glass-liquid"><FiLayers className="process-icon" /> <span>Design</span></div>
          <div className="process-step glass-liquid"><FiCode className="process-icon" /> <span>Build</span></div>
          <div className="process-step glass-liquid"><FiUpload className="process-icon" /> <span>Deploy</span></div>
          <div className="process-step glass-liquid"><FiTrendingUp className="process-icon" /> <span>Optimize</span></div>
        </div>

        {/* FAQs */}
        <div className="services-faq">
          <details className="faq-item glass-liquid">
            <summary>How fast can we start?</summary>
            <p className="muted">Discovery begins within 3–5 business days. Initial deliverables in 2 weeks.</p>
          </details>
          <details className="faq-item glass-liquid">
            <summary>What engagement models do you offer?</summary>
            <p className="muted">Fixed‑scope projects, monthly retainers, or dedicated teams based on outcomes.</p>
          </details>
          <details className="faq-item glass-liquid">
            <summary>Do you provide handover and documentation?</summary>
            <p className="muted">Yes—runbooks, infra docs, and component handover with training are included.</p>
          </details>
        </div>
      </div>
      <ScrollHint target="#projects" ariaLabel="Scroll to projects" className="scroll-hint--below" />
    </section>
  )
}