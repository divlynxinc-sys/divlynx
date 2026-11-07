import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from "../icons.jsx";
import Logo from "./Logo";
import { CALENDLY, EMAIL, NAV, OFFICE, PHONE, PHONE_HREF, SOCIAL, scrollToId } from "../site";
import "../css/footer.css";
import Scribble from "./Scribble";

const SERVICES = [
  "AI automation",
  "AI voice agents",
  "n8n & integrations",
  "Web design & development",
  "Mobile apps",
  "Cloud, data & DevOps",
  "Game development",
  "POS systems",
  "SEO",
  "Digital advertising",
];

export default function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const goHash = (e, href) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToId(href);
  };

  const hashLink = (href, children, key) =>
    onHome ? (
      <a key={key} href={href} onClick={(e) => goHash(e, href)}>
        {children}
      </a>
    ) : (
      <Link key={key} to={`/${href}`}>
        {children}
      </Link>
    );

  return (
    <footer className="foot">
      <div className="shell">
        {/* The home page closes on the contact section, so the CTA would repeat it there. */}
        {!onHome && (
          <div className="foot__cta">
            <h2 className="display foot__headline">
              Got a process that should <Scribble variant="underline">run itself</Scribble>?
            </h2>
            <div className="foot__cta-side">
              <p className="foot__sub">One call. We will tell you honestly whether it is worth building.</p>
              <div className="foot__cta-actions">
                <Link to="/#contact" className="btn btn--primary">
                  Start a project <FiArrowUpRight aria-hidden />
                </Link>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  Book a call
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="foot__cols">
          <div className="foot__brand">
            <Logo variant="stacked" className="foot__logo" />
            <p className="foot__blurb">
              A software studio building AI automation, voice agents and the products they run on.
            </p>
            <address className="foot__contact">
              <a href={`mailto:${EMAIL}`}><FiMail aria-hidden /><span>{EMAIL}</span></a>
              <a href={`tel:${PHONE_HREF}`}><FiPhone aria-hidden /><span>{PHONE}</span></a>
              <span><FiMapPin aria-hidden /><span>{OFFICE}</span></span>
            </address>
          </div>

          <nav className="foot__col" aria-label="Services">
            <h3 className="foot__col-title">Services</h3>
            <ul>
              {SERVICES.map((s) => (
                <li key={s}>{hashLink("#services", s, s)}</li>
              ))}
            </ul>
          </nav>

          <nav className="foot__col" aria-label="Company">
            <h3 className="foot__col-title">Company</h3>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  {n.kind === "route" ? <Link to={n.href}>{n.label}</Link> : hashLink(n.href, n.label, n.href)}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="foot__bar">
          <p>© {new Date().getFullYear()} Divlynx Inc. Islamabad, working worldwide.</p>
          <div className="foot__bar-end">
            <Link to="/privacy">Privacy & cookies</Link>
            <div className="foot__social">
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Divlynx on LinkedIn">
                <FiLinkedin aria-hidden />
              </a>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Divlynx on Instagram">
                <FiInstagram aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
