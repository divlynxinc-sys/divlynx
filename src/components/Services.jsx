import { motion } from "framer-motion";
import {
  FiCpu,
  FiPhoneCall,
  FiGitMerge,
  FiLayers,
  FiSmartphone,
  FiMonitor,
  FiServer,
} from "react-icons/fi";
import "../css/services.css";

const SERVICES = [
  {
    size: "lead",
    icon: FiCpu,
    title: "AI automation",
    blurb:
      "The work your team keeps redoing — quoting, triage, data entry, reporting — handed to agents that do it the same way every time.",
    points: [
      "Agentic workflows with tool access",
      "RAG over your own documents",
      "Human approval where it matters",
      "Guardrails, logging and cost caps",
    ],
  },
  {
    size: "tall",
    icon: FiPhoneCall,
    title: "AI voice agents",
    blurb:
      "Phone agents that answer on the first ring, qualify the caller and put the meeting straight into your calendar.",
    points: ["Inbound and outbound", "CRM + calendar wired in", "Transcripts and summaries"],
  },
  {
    size: "half",
    icon: FiGitMerge,
    title: "n8n & workflow engineering",
    blurb: "Your tools wired together and documented. Self-hosted or cloud, yours to keep.",
  },
  {
    size: "half",
    icon: FiLayers,
    title: "Full-stack development",
    blurb: "APIs, dashboards and platforms that hold up once real traffic shows up.",
  },
  {
    size: "half",
    icon: FiSmartphone,
    title: "Mobile apps",
    blurb: "iOS and Android from one codebase, taken all the way through store review.",
  },
  {
    size: "wide",
    icon: FiMonitor,
    title: "Web design & development",
    blurb:
      "Marketing sites and product UI that load fast, read clearly and give people an obvious next step.",
  },
  {
    size: "wide",
    icon: FiServer,
    title: "Cloud, data & DevOps",
    blurb:
      "Pipelines, infrastructure and monitoring set up so releases are boring and outages page someone before customers notice.",
  },
];

export default function Services() {
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

        <div className="svc__bento">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                className={`svc svc--${s.size}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <span className="svc__icon">
                  <Icon aria-hidden />
                </span>
                <h3 className="h3 svc__title">{s.title}</h3>
                <p className="svc__blurb">{s.blurb}</p>
                {s.points && (
                  <ul className="svc__points">
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
