/**
 * Single source of truth for company details.
 * Anything a non-developer might need to change lives here.
 */

export const EMAIL = import.meta.env.VITE_CONTACT_TO_EMAIL || "divlynx.inc@gmail.com";
export const PHONE = "+92 309 5222648";
export const PHONE_HREF = "+923095222648";
export const OFFICE = "Blue Area, Islamabad, Pakistan";

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
  { label: "Work", href: "#work", kind: "hash" },
  { label: "Testimonials", href: "#testimonials", kind: "hash" },
  { label: "Case studies", href: "/case-studies", kind: "route" },
  { label: "Journal", href: "/blog", kind: "route" },
  { label: "About", href: "/about", kind: "route" },
  { label: "Team", href: "#team", kind: "hash" },
  { label: "Careers", href: "/careers", kind: "route" },
  { label: "FAQ", href: "/faq", kind: "route" },
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

/* ------------------------------------------------------------------------
   In-page smooth scrolling.

   The browser's built-in smooth scroll aims at a position computed once, on
   click. If anything above the target changes height mid-scroll (for example
   the services panel swapping content on hover), Chrome cancels it and the page
   stops part-way. This version re-measures the target every frame, eases in and
   out, and hands control back the moment the visitor scrolls themselves.
   ------------------------------------------------------------------------ */

let activeScroll = null;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function cancelActiveScroll() {
  if (activeScroll) activeScroll();
}

function smoothScrollTo(target) {
  cancelActiveScroll();

  const offset = () => parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const destination = () => window.scrollY + target.getBoundingClientRect().top - offset();

  const startY = window.scrollY;
  const distance = Math.abs(destination() - startY);
  // Longer trips take longer, within limits that still feel responsive.
  const duration = Math.min(1100, Math.max(450, distance * 0.32));
  const startTime = performance.now();
  const root = document.documentElement;
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    delete root.dataset.autoscroll;
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
    window.removeEventListener("keydown", stop);
    activeScroll = null;
  };

  const step = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    const y = startY + (destination() - startY) * easeInOutCubic(t);
    window.scrollTo({ top: y, behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else stop();
  };

  root.dataset.autoscroll = "true"; // lets hover effects stand down mid-scroll
  // A real scroll from the visitor always wins.
  window.addEventListener("wheel", stop, { passive: true });
  window.addEventListener("touchstart", stop, { passive: true });
  window.addEventListener("keydown", stop);
  activeScroll = stop;
  frame = requestAnimationFrame(step);
}

/**
 * Smooth-scrolls to an in-page anchor, honouring reduced-motion.
 *
 * A target can be a few hundred milliseconds behind the click on a cold load,
 * so retry briefly rather than silently doing nothing.
 */
export function scrollToId(href, tries = 0) {
  const target = document.querySelector(href);

  if (!target) {
    if (tries < 30) setTimeout(() => scrollToId(href, tries + 1), 50);
    return;
  }

  history.replaceState(null, "", href);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    target.scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }
  smoothScrollTo(target);
}

/** True while scrollToId is animating, so hover effects can hold still. */
export const isAutoScrolling = () => document.documentElement.dataset.autoscroll === "true";
