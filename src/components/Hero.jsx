import { Fragment, useEffect, useRef } from "react";
import { FiArrowUpRight, FiCalendar } from "../icons.jsx";
import PainList from "./PainList";
import Pen from "./Pen";
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

/* After the pencil has written the headline fix, fly it over and lay it down
   on the notebook page. The notebook has its own copy of the pencil, sitting
   where it should end up: it starts from the headline pencil's spot and size
   and settles into place, while the headline pencil is hidden. */
function usePenHandOff(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const from = hero?.querySelector(".hero__pen--write");
    const to = hero?.querySelector(".pains__pen");
    if (!from || !to) return undefined;

    const land = () => { to.dataset.landed = ""; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !to.animate) {
      land();
      return undefined;
    }

    let flight;
    const fly = (e) => {
      if (e && e.animationName !== "pen-write") return;
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const dx = a.left + a.width / 2 - (b.left + b.width / 2);
      const dy = a.top + a.height / 2 - (b.top + b.height / 2);
      const scale = from.offsetWidth / to.offsetWidth || 1;
      land();
      from.classList.add("is-gone");
      flight = to.animate(
        [
          { transform: `translate(${dx}px, ${dy}px) rotate(-34deg) scale(${scale})` },
          { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) rotate(-22deg) scale(${(scale + 1) / 2 + 0.06})`, offset: 0.5 },
          { transform: "translate(0, -10px) rotate(-10deg) scale(1.02)", offset: 0.88 },
          { transform: "rotate(-8deg)" },
        ],
        { duration: 1150, easing: "cubic-bezier(.65,0,.35,1)" }
      );
    };

    // The loader (main.jsx) replays the entrance on slow loads: put the
    // pencil back on the headline so it can do the edit again.
    const reset = () => {
      if (flight) flight.cancel();
      delete to.dataset.landed;
      from.classList.remove("is-gone");
    };

    from.addEventListener("animationend", fly);
    window.addEventListener("hero:replay", reset);
    // Already written before this code ran (slow script): fly now.
    const running = from.getAnimations ? from.getAnimations().some((x) => x.playState !== "finished") : true;
    if (!running) fly();
    // If the animation never runs (tab in the background, etc.), just place it.
    const fallback = window.setTimeout(() => {
      if (!("landed" in to.dataset)) fly();
    }, 7000);
    return () => {
      from.removeEventListener("animationend", fly);
      window.removeEventListener("hero:replay", reset);
      window.clearTimeout(fallback);
      if (flight) flight.cancel();
    };
  }, [heroRef]);
}

export default function Hero() {
  const ref = useRef(null);
  usePenHandOff(ref);

  return (
    <section id="hero" ref={ref} className="hero" aria-labelledby="hero-title">
      <span className="glow" style={{ "--size": "760px", right: "-220px", top: "20%", "--dx": "-80px", "--dy": "40px" }} aria-hidden="true" />
      <span className="glow glow--warm glow--soft" style={{ "--size": "520px", left: "-200px", top: "-120px", "--drift": "22s" }} aria-hidden="true" />

      <div className="shell hero__grid">
        <div className="hero__copy">
          {/* Visually an edit in a notebook, on three lines: a pencil strikes
              out "you into the ground" and writes "on autopilot." in under it.
              Read as one plain sentence. */}
          <h1 id="hero-title" className="display hero__title">
            <span className="sr-only">Your business runs on autopilot.</span>
            <span aria-hidden="true">
              <span className="hero__line">
                <Words text="Your business runs" />
              </span>
              <span className="hero__line">
                <span className="hero__struck">
                  <Words text="you into the ground" start={3} />
                  <Pen className="hero__pen hero__pen--strike" />
                </span>
              </span>
              <span className="hero__line">
                <span className="hero__fix">
                  <span className="hero__insert">
                    <svg className="hero__caret" viewBox="0 0 30 22" focusable="false">
                      <path d="M3 20 L 15 4 L 27 20" pathLength="1" />
                    </svg>
                    on autopilot.
                  </span>
                  <svg className="hero__spark" viewBox="0 0 40 40" focusable="false">
                    <path d="M8 22 L 2 25" pathLength="1" />
                    <path d="M14 12 L 11 4" pathLength="1" />
                    <path d="M25 13 L 32 6" pathLength="1" />
                  </svg>
                  <Pen className="hero__pen hero__pen--write" />
                </span>
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
            <p className="hero__note" aria-hidden="true">
              <svg viewBox="0 0 60 30" focusable="false">
                <path d="M57 20 C 44 8, 24 27, 5 15" pathLength="1" />
                <path d="M13 8.5 L 4.5 15 L 13 20.5" pathLength="1" />
              </svg>
              free, no slides,
              <br />
              just a plan
            </p>
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
