/**
 * Sketchbook marks: hand-drawn strokes that "draw" themselves once the
 * element scrolls into view (see `.draw` in index.css and useRevealOnScroll).
 * Every path uses pathLength="1" so one dash animation fits any shape.
 */
import "../css/sketch.css";

const MARKS = {
  underline: {
    viewBox: "0 0 200 24",
    paths: [
      "M3 14 C 40 8, 92 6, 132 9 S 186 15, 197 9",
      "M24 19 C 70 15, 122 14, 176 17",
    ],
  },
  circle: {
    viewBox: "0 0 200 80",
    paths: ["M158 12 C 118 1, 42 3, 15 24 C -7 43, 22 72, 92 75 C 162 78, 197 58, 193 34 C 189 13, 148 5, 96 9"],
  },
  squiggle: {
    viewBox: "0 0 200 24",
    paths: ["M3 14 C 15 4, 25 4, 33 13 S 51 22, 61 12 S 81 3, 91 12 S 111 22, 121 12 S 141 3, 151 12 S 171 22, 181 12 S 193 6, 197 9"],
  },
  strike: {
    viewBox: "0 0 200 24",
    paths: ["M2 15 C 60 9, 130 13, 198 7"],
  },
};

export default function Scribble({ variant = "underline", children, className = "" }) {
  const mark = MARKS[variant] ?? MARKS.underline;
  return (
    <span className={`scribble scribble--${variant} draw ${className}`.trim()}>
      <span className="scribble__text">{children}</span>
      <svg className="scribble__svg" viewBox={mark.viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {mark.paths.map((d, i) => (
          <path key={d} d={d} pathLength="1" style={{ "--draw-delay": `${i * 180}ms` }} />
        ))}
      </svg>
    </span>
  );
}
