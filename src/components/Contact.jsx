import { useMemo, useState } from "react";
import { FiArrowUpRight, FiCalendar, FiLinkedin, FiInstagram, FiMail, FaWhatsapp } from "../icons.jsx";
import { CALENDLY, EMAIL, PHONE, PHONE_HREF, SOCIAL, composeUrl } from "../site";
import Scribble from "./Scribble";
import "../css/contact.css";

/** Same-origin, so no CORS. Backed by functions/index.js sending through Resend. */
const ENDPOINT = "/api/contact";
const WHATSAPP_URL = `https://wa.me/${PHONE_HREF.replace("+", "")}?text=${encodeURIComponent("Hi Divlynx, I would like to discuss a project.")}`;

const TOPICS = [
  "AI automation",
  "AI voice agents",
  "n8n / integrations",
  "Web design & development",
  "Mobile app",
  "Full-stack product",
  "Something else",
];

// `company` is the honeypot, hidden from people, irresistible to bots.
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
      return v.length < 10 ? "Tell us a little more, 10 characters minimum." : "";
    return "";
  };

  const allErrors = (data) => ({
    name: validate("name", data.name),
    email: validate("email", data.email),
    message: validate("message", data.message),
  });

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
    const firstInvalid = Object.keys(next).find((name) => next[name]);
    if (firstInvalid) {
      const formElement = e.currentTarget;
      window.requestAnimationFrame(() => formElement.elements.namedItem(firstInvalid)?.focus());
      return;
    }

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
      // deployed yet, fall back to the visitor's own mail client.
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
        `${form.topic}, ${clean(form.name)}`,
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
    <section id="contact" className="band band--amber contact">
      <div className="shell contact__grid">
        <div className="contact__pitch">
          <h2 className="display contact__title reveal">Tell us what keeps <Scribble variant="circle">breaking</Scribble>.</h2>
          <p className="lede contact__lede reveal" style={{ "--reveal-delay": "80ms" }}>
            Send the messy version. A rough description of the problem is more useful to us than a
            polished brief, and the first call costs nothing.
          </p>

          <ul className="contact__channels reveal" style={{ "--reveal-delay": "140ms" }}>
            <li>
              <a className="channel" href={`mailto:${EMAIL}`}>
                <FiMail className="channel__icon" aria-hidden />
                <span className="channel__text">
                  <span className="channel__label">Email</span>
                  <span className="channel__value">{EMAIL}</span>
                </span>
                <FiArrowUpRight className="channel__go" aria-hidden />
              </a>
            </li>
            <li>
              <a className="channel" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="channel__icon" aria-hidden />
                <span className="channel__text">
                  <span className="channel__label">WhatsApp</span>
                  <span className="channel__value">{PHONE}</span>
                </span>
                <FiArrowUpRight className="channel__go" aria-hidden />
              </a>
            </li>
            <li>
              <a className="channel" href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <FiCalendar className="channel__icon" aria-hidden />
                <span className="channel__text">
                  <span className="channel__label">Book a call</span>
                  <span className="channel__value">30 minutes, no pitch deck</span>
                </span>
                <FiArrowUpRight className="channel__go" aria-hidden />
              </a>
            </li>
          </ul>

          <div className="contact__social">
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Divlynx on LinkedIn">
              <FiLinkedin aria-hidden />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Divlynx on Instagram">
              <FiInstagram aria-hidden />
            </a>
          </div>
        </div>

        <form className="contact__form reveal" style={{ "--reveal-delay": "120ms" }} onSubmit={handleSubmit} noValidate>
          <p className="form__hint" aria-hidden="true">a few lines is plenty</p>
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
                aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              />
              {errors.name && touched.name && <span className="field__error" id="name-error">{errors.name}</span>}
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
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              />
              {errors.email && touched.email && <span className="field__error" id="email-error">{errors.email}</span>}
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

          <fieldset className="field field--topics">
            <legend className="field__label">What do you need?</legend>
            <div className="topics">
              {TOPICS.map((t) => (
                <label key={t} className={`topic${form.topic === t ? " is-on" : ""}`}>
                  <input
                    type="radio"
                    name="topic"
                    value={t}
                    checked={form.topic === t}
                    onChange={onChange}
                  />
                  <span className="topic__box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" focusable="false">
                      <path className="topic__square" d="M4 5 C 9 3.5, 15 4, 20 4.5 C 20.5 10, 20 15, 19.5 20 C 14 20.5, 9 20.2, 4.5 19.5 C 3.8 14, 4 9, 4.4 4.2" />
                      <path className="topic__tick" pathLength="1" d="M6.5 12.5 C 8 14, 9.5 15.5, 10.5 17 C 13 11, 16.5 6.5, 22 2.5" />
                    </svg>
                  </span>
                  <span className="topic__text">{t}</span>
                </label>
              ))}
            </div>
          </fieldset>

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
              aria-describedby={errors.message && touched.message ? "message-error" : undefined}
            />
            {errors.message && touched.message && (
              <span className="field__error" id="message-error">{errors.message}</span>
            )}
          </label>

          <div className="form__actions">
            <button type="submit" className="btn btn--primary form__submit" disabled={status.sending}>
              {status.sending ? (
                <>
                  <span className="form__spinner" aria-hidden /> Sending…
                </>
              ) : (
                <>
                  Send message <FiArrowUpRight aria-hidden />
                </>
              )}
            </button>
            <p className="form__foot">We reply within one working day.</p>
          </div>

          {status.note && (
            <p className={`form__note is-${status.tone}`} role="status">
              {status.note}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
