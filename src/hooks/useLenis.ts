import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";

    return () => {
      html.style.scrollBehavior = previous;
    };
  }, []);
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
