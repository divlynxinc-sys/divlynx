import "../css/logo.css";

/**
 * Brand lockups, exported from the masters in docs/brand/.
 *
 * - horizontal: mark + wordmark side by side (navbar and default use)
 * - stacked:    mark above wordmark, transparent background (footer)
 *
 * Height is set in CSS through `--logo-h`, so callers size it with one value.
 */
const LOGOS = {
  horizontal: { src: "/assets/brand/divlynx-logo-horizontal.webp", width: 486, height: 96 },
  stacked: { src: "/assets/brand/divlynx-logo-stacked.webp", width: 480, height: 552 },
};

export default function Logo({ variant = "horizontal", className = "", title = "Divlynx" }) {
  const logo = LOGOS[variant] ?? LOGOS.horizontal;
  return (
    <span className={`logo logo--${variant} ${className}`.trim()}>
      <img
        className="logo__img"
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt={title}
        decoding="async"
        fetchPriority={variant === "horizontal" ? "high" : undefined}
      />
    </span>
  );
}
