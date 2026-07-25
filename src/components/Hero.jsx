import { motion } from "framer-motion";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";
import WorkflowCanvas from "./WorkflowCanvas";
import { CALENDLY, EMAIL, scrollToId } from "../site";
import "../css/hero.css";

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const STATS = [
  { value: "30+", label: "Projects shipped" },
  { value: "20+", label: "Clients worldwide" },
  { value: "4 wks", label: "Typical first release" },
];

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero__grid">
        <motion.div
          className="hero__copy"
          variants={stagger}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <motion.p className="hero__eyebrow" variants={rise}>
            <span className="hero__pip" aria-hidden="true" />
            AI automation &amp; product engineering
          </motion.p>

          <motion.h1 id="hero-title" className="display h1 hero__title" variants={rise}>
            We build your product — and the{" "}
            <span className="sweep">agents that run it</span>.
          </motion.h1>

          <motion.p className="lede hero__lede" variants={rise}>
            Divlynx is a software studio for teams that are done doing things by hand. We design
            and ship AI automation, voice agents and n8n workflows — along with the web and mobile
            products they plug into.
          </motion.p>

          <motion.div className="hero__actions" variants={rise}>
            <a
              href="#contact"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#contact");
              }}>
              Start a project <FiArrowUpRight aria-hidden />
            </a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FiCalendar aria-hidden /> Book a 30-min call
            </a>
          </motion.div>

          <motion.p className="hero__reply" variants={rise}>
            <span className="hero__pulse" aria-hidden="true" />
            {/* One element, not loose text nodes — otherwise the flex container
                splits the sentence into separately-wrapping columns. */}
            <span>
              Taking on new work — write to{" "}
              <a href={`mailto:${EMAIL}`} className="hero__mail">
                {EMAIL}
              </a>{" "}
              and we reply within a day.
            </span>
          </motion.p>

          <motion.dl className="hero__stats" variants={rise}>
            {STATS.map((s) => (
              <div key={s.label} className="hero__stat">
                <dt className="hero__stat-value">{s.value}</dt>
                <dd className="hero__stat-label">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          className="hero__canvas"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <WorkflowCanvas />
        </motion.div>
      </div>
    </section>
  );
}
