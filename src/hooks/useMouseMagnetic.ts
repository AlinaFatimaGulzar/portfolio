import { useEffect, useRef, useCallback } from "react";

export function useMouseMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  pullRadius = 12,
) {
  const cleanupRef = useRef<(() => void) | null>(null);

  const handler = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const pull = Math.min(dist, pullRadius);
      const angle = Math.atan2(y, x);
      const tx = Math.cos(angle) * pull;
      const ty = Math.sin(angle) * pull;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    },
    [ref, pullRadius],
  );

  const reset = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handler);
    el.addEventListener("mouseleave", reset);
    cleanupRef.current = () => {
      el.removeEventListener("mousemove", handler);
      el.removeEventListener("mouseleave", reset);
    };
    return cleanupRef.current;
  }, [handler, reset]);
}
