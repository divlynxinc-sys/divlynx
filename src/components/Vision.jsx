import { motion } from "framer-motion";
import "../css/vision.css";
import ScrollHint from "./ScrollHint";

export default function Vision() {
  return (
    <section id="vision" className="section vision-section">
      <motion.div
        className="section-header container-narrow"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        {/*<p className="label">★ OUR VISION</p>*/}
        <div className="vision-card">
          <div className="vision-decor" aria-hidden="true">
            <img
              src="/bg1.png"
              alt=""
              className="decor-left"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
            <img
              src="/bg2.png"
              alt=""
              className="decor-right"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
            />
          </div>
          <div className="vision-content">
            <h2 className="title-section mb-sm">At Divlynx,</h2>
            <p className="vision-quote">
              “Our vision is to revolutionize the tech landscape by creating
              innovative software solutions that empower businesses to thrive in
              a digital world.”
            </p>
            {/*<p className="vision-foot">Together, we’re shaping the future, one line of code at a time.</p>*/}
          </div>
        </div>
      </motion.div>
      <ScrollHint target="#why" ariaLabel="Scroll to why choose us" />
    </section>
  );
}
