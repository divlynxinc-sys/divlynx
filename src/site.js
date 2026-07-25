/**
 * Single source of truth for company details.
 * Anything a non-developer might need to change lives here.
 */

export const EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || "info@divlynx.com";

export const CALENDLY =
  import.meta.env.VITE_CALENDLY_URL ||
  "https://calendly.com/divlynx-inc/book-a-call-30-mins";

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/divlynx/",
  instagram: "https://www.instagram.com/divlynxinc?igsh=bmN1Z2o1eDJvbDZh",
};

/**
 * `hash` entries are sections of the home page; `route` entries are real pages.
 * Navbar and Footer both read this list.
 */
export const NAV = [
  { label: "Services", href: "#services", kind: "hash" },
  { label: "How we work", href: "#process", kind: "hash" },
  { label: "Work", href: "#work", kind: "hash" },
  { label: "Journal", href: "/blog", kind: "route" },
  { label: "Studio", href: "#studio", kind: "hash" },
  { label: "Contact", href: "#contact", kind: "hash" },
];

/** Opens the visitor's webmail compose window pre-addressed to us. */
export function composeUrl(subject = "Project enquiry", body = "") {
  const provider = (import.meta.env.VITE_DEFAULT_WEBMAIL || "gmail").toLowerCase();
  const to = encodeURIComponent(EMAIL);
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);

  if (provider === "outlook") {
    return `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${su}&body=${bd}`;
  }
  if (provider === "yahoo") {
    return `https://compose.mail.yahoo.com/?to=${to}&subject=${su}&body=${bd}`;
  }
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}&tf=1`;
}

/**
 * Smooth-scrolls to an in-page anchor, honouring reduced-motion.
 *
 * Sections are code-split, so a target can be a few hundred milliseconds behind
 * the click on a cold load. Retry briefly rather than silently doing nothing.
 */
export function scrollToId(href, tries = 0) {
  const target = document.querySelector(href);

  if (!target) {
    if (tries < 30) setTimeout(() => scrollToId(href, tries + 1), 50);
    return;
  }

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", href);
}
