import { EMAIL } from "../site";
import "../css/privacy.css";

export default function Privacy() {
  return (
    <article className="privacy shell">
      <header className="privacy__header"><p className="eyebrow">Privacy & cookies</p><h1 className="display">Clear about the data we use.</h1><p>Last updated: 30 October 2026</p></header>
      <div className="privacy__body">
        <section><h2>What we collect</h2><p>When you send an enquiry, we receive the name, email address, project topic and message you provide. Our hosting provider also processes basic request information needed to deliver and protect the site, such as an IP address and technical logs.</p></section>
        <section><h2>Why we use it</h2><p>We use enquiry information only to respond, assess a potential engagement, prevent abuse and maintain the reliability of our website. We do not sell personal information.</p></section>
        <section><h2>Cookies and browser storage</h2><p>This site currently sets no advertising or analytics cookies. It uses necessary local browser storage only to remember whether you dismissed the privacy notice. You can clear that value at any time through your browser settings.</p></section>
        <section><h2>Services and external links</h2><p>Contact-form email is delivered through Resend and the website is hosted on Vercel. Links to services such as Calendly, WhatsApp and social platforms open their websites; their own privacy terms apply once you leave Divlynx.</p></section>
        <section><h2>Retention and your choices</h2><p>We retain enquiry information only while it is reasonably needed for the conversation, business records, security or legal obligations. To ask for access, correction or deletion, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p></section>
        <section><h2>Security and changes</h2><p>We use technical and organisational safeguards appropriate to this website, while no internet service can promise absolute security. Material changes to this notice will be published here with a revised date.</p></section>
      </div>
    </article>
  );
}
