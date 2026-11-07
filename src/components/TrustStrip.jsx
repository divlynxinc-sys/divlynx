import Stat from "./Stat";
import "../css/trust.css";

/* `contain` marks are transparent artwork; the rest are full-bleed images. */
const CLIENTS = [
  { src: "/assets/clients/after-realism.webp", alt: "After Realism", place: "Australia", contain: true },
  { src: "/assets/clients/metastore-logo.webp", alt: "MetaStore", place: "Pakistan", contain: true },
  { src: "/assets/clients/el-club.webp", alt: "El Club", place: "USA" },
  { src: "/assets/clients/sincere-capital.webp", alt: "Sincere Capital", place: "Netherlands", contain: true, dark: true },
  { src: "/assets/clients/range-fit-gym.webp", alt: "Range Fit Gym", place: "Pakistan" },
  { src: "/assets/clients/cave-clan.webp", alt: "Cave Clan Studios", place: "Pakistan" },
];

const TILTS = [-5, 4, -3, 6, -4, 3];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Clients">
      <div className="shell trust__head">
        <p className="trust__label">trusted by teams globally</p>
        {/* label sits after the value visually (column-reverse) but first in the DOM, as dt/dd require */}
        <dl className="trust__stats">
          <Stat value={30} suffix="+" label="projects shipped" mark="underline" />
          <Stat value={20} suffix="+" label="clients worldwide" mark="circle" />
          <Stat value={4} prefix="~" unit="wks" label="to first release" mark="squiggle" />
        </dl>
      </div>

      {/* Client logos as stickers on the page. The row keeps moving; it is decorative,
          and every client is also listed by name for assistive tech below. */}
      <ul className="sr-only">
        {CLIENTS.map((c) => <li key={c.alt}>{c.alt}, {c.place}</li>)}
      </ul>

      <div className="trust__marquee" aria-hidden="true">
        <div className="trust__track">
          {[0, 1].map((copy) => (
            <ul className="trust__row" key={copy}>
              {CLIENTS.map((c, i) => (
                <li key={`${copy}-${c.alt}`} className="sticker" style={{ "--tilt": `${TILTS[i]}deg` }}>
                  <span className={`sticker__badge${c.contain ? " is-contain" : ""}${c.dark ? " is-dark" : ""}`}>
                    <img src={c.src} alt="" width="160" height="160" loading="lazy" decoding="async" />
                  </span>
                  <span className="sticker__text">
                    <span className="sticker__name">{c.alt}</span>
                    <span className="sticker__place">{c.place}</span>
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
