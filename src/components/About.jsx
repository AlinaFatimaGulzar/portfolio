import { motion } from "framer-motion";
import { personalData } from "../data/data";
import PhoneMockup from "./PhoneMockup";

export default function About() {
  return (
    <section id="about" className="section about">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">About Me</h2>
        <div className="section__line" />
      </motion.div>

      <div className="about__content">
        <motion.div
          className="about__image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="about__image">
            <div className="about__image-placeholder">
              <span>AG</span>
            </div>
          </div>
          <div className="about__image-border" />
          <div className="about__floating-tag">Flutter Dev</div>
        </motion.div>

        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="about__bio">{personalData.bio}</p>
          <div className="about__info">
            <div className="about__info-item">
              <span className="about__info-label">Name</span>
              <span className="about__info-value">{personalData.name}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">Email</span>
              <span className="about__info-value">{personalData.email}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">Location</span>
              <span className="about__info-value">{personalData.location}</span>
            </div>
            <div className="about__info-item">
              <span className="about__info-label">Specialty</span>
              <span className="about__info-value">Flutter & Web Dev</span>
            </div>
          </div>
        </motion.div>
      </div>

      <PhoneMockup />
    </section>
  );
}
