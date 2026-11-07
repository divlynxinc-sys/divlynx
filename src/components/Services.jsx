import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
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
  FiPlus,
  FiCheck,
} from "../icons.jsx";
import { isAutoScrolling } from "../site";
import "../css/services.css";
import Scribble from "./Scribble";

const GROUPS = [
  {
    name: "Automate",
    note: "Agents and workflows that take repeat work off your team.",
    items: [
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
    ],
  },
  {
    name: "Build",
    note: "The products and platforms those agents plug into.",
    items: [
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
    ],
  },
  {
    name: "Grow",
    note: "Getting the right people to what you built.",
    items: [
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
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items.map((item) => ({ ...item, group: g.name })));

const TICK = "M3 12.5 C 5 14.5, 7 16.5, 8.5 19 C 11.5 12, 15.5 6.5, 21 2.5";
const CIRCLE = "M30 6 C 16 4, 5 13, 6 28 C 7 42, 20 52, 33 50 C 46 48, 54 37, 51 23 C 49 12, 40 5, 26 7";
const UNDERLINE = "M3 9 C 50 4, 120 3, 197 8";

/* The open page of the service sketchbook */
function Detail({ item }) {
  const Icon = item.icon;
  return (
    <>
      <div className="svc-detail__top">
        <span className="svc-detail__icon">
          <svg className="svc-detail__ring" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
            <path d={CIRCLE} pathLength="1" />
          </svg>
          <Icon aria-hidden />
        </span>
        <span className="svc-detail__group">{item.group}</span>
      </div>
      <h3 className="svc-detail__title">
        <span>{item.title}</span>
        <svg className="svc-detail__underline" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d={UNDERLINE} pathLength="1" />
        </svg>
      </h3>
      <p className="svc-detail__blurb">{item.blurb}</p>
      <ul className="svc-detail__points">
        {item.points.map((p, i) => (
          <li key={p} style={{ "--i": i }}>
            <svg className="svc-detail__check" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <rect x="2.5" y="4.5" width="15" height="15" rx="2.5" />
              <path d={TICK} pathLength="1" />
            </svg>
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

/* Spiral binding across the top of the page */
function Binding() {
  return (
    <span className="svc-detail__binding" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => <i key={i} />)}
    </span>
  );
}

export default function Services() {
  const [active, setActive] = useState(ALL[0].title);
  const current = ALL.find((s) => s.title === active) ?? ALL[0];

  return (
    <section id="services" className="band svc">
      <span className="glow" style={{ "--size": "640px", right: "-160px", top: "34%", "--drift": "20s" }} aria-hidden="true" />
      <div className="shell">
        <header className="sec-head">
          <h2 className="display h2 reveal">
            One studio for the <Scribble variant="underline">automation</Scribble> and the software it runs on.
          </h2>
          <p className="lede reveal" style={{ "--reveal-delay": "80ms" }}>
            Most teams end up with an AI vendor, a web agency and an app shop that never talk to
            each other. We do all three, so the pieces fit.
          </p>
        </header>

        <div className="svc__layout">
          <div className="svc__index">
            {GROUPS.map((group) => (
              <div key={group.name} className="svc__group reveal">
                <div className="svc__group-head">
                  <h3 className="svc__group-name">{group.name}</h3>
                  <p className="svc__group-note">{group.note}</p>
                </div>
                <ul className="svc__list">
                  {group.items.map((item) => {
                    const isActive = item.title === active;
                    const panelId = `svc-panel-${item.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                    return (
                      <li key={item.title} className={`svc__row${isActive ? " is-active" : ""}`}>
                        <button
                          type="button"
                          className="svc__btn"
                          aria-expanded={isActive}
                          aria-controls={panelId}
                          onClick={() => setActive(item.title)}
                          onPointerEnter={(e) => {
                            // Hover previews on mouse only; touch relies on the tap. Skipped while a
                            // nav link is scrolling the page, so the passing cursor does not
                            // reshuffle the layout under the scroll.
                            if (
                              e.pointerType === "mouse" &&
                              !isAutoScrolling() &&
                              window.matchMedia("(min-width: 901px)").matches
                            ) {
                              setActive(item.title);
                            }
                          }}>
                          {isActive && (
                            <motion.span
                              className="svc__pill"
                              layoutId="svc-pill"
                              transition={{ type: "spring", stiffness: 420, damping: 38 }}
                            />
                          )}
                          <span className="svc__name">{item.title}</span>
                          <FiPlus className="svc__plus" aria-hidden />
                        </button>

                        {/* Inline panel: shown only on narrow screens */}
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              id={panelId}
                              className="svc__inline"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                              <div className="svc__inline-body">
                                <p className="svc-detail__blurb">{item.blurb}</p>
                                <ul className="svc-detail__points">
                                  {item.points.map((p) => (
                                    <li key={p}><FiCheck aria-hidden /> {p}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <aside className="svc-detail" aria-live="polite">
            <Binding />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.title}
                className="svc-detail__inner"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <Detail item={current} />
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
