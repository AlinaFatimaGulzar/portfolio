import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { profile } from "../data/site";
import { useMouseMagnetic } from "../hooks/useMouseMagnetic";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      setTime(
        new Intl.DateTimeFormat("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    format();
    const timer = window.setInterval(format, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <span>{time}</span>;
}

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMouseMagnetic(ref, 12);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  return (
    <section className="hero !pt-32" id="top">
      <motion.div
        className="hero__grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero__content">
          <motion.div className="inline-flex items-center gap-2.5 rounded-full border border-border-glow bg-surface px-4 py-2" variants={itemVariants}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full bg-green" />
              <span className="absolute inset-0 animate-ping rounded-full bg-green" style={{ animationDuration: "2s" }} />
            </span>
            <span className="font-mono text-[11px] font-semibold tracking-widest text-muted uppercase">
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1 className="mt-6" variants={itemVariants}>
            <span className="text-text">{profile.name}</span>
            <br />
            Flutter &{" "}
            <span className="bg-gradient-to-r from-mint to-indigo bg-clip-text text-transparent">
              App Developer
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-[420px] font-body text-lg text-muted"
            variants={itemVariants}
          >
            {profile.tagline}
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap gap-2" variants={itemVariants}>
            {profile.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-muted uppercase"
              >
                {cap}
              </span>
            ))}
          </motion.div>

          <motion.div className="mt-8 flex flex-wrap items-center gap-4" variants={itemVariants}>
            <MagneticButton
              href="#work"
              className="inline-flex h-[50px] items-center gap-2 rounded-full bg-gradient-to-r from-mint to-indigo px-7 font-heading text-sm font-medium text-[#06100f] transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(86,232,197,0.25)]"
            >
              View My Work
            </MagneticButton>
            <a
              href="/cv.pdf"
              className="inline-flex h-[50px] items-center gap-2 rounded-full border border-mint/40 px-7 font-heading text-sm font-medium text-muted transition-all hover:text-text"
            >
              Download CV <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div className="mt-6 flex items-center gap-4" variants={itemVariants}>
            <a href="https://github.com/AlinaFatimaGulzar" className="text-muted transition-colors hover:text-mint">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/alina-gulzar-a260452a" className="text-muted transition-colors hover:text-mint">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted transition-colors hover:text-mint">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a9 9 0 0 1 9 9" />
                <path d="M4 4a16 16 0 0 1 16 16" />
                <circle cx="5" cy="18" r="1" />
              </svg>
            </a>
          </motion.div>

          <motion.div className="mt-6 font-mono text-[11px] text-amber" variants={itemVariants}>
            {profile.city} &middot; <Clock />
          </motion.div>
        </div>

        <div className="relative hidden md:block">
          <div className="hero__scene">
            <div className="scene-placeholder" />
            <div className="phone-fallback" aria-hidden="true">
              <div className="phone-shell">
                <div className="phone-screen">
                  <div className="phone-screen__top" />
                  <div className="phone-screen__body">
                    <span className="screen-line" />
                    <span className="screen-line" />
                    <div className="screen-card" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
