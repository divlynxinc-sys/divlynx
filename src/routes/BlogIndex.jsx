import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { POSTS_BY_DATE, formatDate } from "../blog/posts";
import { EMAIL } from "../site";
import "../css/blog.css";

export default function BlogIndex() {
  return (
    <section className="band blog-index">
      <div className="shell">
        <header className="blog-index__head">
          <p className="eyebrow">Journal</p>
          <h1 className="display h1">
            Notes from <span className="sweep">building the things</span>.
          </h1>
          <p className="lede blog-index__lede">
            What we have learned shipping AI automation, voice agents and n8n workflows for real
            companies, including the parts that did not work. No hype, no listicles.
          </p>
        </header>

        <ul className="post-list">
          {POSTS_BY_DATE.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={`/blog/${post.slug}`} className="post-row">
                <div className="post-row__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <div className="post-row__main">
                  <h2 className="post-row__title">{post.title}</h2>
                  <p className="post-row__excerpt">{post.excerpt}</p>
                  <ul className="post-row__tags">
                    {post.tags.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <FiArrowUpRight className="post-row__go" aria-hidden />
              </Link>
            </motion.li>
          ))}
        </ul>

        <aside className="blog-cta">
          <div>
            <h2 className="display blog-cta__title">Got a process that should run itself?</h2>
            <p className="blog-cta__sub">
              Tell us what is breaking and we will tell you honestly whether it is worth building.
            </p>
          </div>
          <div className="blog-cta__actions">
            <Link to="/#contact" className="btn btn--primary">
              Start a project <FiArrowUpRight aria-hidden />
            </Link>
            <a href={`mailto:${EMAIL}`} className="btn btn--ghost">
              {EMAIL}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
