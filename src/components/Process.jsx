import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import "../css/process.css";

/** A real sequence, so the numbering carries information rather than decorating. */
const STEPS = [
  {
    n: "01",
    title: "Map the work",
    body: "We sit with the people actually doing the job and write down every step, every tool and every exception. That document is yours whether you hire us or not.",
    when: "Week 1",
  },
  {
    n: "02",
    title: "Prototype in your stack",
    body: "You get a working slice running against your real data — not a slide deck. This is where we agree on what finished looks like.",
    when: "Week 2",
  },
  {
    n: "03",
    title: "Build and demo weekly",
    body: "Every week you see something you can click. Scope changes are cheap here and expensive later, so we surface them early.",
    when: "Weeks 3–6",
  },
  {
    n: "04",
    title: "Hand over the keys",
    body: "Runbooks, architecture notes and a recorded walkthrough. You can operate it without us. Most clients keep us on anyway.",
    when: "Launch",
  },
];

export default function Process() {
  const stacked = useMediaQuery("(max-width: 900px)");

  return (
    <section id="process" className="band">
      <div className="shell">
        <div className="proc__head">
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="display h2">
              Four steps. No <span className="sweep">black boxes</span>.
            </h2>
          </div>
          <p className="lede proc__note">
            Fixed scope or monthly retainer — either way you know what is being built, what it
            costs, and where it is on any given Friday.
          </p>
        </div>

        <ol className="proc__rail">
          <motion.span
            className="proc__line"
            aria-hidden="true"
            initial={stacked ? { scaleY: 0 } : { scaleX: 0 }}
            whileInView={stacked ? { scaleY: 1 } : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="proc__step"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}>
              <motion.span
                className="proc__node"
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.28 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="proc__n">{s.n}</span>
              <h3 className="h3 proc__title">{s.title}</h3>
              <p className="proc__body">{s.body}</p>
              <span className="chip proc__when">{s.when}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
