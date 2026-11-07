import { FiArrowUpRight, FiStar } from "../icons.jsx";
import Scribble from "./Scribble";
import "../css/testimonials.css";

const ITEMS = [
  { quote: "One of the best working experiences, kudos to Divlynx.", company: "After Realism", meta: "Australia · Nov 2024", href: "https://afterrealism.com/", rating: 5 },
  { quote: "We enjoyed working with Divlynx and will likely have additional jobs for them.", company: "El Club", meta: "USA · Mar 2024", rating: 5 },
  { quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.", company: "MetaStore", meta: "Pakistan · Nov 2023", href: "https://metastore.pk/", rating: 5 },
  { quote: "A live property platform bringing listings, services and enquiries together.", company: "Sincere Capital", meta: "Netherlands", href: "https://www.sincere-estate.nl/", rating: 5 },
  { quote: "A complete fitness platform for memberships, trainer discovery, and member access.", company: "Range Fit Gym", meta: "Pakistan", href: "https://range-fit-gym.vercel.app/", rating: 5 },
  { quote: "Divlynx gave us a clear, responsive web solution that presents our studio and work with confidence.", company: "Cave Clan Studios", meta: "Web solutions", rating: 5 },
];

/* Each note gets its own paper colour, angle and pin position */
const NOTES = [
  { paper: "amber", tilt: -4, pin: 50, dx: 0, dy: 10, w: 94 },
  { paper: "cream", tilt: 3, pin: 42, dx: 18, dy: 64, w: 88 },
  { paper: "peach", tilt: -2, pin: 56, dx: -8, dy: 0, w: 100 },
  { paper: "cream", tilt: 5, pin: 48, dx: 26, dy: -6, w: 90 },
  { paper: "amber", tilt: -3, pin: 54, dx: -14, dy: 48, w: 96 },
  { paper: "peach", tilt: 2.5, pin: 46, dx: 10, dy: -18, w: 86 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="band quotes" aria-labelledby="testimonials-title">
      <div className="shell">
        <header className="sec-head">
          <h2 id="testimonials-title" className="display h2 reveal">
            What clients say once it is <Scribble variant="circle">live</Scribble>.
          </h2>
          <p className="lede reveal" style={{ "--reveal-delay": "80ms" }}>
            Notes from the teams we built for, pinned up around the studio.
          </p>
        </header>

        <div className="pinboard">
          <ul className="pinboard__notes">
            {ITEMS.map((item, i) => {
              const n = NOTES[i % NOTES.length];
              const Tag = item.href ? "a" : "div";
              return (
                <li
                  key={item.company}
                  className="sticky-wrap reveal"
                  style={{
                    "--reveal-delay": `${i * 90}ms`,
                    "--dx": `${n.dx}px`,
                    "--dy": `${n.dy}px`,
                    "--w": `${n.w}%`,
                  }}>
                  <Tag
                    className={`sticky sticky--${n.paper}`}
                    style={{ "--tilt": `${n.tilt}deg`, "--pin-x": `${n.pin}%` }}
                    {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span className="pin" aria-hidden="true" />
                    <div className="sticky__stars" role="img" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }, (_, s) => <FiStar key={s} aria-hidden />)}
                    </div>
                    <blockquote className="sticky__quote">“{item.quote}”</blockquote>
                    <footer className="sticky__foot">
                      <span>
                        <strong>{item.company}</strong>
                        <small>{item.meta}</small>
                      </span>
                      {item.href && <FiArrowUpRight className="sticky__go" aria-hidden />}
                    </footer>
                  </Tag>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
