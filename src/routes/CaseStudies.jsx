import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { EMAIL } from "../site";
import "../css/case-studies.css";

/**
 * One case study per service line in Services.jsx, so a visitor who recognises
 * their own problem can see what that engagement actually looked like.
 *
 * Outcomes are deliberately qualitative. Do not add percentages or revenue
 * figures here until a client has signed them off in writing — the two entries
 * marked TEMPLATE below are patterns, not delivered projects, and should be
 * replaced with a real engagement or removed before they go in front of buyers.
 */
const CASES = [
  {
    featured: true,
    service: "AI voice agents",
    client: "Hospitality group",
    region: "Pakistan",
    title: "A reception line that never rings out",
    challenge:
      "Reception was answering booking calls in the middle of check-in. Callers waited, hung up, and booked somewhere else — and nobody could say how many.",
    built: [
      "Voice agent on the main reservation line, answering on the first ring",
      "Handles availability, rates and booking changes end to end",
      "Trained on regional accents and code-switching between Urdu and English",
      "Hands off to a human the moment a caller asks, with full context",
      "Every call transcribed and summarised into the reservation system",
    ],
    outcome: [
      "Calls answered around the clock, including the check-in rush",
      "Front desk back on the desk instead of on the phone",
      "A written record of every enquiry, not just the ones that converted",
    ],
    stack: ["Python", "Rasa", "Twilio", "NLP"],
  },
  {
    service: "AI automation",
    client: "Professional services firm",
    region: "Pakistan",
    title: "Enquiry triage and first-draft quoting", // TEMPLATE — confirm or replace
    challenge:
      "Every enquiry landed in a shared inbox and was read three times before anyone could price it. Simple jobs waited behind complicated ones.",
    built: [
      "Agent reads each enquiry, classifies it and pulls the matching rate card",
      "RAG over past proposals so the draft sounds like the firm, not like a bot",
      "Draft quote queued for a human to approve, edit or reject",
      "Cost caps and full logging on every model call",
    ],
    outcome: [
      "Quotes drafted the same hour instead of the same week",
      "Nothing leaves the building without a person approving it",
      "Pricing decisions traceable back to a source document",
    ],
    stack: ["Python", "OpenAI", "Postgres", "Retrieval"],
  },
  {
    service: "n8n & workflow engineering",
    client: "Operations team",
    region: "Pakistan",
    title: "Six tools that finally talk to each other", // TEMPLATE — confirm or replace
    challenge:
      "CRM, billing, support desk and spreadsheets each held part of the truth. Reconciling them was somebody's Friday.",
    built: [
      "Self-hosted n8n wiring the systems together, owned by the client",
      "Retries, dead-letter handling and alerting on every failed run",
      "Written runbook so the team can change a flow without calling us",
    ],
    outcome: [
      "Manual reconciliation dropped out of the weekly routine",
      "Failures surface as alerts instead of as month-end surprises",
      "The workflows stay with the client — no vendor lock-in",
    ],
    stack: ["n8n", "Node.js", "Docker", "Webhooks"],
  },
  {
    service: "Web design & development",
    client: "After Realism",
    region: "Australia",
    title: "A marketing site the team can edit alone",
    challenge:
      "The old site needed a developer for every copy change, so it slowly stopped reflecting what the business did.",
    built: [
      "Full redesign and rebuild on a headless stack",
      "Editable content model the marketing team runs without us",
      "Performance and accessibility budgets enforced at build time",
    ],
    outcome: [
      "Copy and page changes ship without a developer in the loop",
      "Fast loads on the mobile connections most of their traffic uses",
    ],
    stack: ["Next.js", "Nest.js", "Tailwind", "shadcn/ui"],
    quote: "One of the best working experiences — kudos to Divlynx.",
  },
  {
    service: "Full-stack development",
    client: "El Club",
    region: "USA",
    title: "A storefront built for campaign spikes",
    challenge:
      "Traffic arrived in bursts behind marketing pushes, and the previous setup slowed down exactly when it mattered.",
    built: [
      "Catalogue, cart and checkout rebuilt from the ground up",
      "Caching and load paths sized for burst traffic, not average traffic",
      "Order flow instrumented so drop-off is visible per step",
    ],
    outcome: [
      "Checkout holds up during campaign peaks",
      "The team can see where customers abandon and act on it",
    ],
    stack: ["React", "Node.js", "Tailwind"],
    quote: "We enjoyed working with Divlynx and will likely have additional jobs for them.",
  },
  {
    service: "Product & subscriptions",
    client: "MetaStore",
    region: "Pakistan",
    title: "Self-serve billing, minus the support tickets",
    challenge:
      "Plan changes, failed payments and cancellations all came through support because customers had nowhere to do them.",
    built: [
      "Subscription platform with plan management and billing states",
      "Self-serve account area for upgrades, downgrades and cancellations",
      "Dunning and payment-failure handling wired into Stripe",
    ],
    outcome: [
      "Routine billing changes handled by customers themselves",
      "Failed payments recovered automatically instead of manually",
    ],
    stack: ["React", "Tailwind", "Stripe"],
    quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.",
  },
  {
    service: "Mobile apps",
    client: "Regional cricket league",
    region: "Pakistan",
    title: "Fixtures, live scoring and squads in one app",
    challenge:
      "Scores lived in group chats and squad sheets lived in spreadsheets, so nobody trusted either by the end of a season.",
    built: [
      "Live scoring with offline capture for grounds with poor signal",
      "Fixture and squad management shared across web and mobile",
      "One codebase shipped to both app stores",
    ],
    outcome: [
      "One source of truth for a whole season of results",
      "Scorers can work through a dead patch of signal and sync later",
    ],
    stack: ["React", "Express", "MongoDB"],
  },
  {
    service: "Cloud, data & DevOps",
    client: "Divlynx platform",
    region: "Global",
    title: "Releases that stopped being an event",
    challenge:
      "Deployments were scheduled for quiet hours because a bad release meant downtime and a manual rollback.",
    built: [
      "Containerised delivery with infrastructure as code",
      "Zero-downtime rollouts and automated rollback on failed health checks",
      "Monitoring that pages an engineer before customers notice",
    ],
    outcome: [
      "Deploys during working hours, not at midnight",
      "Bad releases roll back on their own",
    ],
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
];

function CaseCard({ item, index }) {
  return (
    <motion.article
      className={`case${item.featured ? " case--featured" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}>
      <header className="case__head">
        <p className="case__service">{item.service}</p>
        <h2 className="case__title">{item.title}</h2>
        <p className="case__client">
          {item.client} · {item.region}
        </p>
      </header>

      <div className="case__body">
        <p className="case__challenge">{item.challenge}</p>

        <div className="case__blocks">
          <div className="case__block">
            <h3 className="case__block-title">What we built</h3>
            <ul className="case__list">
              {item.built.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="case__block">
            <h3 className="case__block-title">Outcome</h3>
            <ul className="case__list case__list--out">
              {item.outcome.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        {item.quote && <blockquote className="case__quote">{item.quote}</blockquote>}

        <ul className="case__stack">
          {item.stack.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function CaseStudies() {
  return (
    <section className="band cases">
      <div className="shell">
        <header className="cases__head">
          <p className="eyebrow">Case studies</p>
          <h1 className="display h1">
            What the work <span className="sweep">actually looked like</span>.
          </h1>
          <p className="lede cases__lede">
            One per service line — the problem we were handed, what we built, and what changed
            afterwards.
          </p>
        </header>

        <div className="cases__grid">
          {CASES.map((item, i) => (
            <CaseCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <aside className="cases__cta">
          <div>
            <h2 className="display cases__cta-title">Recognise your own problem in one of these?</h2>
            <p className="cases__cta-sub">
              Tell us what is breaking and we will tell you honestly whether it is worth building.
            </p>
          </div>
          <div className="cases__cta-actions">
            <Link to="/#contact" className="btn btn--primary">
              Start a project <FiArrowUpRight aria-hidden />
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn btn--ghost">
              {EMAIL}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
