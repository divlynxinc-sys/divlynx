import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import Home from "./routes/Home";
import CaseStudies from "./routes/CaseStudies";
import BlogIndex from "./routes/BlogIndex";
import BlogPost from "./routes/BlogPost";
import NotFound from "./routes/NotFound";
import { metaForPath } from "./seo";

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

  return (
    /* MotionConfig honours prefers-reduced-motion for every framer-motion
       animation below, CSS alone cannot, since those are inline styles. */
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="aurora" aria-hidden="true" />
      <div className="grid-veil" aria-hidden="true" />

      <div className="page" id="top">
        <Navbar />

        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        <ScrollTop />
      </div>
    </MotionConfig>
  );
}
