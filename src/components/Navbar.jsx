import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiChevronDown, FiMenu, FiX } from "../icons.jsx";
import Logo from "./Logo";
import { EMAIL, NAV, PHONE, PHONE_HREF, scrollToId } from "../site";
import "../css/navbar.css";

const NAV_DRAWERS = {
  "/case-studies": {
    label: "Selected case studies",
    columns: [
      {
        title: "Products & platforms",
        links: [
          { label: "Sincere Capital", note: "Property platform", href: "/case-studies#case-sincere-capital" },
          { label: "JobSynk AI", note: "AI career product", href: "/case-studies#case-jobsynk-ai" },
          { label: "JeeUstaad", note: "Services marketplace", href: "/case-studies#case-jeeustaad" },
        ],
      },
      {
        title: "Web & commerce",
        links: [
          { label: "After Realism", note: "Geospatial consultancy", href: "/case-studies#case-after-realism" },
          { label: "Range Fit Gym", note: "Membership platform", href: "/case-studies#case-range-fit-gym" },
          { label: "MetaStore", note: "Subscriptions marketplace", href: "/case-studies#case-metastore" },
        ],
      },
    ],
  },
  "/blog": {
    label: "Journal topics",
    columns: [
      {
        title: "AI systems",
        links: [
          { label: "Claude AI in production", href: "/blog/claude-ai-in-production" },
          { label: "AI skills vs tools", href: "/blog/ai-skills-vs-tools" },
          { label: "What makes an AI agent", href: "/blog/what-makes-an-ai-agent" },
        ],
      },
      {
        title: "Automation practice",
        links: [
          { label: "Agentic AI without hype", href: "/blog/agentic-ai-without-the-hype" },
          { label: "Choosing first automation", href: "/blog/how-to-choose-your-first-automation" },
          { label: "n8n vs Zapier vs Make", href: "/blog/n8n-vs-zapier-vs-make" },
        ],
      },
    ],
  },
};

function NavMega({ item, drawer, onHash, onClose }) {
  return (
    <div className={`nav-mega nav-mega--${item.label.toLowerCase().replaceAll(" ", "-")}`}>
      <div className="nav-mega__columns">
        {drawer.columns.map((column) => (
          <div key={column.title} className="nav-mega__column">
            <ul>
              {column.links.map((entry) => {
                const link = typeof entry === "string" ? { label: entry, href: "#services" } : entry;
                return (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a href={link.href} onClick={(event) => onHash(event, link.href)}>
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <Link to={link.href} onClick={onClose}>
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="nav-mega__foot">
        {item.kind === "hash" ? (
          <a href={item.href} onClick={(event) => onHash(event, item.href)}>View all {item.label.toLowerCase()} <FiArrowUpRight /></a>
        ) : (
          <Link to={item.href} onClick={onClose}>View all {item.label.toLowerCase()} <FiArrowUpRight /></Link>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.3 });
  // The marker line is revealed (not stretched) so its hand-drawn wave keeps its shape;
  // the pencil rides the leading edge.
  const progressClip = useTransform(progress, (v) => `inset(0 ${100 - v * 100}% 0 0)`);
  const pencilX = useTransform(progress, (v) => `calc(${v * 100}vw - ${v * 26}px)`);
  const pencilOpacity = useTransform(progress, [0, 0.015], [0, 1]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy only makes sense on the page that owns those sections.
  useEffect(() => {
    if (!onHome) {
      // Longest match first, so /blog/a-post still lights up /blog.
      const route = NAV.filter((n) => n.kind === "route")
        .sort((a, b) => b.href.length - a.href.length)
        .find((n) => pathname.startsWith(n.href));
      setActive(route ? route.href : "");
      return;
    }

    const sections = NAV.filter((n) => n.kind === "hash")
      .map((n) => document.querySelector(n.href))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** Hash links scroll when we are already on the home page, navigate otherwise. */
  const goHash = (e, href) => {
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);

    if (!onHome) {
      navigate(`/${href}`);
      return;
    }
    setTimeout(() => scrollToId(href), wasOpen ? 240 : 0);
  };

  const isActive = (item) => (item.kind === "route" ? active === item.href : active === item.href);

  return (
    <>
      <motion.header
        className={`nav${lifted ? " is-lifted" : ""}`}
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="nav__inner">
          <a
            href={onHome ? "#hero" : "/#hero"}
            className="nav__brand"
            aria-label="Divlynx, home"
            onClick={(event) => goHash(event, "#hero")}>
            <Logo />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) => {
              const drawer = NAV_DRAWERS[item.href];
              return (
                <div key={item.href} className={`nav__item${drawer ? " has-drawer" : ""}`}>
                  {item.kind === "route" ? (
                <Link
                  to={item.href}
                  className={`nav__link${isActive(item) ? " is-active" : ""}`}
                  aria-haspopup={drawer ? "true" : undefined}
                  onClick={() => setOpen(false)}>
                  {item.label}
                  {drawer && <FiChevronDown className="nav__link-chevron" aria-hidden />}
                </Link>
              ) : (
                <a
                  href={onHome ? item.href : `/${item.href}`}
                  className={`nav__link${isActive(item) ? " is-active" : ""}`}
                  aria-haspopup={drawer ? "true" : undefined}
                  onClick={(e) => goHash(e, item.href)}>
                  {item.label}
                  {drawer && <FiChevronDown className="nav__link-chevron" aria-hidden />}
                </a>
                  )}
                  {drawer && <NavMega item={item} drawer={drawer} onHash={goHash} onClose={() => setOpen(false)} />}
                </div>
              );
            })}
          </nav>

          <div className="nav__end">
            <button
              type="button"
              className="nav__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}>
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <div className="nav__progress" aria-hidden="true">
          <motion.span className="nav__progress-line" style={{ clipPath: progressClip }} />
          <motion.span className="nav__progress-pencil" style={{ x: pencilX, opacity: pencilOpacity }}>
            <svg viewBox="0 0 28 14" focusable="false">
              <path d="M1 7 L 7 4.2 L 24 4.2 C 26 4.2, 27 5.4, 27 7 C 27 8.6, 26 9.8, 24 9.8 L 7 9.8 Z" fill="#f78400" />
              <path d="M1 7 L 7 4.2 L 7 9.8 Z" fill="#f6efdf" />
              <path d="M1 7 L 3.2 6 L 3.2 8 Z" fill="#1d150c" />
              <path d="M21 4.2 L 21 9.8" stroke="#1d150c" stroke-opacity=".45" stroke-width="1" />
            </svg>
          </motion.span>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}>
            <motion.aside
              className="drawer__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}>
              {NAV.map((item, i) => {
                const inner = (
                  <>
                    <span className="drawer__index">{i + 1}.</span>
                    <span className="drawer__label">{item.label}</span>
                  </>
                );
                return item.kind === "route" ? (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}>
                    <Link
                      to={item.href}
                      className={`drawer__link${isActive(item) ? " is-active" : ""}`}
                      aria-current={isActive(item) ? "page" : undefined}
                      onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.href}
                    href={onHome ? item.href : `/${item.href}`}
                    className={`drawer__link${isActive(item) ? " is-active" : ""}`}
                    onClick={(e) => goHash(e, item.href)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}>
                    {inner}
                  </motion.a>
                );
              })}

              <motion.div
                className="drawer__foot"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + NAV.length * 0.05, duration: 0.4 }}>
                <a
                  href={onHome ? "#contact" : "/#contact"}
                  className="btn btn--primary drawer__cta"
                  onClick={(e) => goHash(e, "#contact")}>
                  Start a project <FiArrowUpRight aria-hidden />
                </a>
                <p className="drawer__reach">or reach us directly</p>
                <a className="drawer__contact" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <a className="drawer__contact" href={`tel:${PHONE_HREF}`}>{PHONE}</a>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
