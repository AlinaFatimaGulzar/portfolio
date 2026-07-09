import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../data/testimonials";

const ACCENT_COLORS = ["#56E8C5", "#7C8CFF", "#FFB454"];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  const current = testimonials[index];
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <section
      className="section !pt-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.p
        className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // KIND WORDS
      </motion.p>
      <motion.h2
        className="title !mb-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        What collaborators say
      </motion.h2>

      <div className="relative mx-auto max-w-2xl text-center">
        <span
          className="pointer-events-none absolute -top-8 left-0 select-none font-heading text-[96px] font-bold leading-none"
          style={{ color, opacity: 0.1 }}
        >
          &quot;
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <p className="font-body text-[1.2rem] leading-relaxed text-text md:text-[1.35rem]">
              &quot;{current.quote}&quot;
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold"
                style={{
                  background: color + "30",
                  color,
                  border: `1px solid ${color}50`,
                }}
              >
                {current.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="text-left">
                <p className="font-heading text-sm font-semibold text-text">
                  {current.name}
                </p>
                <p className="font-body text-xs text-muted">{current.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-mint hover:text-mint"
            type="button"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>

          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="transition-all duration-200"
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: i === index ? 20 : 6,
                  height: 6,
                  background: i === index ? color : "var(--color-border-glow)",
                }}
              />
            </button>
          ))}

          <button
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-mint hover:text-mint"
            type="button"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
