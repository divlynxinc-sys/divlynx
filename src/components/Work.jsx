import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/work.css";

/* Descriptions stay factual, swap in real numbers once you have them signed off. */
const PROJECTS = [
  {
    client: "Sincere Capital",
    title: "Real-estate listings platform",
    kind: "Web",
    region: "Netherlands",
    note: "A live real-estate website that brings listings, brokerage services and enquiries into one clear customer journey.",
    tech: ["Property listings", "Lead capture", "Responsive UI"],
    href: "https://www.sincere-estate.nl/",
  },
  {
    client: "JobSynk AI",
    title: "AI resume and job application platform",
    kind: "Product",
    region: "Global",
    note: "A live workspace that tailors resumes to job descriptions, checks ATS readability, and drafts the application content around each role.",
    tech: ["AI resume builder", "ATS checker", "Job tailoring"],
    href: "https://jobsynk.co/",
  },
  {
    client: "Range Fit Gym",
    title: "Fitness membership platform",
    kind: "Product",
    region: "Pakistan",
    note: "A responsive gym platform combining membership plans, trainer profiles, account access, and facility information in one customer journey.",
    tech: ["Next.js", "Memberships", "Authentication", "Responsive UI"],
    href: "https://range-fit-gym.vercel.app/",
  },
  {
    client: "After Realism",
    title: "Geospatial consultancy platform",
    kind: "Web",
    region: "Australia",
    note: "A live consultancy website presenting interactive maps, spatial data products, AI solutions, and cloud engineering work.",
    tech: ["SvelteKit", "AWS", "PostGIS", "Three.js"],
    href: "https://afterrealism.com/",
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
    title: "Digital subscriptions marketplace",
    kind: "Commerce",
    region: "Pakistan",
    note: "A storefront for entertainment subscriptions, productivity tools, software keys, and digital services.",
    tech: ["E-commerce", "Product catalogue", "Subscriptions"],
    href: "https://metastore.pk/",
  },
  {
    client: "JeeUstaad",
    title: "Verified local-services marketplace",
    kind: "Marketplace",
    region: "Pakistan",
    note: "A task marketplace connecting customers with ID-verified workers, protected by escrow payments, reviews, and human dispute resolution.",
    tech: ["Marketplace", "Escrow", "Worker verification", "Android"],
    href: "https://jeeustaad.com/",
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

// The landing page is deliberately limited to work visitors can open and
// verify today. Archived and private engagements remain in the full case-study
// view, where there is enough room to explain them properly.
const LIVE_PROJECTS = PROJECTS.filter((project) => Boolean(project.href));

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
            View all work <FiArrowUpRight aria-hidden />
          </Link>
        </div>

        <ul className="work__list">
          {LIVE_PROJECTS.map((p, i) => (
            <motion.li
              key={p.title}
              className="work__row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <span className="work__index">{String(i + 1).padStart(2, "0")}</span>

              <div className="work__main">
                <h3 className="work__title">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {p.title} <FiArrowUpRight aria-hidden />
                    </a>
                  ) : p.title}
                </h3>
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

      </div>
    </section>
  );
}
