import { useEffect } from "react";

/**
 * Adds `is-in` to every `.reveal` element as it enters the viewport.
 * Elements are visible by default in the prerendered HTML; CSS only holds
 * them back once `html.js` is set, with a timed fallback (see index.css).
 */
export default function useRevealOnScroll(key) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not(.is-in), .draw:not(.is-in), .hl:not(.is-in)"));
    if (!els.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}
