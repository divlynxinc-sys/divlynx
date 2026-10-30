import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { EMAIL } from "../site";
import "../css/case-studies.css";

/** Live client projects only. Outcomes remain qualitative until a client has
 * approved measurable commercial results for publication. */
const CASES = [
  {
    featured: true,
    service: "Web design & development",
    client: "Sincere Capital",
    region: "Netherlands",
    title: "A live property platform built around the listing",
    challenge:
      "Sincere Estate needed one credible digital home for its property inventory and full-service brokerage offer, with a direct path from browsing to enquiry.",
    built: [
      "A responsive real-estate website structured around live property discovery",
      "Listing pages that make availability and essential property details easy to scan",
      "Clear service journeys for renting, buying, selling and property management",
      "Direct enquiry paths for property seekers, landlords, buyers and sellers",
    ],
    outcome: [
      "An active sales channel where new listings can meet prospective clients",
      "Brokerage services and property inventory presented under one consistent brand",
      "A clearer route from initial interest to a conversation with the Sincere team",
    ],
    stack: ["Property listings", "Responsive UI", "Lead capture", "Content management"],
    href: "https://www.sincere-estate.nl/",
  },
  {
    service: "AI product development",
    client: "JobSynk AI",
    region: "Global",
    title: "A job application workspace built around the role",
    challenge:
      "Generic resumes and disconnected writing tools make every serious job application repetitive. JobSynk needed one workspace that could understand a job description and help candidates adapt the complete application around it.",
    built: [
      "AI resume workspace that evaluates content against a target role",
      "ATS checker focused on parsing, structure, and role-relevant language",
      "Role matching and guided improvements at individual resume-line level",
      "Supporting drafts for cover letters, interview answers, and follow-up email",
    ],
    outcome: [
      "Candidates can move from job description to tailored application in one workflow",
      "ATS risks and weak resume content become visible before an application is sent",
      "Related application documents stay aligned with the same role and experience",
    ],
    stack: ["AI", "Resume builder", "ATS analysis", "SaaS"],
    href: "https://jobsynk.co/",
  },
  {
    service: "Marketplace development",
    client: "JeeUstaad",
    region: "Pakistan",
    title: "A safer way to hire local skilled workers",
    challenge:
      "Hiring for repairs, cleaning, moving, and other local work often happens through unverified referrals, cash advances, and scattered phone calls. JeeUstaad needed trust and payment protection built into the marketplace itself.",
    built: [
      "Task posting and category-based matching across local service trades",
      "Worker identity and police-verification workflows",
      "Offer comparison, reviews, text chat, and voice notes",
      "Escrow payments, disputes, wallets, and local payout methods",
      "Android experience for job alerts and work on the move",
    ],
    outcome: [
      "Customers can compare verified workers before choosing an offer",
      "Funds remain protected until the customer confirms completed work",
      "Workers receive relevant local opportunities and can withdraw earnings digitally",
    ],
    stack: ["Marketplace", "Escrow", "Verification", "Android"],
    href: "https://jeeustaad.com/",
  },
  {
    service: "Web design & development",
    client: "After Realism",
    region: "Australia",
    title: "A geospatial consultancy presented with product clarity",
    challenge:
      "After Realism needed one clear digital home for a technically broad offer spanning interactive maps, spatial data, AI, cloud platforms, and its own live products.",
    built: [
      "A complete consultancy website structured around services, products, and delivered work",
      "Dedicated presentation for live products including MapDrop and GeoChat",
      "Clear paths into map, data, AI, web application, and cloud engagements",
    ],
    outcome: [
      "Specialist geospatial capability is legible to both technical and commercial buyers",
      "Products, public-sector experience, and consulting services now reinforce one another",
    ],
    stack: ["SvelteKit", "AWS", "PostGIS", "Three.js"],
    quote: "One of the best working experiences, kudos to Divlynx.",
    href: "https://afterrealism.com/",
  },
  {
    service: "Full-stack product development",
    client: "Range Fit Gym",
    region: "Pakistan",
    title: "Memberships, trainers, and gym access in one platform",
    challenge:
      "Range Fit needed more than a brochure site. Prospective members had to understand the facilities, compare training plans, meet the trainers, and move directly into an account journey from any device.",
    built: [
      "Responsive fitness website with video-led brand presentation",
      "Membership catalogue covering day passes and specialised training plans",
      "Trainer profiles, facilities, contact details, and location information",
      "Integrated sign-up and login paths for the member experience",
    ],
    outcome: [
      "Prospective members can evaluate plans and trainers before visiting the gym",
      "Membership information and account access now share one consistent experience",
      "The platform works across desktop and mobile for customers on the move",
    ],
    stack: ["Next.js", "Memberships", "Authentication", "Responsive UI"],
    href: "https://range-fit-gym.vercel.app/",
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
    title: "Digital subscriptions and services in one storefront",
    challenge:
      "Customers needed one place to discover and compare a growing catalogue spanning streaming, productivity, design, AI tools, software keys, and digital services.",
    built: [
      "Category-led storefront for subscriptions, software, and digital services",
      "Reusable product presentation across a broad and frequently changing catalogue",
      "Direct paths from product discovery into purchase and customer support",
    ],
    outcome: [
      "Customers can browse entertainment and productivity products from one destination",
      "New subscription products and service categories can be presented consistently",
    ],
    stack: ["E-commerce", "Product catalogue", "Subscriptions"],
    quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.",
    href: "https://metastore.pk/",
  },
];

function CaseCard({ item, index }) {
  const caseId = `case-${item.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  return (
    <motion.article
      id={caseId}
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
        {item.href && (
          <a className="case__live" href={item.href} target="_blank" rel="noopener noreferrer">
            Visit live website <FiArrowUpRight aria-hidden />
          </a>
        )}
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
            Real client projects, the product challenge, what we delivered, and the experience
            now running in production.
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
