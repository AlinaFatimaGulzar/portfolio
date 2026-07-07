import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Understand the Product",
    desc: "I map user flows, define the core interaction, and agree on what success looks like before any code is written.",
  },
  {
    num: "02",
    title: "Design the Experience",
    desc: "High-fidelity Figma screens, motion references, and component inventory — so the build phase has no guesswork.",
  },
  {
    num: "03",
    title: "Build in Flutter",
    desc: "Clean Architecture, proper state management, tested widgets. Mobile-first, then web if required.",
  },
  {
    num: "04",
    title: "Ship & Iterate",
    desc: "CI/CD via Codemagic or GitHub Actions. App Store + Play Store submission, crash monitoring, and post-launch support.",
  },
];

export default function ProcessSection() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = svgRef.current?.querySelector("path");
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);

    const onScroll = () => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      path.style.strokeDashoffset = String(length * (1 - progress));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="section !pt-24" id="process">
      <motion.p
        className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // PROCESS
      </motion.p>
      <motion.h2
        className="title !mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        From brief to the App Store
      </motion.h2>

      <div className="relative">
        <svg
          ref={svgRef}
          className="absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 md:block"
          style={{ pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="processGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#56E8C5" />
              <stop offset="100%" stopColor="#7C8CFF" />
            </linearGradient>
          </defs>
          <path
            d="M0,40 C25,40 25,80 50,80 C75,80 75,40 100,40"
            fill="none"
            stroke="url(#processGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            transform="translate(0, 60)"
          />
          <path
            d="M0,40 C25,40 25,80 50,80 C75,80 75,40 100,40"
            fill="none"
            stroke="url(#processGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            transform="translate(0, 120)"
          />
        </svg>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-2xl border border-border bg-surface p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span
                className="font-heading text-[48px] font-bold leading-none"
                style={{
                  background: "linear-gradient(135deg, #56E8C5 0%, #7C8CFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {step.num}
              </span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 font-body text-sm text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
