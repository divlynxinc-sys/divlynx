import { useEffect, useRef, useState } from "react";
import "../css/pain-list.css";

/**
 * Hero visual: a notebook to-do list of the busywork we automate. One by one,
 * each pain gets struck out and the automated fix is written in underneath.
 * Illustrative examples of the kinds of automations we build.
 */
const ITEMS = [
  { pain: "Answering the same calls all day", fix: "AI voice agent picks up, 24/7" },
  { pain: "Copying leads into the CRM", fix: "synced the moment they arrive" },
  { pain: "Chasing unpaid invoices", fix: "reminders send themselves" },
  { pain: "Building the Monday report", fix: "in your inbox at 9am" },
];

const STEP_MS = 1500;
const HOLD_MS = 3200;

const STRIKE = "M2 12 C 40 8, 90 13, 140 9 S 190 11, 198 8";
const TICK = "M3 12.5 C 5 14.5, 7 16.5, 8.5 19 C 11.5 12, 15.5 6.5, 21 2.5";

export default function PainList() {
  const ref = useRef(null);
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

  useEffect(() => {
    if (!visible) return undefined;
    const finished = done >= ITEMS.length;
    const t = window.setTimeout(
      () => setDone(finished ? 0 : done + 1),
      finished ? HOLD_MS : done === 0 ? 900 : STEP_MS
    );
    return () => window.clearTimeout(t);
  }, [done, visible]);

  return (
    <figure ref={ref} className="pains" aria-label="Examples of busywork we automate">
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
                    <path d={STRIKE} pathLength="1" />
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
    </figure>
  );
}
