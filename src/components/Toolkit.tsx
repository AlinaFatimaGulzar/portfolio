import { motion } from "framer-motion";
import MobileToolkitPanel from "./MobileToolkitPanel";
import WebToolkitPanel from "./WebToolkitPanel";

export default function ToolkitSection() {
  return (
    <section className="section !pt-24" id="toolkit">
      <motion.p
        className="font-mono text-xs font-semibold tracking-[0.15em] text-mint uppercase"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        // TOOLKIT
      </motion.p>
      <motion.h2
        className="title !mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        The tools I think and ship with
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr]">
        <MobileToolkitPanel />
        <div className="hidden items-center justify-center md:flex">
          <div className="flex h-full w-px bg-gradient-to-b from-mint/40 via-mint/20 to-indigo/40">
            <span
              className="mx-auto -mt-3 block -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest text-muted"
              style={{ writingMode: "vertical-rl" }}
            >
              MOBILE & WEB
            </span>
          </div>
        </div>
        <WebToolkitPanel />
      </div>
    </section>
  );
}
