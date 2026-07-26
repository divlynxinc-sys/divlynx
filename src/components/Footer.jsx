import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiInstagram, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import Logo from "./Logo";
import { ADDRESS, CALENDLY, EMAIL, MAP_URL, NAV, SOCIAL, scrollToId } from "../site";
import "../css/footer.css";

const SERVICES = [
  "AI automation",
  "AI voice agents",
  "n8n & integrations",
  "Web design & development",
  "Mobile apps",
  "Cloud, data & DevOps",
];

export default function Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const goHash = (e, href) => {
    if (!onHome) return; // Let the router handle the /#hash navigation.
    e.preventDefault();
    scrollToId(href);
  };

  /** Section links become /#section when we are not on the home page. */
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
        <div className="foot__cta">
          <div>
            <h2 className="display foot__headline">
              Got a process that should <span className="sweep">run itself</span>?
            </h2>
            <p className="foot__sub">
              One call. We will tell you honestly whether it is worth building.
            </p>
          </div>
          <div className="foot__cta-actions">
            {onHome ? (
              <a href="#contact" className="btn btn--primary" onClick={(e) => goHash(e, "#contact")}>
                Start a project <FiArrowUpRight aria-hidden />
              </a>
            ) : (
              <Link to="/#contact" className="btn btn--primary">
                Start a project <FiArrowUpRight aria-hidden />
              </Link>
            )}
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              Book a call
            </a>
          </div>
        </div>

        <div className="foot__cols">
          <div className="foot__brand">
            <Logo className="foot__logo" />
            <p className="foot__blurb">
              A software studio building AI automation, voice agents and the products they run on.
            </p>
            <a href={`mailto:${EMAIL}`} className="foot__mail">
              <FiMail aria-hidden /> {EMAIL}
            </a>

            <a
              href={MAP_URL}
              className="foot__address"
              target="_blank"
              rel="noopener noreferrer">
              <FiMapPin aria-hidden />
              <address>
                {ADDRESS.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </a>
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
                  {n.kind === "route" ? (
                    <Link to={n.href}>{n.label}</Link>
                  ) : (
                    hashLink(n.href, n.label, n.href)
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="foot__bar">
          <p className="foot__legal">
            © {new Date().getFullYear()} Divlynx Inc. All rights reserved.
          </p>
          <div className="foot__social">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
