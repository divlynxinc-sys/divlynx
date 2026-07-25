import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import PostBody from "../blog/PostBody";
import { POSTS_BY_DATE, findPost, formatDate } from "../blog/posts";
import { CALENDLY, EMAIL } from "../site";
import NotFound from "./NotFound";
import "../css/blog.css";

export default function BlogPost() {
  const { slug } = useParams();
  const post = findPost(slug);

  if (!post) return <NotFound />;

  // One suggestion, not a wall of related posts.
  const next = POSTS_BY_DATE.filter((p) => p.slug !== post.slug)[0];

  return (
    <article className="band post">
      <div className="shell post__shell">
        <Link to="/blog" className="post__back">
          <FiArrowLeft aria-hidden /> All posts
        </Link>

        <header className="post__head">
          <div className="post__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="display post__title">{post.title}</h1>
          <p className="lede post__excerpt">{post.excerpt}</p>
          <ul className="post__tags">
            {post.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </header>

        <PostBody blocks={post.body} />

        <footer className="post__foot">
          <div className="post__cta">
            <h2 className="display post__cta-title">Want this built rather than read about?</h2>
            <p className="post__cta-sub">
              We scope honestly and tell you when something is not worth automating.
            </p>
            <div className="post__cta-actions">
              <Link to="/#contact" className="btn btn--primary">
                Start a project <FiArrowUpRight aria-hidden />
              </Link>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                Book a 30-min call
              </a>
            </div>
            <p className="post__cta-mail">
              Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </div>

          {next && (
            <Link to={`/blog/${next.slug}`} className="post__next">
              {/* Label and title share one grid cell; the icon takes the other. */}
              <span className="post__next-text">
                <span className="post__next-label">Read next</span>
                <span className="post__next-title">{next.title}</span>
              </span>
              <FiArrowUpRight className="post__next-go" aria-hidden />
            </Link>
          )}
        </footer>
      </div>
    </article>
  );
}
