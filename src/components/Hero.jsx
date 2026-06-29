import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import TextReveal from "./TextReveal";
import { personalData } from "../data/data";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <ThreeBackground />
      <div className="hero__overlay" />
      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="hero__greeting"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {personalData.name}
          </motion.h1>
          <TextReveal className="hero__tagline">
            {personalData.tagline}
          </TextReveal>
          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button
              className="btn btn--primary"
              onClick={() =>
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </button>
            <button
              className="btn btn--outline"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="scroll-indicator">
            <span className="scroll-mouse">
              <span className="scroll-wheel" />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
