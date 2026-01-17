import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiMenu,
  FiMoreVertical,
  FiInstagram,
} from "react-icons/fi";
import "../css/navbar.css";

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "Our Impact", href: "#why" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // outside-click handler for mobile and desktop
  useEffect(() => {
    const handleOutside = (e) => {
      if (!open) return;
      const panel = document.querySelector(".drawer__panel");
      const toggleBtn = document.querySelector(".navbar__toggle");

      // Ignore clicks/taps on the toggle button itself
      if (toggleBtn && toggleBtn.contains(e.target)) return;

      // Close only if the event target is outside the panel
      if (panel && !panel.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutside, { passive: true });
    document.addEventListener("touchstart", handleOutside, { passive: true });

    return () => {
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);
  const handleNavClick = (e, href) => {
    // Intercept default anchor to ensure smooth scroll and proper offset
    e.preventDefault();
    e.stopPropagation();

    console.log("Nav click triggered:", href); // Debug log

    // Close sidebar immediately for better UX
    setOpen(false);

    // Small delay to ensure smooth transition
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        console.log("Scrolling to target:", target); // Debug log
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start",
        });
        // Update URL hash without reflowing
        history.replaceState(null, "", href);
      } else {
        console.log("Target not found:", href); // Debug log
      }
    }, 200);
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar glass-liquid">
      <div className="navbar__wrap">
        <a
          href="#top"
          className="navbar__brand"
          aria-label="Divlynx Home"
          onClick={(e) => handleNavClick(e, "#top")}>
          <img src="/divlynx-logo.png" alt="Divlynx" className="navbar__logo" />
        </a>
        <ul className="navbar__menu">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, item.href)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__actions">
          <a
            href="https://www.linkedin.com/company/divlynx/"
            target="_blank"
            rel="noopener"
            className="btn--nav btn--linkedin"
            title="LinkedIn">
            <FiLinkedin /> <span className="hide-sm">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/divlynxinc?igsh=bmN1Z2o1eDJvbDZh"
            target="_blank"
            rel="noopener"
            className="btn--nav btn--instagram"
            title="Instagram">
            <FiInstagram /> <span className="hide-sm">Instagram</span>
          </a>
        </div>
        <button
          className={`navbar__toggle${open ? " is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}>
          <span className="toggle-lines" aria-hidden>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </span>
        </button>
      </div>
      <div
        className={`navbar__drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={() => setOpen(false)}>
        <aside
          className="drawer__panel"
          onClick={(e) => e.stopPropagation()}
          style={{ pointerEvents: "auto" }}>
          <ul className="drawer__menu">
            {navItems
              .filter((item) => item.href !== "#vision")
              .map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="drawer__link"
                    onClick={(e) => handleNavClick(e, item.href)}
                    style={{ pointerEvents: "auto", cursor: "pointer" }}>
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </motion.nav>
  );
}
