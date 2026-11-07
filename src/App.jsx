import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Home from "./routes/Home";
import CaseStudies from "./routes/CaseStudies";
import About from "./routes/About";
import Faq from "./routes/Faq";
import CareersPage from "./routes/CareersPage";
import BlogIndex from "./routes/BlogIndex";
import BlogPost from "./routes/BlogPost";
import NotFound from "./routes/NotFound";
import Privacy from "./routes/Privacy";
import CookieNotice from "./components/CookieNotice";
import { metaForPath } from "./seo";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import "./css/sketch.css";

/**
 * Keeps the document head in sync during client-side navigation. The initial
 * values are baked into the prerendered HTML; this only handles what happens
 * after a link click.
 */
function useDocumentMeta() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = metaForPath(pathname);
    document.title = meta.title;

    const set = (selector, attr, value) => {
      const el = document.head.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    set('meta[name="description"]', "content", meta.description);
    set('link[rel="canonical"]', "href", meta.canonical);
    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.description);
    set('meta[property="og:url"]', "content", meta.canonical);
    set('meta[name="twitter:title"]', "content", meta.title);
    set('meta[name="twitter:description"]', "content", meta.description);
    set('meta[name="robots"]', "content", meta.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  }, [pathname]);

  // Route changes start at the top; in-page hashes scroll to their target.
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function App() {
  useDocumentMeta();
  const { pathname } = useLocation();
  useRevealOnScroll(pathname);

  return (
    /* MotionConfig honours prefers-reduced-motion for every framer-motion
       animation below, CSS alone cannot, since those are inline styles. */
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Wobble filter for the hand-drawn frames behind project screenshots
          (work.css): makes a straight border read as pen on paper. */}
      <svg className="sr-only" aria-hidden="true" focusable="false">
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="1" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div className="page" id="top">
        <Navbar />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ScrollTop />
        <CookieNotice />
      </div>
    </MotionConfig>
  );
}
