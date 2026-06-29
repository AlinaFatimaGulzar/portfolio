import { motion } from "framer-motion";
import { skills } from "../data/data";
import TiltCard from "./TiltCard";
import AnimatedCodeBlock from "./AnimatedCodeBlock";

export default function Skills() {
  return (
    <section id="skills" className="section skills">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Skills</h2>
        <div className="section__line" />
      </motion.div>

      <div className="skills__layout">
        <div className="skills__grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard className="skill-card">
                <div className="skill-card__header">
                  <span className="skill-card__name">{skill.name}</span>
                  <span className="skill-card__percent">{skill.level}%</span>
                </div>
                <div className="skill-card__bar">
                  <motion.div
                    className="skill-card__fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <AnimatedCodeBlock />
      </div>
    </section>
  );
}
