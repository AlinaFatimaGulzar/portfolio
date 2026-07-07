import { useEffect, useRef } from "react";

export function useScrollVelocity(callback: (velocity: number) => void) {
  const lastY = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const velocity = Math.abs(window.scrollY - lastY.current);
        lastY.current = window.scrollY;
        callback(velocity);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameRef.current);
    };
  }, [callback]);
}
