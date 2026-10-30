import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import Services from "../components/Services";
import Process from "../components/Process";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import Studio from "../components/Studio";
import Team from "../components/Team";
import Careers from "../components/Careers";
import Contact from "../components/Contact";
import JournalTeaser from "../components/JournalTeaser";

/**
 * Sections render eagerly rather than mounting on scroll. Two reasons: in-page
 * anchors must exist the moment someone clicks a nav link, and the prerenderer
 * has to emit real content for crawlers.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <Team />
      <Careers />
      <Studio />
      <JournalTeaser />
      <Contact />
    </>
  );
}
