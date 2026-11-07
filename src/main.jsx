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

/* Hide the sketchbook loader (index.html) once everything has loaded. It only
   ever became visible if loading took longer than ~0.5s. */
const boot = document.getElementById("boot");
if (boot) {
  const hide = () => {
    boot.classList.add("is-done");
    window.setTimeout(() => boot.remove(), 500);
  };
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide, { once: true });
}
