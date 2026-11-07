import { useEffect, useRef, useState } from "react";
import Scribble from "./Scribble";

/**
 * A headline number written on the page: counts up once when it scrolls into
 * view, wrapped in a marker stroke, with a handwritten label underneath.
 * The prerendered HTML carries the final value, so it reads correctly
 * without JavaScript and for screen readers.
 */
export default function Stat({ value, prefix = "", suffix = "", unit = "", label, mark = "underline" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div ref={ref} className="stat">
      <dt className="stat__label">{label}</dt>
      <dd className="stat__value">
        <span className="sr-only">{`${prefix}${value}${suffix} ${unit}`.trim()}</span>
        <span aria-hidden="true">
          <Scribble variant={mark}>
            {prefix}
            {shown}
            {suffix}
          </Scribble>
          {unit && <span className="stat__unit">{unit}</span>}
        </span>
      </dd>
    </div>
  );
}
