import { useState } from "react";
import { motion } from "framer-motion";
import "../css/team.css";

const EXECUTIVES = [
  {
    name: "Mustafa Irfan",
    role: "Founder & CEO",
    image: "/assets/team/mustafa-irfan-white.webp",
    description: "Product direction, strategy and client partnerships.",
  },
  {
    name: "Abdullah Tahir",
    role: "Co-Founder & CTO",
    image: "/assets/team/abdullah-tahir-white.webp",
    description: "Technical architecture and engineering delivery.",
  },
  {
    name: "Ali Shayan",
    role: "Head of Engineering",
    image: "/assets/team/ali-shayan-white.webp",
    description: "Engineering standards, systems and product quality.",
  },
  {
    name: "Abdullah Omer",
    role: "Chief Operating Officer",
    image: "/assets/team/abdullah-omer-white.webp",
    description: "Operations, delivery planning and team coordination.",
  },
];

const ENGINEERING = [
  {
    name: "Farheen",
    role: "Lead Backend Engineer",
    image: "/assets/team/farheen-white.webp",
    description: "Backend systems, APIs and reliable data services.",
  },
  {
    name: "Zile Hasnain",
    role: "Software Engineer",
    image: "/assets/team/zile-hasnain-white.webp",
    description: "Web products, interfaces and application engineering.",
  },
  {
    name: "Shahroze Afaq",
    role: "Cyber Security Engineer",
    image: "/assets/team/shahroze-afaq-white.webp",
    description: "Security reviews, hardening and resilient infrastructure.",
  },
  {
    name: "Khubaib",
    role: "Flutter Intern",
    image: "/assets/team/khubaib-flutter-intern.png",
    description: "Flutter development, mobile interfaces and cross-platform product delivery.",
  },
];

function Profile({ member, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((current) => !current);

  return (
    <motion.article
      className={`team-card${expanded ? " is-active" : ""}`}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      aria-label={`${member.name}, ${member.role}. Tap to ${expanded ? "hide" : "show"} details.`}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleExpanded();
        }
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <div className="team-card__portrait">
        <img className="team-card__image" src={member.image} alt={member.name} loading="lazy" decoding="async" />
        <div className="team-card__body">
          <h3>{member.name}</h3>
          <p className="team-card__role">{member.role}</p>
          <p className="team-card__description">{member.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Team() {
  return (
    <section id="team" className="band team">
      <div className="shell">
        <header className="team__head">
          <div>
            <p className="eyebrow">Our team</p>
            <h2 className="display h2">
              The people behind <span className="sweep">the work</span>.
            </h2>
          </div>
          <p className="lede team__intro">
            Strategy, engineering, operations and security under one roof. The people who
            scope the work stay close to the people who build it.
          </p>
        </header>

        <div className="team__group team__group--first">
          <p className="team__group-label">Leadership</p>
          <div className="team__grid team__grid--executives">
            {EXECUTIVES.map((member, index) => <Profile key={member.name} member={member} index={index} />)}
          </div>
        </div>

        <div className="team__group">
          <p className="team__group-label">Engineering</p>
          <div className="team__grid team__grid--engineering">
            {ENGINEERING.map((member, index) => <Profile key={member.name} member={member} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
