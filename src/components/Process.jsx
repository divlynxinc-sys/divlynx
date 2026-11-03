import { motion } from "framer-motion";
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
    body: "You get a working slice running against your real data, not a slide deck. This is where we agree on what finished looks like.",
    when: "Week 2",
  },
  {
    n: "03",
    title: "Build and demo weekly",
    body: "Every week you see something you can click. Scope changes are cheap here and expensive later, so we surface them early.",
    when: "Weeks 3-6",
  },
  {
    n: "04",
    title: "Hand over the keys",
    body: "Runbooks, architecture notes and a recorded walkthrough. You can operate it without us. Most clients keep us on anyway.",
    when: "Launch",
  },
];

export default function Process() {
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
            Fixed scope or monthly retainer, either way you know what is being built, what it
            costs, and where it is on any given Friday.
          </p>
        </div>

        <ol className="proc__rail">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              className="proc__step"
              style={{
                "--drop": `${[28, 112, 62, 138][i]}px`,
                "--sway": `${[1.25, -1, 0.85, -1.15][i]}deg`,
                "--duration": `${[4.8, 5.7, 5.2, 6.1][i]}s`,
                "--delay": `${[-1.4, -3.2, -2.1, -4.4][i]}s`,
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}>
              <div className="proc__pendulum">
                <span className="proc__thread" aria-hidden="true"><i /></span>
                <article className="proc__card">
                  <header className="proc__card-head">
                    <span className="proc__n">{s.n}</span>
                  </header>
                  <h3 className="h3 proc__title">{s.title}</h3>
                  <p className="proc__body">{s.body}</p>
                  <footer className="proc__card-foot">
                    <span>Step {s.n} / 04</span>
                    <span>{s.when}</span>
                  </footer>
                </article>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
