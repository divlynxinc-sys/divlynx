import { FiArrowUpRight } from "../icons.jsx";
import "../css/testimonials.css";

const ITEMS = [
  { quote: "One of the best working experiences, kudos to Divlynx.", company: "After Realism", meta: "Australia · Nov 2024", href: "https://afterrealism.com/", tone: "amber", rating: 5 },
  { quote: "We enjoyed working with Divlynx and will likely have additional jobs for them.", company: "El Club", meta: "USA · Mar 2024", tone: "blue", rating: 5 },
  { quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.", company: "MetaStore", meta: "Pakistan · Nov 2023", href: "https://metastore.pk/", tone: "violet", rating: 5 },
  { quote: "A live property platform bringing listings, services and enquiries together.", company: "Sincere Capital", meta: "Netherlands", href: "https://www.sincere-estate.nl/", tone: "coral", rating: 5 },
  { quote: "A complete fitness platform for memberships, trainer discovery, and member access.", company: "Range Fit Gym", meta: "Pakistan", href: "https://range-fit-gym.vercel.app/", tone: "green", rating: 5 },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="band testimonials" aria-labelledby="testimonials-title">
      <div className="shell">
        <header className="testimonials__head">
          <p className="eyebrow">Client perspective</p>
          <h2 id="testimonials-title" className="display h2">
            Good work leaves a <span className="sweep">clear impression</span>.
          </h2>
        </header>

        <div className="notes" role="list" aria-label="Client testimonials">
          <div className="notes__connector" aria-hidden />
          <div className="notes__track">
            {ITEMS.map((item, index) => {
              const Note = item.href ? "a" : "article";
              return (
                <Note
                  key={item.company}
                  className={`note note--${item.tone}`}
                  role="listitem"
                  href={item.href}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                  >
                  <div className="note__sway">
                    <span className="note__pin" aria-hidden><i /></span>
                    <div className="note__paper">
                      <span className="note__number">{String(index + 1).padStart(2, "0")}</span>
                      <blockquote>{item.quote}</blockquote>
                      <div className="note__rating" aria-label={`${item.rating} out of 5 stars`}>
                        {Array.from({ length: item.rating }, (_, star) => (
                          <img key={star} src="/assets/icons/star.png" alt="" aria-hidden />
                        ))}
                      </div>
                      <footer>
                        <span><strong>{item.company}</strong><small>{item.meta}</small></span>
                        {item.href && <FiArrowUpRight aria-hidden />}
                      </footer>
                    </div>
                  </div>
                </Note>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
