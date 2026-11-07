import "../css/pen.css";
/**
 * A doodled pencil: flat amber body, cream wood, dark graphite tip, drawn with
 * a slightly wobbly outline. The tip sits at the left-middle of the box
 * (0, 12 in viewBox units), so CSS can pin the tip to a point with
 * `transform-origin: 0 50%`.
 */
export default function Pen({ className = "" }) {
  return (
    <svg className={`pen ${className}`} viewBox="0 0 160 24" aria-hidden="true" focusable="false">
      {/* body */}
      <path className="pen__body" d="M31 4.2 C 60 3.6, 100 4.4, 129 3.9 L 129.6 20.2 C 100 19.7, 60 20.5, 31 19.8 Z" />
      <path className="pen__facet" d="M33 12.1 C 64 11.6, 98 12.5, 127 11.9" />
      {/* sharpened wood */}
      <path className="pen__wood" d="M31 4.2 L 9.5 9.6 C 8.6 11.2, 8.6 12.8, 9.5 14.4 L 31 19.8 C 33.4 15, 33.4 9, 31 4.2 Z" />
      {/* graphite */}
      <path className="pen__lead" d="M9.5 9.6 L 0.6 12 L 9.5 14.4 C 10.4 12.8, 10.4 11.2, 9.5 9.6 Z" />
      {/* ferrule + eraser */}
      <path className="pen__ferrule" d="M129 3.9 L 141.5 3.6 L 142 20.4 L 129.6 20.2 Z" />
      <path className="pen__band" d="M133.4 4.2 L 133.8 19.9 M 137.6 4 L 138 20" />
      <path className="pen__eraser" d="M141.5 3.6 C 150 3.2, 157.5 4.5, 158.6 7 C 159.6 10.2, 159.6 13.8, 158.6 17 C 157.5 19.6, 150 20.8, 142 20.4 Z" />
    </svg>
  );
}
