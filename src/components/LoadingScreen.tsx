import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    let frame: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setShow(false), 200);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#07080C]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="font-heading text-[80px] font-bold text-text">
            AG
          </span>
          <div className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(135deg, #56E8C5 0%, #7C8CFF 100%)",
                width: `${progress * 100}%`,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
