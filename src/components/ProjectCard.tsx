import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Project } from "../data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.a
      className="project-card"
      href={project.link}
      style={{ "--project-color": project.color } as CSSProperties}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="project-visual">
        <span>{project.id.toString().padStart(2, "0")}</span>
      </div>
      <div className="project-content">
        <div>
          <p>{project.platforms.join(" / ")}</p>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <strong>
          View project
          <ArrowUpRight size={15} />
        </strong>
      </div>
    </motion.a>
  );
}
