import { useEffect, useRef, useState } from "react";
import Pen from "./Pen";
import "../css/pain-list.css";

/**
 * Hero visual: a notebook to-do list of the busywork we automate, with a
 * pencil lying on the page. One by one, each pain gets struck out, ticked and
 * the automated fix is written in underneath.
 * Illustrative examples of the kinds of automations we build.
 */
const ITEMS = [
  { pain: "Answering the same calls all day", fix: "AI voice agent picks up, 24/7" },
  { pain: "Copying leads into the CRM", fix: "synced the moment they arrive" },
  { pain: "Chasing unpaid invoices", fix: "reminders send themselves" },
  { pain: "Building the Monday report", fix: "in your inbox at 9am" },
];

// Timed to the CSS transitions in pain-list.css: strike 0.25–0.7s,
// tick 0.85–1.15s, fix written 1.25–1.85s.
const STEP_MS = 2150;
const HOLD_MS = 3400;
// The first row waits for the headline's edit to finish.
const FIRST_MS = 2200;

const STRIKE = "M2 12 C 40 8, 90 13, 140 9 S 190 11, 198 8";
const TICK = "M3 12.5 C 5 14.5, 7 16.5, 8.5 19 C 11.5 12, 15.5 6.5, 21 2.5";

export default function PainList() {
  const ref = useRef(null);
  const firstRun = useRef(true);
  const [done, setDone] = useState(ITEMS.length);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Striking and writing are drawing, not movement, so this also plays
    // when the OS asks for reduced motion.
    setDone(0);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  /* Advance the list. */
  useEffect(() => {
    if (!visible) return undefined;
    const finished = done >= ITEMS.length;
    let wait = finished ? HOLD_MS : done === 0 ? 900 : STEP_MS;
    if (done === 0 && firstRun.current) wait = FIRST_MS;
    const t = window.setTimeout(() => {
      firstRun.current = false;
      setDone(finished ? 0 : done + 1);
    }, wait);
    return () => window.clearTimeout(t);
  }, [done, visible]);

  return (
    <figure ref={ref} className={`pains${done > 0 ? " is-working" : ""}`} aria-label="Examples of busywork we automate">
      <span className="pains__binding" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
      </span>
      <span className="pains__sticker" aria-hidden="true">automated</span>

      <figcaption className="pains__title">things eating your week</figcaption>

      <ul className="pains__list">
        {ITEMS.map((item, i) => {
          const fixed = i < done;
          return (
            <li key={item.pain} className={`pains__item${fixed ? " is-fixed" : ""}`}>
              <svg className="pains__box" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <rect x="2.5" y="4.5" width="15" height="15" rx="2.5" />
                <path d={TICK} pathLength="1" />
              </svg>
              <span className="pains__text">
                <span className="pains__pain">
                  {item.pain}
                  <svg className="pains__strike" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                    <path d={STRIKE} />
                  </svg>
                </span>
                <span className="pains__fix">{item.fix}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className="pains__foot" aria-hidden="true">
        <span>{Math.min(done, ITEMS.length)}</span> of {ITEMS.length} handled
      </p>

      <Pen className="pains__pen" />
    </figure>
  );
}
