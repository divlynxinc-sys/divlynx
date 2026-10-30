import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { POSTS_BY_DATE, formatDate } from "../blog/posts";
import "../css/journal-teaser.css";

/** Four most recent posts. Deliberately not the whole archive. */
export default function JournalTeaser() {
  const recent = POSTS_BY_DATE.slice(0, 4);

  return (
    <section id="journal" className="band">
      <div className="shell">
        <div className="jt__head">
          <div>
            <p className="eyebrow">Journal</p>
            <h2 className="display h2">
              What we have <span className="sweep">learned</span> so far.
            </h2>
          </div>
          <Link to="/blog" className="btn btn--ghost jt__all">
            All posts <FiArrowUpRight aria-hidden />
          </Link>
        </div>

        <div className="jt__grid">
          {recent.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <Link to={`/blog/${post.slug}`} className="jt__card">
                <div className="jt__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingMinutes} min</span>
                </div>
                <h3 className="h3 jt__title">{post.title}</h3>
                <p className="jt__excerpt">{post.excerpt}</p>
                <span className="jt__more">
                  Read <FiArrowUpRight aria-hidden />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
