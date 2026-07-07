import { motion } from "framer-motion";
import { experience } from "../data/experience";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";

export function ExperienceSection() {
  return (
    <section className="section !pt-24" id="experience">
      <p className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase">
        // EXPERIENCE
      </p>
      <h2 className="title !mb-12">Where I&apos;ve shipped real products</h2>
      <div className="relative">
        <svg className="absolute left-[19px] top-0 h-full w-[2px] md:left-1/2 md:-translate-x-1/2" style={{ pointerEvents: "none" }}>
          <defs>
            <linearGradient id="spineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#56E8C5" />
              <stop offset="100%" stopColor="#7C8CFF" />
            </linearGradient>
          </defs>
          <rect width="2" height="100%" fill="url(#spineGrad)" />
        </svg>
        <div className="space-y-6">
          {experience.map((item, i) => (
            <motion.article
              className={`relative ml-10 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-glow hover:shadow-[0_16px_48px_rgba(86,232,197,0.08)] md:ml-0 md:w-[calc(50%-24px)] ${
                i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute top-6 -left-[42px] h-[10px] w-[10px] rounded-full bg-mint shadow-[0_0_0_4px_rgba(86,232,197,0.19)] md:-left-[17px]" />
              <div className="font-mono text-[11px] font-semibold tracking-wider text-muted uppercase">{item.period}</div>
              <h3 className="mt-2 font-heading text-lg font-semibold text-text">{item.role}</h3>
              <p className="font-body text-sm text-muted">{item.company}</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted/80">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tech.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className="section !pt-24" id="work">
      <p className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase">
        // SELECTED WORK
      </p>
      <h2 className="title !mb-12">Apps shipped. Products people use.</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
