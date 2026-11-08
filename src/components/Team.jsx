import Scribble from "./Scribble";
import "../css/team.css";

const DISCIPLINES = ["Strategy", "Engineering", "AI & automation", "Mobile", "Security", "Operations", "Design", "DevOps"];

/* Scrolling amber strip of what the team covers, set at a slight angle */
function TeamStrip() {
  return (
    <div className="team-strip" aria-hidden="true">
      <div className="team-strip__track">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {DISCIPLINES.map((d) => (
              <li key={`${copy}-${d}`}>
                {d}
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M12 3 C 11.5 8, 12.5 16, 12 21 M4 8 C 9 10, 15 14, 20 16 M20 7 C 15 10, 9 14, 4 17" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

const EXECUTIVES = [
  {
    name: "Mustafa Irfan",
    role: "Founder & CEO",
    image: "/assets/team/color/mustafa-irfan.webp",
    description: "Product direction, strategy and client partnerships.",
  },
  {
    name: "Abdullah Tahir",
    role: "Co-Founder & CTO",
    image: "/assets/team/color/abdullah-tahir.webp",
    description: "Technical architecture and engineering delivery.",
  },
  {
    name: "Ali Shayan",
    role: "Head of Engineering",
    image: "/assets/team/color/ali-shayan.webp",
    description: "Engineering standards, systems and product quality.",
  },
  {
    name: "Abdullah Omer",
    role: "Chief Operating Officer",
    image: "/assets/team/color/abdullah-omer.webp",
    description: "Operations, delivery planning and team coordination.",
  },
];

const ENGINEERING = [
  {
    name: "Farheen",
    role: "Lead Backend Engineer",
    image: "/assets/team/color/farheen.webp",
    description: "Backend systems, APIs and reliable data services.",
  },
  {
    name: "Zile Hasnain",
    role: "Software Engineer",
    image: "/assets/team/color/zile-hasnain.webp",
    description: "Web products, interfaces and application engineering.",
  },
  {
    name: "Shahroze Afaq",
    role: "Cyber Security Engineer",
    image: "/assets/team/color/shahroze-afaq.webp",
    description: "Security reviews, hardening and resilient infrastructure.",
  },
  {
    name: "Khubaib",
    role: "Game Developer",
    image: "/assets/team/color/khubaib.webp",
    description: "Game systems, interactive experiences and gameplay development.",
  },
  {
    name: "Salman Asad",
    role: "Full-stack Engineer Intern",
    image: "/assets/team/color/salman-asad.webp",
    description: "Full-stack development, product interfaces and application engineering.",
  },
  {
    name: "Jaisha Muhammad",
    role: "Social Media Intern",
    image: "/assets/team/color/jaisha-muhammad.webp",
    description: "Social content, community communication and digital brand support.",
  },
  {
    name: "Zarnab",
    role: "Software Engineer Intern",
    image: "/assets/team/color/zarnab.webp",
    description: "Application development, interface implementation and engineering support.",
  },
  {
    name: "Faryal",
    role: "React Native & Flutter Intern",
    image: "/assets/team/color/faryal.webp",
    description: "React Native and Flutter development for cross-platform mobile products.",
  },
  {
    name: "Muneeb",
    role: "React Native Intern",
    image: "/assets/team/color/muneeb.webp",
    description: "React Native development, mobile interfaces and cross-platform product support.",
  },
];

const TEAM = [...EXECUTIVES, ...ENGINEERING];

/* Details reveal on mouse hover. Mobile keeps the portrait unobstructed and
   places the name and role beneath it. */
function Profile({ member, index = 0 }) {
  return (
    <article className="team-card reveal" style={{ "--reveal-delay": `${index * 80}ms` }}>
      <div className="team-card__portrait">
        <img className="team-card__image" src={member.image} alt={member.name} loading="lazy" decoding="async" />
        <div className="team-card__body">
          <h3>{member.name}</h3>
          <p className="team-card__role">{member.role}</p>
          <p className="team-card__description">{member.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <section id="team" className="band team">
      <TeamStrip />
      <div className="shell">
        <header className="sec-head team__head">
          <h2 className="display h2">
            The people behind <Scribble variant="underline">the work</Scribble>.
          </h2>
          <p className="lede team__intro">
            Strategy, engineering, operations and security under one roof. The people who
            scope the work stay close to the people who build it.
          </p>
        </header>

        <div className="team__group team__group--first">
          <p className="team__group-label">Team</p>
          <div className="team__grid team__grid--engineering">
            {TEAM.map((member, index) => <Profile key={member.name} member={member} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
