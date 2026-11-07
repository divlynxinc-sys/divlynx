import { useEffect } from "react";

/**
 * Marks every `.reveal`, `.draw` and `.hl` element with `data-in` as it enters
 * the viewport. A data attribute rather than a class: React rewrites className
 * whenever a component re-renders (e.g. a card toggling `is-active`), which
 * would silently strip a class added here and hide the element again.
 * Elements are visible by default in the prerendered HTML; CSS only holds
 * them back once `html.js` is set, with a timed fallback (see index.css).
 */
export default function useRevealOnScroll(key) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal:not([data-in]), .draw:not([data-in]), .hl:not([data-in])"));
    if (!els.length) return undefined;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => { el.dataset.in = ""; });
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.in = "";
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
