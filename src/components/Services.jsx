import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCpu,
  FiPhoneCall,
  FiGitMerge,
  FiLayers,
  FiSmartphone,
  FiMonitor,
  FiServer,
  FiBox,
  FiCreditCard,
  FiSearch,
  FiTrendingUp,
} from "react-icons/fi";
import useMediaQuery from "../hooks/useMediaQuery";
import "../css/services.css";

const SERVICES = [
  {
    icon: FiCpu,
    title: "AI automation",
    blurb:
      "The work your team keeps redoing, quoting, triage, data entry, reporting, handed to agents that do it the same way every time.",
    points: [
      "Agentic workflows with tool access",
      "RAG over your own documents",
      "Human approval where it matters",
      "Guardrails, logging and cost caps",
    ],
  },
  {
    icon: FiPhoneCall,
    title: "AI voice agents",
    blurb:
      "Phone agents that answer on the first ring, qualify the caller and put the meeting straight into your calendar.",
    points: ["Inbound and outbound calls", "CRM and calendar integration", "Transcripts and summaries", "Human handoff with context"],
  },
  {
    icon: FiGitMerge,
    title: "n8n & workflow engineering",
    blurb: "Your tools wired together and documented. Self-hosted or cloud, yours to keep.",
    points: ["Multi-system integrations", "Retries and failure alerts", "Self-hosted or n8n Cloud", "Runbooks and handover"],
  },
  {
    icon: FiLayers,
    title: "Full-stack development",
    blurb: "APIs, dashboards and platforms that hold up once real traffic shows up.",
    points: ["Product architecture", "APIs and integrations", "Admin and customer portals", "Testing and observability"],
  },
  {
    icon: FiSmartphone,
    title: "Mobile apps",
    blurb: "iOS and Android from one codebase, taken all the way through store review.",
    points: ["Cross-platform delivery", "Offline-ready workflows", "Push notifications", "App Store and Play submission"],
  },
  {
    icon: FiMonitor,
    title: "Web design & development",
    blurb:
      "Marketing sites and product UI that load fast, read clearly and give people an obvious next step.",
    points: ["UX and interface design", "Responsive development", "CMS and content modelling", "Performance and accessibility"],
  },
  {
    icon: FiServer,
    title: "Cloud, data & DevOps",
    blurb:
      "Pipelines, infrastructure and monitoring set up so releases are boring and outages page someone before customers notice.",
    points: ["Cloud architecture", "CI/CD and infrastructure as code", "Monitoring and alerting", "Backups and recovery"],
  },
  {
    icon: FiBox,
    title: "Game development",
    blurb: "Interactive games and real-time experiences built from prototype through production release.",
    points: ["Unreal Engine development", "Unity game development", "Gameplay systems and UI", "Performance optimisation"],
  },
  {
    icon: FiCreditCard,
    title: "POS systems",
    blurb: "Reliable point-of-sale platforms that connect checkout, inventory, customers and reporting.",
    points: ["Sales and payment workflows", "Inventory management", "Receipts and reporting", "Multi-location operations"],
  },
  {
    icon: FiSearch,
    title: "SEO",
    blurb: "Technical and content-led search optimisation designed around qualified traffic and measurable growth.",
    points: ["Technical SEO audits", "Keyword and content strategy", "On-page optimisation", "Performance and reporting"],
  },
  {
    icon: FiTrendingUp,
    title: "Digital advertising",
    blurb: "Paid campaigns planned, launched and improved around the actions that matter to your business.",
    points: ["Meta ads", "Google search and display", "Creative testing", "Conversion tracking and optimisation"],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const move = (direction) => {
    setActive((current) => (current + direction + SERVICES.length) % SERVICES.length);
  };

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => move(1), 5000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const offsetFor = (index) => {
    let offset = index - active;
    const half = Math.floor(SERVICES.length / 2);
    if (offset > half) offset -= SERVICES.length;
    if (offset < -half) offset += SERVICES.length;
    return offset;
  };

  return (
    <section id="services" className="band">
      <div className="shell">
        <div className="svc__head">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="display h2">
              One studio for the <span className="sweep">automation</span> and the software it
              runs on.
            </h2>
          </div>
          <p className="lede svc__head-note">
            Most teams end up with an AI vendor, a web agency and an app shop that never talk to
            each other. We do all three, so the pieces fit.
          </p>
        </div>

        <div
          className="svc__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Services"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") move(-1);
            if (event.key === "ArrowRight") move(1);
          }}>
          <motion.div
            className="svc__stage"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50 || info.velocity.x < -500) move(1);
              if (info.offset.x > 50 || info.velocity.x > 500) move(-1);
            }}>
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            const offset = offsetFor(i);
            const distance = Math.abs(offset);
            return (
              <motion.article
                key={s.title}
                className={`svc${offset === 0 ? " is-active" : ""}${distance > 2 ? " is-hidden" : ""}`}
                style={{ "--card-x": `${offset * 82}%`, "--card-scale": 1 - Math.min(distance, 2) * 0.1, zIndex: 10 - distance }}
                aria-hidden={offset !== 0}
                animate={{ opacity: distance > 2 ? 0 : 1 - distance * 0.12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                <header className="svc__card-head">
                  <span className="svc__icon"><Icon aria-hidden /></span>
                  <span className="svc__number">{String(i + 1).padStart(2, "0")} / Service</span>
                </header>
                <div className="svc__content">
                  <h3 className="h3 svc__title">{s.title}</h3>
                  <p className="svc__blurb">{s.blurb}</p>
                  <p className="svc__includes">What is included</p>
                  <ul className="svc__points">
                    {s.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <footer className="svc__card-foot">
                  <span>End-to-end delivery</span>
                  <span>{String(i + 1).padStart(2, "0")}/{String(SERVICES.length).padStart(2, "0")}</span>
                </footer>
              </motion.article>
            );
          })}
          </motion.div>

          <button type="button" className="svc__arrow svc__arrow--prev" onClick={() => move(-1)} aria-label="Previous service">
            <FiChevronLeft aria-hidden />
          </button>
          <button type="button" className="svc__arrow svc__arrow--next" onClick={() => move(1)} aria-label="Next service">
            <FiChevronRight aria-hidden />
          </button>

          <div className="svc__nav" aria-label="Choose a service">
            {SERVICES.map((service, index) => (
              <button key={service.title} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${service.title}`} aria-current={index === active ? "true" : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
