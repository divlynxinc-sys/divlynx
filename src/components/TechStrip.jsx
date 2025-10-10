import '../css/hero.css'

export default function TechStrip() {
  const icons = [
    // Web & runtime
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
    
    // State & API
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    
    // Data & DB
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    
    // ML/AI
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/overleaf/overleaf-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    
    // Cloud & DevOps
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    
    // VCS
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',

    // Systems & languages
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg'
  ]

  // Ensure no duplicates even if items are added accidentally
  const uniqueIcons = Array.from(new Set(icons))

  // Duplicate icons for seamless, continuous marquee with fewer DOM nodes
  const track = [...uniqueIcons, ...uniqueIcons]

  return (
    <section className="tech-strip" aria-label="Technologies we use">
      <div className="tech-strip__viewport">
        <div className="tech-strip__track">
          {track.map((src, i) => {
            const needsInvert = /github|nextjs/i.test(src)
            return (
              <img
                key={i}
                src={src}
                alt=""
              className={`tech-strip__icon ${needsInvert ? 'tech-strip__icon--invert' : ''}`}
              loading="lazy"
              fetchpriority="low"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => e.currentTarget.remove()}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}