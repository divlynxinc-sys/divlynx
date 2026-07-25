import { POSTS } from "./blog/posts";

/** Change this once if the production domain ever moves. */
export const SITE_URL = "https://divlynx.com";
export const SITE_NAME = "Divlynx";

const HOME_TITLE = "Divlynx — AI automation, voice agents & software engineering";
const HOME_DESC =
  "Divlynx builds AI automation, voice agents, n8n workflows, web platforms and mobile apps for companies that want the busywork gone.";

/** Head tags for a given path. Used by the prerenderer and by client routing. */
export function metaForPath(pathname) {
  if (pathname === "/" || pathname === "") {
    return { title: HOME_TITLE, description: HOME_DESC, canonical: `${SITE_URL}/`, type: "website" };
  }

  if (pathname === "/blog" || pathname === "/blog/") {
    return {
      title: "Journal — practical notes on AI automation | Divlynx",
      description:
        "Field notes from building AI automation, voice agents and n8n workflows for real companies. No hype, just what worked.",
      canonical: `${SITE_URL}/blog`,
      type: "website",
    };
  }

  const slug = pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  const post = POSTS.find((p) => p.slug === slug);
  if (post) {
    return {
      title: `${post.title} | Divlynx`,
      description: post.excerpt,
      canonical: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      post,
    };
  }

  return {
    title: "Page not found | Divlynx",
    description: HOME_DESC,
    canonical: `${SITE_URL}${pathname}`,
    type: "website",
    noindex: true,
  };
}

export function allPaths() {
  return ["/", "/blog", ...POSTS.map((p) => `/blog/${p.slug}`)];
}

/** Schema.org JSON-LD for a path — helps search engines show rich results. */
export function jsonLdForPath(pathname) {
  const meta = metaForPath(pathname);

  const organisation = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    email: "info@divlynx.com",
    description: HOME_DESC,
    sameAs: [
      "https://www.linkedin.com/company/divlynx/",
      "https://www.instagram.com/divlynxinc",
    ],
  };

  if (meta.type === "article" && meta.post) {
    return [
      organisation,
      {
        "@type": "BlogPosting",
        headline: meta.post.title,
        description: meta.post.excerpt,
        datePublished: meta.post.date,
        dateModified: meta.post.date,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: meta.canonical,
        keywords: meta.post.tags.join(", "),
      },
    ];
  }

  return [organisation];
}
