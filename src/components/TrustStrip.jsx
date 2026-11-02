import "../css/trust.css";

const CLIENTS = [
  { src: "/assets/clients/after-realism.png", alt: "After Realism", place: "Australia", className: "is-after-realism" },
  { src: "/assets/clients/metastore.webp", alt: "MetaStore", place: "Pakistan", className: "is-metastore" },
  { src: "/assets/clients/el-club.png", alt: "El Club", place: "USA", className: "is-elclub" },
  { src: "/assets/clients/sincere-capital.png", alt: "Sincere Capital", place: "Netherlands", className: "is-sincere" },
  { src: "/assets/clients/range-fit-gym.jpeg", alt: "Range Fit Gym", place: "Pakistan", className: "is-range-fit" },
];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Clients">
      <div className="shell trust__head">
        <p className="trust__label">Trusted by teams worldwide</p>
      </div>

      <div className="trust__marquee">
        <div className="trust__track">
          {[0, 1].map((copy) => (
            <ul className="trust__logos" aria-hidden={copy === 1 ? "true" : undefined} key={copy}>
              {CLIENTS.map((c) => (
                <li key={`${copy}-${c.alt}`} className={c.className || undefined}>
                  <img src={c.src} alt={copy === 0 ? c.alt : ""} loading="lazy" decoding="async" />
                  <span>{c.alt}</span>
                  <small>{c.place}</small>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
