import "../css/trust.css";

const CLIENTS = [
  { src: "/assets/clients/after-realism.png", alt: "After Realism", place: "Australia", className: "is-after-realism" },
  { src: "/assets/clients/metastore.webp", alt: "MetaStore", place: "Pakistan", className: "is-metastore" },
  { src: "/assets/clients/el-club.png", alt: "El Club", place: "USA", className: "is-elclub" },
  { src: "/assets/clients/sincere-capital.png", alt: "Sincere Capital", place: "Netherlands", className: "is-sincere" },
  { src: "/assets/clients/range-fit-gym.jpeg", alt: "Range Fit Gym", place: "Pakistan", className: "is-range-fit" },
];

const ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const STACK = [
  ["react", "react-original"],
  ["nextjs", "nextjs-original"],
  ["typescript", "typescript-original"],
  ["nodejs", "nodejs-original"],
  ["python", "python-original"],
  ["fastapi", "fastapi-original"],
  ["postgresql", "postgresql-original"],
  ["mongodb", "mongodb-original"],
  ["docker", "docker-original"],
  ["kubernetes", "kubernetes-plain"],
  ["amazonwebservices", "amazonwebservices-original-wordmark"],
  ["googlecloud", "googlecloud-original"],
  ["terraform", "terraform-original"],
  ["tensorflow", "tensorflow-original"],
  ["pytorch", "pytorch-original"],
  ["flutter", "flutter-original"],
  ["swift", "swift-original"],
  ["kotlin", "kotlin-original"],
  ["tailwindcss", "tailwindcss-original"],
  ["supabase", "supabase-original"],
  ["redis", "redis-original"],
  ["githubactions", "githubactions-original"],
];

export default function TrustStrip() {
  const track = [...STACK, ...STACK];

  return (
    <section className="trust" aria-label="Clients and technology">
      <div className="shell trust__clients">
        <p className="trust__label">Trusted by teams worldwide</p>
        <ul className="trust__logos">
          {CLIENTS.map((c) => (
            <li key={c.alt} className={c.className || undefined}>
              <img src={c.src} alt={c.alt} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {track.map(([dir, file], i) => (
            <img
              key={`${dir}-${i}`}
              className={`marquee__icon${/nextjs|githubactions/.test(dir) ? " is-inverted" : ""}`}
              src={`${ICON}/${dir}/${file}.svg`}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => e.currentTarget.remove()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
