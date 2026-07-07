import { useEffect, useRef } from "react";

const band1 = "FLUTTER DEVELOPER • MOBILE APPS • FLUTTER WEB • DART • FIREBASE • RIVERPOD • CLEAN ARCHITECTURE • ";
const band2 = "iOS & ANDROID • REST APIs • STATE MANAGEMENT • CI/CD • SUPABASE • CODEMAGIC • FIGMA TO CODE • ";

export default function Marquee({ amber = false }: { amber?: boolean }) {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el1 = track1Ref.current;
    const el2 = track2Ref.current;
    if (!el1 || !el2) return;
    let lastY = window.scrollY;
    let resetTimer = 0;
    const baseSpeed1 = 28;
    const baseSpeed2 = 22;

    const onScroll = () => {
      const velocity = Math.min(Math.abs(window.scrollY - lastY), 80);
      lastY = window.scrollY;
      const mult = 1 / (1 + velocity * 0.003);
      el1.style.animationDuration = `${baseSpeed1 * mult}s`;
      el2.style.animationDuration = `${baseSpeed2 * mult}s`;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        el1.style.animationDuration = `${baseSpeed1}s`;
        el2.style.animationDuration = `${baseSpeed2}s`;
      }, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(resetTimer);
    };
  }, []);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track marquee--ltr" ref={track1Ref}>
        <span className="marquee__item">{band1.repeat(4)}</span>
        <span className="marquee__item">{band1.repeat(4)}</span>
      </div>
      <div
        className="marquee__track marquee--rtl"
        ref={track2Ref}
        style={{ animationDirection: "reverse" }}
      >
        <span className="marquee__item">{band2.repeat(4)}</span>
        <span className="marquee__item">{band2.repeat(4)}</span>
      </div>
    </div>
  );
}
