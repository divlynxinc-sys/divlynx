import Scribble from "./Scribble";
import SketchFlow from "./SketchFlow";
import "../css/solved.css";

/** One business pain, the value we deliver, and the automation in between. */
export default function Solved() {
  return (
    <section id="how" className="band solved" aria-labelledby="solved-title">
      <div className="shell">
        <header className="sec-head">
          <h2 id="solved-title" className="display h2 reveal">
            One pain point, <Scribble variant="underline">solved</Scribble> end to end.
          </h2>
          <p className="lede reveal" style={{ "--reveal-delay": "80ms" }}>
            A typical fix we ship: what hurt, what changed, and the agent doing the work in
            between.
          </p>
        </header>

        <div className="solved__pv">
          <article className="pv pv--pain reveal">
            <span className="pv__pin" aria-hidden="true" />
            <p className="pv__label">the pain</p>
            <p className="pv__text">Calls after 6pm go to voicemail, and those callers book somewhere else.</p>
          </article>

          <div className="solved__arrow" aria-hidden="true">
            <span className="solved__arrow-label">we automate it</span>
            <svg className="draw" viewBox="0 0 160 40" focusable="false">
              <path d="M4 26 C 40 6, 90 34, 148 16" pathLength="1" />
              <path d="M134 6 L 150 15 L 137 28" pathLength="1" style={{ "--draw-delay": "500ms" }} />
            </svg>
          </div>

          <article className="pv pv--value reveal" style={{ "--reveal-delay": "160ms" }}>
            <span className="pv__pin" aria-hidden="true" />
            <p className="pv__label">the value</p>
            <p className="pv__text">Every call answered, booked and logged, even at 11pm. Your team just shows up.</p>
          </article>
        </div>

        <SketchFlow />
      </div>
    </section>
  );
}
