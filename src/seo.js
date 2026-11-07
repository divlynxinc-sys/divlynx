import { POSTS } from "./blog/posts";

/** Change this once if the production domain ever moves. */
export const SITE_URL = "https://divlynx.com";
export const SITE_NAME = "Divlynx";

const HOME_TITLE = "Divlynx, AI automation, voice agents & software engineering";
const HOME_DESC =
  "Divlynx builds AI automation, voice agents, n8n workflows, web platforms and mobile apps for companies that want the busywork gone.";

/** Head tags for a given path. Used by the prerenderer and by client routing. */
export function metaForPath(pathname) {
  if (pathname === "/" || pathname === "") {
    return { title: HOME_TITLE, description: HOME_DESC, canonical: `${SITE_URL}/`, type: "website" };
  }

  if (pathname === "/case-studies" || pathname === "/case-studies/") {
    return {
      title: "Case studies, AI automation, voice agents & software | Divlynx",
      description:
        "How Divlynx engagements actually ran: the problem we were handed, what we built, and what changed afterwards, one case study per service line.",
      canonical: `${SITE_URL}/case-studies`,
      type: "website",
    };
  }

  if (pathname === "/about" || pathname === "/about/") {
    return {
      title: "About Divlynx, our team, principles and careers",
      description:
        "Meet the Divlynx team, learn how we work, read practical answers about delivery and ownership, and explore careers with our software studio.",
      canonical: `${SITE_URL}/about`,
      type: "website",
    };
  }

  if (pathname === "/careers" || pathname === "/careers/") {
    return {
      title: "Careers at Divlynx, engineering, product and operations",
      description:
        "Learn how hiring works at Divlynx and introduce yourself for engineering, product, design, growth or operations opportunities.",
      canonical: `${SITE_URL}/careers`,
      type: "website",
    };
  }

  if (pathname === "/faq" || pathname === "/faq/") {
    return {
      title: "Divlynx FAQ, pricing, ownership, security and delivery",
      description:
        "Clear answers about Divlynx project fit, pricing, integrations, infrastructure, code ownership, communication, launch and ongoing support.",
      canonical: `${SITE_URL}/faq`,
      type: "website",
    };
  }

  if (pathname === "/blog" || pathname === "/blog/") {
    return {
      title: "Journal, practical notes on AI automation | Divlynx",
      description:
        "Field notes from building AI automation, voice agents and n8n workflows for real companies. No hype, just what worked.",
      canonical: `${SITE_URL}/blog`,
      type: "website",
    };
  }

  if (pathname === "/privacy" || pathname === "/privacy/") {
    return {
      title: "Privacy and cookie notice | Divlynx",
      description: "How Divlynx handles website enquiries, necessary browser storage, external links, and personal information.",
      canonical: `${SITE_URL}/privacy`,
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
  return ["/", "/about", "/careers", "/faq", "/case-studies", "/blog", "/privacy", ...POSTS.map((p) => `/blog/${p.slug}`)];
}

/** Schema.org JSON-LD for a path, helps search engines show rich results. */
export function jsonLdForPath(pathname) {
  const meta = metaForPath(pathname);

  const organisation = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "Divlynx Inc.",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/assets/brand/divlynx-logo-stacked.png`,
      contentUrl: `${SITE_URL}/assets/brand/divlynx-logo-stacked.png`,
      width: 480,
      height: 552,
    },
    image: `${SITE_URL}/assets/hero/digital-workshop.jpg`,
    email: "divlynx.inc@gmail.com",
    telephone: "+92 318 0950005",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK",
      streetAddress: "Blue Area",
    },
    description: HOME_DESC,
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales and customer enquiries",
      email: "divlynx.inc@gmail.com",
      telephone: "+92 318 0950005",
      availableLanguage: ["English", "Urdu"],
    },
    sameAs: [
      "https://www.linkedin.com/company/divlynx/",
      "https://www.instagram.com/divlynxinc",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const webpage = {
    "@type": meta.type === "article" ? "Article" : "WebPage",
    "@id": `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  if (meta.type === "article" && meta.post) {
    return [
      organisation,
      website,
      webpage,
      {
        "@type": "BlogPosting",
        headline: meta.post.title,
        description: meta.post.excerpt,
        datePublished: meta.post.date,
        dateModified: meta.post.date,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: { "@id": `${meta.canonical}#webpage` },
        inLanguage: "en",
        keywords: meta.post.tags.join(", "),
      },
    ];
  }

  return [organisation, website, webpage];
}
