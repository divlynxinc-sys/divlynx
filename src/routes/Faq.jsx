import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "../icons.jsx";
import { FAQS } from "../data/faqs";
import "../css/studio.css";
import "../css/faq-page.css";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="band faq-page">
      <div className="shell">
        <header className="faq__head">
          <div>
            <p className="eyebrow">Frequently asked questions</p>
            <h1 className="display faq__title">
              Clear answers before <span className="sweep">we start</span>.
            </h1>
          </div>
          <p className="faq__intro">
            Practical details about fit, pricing, ownership, security and delivery. If your
            question is not covered, send it directly and we will answer without a sales script.
          </p>
        </header>

        <ul className="faq__list">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}>
                  <span>{item.q}</span>
                  <FiPlus className="faq__icon" aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
