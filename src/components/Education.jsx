import { motion } from "framer-motion";
import { education } from "../data/data";
import TiltCard from "./TiltCard";

export default function Education() {
  return (
    <section id="education" className="section education">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Education</h2>
        <div className="section__line" />
      </motion.div>

      <div className="education__grid">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <TiltCard className="edu-card">
              <div className="edu-card__icon">
                <span>{item.school[0]}</span>
              </div>
              <div className="edu-card__content">
                <div className="edu-card__period">{item.period}</div>
                <h3 className="edu-card__degree">{item.degree}</h3>
                <h4 className="edu-card__school">{item.school}</h4>
                <p className="edu-card__desc">{item.description}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
