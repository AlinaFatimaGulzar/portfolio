import { useEffect, useRef } from "react";
import { clients } from "../data/site";

export default function ClientLogosSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId: number;
    let pos = 0;
    const speed = 0.3;

    const animate = () => {
      pos -= speed;
      const half = track.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="section !py-16" aria-label="Clients">
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-16" style={{ width: "max-content" }}>
          {[...clients, ...clients].map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex shrink-0 items-center font-heading text-lg font-semibold text-muted/60 transition-all duration-300 hover:scale-105 hover:text-text hover:grayscale-0"
              style={{ filter: "grayscale(100%) brightness(70%)" }}
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
