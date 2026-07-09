import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Plan",
    desc: "We define the app goal, core screens, user flow, and technical requirements before the build starts.",
  },
  {
    num: "02",
    title: "Design",
    desc: "I translate the product direction into responsive UI patterns and reusable component structure.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Flutter, Firebase, APIs, state management, and clean architecture come together in a maintainable codebase.",
  },
  {
    num: "04",
    title: "Ship",
    desc: "The final phase covers testing, performance polish, deployment support, and iteration after launch.",
  },
];

export default function ProcessSection() {
  return (
    <section className="section" id="process">
      <div className="section-heading">
        <div>
          <p className="eyebrow">How I Work</p>
          <h2 className="section-title">Process</h2>
        </div>
        <p>
          A clear build path keeps the project focused, avoids rework, and
          gives every screen a reason to exist.
        </p>
      </div>

      <div className="process-grid">
        {steps.map((step, index) => (
          <motion.article
            key={step.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span>{step.num}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.article>
        ))}
      </div>

      <span className="section-number">03</span>
    </section>
  );
}
