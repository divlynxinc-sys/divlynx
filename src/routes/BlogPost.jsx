import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "../icons.jsx";
import PostBody from "../blog/PostBody";
import { POSTS_BY_DATE, findPost, formatDate } from "../blog/posts";
import { EMAIL } from "../site";
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
          <FiArrowLeft aria-hidden /> all posts
        </Link>

        <header className="post__head">
          <div className="post__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className="display post__title">{post.title}</h1>
          <p className="lede post__excerpt">{post.excerpt}</p>
        </header>

        <PostBody blocks={post.body} />

        <footer className="post__foot">
          <div className="post__cta">
            <span className="blog-pin" aria-hidden="true" />
            <h2 className="display post__cta-title">Want this built rather than read about?</h2>
            <p className="post__cta-sub">
              We scope honestly and tell you when something is not worth automating.
            </p>
            <div className="post__cta-actions">
              <Link to="/#contact" className="btn btn--primary">
                Start a project <FiArrowUpRight aria-hidden />
              </Link>
              <p className="post__cta-mail">
                or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
            </div>
          </div>

          {next && (
            <Link to={`/blog/${next.slug}`} className="post__next">
              <span className="post__next-text">
                <span className="post__next-label">read next</span>
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
