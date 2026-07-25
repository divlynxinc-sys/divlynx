import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import "../css/blog.css";

export default function NotFound() {
  return (
    <section className="band not-found">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1 className="display h1">
          That page has <span className="sweep">moved on</span>.
        </h1>
        <p className="lede not-found__lede">
          The link is broken or the page no longer exists. The work, the journal and a way to reach
          us are all still where you left them.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            Back to home <FiArrowUpRight aria-hidden />
          </Link>
          <Link to="/blog" className="btn btn--ghost">
            Read the journal
          </Link>
        </div>
      </div>
    </section>
  );
}
