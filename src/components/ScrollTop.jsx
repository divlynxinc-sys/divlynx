import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import "../css/scrolltop.css";

export default function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          className="to-top"
          aria-label="Back to top"
          onClick={toTop}
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          <FiArrowUp aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
