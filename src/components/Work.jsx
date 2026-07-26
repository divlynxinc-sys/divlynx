import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/work.css";

/* Descriptions stay factual — swap in real numbers once you have them signed off. */
const PROJECTS = [
  {
    client: "After Realism",
    title: "Website redesign and rebuild",
    kind: "Web",
    region: "Australia",
    note: "A full rebuild of the marketing site on a headless stack the team can edit without us.",
    tech: ["Next.js", "Nest.js", "Tailwind", "shadcn/ui"],
  },
  {
    client: "El Club",
    title: "E-commerce storefront",
    kind: "Commerce",
    region: "USA",
    note: "Catalogue, cart and checkout built to survive campaign traffic spikes.",
    tech: ["React", "Node.js", "Tailwind"],
  },
  {
    client: "MetaStore",
    title: "Subscription platform",
    kind: "Product",
    region: "Pakistan",
    note: "Plan management, billing states and a self-serve account area.",
    tech: ["React", "Tailwind", "Stripe"],
  },
  {
    client: "Hospitality group",
    title: "Hotel reception voice agent",
    kind: "Voice AI",
    region: "Pakistan",
    note: "Takes reservation calls around the clock, understands accents and escalates to a human on request.",
    tech: ["Python", "Rasa", "Twilio", "NLP"],
  },
  {
    client: "Regional league",
    title: "Cricket management app",
    kind: "Mobile",
    region: "Pakistan",
    note: "Fixtures, live scoring and squad management across web and mobile.",
    tech: ["React", "Express", "MongoDB"],
  },
  {
    client: "Internal",
    title: "Zero-downtime deployment pipeline",
    kind: "Platform",
    region: "Global",
    note: "Containerised delivery with infrastructure as code and automated rollbacks.",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
];

const QUOTES = [
  {
    quote: "One of the best working experiences — kudos to Divlynx.",
    author: "After Realism",
    place: "Australia",
    date: "Nov 2024",
  },
  {
    quote: "We enjoyed working with Divlynx and will likely have additional jobs for them.",
    author: "El Club",
    place: "USA",
    date: "Mar 2024",
  },
  {
    quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.",
    author: "MetaStore",
    place: "Pakistan",
    date: "Nov 2023",
  },
];

export default function Work() {
  return (
    <section id="work" className="band">
      <div className="shell">
        <div className="work__head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="display h2">
              Shipped, live, and <span className="sweep">still running</span>.
            </h2>
          </div>
          <Link to="/case-studies" className="btn btn--ghost work__cta">
            Read the case studies <FiArrowUpRight aria-hidden />
          </Link>
        </div>

        <ul className="work__list">
          {PROJECTS.map((p, i) => (
            <motion.li
              key={p.title}
              className="work__row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <span className="work__index">{String(i + 1).padStart(2, "0")}</span>

              <div className="work__main">
                <h3 className="work__title">{p.title}</h3>
                <p className="work__note">{p.note}</p>
                <ul className="work__tech">
                  {p.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="work__meta">
                <span className="work__client">{p.client}</span>
                <span className="work__kind">
                  {p.kind} · {p.region}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="work__quotes">
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.author}
              className="quote"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <span className="quote__mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="quote__text">{q.quote}</blockquote>
              <figcaption className="quote__by">
                <span className="quote__author">{q.author}</span>
                <span className="quote__place">
                  {q.place} · {q.date}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
