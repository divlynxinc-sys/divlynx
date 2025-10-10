import { motion } from 'framer-motion'
import '../css/features.css'
import { FiCpu, FiTrendingUp, FiGitMerge, FiLayers, FiAperture, FiZap, FiUsers, FiHeart } from 'react-icons/fi'

const features = [
  {
    icon: FiCpu,
    title: 'Real-Time Intelligence',
    desc: 'Access accurate, real-time data to drive smarter decisions.',
  },
  {
    icon: FiTrendingUp,
    title: 'Measurable Impact',
    desc: 'Track performance, uncover insights, and achieve data-backed growth.',
  },
  {
    icon: FiGitMerge,
    title: 'Seamless Integration',
    desc: 'Connect tools, teams, and workflows through intelligent automation.',
  },
  // Added value points
  { icon: FiLayers, title: 'End‑to‑End Tech Expertise', desc: 'From concept to deployment — web, app, and AI‑automation built to work together.' },
  { icon: FiAperture, title: 'Innovation‑First Approach', desc: 'Future‑ready solutions focused on scalability, performance, and emerging tech.' },
  { icon: FiZap, title: 'Faster Execution, Smarter Results', desc: 'Agile workflows and automation deliver speed without sacrificing quality.' },
  { icon: FiUsers, title: 'Transparent Partnership', desc: 'Clear communication, real‑time updates, and full visibility at every step.' },
  { icon: FiHeart, title: 'Driven by Passion, Backed by Talent', desc: 'Creators and engineers combining design, strategy, and deep technical expertise.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section features-section">
      {/* Decorative white ring lights behind cards */}
      <div className="features-rings" aria-hidden="true">
        <span className="ring ring--tr" />
        <span className="ring ring--bl" />
        <span className="ring ring--br" />
      </div>
      <div className="container text-center">
        <h3 className="title-section">Why Choose Us?</h3>
        <p className="muted mb-md">Everything you need to automate, optimize, and scale.</p>
        <div className="grid-4">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="feature-card glass-liquid"
            >
              {f.icon ? <f.icon className="feature-icon" /> : <span className="feature-emoji" aria-hidden="true">{f.emoji}</span>}
              <h4>{f.title}</h4>
              <p className="muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}