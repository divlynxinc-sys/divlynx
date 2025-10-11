import { motion } from 'framer-motion'
import '../css/projects.css'
import ScrollHint from './ScrollHint'

// Minimal project entries: project name + tech used
const projects = [
  { project: 'After Realism — Website redesign', tech: ['Next.js', 'Nest.js', 'TailwindCSS', 'Shadcn'] },
  { project: 'Elclub — E‑commerce website', tech: ['React.js', 'Node.js', 'TailwindCSS'] },
  { project: 'MetaStore — Subscription website', tech: ['React.js', 'TailwindCSS'] },
  { project: 'Cricket Management App', tech: ['React.js','Node.js','Express','MongoDB','TailwindCSS'] },
  { project: 'Hotel Reception Voice Bot', tech: ['Python','NLP','TensorFlow','Rasa','Twilio'] },
  { project: 'End‑to‑End App Deployment', tech: ['AWS','Docker','Kubernetes','Terraform','GitHub Actions','CI/CD'] },
]

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container text-center">
        <h3 className="title-section mb-md">Our Work in Action</h3>
        <div className="grid-3">
          {projects.map((p, idx) => (
            <motion.div
              key={`${p.project}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="project-card glass-liquid"
            >
              <h4 className="project-card__title" style={{ marginBottom:'8px' }}>{p.project}</h4>
              <div className="tool-badges">
                {p.tech.map((t) => (
                  <span key={t} className="tool-badge">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Technology stack tiles */}
        <h4 className="stack-title mb-sm">Technology Stack</h4>
        <div className="tech-stack glass-liquid">
          <div className="stack-grid">
            {[
              'JavaScript','TypeScript','React','Next.js','Vue','Angular','Svelte',
              'Node.js','Express','Nest.js','Django','Flask','FastAPI','Ruby on Rails','Spring Boot','.NET',
              'Tailwind CSS','Shadcn','Bootstrap','Material UI','Chakra UI',
              'Vite','Webpack','Turbopack','Bun','pnpm',
              'PostgreSQL','MySQL','MongoDB','Redis','Prisma','GraphQL','Apollo','tRPC',
              'Docker','Kubernetes','AWS','Azure','GCP','Terraform','Ansible','GitHub Actions','CI/CD',
              'Stripe','Firebase','Supabase'
            ].map((tech) => (
              <span key={tech} className="tech-tile">{tech}</span>
            ))}
          </div>
        </div>
      </div>
      <ScrollHint target="#team" ariaLabel="Scroll to team" className="scroll-hint--below" />
    </section>
  )
}
