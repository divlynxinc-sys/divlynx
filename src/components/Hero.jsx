import { Fragment } from "react";
import { FiArrowUpRight, FiCalendar } from "../icons.jsx";
import PainList from "./PainList";
import { CALENDLY, scrollToId } from "../site";
import "../css/hero.css";

/* Each word rises out of its own mask. Plain CSS so it runs on first paint of
   the prerendered HTML, before React hydrates. */
function Words({ text, start = 0 }) {
  const words = text.split(" ");
  // The space sits outside the inline-block mask, where it is not trimmed.
  return words.map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="hero__w">
        <span style={{ "--i": start + i }}>{word}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <span className="glow" style={{ "--size": "760px", right: "-220px", top: "20%", "--dx": "-80px", "--dy": "40px" }} aria-hidden="true" />
      <span className="glow glow--warm glow--soft" style={{ "--size": "520px", left: "-200px", top: "-120px", "--drift": "22s" }} aria-hidden="true" />

      <div className="shell hero__grid">
        <div className="hero__copy">
          {/* Visually an edit in a notebook: "by hand" is struck out and
              "on autopilot" written in below it. Read as one plain sentence. */}
          <h1 id="hero-title" className="display hero__title">
            <span className="sr-only">Stop doing it by hand. Put it on autopilot.</span>
            <span aria-hidden="true">
              <Words text="Stop doing it" />{" "}
              <span className="hero__struck">
                <Words text="by hand." start={3} />
              </span>
              <span className="hero__insert">
                <svg className="hero__caret" viewBox="0 0 30 22" focusable="false">
                  <path d="M3 20 L 15 4 L 27 20" pathLength="1" />
                </svg>
                on autopilot.
              </span>
            </span>
          </h1>

          <p className="lede hero__lede">
            We find the tasks <mark className="hl">draining your team</mark> and hand them to AI
            agents that run them for you, around the clock.
          </p>

          <div className="hero__actions">
            <a
              href="#contact"
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#contact");
              }}>
              Find what to automate <FiArrowUpRight aria-hidden />
            </a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FiCalendar aria-hidden /> Book a 30-min call
            </a>
          </div>

          <ul className="hero__values" aria-label="What you get">
            <li>Fewer manual hours</li>
            <li>No missed leads</li>
            <li>You own every workflow</li>
          </ul>
        </div>

        <div className="hero__visual">
          <PainList />
        </div>
      </div>
    </section>
  );
}
