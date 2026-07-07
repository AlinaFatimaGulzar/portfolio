import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { profile } from "../data/site";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <section className="section !pt-24" id="contact">
      <motion.p
        className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // CONTACT
      </motion.p>
      <motion.h2
        className="title !mb-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        Let&apos;s build something people want to{" "}
        <span
          className="bg-gradient-to-r from-mint to-indigo bg-clip-text text-transparent"
        >
          keep
        </span>{" "}
        using.
      </motion.h2>
      <motion.p
        className="mb-12 max-w-[460px] font-body text-base text-muted"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
      >
        Have a Flutter project in mind? A mobile product that needs shipping, improving, or rescuing? Send a message — I read every one.
      </motion.p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
        <div className="max-w-[520px] rounded-[32px] border border-border bg-surface p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-1">
              <label className="font-mono text-[11px] font-semibold tracking-widest text-muted uppercase">
                YOUR NAME
              </label>
              <input
                className="w-full border-0 border-b border-border bg-transparent pb-2 font-body text-base text-text outline-none transition-shadow focus:border-mint focus:shadow-[0_1px_0_#56E8C5]"
                placeholder=""
                type="text"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[11px] font-semibold tracking-widest text-muted uppercase">
                YOUR EMAIL
              </label>
              <input
                className="w-full border-0 border-b border-border bg-transparent pb-2 font-body text-base text-text outline-none transition-shadow focus:border-mint focus:shadow-[0_1px_0_#56E8C5]"
                placeholder=""
                type="email"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[11px] font-semibold tracking-widest text-muted uppercase">
                YOUR MESSAGE
              </label>
              <textarea
                className="w-full resize-none border-0 border-b border-border bg-transparent pb-2 font-body text-base text-text outline-none transition-shadow focus:border-mint focus:shadow-[0_1px_0_#56E8C5]"
                rows={5}
                placeholder="Tell me about your project…"
                required
              />
            </div>
            <button
              className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-full font-heading text-sm font-medium transition-all ${
                submitted
                  ? "bg-mint text-[#06100f]"
                  : "bg-gradient-to-r from-mint to-indigo text-[#06100f] hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(86,232,197,0.25)]"
              }`}
              type="submit"
            >
              {submitted ? "Message sent ✓" : "Send Message"}
              {!submitted && <Send size={14} />}
            </button>
          </form>
        </div>

        <aside className="hidden md:flex md:flex-col md:justify-center md:gap-5">
          <a
            href={`mailto:${profile.email}`}
            className="font-heading text-2xl font-medium text-mint underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="flex items-center gap-2 font-body text-sm text-muted transition-colors hover:text-mint"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest">{s.label}</span>
              <span className="text-muted/50">↗</span>
            </a>
          ))}
          <p className="font-mono text-[11px] text-muted">
            Based in {profile.city} &middot; {profile.timezone} &middot; Replies within 24 h
          </p>
        </aside>
      </div>
    </section>
  );
}
