import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCalendar, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { CALENDLY, EMAIL, SOCIAL, composeUrl } from "../site";
import "../css/contact.css";

/** Same-origin, so no CORS. Backed by functions/index.js sending through Resend. */
const ENDPOINT = "/api/contact";

const TOPICS = [
  "AI automation",
  "AI voice agents",
  "n8n / integrations",
  "Web design & development",
  "Mobile app",
  "Full-stack product",
  "Something else",
];

// `company` is the honeypot — hidden from people, irresistible to bots.
const EMPTY = { name: "", email: "", topic: TOPICS[0], message: "", company: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ sending: false, note: null, tone: null });

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i, []);

  // Strip the characters that make a message dangerous to render elsewhere.
  const clean = (s) => s.replace(/[<>]/g, "").trim();

  const validate = (field, value) => {
    const v = clean(value);
    if (field === "name") return v.length < 2 ? "Enter your name." : "";
    if (field === "email") return emailRegex.test(v) ? "" : "Enter an email we can reply to.";
    if (field === "message")
      return v.length < 10 ? "Tell us a little more — 10 characters minimum." : "";
    return "";
  };

  const allErrors = (data) => ({
    name: validate("name", data.name),
    email: validate("email", data.email),
    message: validate("message", data.message),
  });

  const isValid = !Object.values(allErrors(form)).some(Boolean);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = allErrors(form);
    setErrors(next);
    setTouched({ name: true, email: true, message: true });
    if (Object.values(next).some(Boolean)) return;

    setStatus({ sending: true, note: null, tone: null });

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clean(form.name),
          email: clean(form.email),
          topic: form.topic,
          message: clean(form.message),
          company: form.company,
        }),
      });

      // No endpoint means we are running `vite dev` or the function is not
      // deployed yet — fall back to the visitor's own mail client.
      if (res.status === 404) return openWebmail();

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          sending: false,
          tone: "bad",
          note: data.error || "That did not send. Please email us directly.",
        });
        return;
      }

      setForm(EMPTY);
      setErrors({});
      setTouched({});
      setStatus({
        sending: false,
        tone: "ok",
        note: "Message sent. We reply within one working day.",
      });
    } catch {
      openWebmail();
    }
  };

  /** Last resort so a visitor is never left with no way to reach us. */
  const openWebmail = () => {
    window.open(
      composeUrl(
        `${form.topic} — ${clean(form.name)}`,
        `${clean(form.message)}\n\nReply to: ${clean(form.email)}`
      ),
      "_blank",
      "noopener,noreferrer"
    );
    setStatus({
      sending: false,
      tone: "ok",
      note: "Your mail app is open with the message ready to send.",
    });
  };

  const field = (name) => (errors[name] && touched[name] ? "field is-invalid" : "field");

  return (
    <section id="contact" className="band contact">
      <div className="shell contact__grid">
        <motion.div
          className="contact__pitch"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">Contact</p>
          <h2 className="display h2">
            Tell us what keeps <span className="sweep">breaking</span>.
          </h2>
          <p className="lede contact__lede">
            Send the messy version. A rough description of the problem is more useful to us than a
            polished brief, and the first call costs nothing.
          </p>

          <div className="contact__channels">
            <a className="channel channel--mail" href={`mailto:${EMAIL}`}>
              <span className="channel__icon">
                <FiMail aria-hidden />
              </span>
              <span className="channel__text">
                <span className="channel__label">Email us</span>
                <span className="channel__value">{EMAIL}</span>
              </span>
              <FiArrowUpRight className="channel__go" aria-hidden />
            </a>

            <a className="channel" href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <span className="channel__icon">
                <FiCalendar aria-hidden />
              </span>
              <span className="channel__text">
                <span className="channel__label">Book a call</span>
                <span className="channel__value">30 minutes, no pitch deck</span>
              </span>
              <FiArrowUpRight className="channel__go" aria-hidden />
            </a>
          </div>

          <div className="contact__social">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
          </div>
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
          <div className="form__row">
            <label className={field("name")}>
              <span className="field__label">Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="Alex Carter"
                autoComplete="name"
                maxLength={60}
                aria-invalid={Boolean(errors.name && touched.name)}
              />
              {errors.name && touched.name && <span className="field__error">{errors.name}</span>}
            </label>

            <label className={field("email")}>
              <span className="field__label">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                onBlur={onBlur}
                placeholder="alex@company.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email && touched.email)}
              />
              {errors.email && touched.email && <span className="field__error">{errors.email}</span>}
            </label>
          </div>

          {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="company">Company (leave blank)</label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="field">
            <span className="field__label">What do you need?</span>
            <select name="topic" value={form.topic} onChange={onChange}>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className={field("message")}>
            <span className="field__label">The problem</span>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              onBlur={onBlur}
              placeholder="What is happening today, who it affects, and what you wish happened instead."
              maxLength={2000}
              aria-invalid={Boolean(errors.message && touched.message)}
            />
            {errors.message && touched.message && (
              <span className="field__error">{errors.message}</span>
            )}
          </label>

          <button type="submit" className="btn btn--primary form__submit" disabled={status.sending || !isValid}>
            {status.sending ? "Sending…" : "Send message"}
            {!status.sending && <FiArrowUpRight aria-hidden />}
          </button>

          <p className="form__foot">
            Prefer email? Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> directly.
          </p>

          {status.note && (
            <p className={`form__note is-${status.tone}`} role="status">
              {status.note}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
