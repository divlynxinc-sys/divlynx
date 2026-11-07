import { Link } from "react-router-dom";
import { FiArrowUpRight } from "../icons.jsx";
import "../css/case-studies.css";
import Scribble from "../components/Scribble";

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
    service: "Restaurant product development",
    client: "Mise",
    region: "Pakistan",
    title: "Restaurant orders, kitchen tickets, and delivery in one flow",
    challenge:
      "Independent restaurants need direct online ordering without losing their customer relationship to an aggregator. Mise had to connect the guest storefront, kitchen workflow, delivery status, and customer history without adding operational friction.",
    built: [
      "Branded storefronts for dine-in, takeaway, and delivery ordering",
      "A live kitchen rail that moves tickets through new, preparing, and ready states",
      "Order totals, GST, service charges, cash handling, and local delivery rules",
      "Customer profiles, repeat-order context, reviews, and promotion workflows",
      "Rider assignment and delivery progress for the restaurant and guest",
    ],
    outcome: [
      "Restaurants can own the complete ordering experience and customer relationship",
      "Kitchen teams receive every order in one clear operational queue",
      "Guests can move from menu to delivery updates without switching platforms",
    ],
    stack: ["Online ordering", "Kitchen operations", "Delivery tracking", "Customer CRM"],
    href: "https://restaurant-divlynx.vercel.app/",
  },
  {
    service: "Booking & operations platform",
    client: "Divlynx Pilates",
    region: "Global",
    title: "A Pilates booking journey connected to studio operations",
    challenge:
      "A Pilates studio needs to make the first visit approachable while keeping classes, capacity, instructors, packs, and client information organised behind the scenes. The product needed one coherent experience for both clients and staff.",
    built: [
      "Beginner programme onboarding with a clear first-class journey",
      "Live class timetable with instructors, levels, capacity, and availability",
      "Class packs, introductory offers, ordering, and booking actions",
      "Client intake and studio information designed around first-visit questions",
      "A connected staff view for schedule and day-to-day studio management",
    ],
    outcome: [
      "New clients can understand the programme and reserve an appropriate class quickly",
      "Availability, instructor details, and pricing stay visible in one booking flow",
      "The studio can manage the client-facing schedule and operational view together",
    ],
    stack: ["Class booking", "Timetables", "Client onboarding", "Studio management"],
    href: "https://divlynx-pilates.vercel.app/",
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

/* Live screenshots shared with the home page's work section */
const SHOTS = {
  "Sincere Capital": "sincere-estate-project-v2",
  "JobSynk AI": "jobsynk-project-v2",
  Mise: "mise-project-v1",
  "Divlynx Pilates": "pilates-project-v1",
  JeeUstaad: "jeeustaad-project-v2",
  "After Realism": "after-realism-project-v2",
  "Range Fit Gym": "range-fit-project-v2",
  MetaStore: "metastore-project-v2",
};

const slugFor = (client) =>
  `case-${client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const TICK = "M3 12.5 C 5 14.5, 7 16.5, 8.5 19 C 11.5 12, 15.5 6.5, 21 2.5";
const ARROW = "M2 12 C 8 10, 14 14, 20 11 M15 6 L 21 11 L 15 16";
const RING = "M30 6 C 16 4, 5 13, 6 28 C 7 42, 20 52, 33 50 C 46 48, 54 37, 51 23 C 49 12, 40 5, 26 7";

function Mark({ d }) {
  return (
    <svg className="case__mark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

function CaseCard({ item, index }) {
  const shot = SHOTS[item.client];
  return (
    <article id={slugFor(item.client)} className="case reveal">
      <header className="case__head">
        <div className="case__kicker">
          <span className="case__index" aria-hidden="true">
            {index + 1}
            <svg viewBox="0 0 56 56" focusable="false">
              <path d={RING} />
            </svg>
          </span>
          <p className="case__service">{item.service}</p>
        </div>
        <h2 className="case__title">{item.title}</h2>
        <p className="case__client">
          {item.client} · {item.region}
        </p>

        {shot && (
          <a className="case__shot" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            <img
              src={`/assets/projects/${shot}-760.webp`}
              srcSet={`/assets/projects/${shot}-760.webp 760w, /assets/projects/${shot}.webp 1400w`}
              sizes="(max-width: 900px) 100vw, 460px"
              width="760"
              height="480"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </a>
        )}

        {item.href && (
          <a className="btn btn--ghost case__live" href={item.href} target="_blank" rel="noopener noreferrer">
            Visit live website <FiArrowUpRight aria-hidden />
          </a>
        )}
      </header>

      <div className="case__body">
        <div className="case__block">
          <h3 className="case__label">the problem</h3>
          <p className="case__challenge">{item.challenge}</p>
        </div>

        <div className="case__blocks">
          <div className="case__block">
            <h3 className="case__label">what we built</h3>
            <ul className="case__list">
              {item.built.map((b) => (
                <li key={b}><Mark d={TICK} />{b}</li>
              ))}
            </ul>
          </div>

          <div className="case__block">
            <h3 className="case__label">the outcome</h3>
            <ul className="case__list case__list--out">
              {item.outcome.map((o) => (
                <li key={o}><Mark d={ARROW} />{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="case__stack" aria-label="Scope">
          {item.stack.map((t) => <li key={t}>{t}</li>)}
        </ul>

        {item.quote && (
          <figure className="case__quote">
            <span className="case__pin" aria-hidden="true" />
            <blockquote>“{item.quote}”</blockquote>
            <figcaption>{item.client}</figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section className="band cases">
      <div className="shell">
        <header className="cases__head">
          <div>
            <h1 className="display h1">
              What the work <Scribble variant="underline">actually</Scribble> looked like.
            </h1>
            <p className="lede cases__lede">
              Real client projects: the problem, what we delivered, and the product now running in
              production.
            </p>
          </div>

          <nav className="cases__contents" aria-label="Case studies on this page">
            <p className="cases__contents-title">contents</p>
            <ol>
              {CASES.map((c, i) => (
                <li key={c.client}>
                  <a href={`#${slugFor(c.client)}`}>
                    <span className="cases__contents-n">{i + 1}.</span>
                    <span className="cases__contents-name">{c.client}</span>
                    <span className="cases__contents-kind">{c.service}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <div className="cases__grid">
          {CASES.map((item, i) => (
            <CaseCard key={item.title} item={item} index={i} />
          ))}
        </div>

        <aside className="cases__cta">
          <span className="case__pin" aria-hidden="true" />
          <h2 className="display cases__cta-title">Recognise your own problem in one of these?</h2>
          <p className="cases__cta-sub">
            Tell us what is breaking and we will tell you honestly whether it is worth building.
          </p>
          <Link to="/#contact" className="btn btn--primary">
            Start a project <FiArrowUpRight aria-hidden />
          </Link>
        </aside>
      </div>
    </section>
  );
}
