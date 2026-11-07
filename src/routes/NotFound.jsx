import { Link } from "react-router-dom";
import { FiArrowUpRight } from "../icons.jsx";
import "../css/blog.css";
import Scribble from "../components/Scribble";

export default function NotFound() {
  return (
    <section className="band not-found">
      <div className="shell">
        <h1 className="display h1">
          That page has <Scribble variant="strike">moved on</Scribble>.
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
