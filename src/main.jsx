import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Pages are prerendered at build time, so attach to the existing markup rather
// than throwing it away. Falls back to a fresh render in dev.
if (root.hasChildNodes()) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}

function replayHeroEntrance() {
  const hero = document.querySelector(".hero");
  if (!hero || !document.getAnimations) return;
  window.dispatchEvent(new Event("hero:replay"));
  document.getAnimations().forEach((a) => {
    const el = a.effect && a.effect.target;
    if (el && el.closest && el.closest(".hero")) {
      a.currentTime = 0;
      a.play();
    }
  });
  // The highlighter is a transition: re-arm it so it sweeps again.
  hero.querySelectorAll(".hl[data-in]").forEach((el) => {
    el.removeAttribute("data-in");
    requestAnimationFrame(() => requestAnimationFrame(() => { el.dataset.in = ""; }));
  });
}

/* Hide the sketchbook loader (index.html) once everything has loaded. It only
   ever became visible if loading took longer than ~0.5s. */
const boot = document.getElementById("boot");
if (boot) {
  const hide = () => {
    // If the loader actually showed (slow connection), the hero's entrance has
    // already played underneath it. Replay it so visitors see it.
    const wasShown = parseFloat(getComputedStyle(boot).opacity) > 0;
    boot.classList.add("is-done");
    window.setTimeout(() => boot.remove(), 500);
    if (wasShown) replayHeroEntrance();
  };
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
}
