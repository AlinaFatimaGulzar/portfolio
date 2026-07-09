import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "../data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />

      <motion.div
        className="hero-inner"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div className="portrait-ring" variants={fadeUp}>
          <img src="/profile%20picture.png" alt={profile.name} />
        </motion.div>

        <motion.p className="hero-kicker" variants={fadeUp}>
          {profile.availability}
        </motion.p>

        <motion.h1 variants={fadeUp}>{profile.name}</motion.h1>

        <motion.p className="hero-role" variants={fadeUp}>
          {profile.role}
        </motion.p>

        <motion.p className="hero-copy" variants={fadeUp}>
          {profile.tagline}
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <a className="btn btn-primary" href="#work">
            View My Work
            <ArrowRight size={16} />
          </a>
          <a className="btn btn-outline" href="https://drive.google.com/file/d/1UU0BT-tM45U8u190oppq0ku_POlEcTv8/view?usp=sharing">
            Download CV
          </a>
        </motion.div>

        <motion.div className="hero-socials" variants={fadeUp}>
          <a href="https://github.com/AlinaFatimaGulzar" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/alina-gulzar-a260452a" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <span>{profile.city}</span>
        </motion.div>
      </motion.div>

      <a className="scroll-cue" href="#about">
        <span />
        Scroll Down
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
