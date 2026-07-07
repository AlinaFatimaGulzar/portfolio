import { motion } from "framer-motion";
import { webToolkit, webToolkitVersions } from "../data/mobileToolkit";

export default function WebToolkitPanel() {
  return (
    <motion.div
      className="rounded-2xl border border-border bg-surface overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <div className="ml-3 flex-1 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted">
          https://alinagulzar.dev
        </div>
      </div>
      <div className="divide-y divide-border">
        {webToolkit.map((item, i) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:border-l-2 hover:border-l-mint hover:bg-border/30"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ backgroundColor: item.bg + "d9" }}
            >
              <span className="text-[10px] font-bold text-white">{item.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-medium text-text">{item.name}</p>
              <p className="font-body text-xs text-muted">{item.description}</p>
            </div>
            {webToolkitVersions[item.name] && (
              <span className="shrink-0 font-mono text-[10px] text-amber">{webToolkitVersions[item.name]}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
