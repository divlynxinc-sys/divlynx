/**
 * Turns the SPA into real static HTML, one file per route.
 *
 * Search engines get fully-rendered markup with per-page title, description,
 * canonical and JSON-LD; the browser hydrates the same markup into the live
 * app. Run after `vite build` and `vite build --ssr`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");

// pathToFileURL, not a bare path — Windows drive letters are not a valid ESM scheme.
const { render, allPaths, metaForPath, jsonLdForPath, SITE_URL } = await import(
  pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href
);

const template = await readFile(join(distDir, "index.html"), "utf8");

const escapeAttr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Replace the value of a tag already present in the template. */
function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: template is missing an expected tag: ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

function buildHead(path) {
  const meta = metaForPath(path);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdForPath(path),
  };

  const extra = [
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];

  if (meta.noindex) extra.push('<meta name="robots" content="noindex" />');

  if (meta.type === "article" && meta.post) {
    extra.push(
      `<meta property="article:published_time" content="${meta.post.date}" />`,
      ...meta.post.tags.map((t) => `<meta property="article:tag" content="${escapeAttr(t)}" />`)
    );
  }

  return { meta, extra: extra.join("\n    ") };
}

const written = [];

for (const path of allPaths()) {
  const appHtml = render(path);
  const { meta, extra } = buildHead(path);

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );
  html = setTag(
    html,
    /<link rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${meta.canonical}" />`
  );
  html = setTag(
    html,
    /<meta property="og:type"[^>]*\/>/,
    `<meta property="og:type" content="${meta.type}" />`
  );
  html = setTag(
    html,
    /<meta property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`
  );
  html = setTag(
    html,
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`
  );
  html = setTag(
    html,
    /<meta property="og:url"[^>]*\/>/,
    `<meta property="og:url" content="${meta.canonical}" />`
  );
  html = html.replace("<!--app-head-->", extra);
  html = html.replace("<!--app-html-->", appHtml);

  const outFile = path === "/" ? join(distDir, "index.html") : join(distDir, path, "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html, "utf8");
  written.push(path);
}

/* --- 404.html ---
   Rendered from a path that matches no route, so its markup is identical to
   what the client renders on an unknown URL and hydration stays clean. */
{
  const missPath = "/__not-found__";
  const appHtml = render(missPath);
  const { meta, extra } = buildHead(missPath);

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`);
  html = setTag(
    html,
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );
  html = setTag(html, /<link rel="canonical"[^>]*\/>/, "");
  html = html.replace("<!--app-head-->", extra);
  html = html.replace("<!--app-html-->", appHtml);

  await writeFile(join(distDir, "404.html"), html, "utf8");
}

/* --- sitemap.xml --- */
const today = new Date().toISOString().slice(0, 10);

const urls = allPaths()
  .map((p) => {
    const meta = metaForPath(p);
    const lastmod = meta.post?.date || today;
    const priority = p === "/" ? "1.0" : p === "/blog" ? "0.8" : "0.7";
    return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

await writeFile(
  join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  "utf8"
);

/* --- robots.txt --- */
await writeFile(
  join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "utf8"
);

console.log(`prerendered ${written.length} routes:\n  ${written.join("\n  ")}`);
console.log("wrote sitemap.xml and robots.txt");
