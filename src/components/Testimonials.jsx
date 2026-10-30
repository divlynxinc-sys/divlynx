import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";
import useMediaQuery from "../hooks/useMediaQuery";
import "../css/testimonials.css";

const ITEMS = [
  { quote: "One of the best working experiences, kudos to Divlynx.", company: "After Realism", meta: "Australia · Nov 2024", href: "https://afterrealism.com/" },
  { quote: "We enjoyed working with Divlynx and will likely have additional jobs for them.", company: "El Club", meta: "USA · Mar 2024" },
  { quote: "Execution was swift and outcomes exceeded expectations. Strong recommendation.", company: "MetaStore", meta: "Pakistan · Nov 2023", href: "https://metastore.pk/" },
  { label: "Latest launch", quote: "A live property platform bringing listings, services and enquiries together.", company: "Sincere Capital", meta: "Netherlands", href: "https://www.sincere-estate.nl/" },
  { label: "Live product", quote: "A complete fitness platform for memberships, trainer discovery, and member access.", company: "Range Fit Gym", meta: "Pakistan", href: "https://range-fit-gym.vercel.app/" },
];

function Rating() {
  return <span className="testimonial-card__rating" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <FiStar key={index} aria-hidden />)}</span>;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const move = (direction) => setActive((current) => (current + direction + ITEMS.length) % ITEMS.length);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const timer = window.setInterval(() => move(1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const offsetFor = (index) => {
    let offset = index - active;
    const half = Math.floor(ITEMS.length / 2);
    if (offset > half) offset -= ITEMS.length;
    if (offset < -half) offset += ITEMS.length;
    return offset;
  };

  return (
    <section id="testimonials" className="band testimonials" aria-labelledby="testimonials-title">
      <div className="shell">
        <header className="testimonials__head">
          <p className="eyebrow">Client perspective</p>
          <h2 id="testimonials-title" className="display h2">Good work leaves a <span className="sweep">clear impression</span>.</h2>
        </header>
        <div className="testimonials__carousel" role="region" aria-roledescription="carousel" aria-label="Client feedback and launches" tabIndex={0} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
          <motion.div className="testimonials__stage" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={(_, info) => { if (info.offset.x < -50 || info.velocity.x < -500) move(1); if (info.offset.x > 50 || info.velocity.x > 500) move(-1); }}>
            {ITEMS.map((item, index) => {
              const offset = offsetFor(index);
              const distance = Math.abs(offset);
              const Card = item.href ? motion.a : motion.article;
              return (
                <Card key={item.company} className={`testimonial-card${offset === 0 ? " is-active" : ""}${distance > 2 ? " is-hidden" : ""}`} href={item.href} target={item.href ? "_blank" : undefined} rel={item.href ? "noopener noreferrer" : undefined} style={{ "--card-x": `${offset * 82}%`, "--card-scale": 1 - Math.min(distance, 2) * 0.1, zIndex: 10 - distance }} aria-hidden={offset !== 0} animate={{ opacity: distance > 2 ? 0 : 1 - distance * 0.12 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
                  <span className={item.label ? "testimonial-card__label" : "testimonial-card__mark"} aria-hidden={!item.label}>{item.label || "“"}</span>
                  <Rating />
                  <blockquote>{item.quote}</blockquote>
                  <footer><span className="testimonial-card__identity"><strong>{item.company}</strong><span>{item.meta}</span></span>{item.href && <FiArrowUpRight className="testimonial-card__link-icon" aria-hidden />}</footer>
                </Card>
              );
            })}
          </motion.div>
          <button type="button" className="testimonials__arrow testimonials__arrow--prev" onClick={() => move(-1)} aria-label="Previous testimonial"><FiChevronLeft aria-hidden /></button>
          <button type="button" className="testimonials__arrow testimonials__arrow--next" onClick={() => move(1)} aria-label="Next testimonial"><FiChevronRight aria-hidden /></button>
          <div className="testimonials__nav" aria-label="Choose a testimonial">{ITEMS.map((item, index) => <button key={item.company} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`Show ${item.company}`} aria-current={index === active ? "true" : undefined} />)}</div>
        </div>
      </div>
    </section>
  );
}
