import { Link } from "react-router-dom";
import { FiArrowUpRight } from "../icons.jsx";
import Scribble from "./Scribble";
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
    image: "/assets/projects/sincere-estate-project-v2",
    imageHeight: 803,
    href: "https://www.sincere-estate.nl/",
  },
  {
    client: "JobSynk AI",
    title: "AI resume and job application platform",
    kind: "Product",
    region: "Global",
    note: "A live workspace that tailors resumes to job descriptions, checks ATS readability, and drafts the application content around each role.",
    tech: ["AI resume builder", "ATS checker", "Job tailoring"],
    image: "/assets/projects/jobsynk-project-v2",
    imageHeight: 844,
    href: "https://jobsynk.co/",
  },
  {
    client: "Mise",
    title: "Restaurant ordering and kitchen operations platform",
    kind: "Product",
    region: "Pakistan",
    note: "A restaurant platform connecting branded online ordering, live kitchen tickets, delivery operations, and customer relationships in one system.",
    tech: ["Online ordering", "Kitchen rail", "Delivery tracking", "Customer CRM"],
    image: "/assets/projects/mise-project-v1",
    imageHeight: 933,
    href: "https://restaurant-divlynx.vercel.app/",
  },
  {
    client: "Divlynx Pilates",
    title: "Pilates booking and studio management platform",
    kind: "Product",
    region: "Global",
    note: "A client and staff experience for class discovery, programme onboarding, live availability, bookings, packs, and day-to-day studio management.",
    tech: ["Class booking", "Timetables", "Programme onboarding", "Studio management"],
    image: "/assets/projects/pilates-project-v1",
    imageHeight: 933,
    href: "https://divlynx-pilates.vercel.app/",
  },
  {
    client: "Range Fit Gym",
    title: "Fitness membership platform",
    kind: "Product",
    region: "Pakistan",
    note: "A responsive gym platform combining membership plans, trainer profiles, account access, and facility information in one customer journey.",
    tech: ["Next.js", "Memberships", "Authentication", "Responsive UI"],
    image: "/assets/projects/range-fit-project-v2",
    imageHeight: 913,
    href: "https://range-fit-gym.vercel.app/",
  },
  {
    client: "After Realism",
    title: "Geospatial consultancy platform",
    kind: "Web",
    region: "Australia",
    note: "A live consultancy website presenting interactive maps, spatial data products, AI solutions, and cloud engineering work.",
    tech: ["SvelteKit", "AWS", "PostGIS", "Three.js"],
    image: "/assets/projects/after-realism-project-v2",
    imageHeight: 878,
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
    image: "/assets/projects/metastore-project-v2",
    imageHeight: 905,
    href: "https://metastore.pk/",
  },
  {
    client: "JeeUstaad",
    title: "Verified local-services marketplace",
    kind: "Marketplace",
    region: "Pakistan",
    note: "A task marketplace connecting customers with ID-verified workers, protected by escrow payments, reviews, and human dispute resolution.",
    tech: ["Marketplace", "Escrow", "Worker verification", "Android"],
    image: "/assets/projects/jeeustaad-project-v2",
    imageHeight: 847,
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

/* Keep the arrow on the same line as the last word, so it never wraps alone. */
function lastWordWith(text, icon) {
  const cut = text.lastIndexOf(" ");
  return (
    <>
      {text.slice(0, cut + 1)}
      <span className="work__last">
        {text.slice(cut + 1)} {icon}
      </span>
    </>
  );
}

export default function Work() {
  return (
    <section id="work" className="band">
      <div className="shell">
        <div className="work__head">
          <div>
            <h2 className="display h2">
              Shipped, live, and <Scribble variant="underline">still running</Scribble>.
            </h2>
          </div>
          <Link to="/case-studies" className="btn btn--ghost work__cta">
            View all work <FiArrowUpRight aria-hidden />
          </Link>
        </div>

        <ul className="work__list">
          {LIVE_PROJECTS.map((p, i) => (
            <li
              key={p.title}
              className="work__row reveal"
              style={{ "--reveal-delay": `${(i % 2) * 80}ms` }}>
              <a
                className="work__visual"
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.client} live website`}>
                <img
                  src={`${p.image}.webp`}
                  srcSet={`${p.image}-760.webp 760w, ${p.image}.webp 1400w`}
                  sizes="(max-width: 900px) 100vw, 680px"
                  width="1400"
                  height={p.imageHeight}
                  alt={`${p.client} live product interface`}
                  loading="lazy"
                  decoding="async"
                />
              </a>

              <div className="work__main">
                {/* Same order as the team cards: name, handwritten role line, description */}
                <span className="work__index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="work__title">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">
                      {lastWordWith(p.title, <FiArrowUpRight aria-hidden className="work__arrow" />)}
                    </a>
                  ) : p.title}
                </h3>
                <p className="work__client">
                  {p.client}
                  <span>
                    {" "}
                    · {p.kind}, {p.region}
                  </span>
                </p>
                <p className="work__note">{p.note}</p>
                <div className="work__scope">
                  <span className="work__scope-label">Scope</span>
                  <ul className="work__tech">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
