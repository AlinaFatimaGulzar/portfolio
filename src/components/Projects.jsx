import { motion } from "framer-motion";
import { projects } from "../data/data";
import TiltCard from "./TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Projects</h2>
        <div className="section__line" />
      </motion.div>

      <div className="projects__grid">
        {projects.map((project, index) => {
          const isOnPlayStore = project.live?.includes("play.google.com");
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <TiltCard className="project-card">
                <div className="project-card__image">
                  {isOnPlayStore && (
                    <div className="project-card__play-badge">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 010 2.594zM1.337.924a1.486 1.486 0 00-.112.568v21.016c0 .445.19.85.5 1.134l11.08-11.08L1.337.924zm12.207 10.065l3.258-3.258L3.614.176a1.453 1.453 0 00-1.352-.06l11.282 10.873zM3.297 23.86a1.47 1.47 0 001.423.098l10.647-5.288-3.228-3.228L3.297 23.86z"/>
                      </svg>
                      Play Store
                    </div>
                  )}
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-card__overlay">
                    <a
                      href={project.github}
                      className="project-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      className="project-card__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {isOnPlayStore ? "View on Play Store" : "Live Demo"}
                    </a>
                  </div>
                </div>
                <div className="project-card__content">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tech">
                    {project.tech.map((t) => (
                      <span key={t} className="project-card__tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
