import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "../icons.jsx";
import "../css/studio.css";

const PRINCIPLES = [
  {
    title: "One team, end to end",
    body: "The people who understand the problem stay involved through design, engineering, launch and handover.",
  },
  {
    title: "You own all of it",
    body: "Source code, infrastructure, workflows, prompts and documentation are handed over without a proprietary lock-in.",
  },
  {
    title: "Progress you can click",
    body: "Regular working demos replace long status decks, so decisions are based on a real product rather than promises.",
  },
  {
    title: "Built beyond launch",
    body: "Reliable architecture, tests and runbooks make the system maintainable when usage, teams and requirements grow.",
  },
];

const SNAPSHOT = [
  {
    title: "What we do",
    body: "We design and build AI automation, voice agents, web platforms and mobile products around real business workflows.",
  },
  {
    title: "Projects we deliver",
    body: "Our work includes property platforms, AI career products, verified marketplaces, membership systems and operational automation.",
  },
  {
    title: "The value",
    body: "Clients get fewer manual handoffs, clearer operating data and software their own team can understand, own and extend.",
  },
];

export default function Studio() {
  return (
    <section id="studio" className="band">
      <div className="shell">
        <header className="studio__page-head">
          <p className="eyebrow">About Divlynx</p>
          <h1 className="display h1">
            Useful software, built around <span className="sweep">how work gets done</span>.
          </h1>
          <p className="lede studio__page-lede">
            Divlynx is a software studio in Islamabad working with teams worldwide. We turn
            repetitive operations and ambitious product ideas into dependable systems that are
            practical to run, straightforward to own and ready to grow.
          </p>
        </header>

        <div className="studio__snapshot">
          {SNAPSHOT.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <div className="studio__top">
          <div className="studio__intro">
            <p className="eyebrow">How we work</p>
            <h2 className="display h2">
              Small team. Senior people. <span className="sweep">No handoffs</span>.
            </h2>
            <p className="lede studio__lede">
              We keep delivery close to the problem. The people shaping the scope also make the
              product decisions and remain accountable for what reaches production.
            </p>
            <Link to="/case-studies" className="studio__work-link">
              Explore our client work <FiArrowUpRight aria-hidden />
            </Link>
          </div>

          <ul className="studio__principles">
            {PRINCIPLES.map((principle, index) => (
              <motion.li
                key={principle.title}
                className="principle"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="h3 principle__title">{principle.title}</h3>
                <p className="principle__body">{principle.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
