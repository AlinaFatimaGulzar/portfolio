import { motion } from "framer-motion";
import { mobileToolkit } from "../data/mobileToolkit";

export default function MobileToolkitPanel() {
  return (
    <motion.div
      className="rounded-[36px] border border-border bg-surface p-6"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] text-muted">
        <span>9:41 AM</span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-[1px] bg-muted/40" />
          <span className="h-3 w-3 rounded-full border border-muted/30" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {mobileToolkit.map((item, i) => (
          <motion.div
            key={item.name}
            className="group relative flex cursor-default flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: item.bg + "d9" }}
            >
              <span className="text-sm font-bold text-white">{item.icon}</span>
            </div>
            <span className="font-mono text-[9px] text-muted">{item.name}</span>
            <div className="pointer-events-none absolute -top-2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-full rounded-lg border border-border-glow bg-surface px-3 py-2 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              <p className="font-heading text-xs font-semibold text-text">{item.name}</p>
              <p className="mt-0.5 font-body text-[10px] text-muted">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
