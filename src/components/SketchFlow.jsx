import { useEffect, useRef, useState } from "react";
import { FiBrain, FiCalendar, FiChat, FiDatabase, FiPhoneIncoming } from "../icons.jsx";
import "../css/sketch-flow.css";

/**
 * The hero's focal moment: a flow we build, sketched by hand and "run" live.
 * The pen draws each arrow as the call reaches the next step, then the page
 * wipes and the sketch starts again. Illustrative, labelled as an example.
 */
const STEPS = [
  { icon: FiPhoneIncoming, title: "Call comes in", detail: "Agent answers on the first ring", t: "0:01" },
  { icon: FiBrain, title: "Agent listens", detail: "New booking, party of 4, Thursday", t: "0:38" },
  { icon: FiDatabase, title: "CRM updated", detail: "Contact and call notes saved", t: "0:41" },
  { icon: FiCalendar, title: "Slot booked", detail: "Thu 15:00 held, invite sent", t: "0:43" },
  { icon: FiChat, title: "Team pinged", detail: "Summary posted to #sales", t: "0:44" },
];

const STEP_MS = 1300;
const HOLD_MS = 2800;

/* A box drawn with a marker: corners never quite meet, the line overshoots. */
const BOX = "M10 7 C 62 3, 140 5, 193 6 C 197 42, 195 84, 194 113 C 128 117, 66 116, 7 114 C 3 80, 5 42, 6 10 C 7 6, 12 5, 22 6";
const ARROW_H = { shaft: "M3 22 C 18 12, 34 30, 50 18", head: "M41 10 L 52 17 L 42 27" };
const ARROW_V = { shaft: "M20 3 C 8 14, 30 24, 18 40", head: "M9 31 L 18 42 L 27 31" };

function Arrow({ drawn, vertical }) {
  const a = vertical ? ARROW_V : ARROW_H;
  return (
    <svg
      className={`flow__arrow${drawn ? " is-drawn" : ""}`}
      viewBox={vertical ? "0 0 40 46" : "0 0 56 40"}
      aria-hidden="true"
      focusable="false">
      <path d={a.shaft} pathLength="1" />
      <path d={a.head} pathLength="1" className="flow__arrow-head" />
    </svg>
  );
}

export default function SketchFlow() {
  const ref = useRef(null);
  // -1: blank page. 0..n-1: step being worked. n: finished, held before the wipe.
  const [step, setStep] = useState(STEPS.length);
  const [visible, setVisible] = useState(false);
  // Under reduced motion it still runs: arrows drawing and boxes lighting up are
  // not travel; the small lift on the live node is dropped in CSS instead.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setStep(-1);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const done = step >= STEPS.length;
    const delay = step === -1 ? 600 : done ? HOLD_MS : STEP_MS;
    const t = window.setTimeout(() => setStep(done ? -1 : step + 1), delay);
    return () => window.clearTimeout(t);
  }, [step, visible]);

  const wiping = step === -1;

  return (
    <figure
      ref={ref}
      className={`flow${wiping ? " is-wiping" : ""}${reduced ? " is-calm" : ""}`}
      aria-label="Example flow: a call comes in, the agent listens, the CRM is updated, a slot is booked and the team is notified, all within 44 seconds.">
      <figcaption className="flow__cap">
        <span className="flow__cap-main">how the agent does it</span>
        <span className="flow__cap-side">example flow, 44 seconds end to end</span>
      </figcaption>

      <ol className="flow__steps" aria-hidden="true">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const state = step > i ? "done" : step === i ? "live" : "wait";
          return (
            <li key={s.title} className="flow__cell">
              <div className={`flow__node is-${state}`}>
                <svg className="flow__box" viewBox="0 0 200 120" preserveAspectRatio="none" focusable="false">
                  <path d={BOX} pathLength="1" />
                </svg>
                <Icon className="flow__icon" />
                <span className="flow__title">{s.title}</span>
                <span className="flow__detail">{s.detail}</span>
                <span className="flow__time">{s.t}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="flow__link">
                  <Arrow drawn={step > i} />
                  <Arrow drawn={step > i} vertical />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
