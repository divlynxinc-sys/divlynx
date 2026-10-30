import { motion } from "framer-motion";
import "../css/team.css";

const EXECUTIVES = [
  {
    name: "Mustafa Irfan",
    role: "Founder & CEO",
    image: "/assets/team/mustafa-irfan.png",
  },
  {
    name: "Abdullah Tahir",
    role: "Co-Founder & CTO",
    image: "/assets/team/abdullah-tahir.jpeg",
  },
];

const TEAM = [
  {
    name: "Zile Hasnain",
    role: "Software Engineer",
    image: "/assets/team/zile-software-engineer.jpeg",
  },
];

function Profile({ member, index = 0 }) {
  return (
    <motion.article
      className="team-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}>
      <div className="team-card__portrait">
        <img src={member.image} alt={member.name} loading="lazy" decoding="async" />
      </div>
      <div className="team-card__body">
        <div>
          <h3>{member.name}</h3>
          <p className="team-card__role">{member.role}</p>
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
            <p className="eyebrow">Leadership</p>
            <h2 className="display h2">
              The people behind <span className="sweep">the work</span>.
            </h2>
          </div>
          <p className="lede team__intro">
            Divlynx is led by builders who stay close to every engagement, from the first
            conversation through architecture, delivery, and launch.
          </p>
        </header>

        <div className="team__grid">
          {EXECUTIVES.map((member, index) => <Profile key={member.name} member={member} index={index} />)}
        </div>

        <div className="team__group">
          <p className="team__group-label">Engineering</p>
          <div className="team__grid team__grid--second">
            {TEAM.map((member, index) => <Profile key={member.name} member={member} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
