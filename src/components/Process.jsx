import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import Scribble from "./Scribble";
import "../css/process.css";

/** A real sequence, so the week markers carry information rather than decorating. */
const STEPS = [
  {
    title: "Map the work",
    body: "We sit with the people actually doing the job and write down every step, every tool and every exception. That document is yours whether you hire us or not.",
    when: "Week 1",
  },
  {
    title: "Prototype in your stack",
    body: "You get a working slice running against your real data, not a slide deck. This is where we agree on what finished looks like.",
    when: "Week 2",
  },
  {
    title: "Build and demo weekly",
    body: "Every week you see something you can click. Scope changes are cheap here and expensive later, so we surface them early.",
    when: "Weeks 3–6",
  },
  {
    title: "Hand over the keys",
    body: "Runbooks, architecture notes and a recorded walkthrough. You can operate it without us. Most clients keep us on anyway.",
    when: "Launch",
  },
];

export default function Process() {
  const railRef = useRef(null);
  const [reached, setReached] = useState(0);

  // The line advances with the reader: scroll stands in for elapsed weeks.
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.min(STEPS.length, Math.floor(v * STEPS.length + 0.35)));
  });

  return (
    <section id="process" className="band band--amber proc">
      <div className="shell">
        <header className="sec-head">
          <h2 className="display h2 reveal">Four steps. No <Scribble variant="circle">black boxes</Scribble>.</h2>
          <p className="lede reveal" style={{ "--reveal-delay": "80ms" }}>
            Fixed scope or monthly retainer, either way you know what is being built, what it
            costs, and where it is on any given Friday.
          </p>
        </header>

        <ol ref={railRef} className="proc__rail">
          <span className="proc__line" aria-hidden="true">
            <motion.span className="proc__line-fill" style={{ scaleX: fill }} />
          </span>
          <span className="proc__line proc__line--v" aria-hidden="true">
            <motion.span className="proc__line-fill" style={{ scaleY: fill }} />
          </span>

          {STEPS.map((s, i) => (
            <li key={s.title} className={`proc__step${i < reached ? " is-reached" : ""}`}>
              <span className="proc__node" aria-hidden="true" />
              <div className="proc__card">
                <p className="proc__when">{s.when}</p>
                <h3 className="proc__title">{s.title}</h3>
                <p className="proc__body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
