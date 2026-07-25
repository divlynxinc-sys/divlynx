import "../css/trust.css";

const CLIENTS = [
  { src: "/after-realism.png", alt: "After Realism", place: "Australia" },
  { src: "/metastore.webp", alt: "MetaStore", place: "Pakistan" },
  { src: "/elclub.png", alt: "El Club", place: "USA" },
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
        <p className="trust__label">Trusted by teams in Australia, the USA and Pakistan</p>
        <ul className="trust__logos">
          {CLIENTS.map((c) => (
            <li key={c.alt}>
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
