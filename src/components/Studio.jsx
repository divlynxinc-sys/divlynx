import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import "../css/studio.css";

const PRINCIPLES = [
  {
    title: "One team, end to end",
    body: "The person who scoped your project is the person who builds it. Nothing gets lost in a handoff to a delivery pod you have never met.",
  },
  {
    title: "You own all of it",
    body: "Source code, infrastructure, workflow definitions, prompts and docs. No proprietary runtime, no licence you have to keep paying to stay switched on.",
  },
  {
    title: "Progress you can click",
    body: "A working demo every week and a board you can open any time. If something slips you hear it from us first.",
  },
  {
    title: "Built for year two",
    body: "Tests, runbooks and code someone else can read. The cheap version is only cheap until the first person leaves.",
  },
];

const FAQS = [
  {
    q: "How quickly can we start?",
    a: "Discovery usually begins within three to five business days of the first call, and you see a working slice running against your own data inside two weeks.",
  },
  {
    q: "How do you price work?",
    a: "Fixed scope for defined projects, monthly retainer for ongoing work. We quote after the mapping session rather than before it — a number given without understanding the work is just a guess.",
  },
  {
    q: "Can the AI run on our own infrastructure?",
    a: "Yes. n8n, vector stores and open-weight models can all run in your cloud account or on-premise, so nothing sensitive has to leave your network.",
  },
  {
    q: "Do you work alongside our existing developers?",
    a: "Often. We join your standups, work in your repositories and follow your review process. Plenty of our work is filling one gap rather than replacing a team.",
  },
  {
    q: "What happens after launch?",
    a: "You get runbooks, architecture notes and a recorded walkthrough so your team can operate everything without us. Support retainers are available but never required.",
  },
];

export default function Studio() {
  const [open, setOpen] = useState(0);

  return (
    <section id="studio" className="band">
      <div className="shell">
        <div className="studio__top">
          <div className="studio__intro">
            <p className="eyebrow">The studio</p>
            <h2 className="display h2">
              Small team. Senior people. <span className="sweep">No handoffs</span>.
            </h2>
            <p className="lede studio__lede">
              Divlynx is a group of engineers, designers and strategists who got tired of watching
              good ideas die in a backlog. We keep the team small on purpose — it is the only way
              the person who understands your business is also the one writing the code.
            </p>
            <blockquote className="studio__quote">
              Our vision is to revolutionise the tech landscape by creating software that empowers
              businesses to thrive in a digital world.
              <cite className="studio__cite">Think smart. Build fearless.</cite>
            </blockquote>
          </div>

          <ul className="studio__principles">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.title}
                className="principle"
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="h3 principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="faq">
          <h3 className="faq__heading">Questions we get asked</h3>
          <ul className="faq__list">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <FiPlus className="faq__icon" aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="faq__a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                        <p>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
