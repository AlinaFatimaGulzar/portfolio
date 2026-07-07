import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function onFrame(time: number) {
      lenis.raf(time);
      requestAnimationFrame(onFrame);
    }
    requestAnimationFrame(onFrame);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export function scrollToTop() {
  const lenis = new Lenis();
  lenis.scrollTo(0, { duration: 1.5 });
}
