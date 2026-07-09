import { motion } from "framer-motion";
import { profile } from "../data/site";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const details = [
  ["Name", profile.name],
  ["Location", profile.city],
  ["Experience", "1.5+ years"],
  ["Freelance", "Available"],
  ["Focus", "Flutter apps"],
  ["Email", profile.email],
];

export function AboutSection() {
  return (
    <section className="section section-grid" id="about">
      <div className="section-media">
        <img src="/profile%20picture.png" alt={profile.name} />
      </div>

      <div className="section-copy">
        <p className="eyebrow">Discover</p>
        <h2 className="section-title">About Me</h2>
        <p className="section-lead">{profile.intro}</p>

        <div className="info-panel">
          {details.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a className="btn btn-primary" href="https://drive.google.com/file/d/1UU0BT-tM45U8u190oppq0ku_POlEcTv8/view?usp=sharing">
            Download CV
          </a>
          <a className="btn btn-outline" href="/Certificate.pdf" target="_blank">
            Certificate
          </a>
        </div>
      </div>

      <span className="section-number">01</span>
    </section>
  );
}

export function ExperienceSection() {
  return <AboutSection />;
}

export function WorkSection() {
  return (
    <section className="section" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2 className="section-title">Portfolio</h2>
        </div>
        <p>
          A focused sample of mobile and web product work shaped around fast UX,
          maintainable Flutter structure, and launch-ready execution.
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <div className="resume-strip">
        {experience.map((item) => (
          <motion.article
            key={`${item.company}-${item.role}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span>{item.period}</span>
            <h3>{item.role}</h3>
            <p>{item.company}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
