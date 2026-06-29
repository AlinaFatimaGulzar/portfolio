import { motion } from "framer-motion";
import { experience } from "../data/data";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Experience</h2>
        <div className="section__line" />
      </motion.div>

      <div className="timeline">
        {experience.map((item, index) => (
          <motion.div
            key={item.role}
            className="timeline__item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="timeline__dot" />
            <div className="timeline__content">
              <div className="timeline__period">{item.period}</div>
              <h3 className="timeline__role">{item.role}</h3>
              <h4 className="timeline__company">{item.company}</h4>
              <p className="timeline__desc">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
