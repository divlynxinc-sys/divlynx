import { EMAIL } from "../site";
import Scribble from "../components/Scribble";
import "../css/privacy.css";

const SECTIONS = [
  {
    id: "collect",
    title: "What we collect",
    body: "When you send an enquiry, we receive the name, email address, project topic and message you provide. Our hosting provider also processes basic request information needed to deliver and protect the site, such as an IP address and technical logs.",
  },
  {
    id: "why",
    title: "Why we use it",
    body: "We use enquiry information only to respond, assess a potential engagement, prevent abuse and maintain the reliability of our website. We do not sell personal information.",
  },
  {
    id: "cookies",
    title: "Cookies and browser storage",
    body: "This site currently sets no advertising or analytics cookies. It uses necessary local browser storage only to remember whether you dismissed the privacy notice. You can clear that value at any time through your browser settings.",
  },
  {
    id: "services",
    title: "Services and external links",
    body: "Contact-form email is delivered through Resend and the website is hosted on Vercel. Links to services such as Calendly, WhatsApp and social platforms open their websites; their own privacy terms apply once you leave Divlynx.",
  },
  {
    id: "retention",
    title: "Retention and your choices",
    body: (
      <>
        We retain enquiry information only while it is reasonably needed for the conversation,
        business records, security or legal obligations. To ask for access, correction or deletion,
        email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </>
    ),
  },
  {
    id: "security",
    title: "Security and changes",
    body: "We use technical and organisational safeguards appropriate to this website, while no internet service can promise absolute security. Material changes to this notice will be published here with a revised date.",
  },
];

export default function Privacy() {
  return (
    <article className="privacy shell">
      <header className="privacy__header">
        <h1 className="display">
          Clear about the <Scribble variant="circle">data</Scribble> we use.
        </h1>
        <p className="privacy__date">last updated 30 October 2026</p>

        {/* The short version, as a note stuck beside the title. Every line restates the sections below. */}
        <aside className="privacy__note" aria-label="Summary">
          <span className="privacy__pin" aria-hidden="true" />
          <p className="privacy__note-title">the short version</p>
          <ul>
            <li>No advertising or analytics cookies</li>
            <li>Enquiries are used only to reply to you</li>
            <li>We do not sell personal information</li>
          </ul>
        </aside>
      </header>

      <div className="privacy__layout">
        <nav className="privacy__index" aria-label="On this page">
          <p className="privacy__index-title">on this page</p>
          <ol>
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{i + 1}.</span> {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="privacy__body">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="privacy__entry reveal">
              <span className="privacy__num" aria-hidden="true">
                {i + 1}
                <svg viewBox="0 0 56 56" focusable="false">
                  <path d="M30 6 C 16 4, 5 13, 6 28 C 7 42, 20 52, 33 50 C 46 48, 54 37, 51 23 C 49 12, 40 5, 26 7" />
                </svg>
              </span>
              <div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
