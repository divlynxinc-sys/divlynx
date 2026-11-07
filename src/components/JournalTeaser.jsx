import { Link } from "react-router-dom";
import { FiArrowUpRight } from "../icons.jsx";
import { POSTS_BY_DATE, formatDate } from "../blog/posts";
import "../css/journal-teaser.css";
import Scribble from "./Scribble";

/** Four most recent posts. Deliberately not the whole archive. */
export default function JournalTeaser() {
  const recent = POSTS_BY_DATE.slice(0, 4);

  return (
    <section id="journal" className="band jt">
      <div className="shell">
        <header className="sec-head">
          <h2 className="display h2 reveal">What we have <Scribble variant="squiggle">learned</Scribble> so far.</h2>
          <div className="jt__side reveal" style={{ "--reveal-delay": "80ms" }}>
            <p className="lede">Field notes from shipping agents and automation, including what did not work.</p>
            <Link to="/blog" className="tlink">
              All posts <FiArrowUpRight aria-hidden />
            </Link>
          </div>
        </header>

        <ul className="jt__list">
          {recent.map((post, i) => (
            <li key={post.slug} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` }}>
              <Link to={`/blog/${post.slug}`} className="jt__row">
                <time className="jt__date" dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="jt__main">
                  <span className="jt__title">{post.title}</span>
                  <span className="jt__excerpt">{post.excerpt}</span>
                </span>
                <span className="jt__read">{post.readingMinutes} min read</span>
                <span className="jt__go" aria-hidden="true"><FiArrowUpRight /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
