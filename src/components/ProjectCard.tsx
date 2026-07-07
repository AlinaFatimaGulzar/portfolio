import { motion } from "framer-motion";
import type { Project } from "../data/projects";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      className="group relative flex min-h-[580px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-border-glow hover:shadow-[0_32px_80px_rgba(86,232,197,0.14)]"
      href={project.link}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-mint to-indigo opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex flex-col items-center justify-center rounded-xl bg-gradient-to-b from-bg/50 to-surface p-6" style={{ minHeight: "60%" }}>
        <div
          className="relative w-[160px]"
          style={{ perspective: "900px" }}
        >
          <div className="relative aspect-[9/19] w-full rounded-[28px] border border-border/50 bg-gradient-to-b from-surface to-bg p-[5px] shadow-[0_28px_70px_rgba(0,0,0,0.44)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_80px_rgba(86,232,197,0.14)]">
            <div className="h-full w-full rounded-[23px] bg-gradient-to-b from-mint/20 via-indigo/10 to-bg flex items-center justify-center">
              <span className="font-heading text-lg font-bold text-text/40">{project.title}</span>
            </div>
            <div className="absolute top-[10px] left-1/2 h-[4px] w-1/3 -translate-x-1/2 rounded-b-full bg-bg" />
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {project.platforms.slice(0, 2).map((p) => (
              <span key={p} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                {p}
              </span>
            ))}
          </div>
          <span className="font-mono text-[11px] text-muted">{project.year}</span>
        </div>
        <h3 className="font-heading text-xl font-semibold text-text">{project.title}</h3>
        <p className="font-body text-sm text-muted">{project.description}</p>
        <div className="flex items-center gap-1 pt-1 font-heading text-sm font-medium text-mint opacity-0 transition-opacity group-hover:opacity-100">
          View Project <ArrowRight size={14} />
        </div>
      </div>
    </motion.a>
  );
}
