import { Code2, Layers3, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { skills } from "../data/site";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Flutter apps for Android and iOS with responsive layouts, reliable state management, and production-ready Firebase workflows.",
  },
  {
    icon: Layers3,
    title: "Product UI Engineering",
    desc: "Clean, polished interfaces built from reusable components so the product feels consistent from onboarding to checkout.",
  },
  {
    icon: Code2,
    title: "Architecture & Delivery",
    desc: "Maintainable app structure, API integration, debugging, release support, and practical improvements to existing apps.",
  },
];

export default function ToolkitSection() {
  return (
    <section className="section section-alt" id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">What I Do</p>
          <h2 className="section-title">My Services</h2>
        </div>
        <p>
          I focus on complete, thoughtful app experiences: the architecture
          underneath, the interface people touch, and the details that make it
          feel professional.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.article
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Icon size={32} />
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="skill-cloud">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <span className="section-number">02</span>
    </section>
  );
}
