import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import { NAV, scrollToId } from "../site";
import "../css/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [active, setActive] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.3 });

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
          <Link to="/" className="nav__brand" aria-label="Divlynx — home">
            <Logo />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {NAV.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav__link${isActive(item) ? " is-active" : ""}`}
                  onClick={() => setOpen(false)}>
                  {item.label}
                  {isActive(item) && (
                    <motion.span className="nav__link-dot" layoutId="nav-dot" transition={{ duration: 0.35 }} />
                  )}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={onHome ? item.href : `/${item.href}`}
                  className={`nav__link${isActive(item) ? " is-active" : ""}`}
                  onClick={(e) => goHash(e, item.href)}>
                  {item.label}
                  {isActive(item) && (
                    <motion.span className="nav__link-dot" layoutId="nav-dot" transition={{ duration: 0.35 }} />
                  )}
                </a>
              )
            )}
          </nav>

          <div className="nav__end">
            <a
              href={onHome ? "#contact" : "/#contact"}
              className="btn btn--primary nav__cta"
              onClick={(e) => goHash(e, "#contact")}>
              Start a project <FiArrowUpRight aria-hidden />
            </a>
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

        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
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
                    <span className="drawer__index">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </>
                );
                return item.kind === "route" ? (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}>
                    <Link to={item.href} className="drawer__link" onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.href}
                    href={onHome ? item.href : `/${item.href}`}
                    className="drawer__link"
                    onClick={(e) => goHash(e, item.href)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}>
                    {inner}
                  </motion.a>
                );
              })}
              <a
                href={onHome ? "#contact" : "/#contact"}
                className="btn btn--primary drawer__cta"
                onClick={(e) => goHash(e, "#contact")}>
                Start a project <FiArrowUpRight aria-hidden />
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
