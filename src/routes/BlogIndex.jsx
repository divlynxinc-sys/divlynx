import { Link } from "react-router-dom";
import { FiArrowUpRight } from "../icons.jsx";
import { POSTS_BY_DATE, formatDate } from "../blog/posts";
import Scribble from "../components/Scribble";
import "../css/blog.css";

export default function BlogIndex() {
  const [latest, ...rest] = POSTS_BY_DATE;

  return (
    <section className="band blog-index">
      <div className="shell">
        <header className="blog-index__head">
          <h1 className="display h1">
            Notes from building the <Scribble variant="underline">things</Scribble>.
          </h1>
          <p className="lede blog-index__lede">
            What we have learned shipping AI automation, voice agents and n8n workflows for real
            companies, including the parts that did not work. No hype, no listicles.
          </p>
        </header>

        {/* Latest post: an open notebook page */}
        {latest && (
          <Link to={`/blog/${latest.slug}`} className="post-feature reveal">
            <span className="post-feature__binding" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
            </span>
            <span className="post-feature__label">latest entry</span>
            <span className="post-feature__meta">
              <time dateTime={latest.date}>{formatDate(latest.date)}</time> · {latest.readingMinutes} min read
            </span>
            <h2 className="post-feature__title">{latest.title}</h2>
            <p className="post-feature__excerpt">{latest.excerpt}</p>
            <span className="post-feature__go">
              read it <FiArrowUpRight aria-hidden />
            </span>
          </Link>
        )}

        <ul className="post-list">
          {rest.map((post, i) => (
            <li key={post.slug} className="reveal" style={{ "--reveal-delay": `${(i % 3) * 70}ms` }}>
              <Link to={`/blog/${post.slug}`} className="post-row">
                <div className="post-row__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <div className="post-row__main">
                  <h2 className="post-row__title"><span>{post.title}</span></h2>
                  <p className="post-row__excerpt">{post.excerpt}</p>
                  <ul className="post-row__tags" aria-label="Topics">
                    {post.tags.map((t) => <li key={t}>#{t.toLowerCase()}</li>)}
                  </ul>
                </div>
                <FiArrowUpRight className="post-row__go" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <aside className="blog-cta">
          <span className="blog-pin" aria-hidden="true" />
          <h2 className="display blog-cta__title">Got a process that should run itself?</h2>
          <p className="blog-cta__sub">
            Tell us what is breaking and we will tell you honestly whether it is worth building.
          </p>
          <Link to="/#contact" className="btn btn--primary">
            Start a project <FiArrowUpRight aria-hidden />
          </Link>
        </aside>
      </div>
    </section>
  );
}
