import { Resend } from "resend";

/**
 * Contact form endpoint, Vercel serverless function.
 *
 * Vercel maps this file to /api/contact automatically, so the browser talks to
 * its own origin and no CORS handling is needed.
 *
 * RESEND_API_KEY is a server-side environment variable set in the Vercel
 * dashboard. It is never prefixed with VITE_, so it cannot leak into the
 * client bundle.
 */

/** Must be an address on the domain verified in Resend. */
const FROM = "Divlynx Website <noreply@divlynx.com>";
const TO = "divlynx.inc@gmail.com";

const TOPICS = new Set([
  "AI automation",
  "AI voice agents",
  "n8n / integrations",
  "Web design & development",
  "Mobile app",
  "Full-stack product",
  "Something else",
]);

/**
 * Best-effort throttle. Serverless instances are recycled and requests spread
 * across them, so this blunts naive floods, it is not a security boundary.
 */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

/** Replaces control characters (header-injection vectors), trims, caps length. */
// eslint-disable-next-line no-control-regex -- stripping control characters is the point
const CONTROL_CHARS = new RegExp("[\u0000-\u001F\u007F]", "g");
const clean = (v, max) =>
  typeof v === "string" ? v.replace(CONTROL_CHARS, " ").trim().slice(0, max) : "";

/** Same as above but keeps newlines, which a message body legitimately has. */
// eslint-disable-next-line no-control-regex -- stripping control characters is the point
const CONTROL_KEEP_NEWLINES = new RegExp("[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]", "g");
const cleanMultiline = (v, max) =>
  typeof v === "string" ? v.replace(CONTROL_KEEP_NEWLINES, " ").trim().slice(0, max) : "";

const escapeHtml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set on this deployment");
    return res.status(500).json({ error: "Email is not configured yet. Please email us directly." });
  }

  const ip =
    req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Try again in a minute." });
  }

  // Vercel parses JSON bodies, but be defensive about a raw string.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  if (typeof body !== "object" || body === null) body = {};

  // Honeypot: real people never fill a hidden field. Answer 200 so bots cannot
  // tell they were caught.
  if (clean(body.company, 100)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const message = cleanMultiline(body.message, 4000);
  const topic = TOPICS.has(body.topic) ? body.topic : "Something else";

  const problems = [];
  if (name.length < 2) problems.push("name");
  if (!EMAIL_RE.test(email)) problems.push("email");
  if (message.length < 10) problems.push("message");
  if (problems.length) {
    return res.status(400).json({ error: `Check these fields: ${problems.join(", ")}.` });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      // Sending *from* the visitor's address would fail SPF/DKIM and land in
      // spam. Their address goes here so Reply just works.
      replyTo: email,
      subject: `New enquiry, ${topic}, ${name}`,
      text: [
        `Name:  ${name}`,
        `Email: ${email}`,
        `Needs: ${topic}`,
        "",
        message,
        "",
        `, sent from the divlynx.com contact form (${ip})`,
      ].join("\n"),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px;font-size:18px">New enquiry from divlynx.com</h2>
          <table style="border-collapse:collapse;font-size:14px">
            <tr><td style="padding:4px 16px 4px 0;color:#666">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:4px 16px 4px 0;color:#666">Needs</td><td>${escapeHtml(topic)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:18px 0" />
          <p style="white-space:pre-wrap;font-size:14px;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("resend rejected the message", error);
      return res
        .status(502)
        .json({ error: "The mail service rejected that. Please email us directly." });
    }

    console.log("contact email sent", data?.id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("contact endpoint failed", err);
    return res.status(500).json({ error: "Something went wrong sending that." });
  }
}
