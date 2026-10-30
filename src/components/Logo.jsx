import "../css/logo.css";

/**
 * Brand lockup.
 *
 * The mark is the original vector art lifted straight out of
 * `public/assets/brand/divlynx-logo.svg`, gradient stops and all.
 *
 * The wordmark is set as live text rather than reusing the `<text>` element in
 * that file: the source SVG asks for "FONTSPRING DEMO - Croogla 4F", which is
 * not embedded and is not installed on visitors' machines, so it silently fell
 * back to a serif. Setting it in the site's display face renders identically
 * everywhere. Swap this for outlined paths if you get a production-licensed
 * version of the original typeface.
 */
export default function Logo({ className = "", title = "Divlynx" }) {
  return (
    <span className={`logo ${className}`.trim()}>
      <svg className="logo__mark" viewBox="205 872 415 274" role="img" aria-label={title}>
        <defs>
          <linearGradient
            id="divlynx-swoosh"
            x1="221.41"
            y1="989.86"
            x2="604.32"
            y2="1088.79"
            gradientUnits="userSpaceOnUse">
            <stop offset="0.21" stopColor="#fff" />
            <stop offset="0.28" stopColor="#feedda" />
            <stop offset="0.39" stopColor="#fcd2a1" />
            <stop offset="0.5" stopColor="#fbba70" />
            <stop offset="0.61" stopColor="#f9a748" />
            <stop offset="0.71" stopColor="#f89728" />
            <stop offset="0.82" stopColor="#f88d12" />
            <stop offset="0.91" stopColor="#f78605" />
            <stop offset="1" stopColor="#f78400" />
          </linearGradient>
        </defs>
        <path
          fill="#fff"
          d="M216.8,891.2v244.67H351.92s53.56,0,112-85.21S568.59,879,568.59,879H493.12l-81.55,127.81s-49.91,70.6-126.6,70.6V956.93s197.2-32.87,250.76,158.24h76.68S552.77,818.16,216.8,891.2Z"
        />
        <path
          fill="url(#divlynx-swoosh)"
          d="M612.35,1115.4H535.67l0-.07a.45.45,0,0,0,0-.08c-.37-1.67-4.34-18.85-15.27-41.25a.36.36,0,0,0,0-.09,206.91,206.91,0,0,0-36-53.59A190.74,190.74,0,0,0,444.59,988c-.53-.34-1.07-.67-1.61-1l-1.28-.76c-.59-.36-1.19-.71-1.78-1-2.13-1.24-4.32-2.45-6.55-3.62l-2.24-1.16-2-1,.09-.14C359.4,944.63,285,957,285,957v119.7l-68.16,58.43V891.3A509.59,509.59,0,0,1,285,881c77.9-6.1,137.91,9.89,183.93,36l-.1.15h0c.87.42,25.18,12.28,54.45,40.78,31.64,30.82,69.09,81.08,89,157.36A.17.17,0,0,0,612.35,1115.4Z"
        />
      </svg>
      <span className="logo__word" aria-hidden="true">
        divlynx
      </span>
    </span>
  );
}
