import { motion } from "framer-motion";
import { FiArrowUpRight, FiBriefcase, FiCode, FiEdit3, FiTrendingUp } from "react-icons/fi";
import { EMAIL } from "../site";
import "../css/careers.css";

const PATHS = [
  {
    icon: FiCode,
    title: "Engineering",
    text: "Frontend, backend, mobile, cloud, automation, AI, and quality engineering.",
  },
  {
    icon: FiEdit3,
    title: "Design & product",
    text: "Product thinking, research, user experience, interface design, and content systems.",
  },
  {
    icon: FiTrendingUp,
    title: "Growth & operations",
    text: "Client partnerships, sales, marketing, SEO, paid media, and studio operations.",
  },
];

const PROCESS = [
  ["01", "Introduce yourself", "Send your CV, portfolio, GitHub, or examples of work that show how you think."],
  ["02", "Meet the team", "A focused conversation about your experience, interests, and the kind of work you want to do."],
  ["03", "Practical review", "A role-relevant discussion or compact exercise. No unpaid production work and no trick questions."],
  ["04", "Clear decision", "You receive a direct answer, useful feedback where possible, and next steps in writing."],
];

const subject = encodeURIComponent("Careers at Divlynx");
const body = encodeURIComponent("Hi Divlynx team,\n\nI would like to introduce myself for future opportunities.\n\nRole area:\nPortfolio / LinkedIn / GitHub:\nA short note about me:\n");

export default function Careers() {
  return (
    <section id="careers" className="band careers">
      <div className="shell">
        <header className="careers__head">
          <div>
            <p className="eyebrow">Careers</p>
            <h2 className="display h2">
              Do work you can <span className="sweep">point to</span>.
            </h2>
          </div>
          <div className="careers__intro">
            <p className="lede">
              We are building a small, senior team that cares about useful software, direct
              communication, and taking responsibility from first idea through launch.
            </p>
            <span className="careers__location"><FiBriefcase aria-hidden /> Islamabad and flexible hybrid work</span>
          </div>
        </header>

        <div className="careers__paths">
          {PATHS.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.article
                key={path.title}
                className="career-path"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: .5, delay: index * .08, ease: [0.22, 1, 0.36, 1] }}>
                <Icon aria-hidden />
                <h3>{path.title}</h3>
                <p>{path.text}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="careers__details">
          <div className="careers__values">
            <p className="careers__label">What matters here</p>
            <ul>
              <li><strong>Ownership</strong><span>You understand the problem and stay involved through delivery.</span></li>
              <li><strong>Craft</strong><span>You care about clarity, reliability, and details customers actually notice.</span></li>
              <li><strong>Curiosity</strong><span>You learn quickly, ask useful questions, and share what you discover.</span></li>
              <li><strong>AI judgment</strong><span>You prompt with clear intent, verify every important output, and use AI where it adds value without outsourcing responsibility.</span></li>
              <li><strong>Learn by building</strong><span>You can adopt a new stack or tool while implementing real work, then document the lessons for the rest of the team.</span></li>
              <li><strong>Honesty</strong><span>You communicate early, give context, and do not hide difficult news.</span></li>
            </ul>
          </div>

          <div className="careers__process">
            <p className="careers__label">How hiring works</p>
            <ol>
              {PROCESS.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div><strong>{title}</strong><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="careers__cta">
          <div>
            <p className="careers__status">Open applications</p>
            <h3>Do not see a listed role?</h3>
            <p>Send us your work and tell us where you can add value. We keep strong introductions for future openings.</p>
          </div>
          <a className="btn btn--primary" href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}>
            Introduce yourself <FiArrowUpRight aria-hidden />
          </a>
        </aside>
      </div>
    </section>
  );
}
