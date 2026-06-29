import { useRef, useEffect } from "react";

export default function SectionDivider() {
  const pathRef = useRef();
  const pathRef2 = useRef();

  useEffect(() => {
    let animId;
    let start = 0;

    const animate = () => {
      start += 0.008;
      if (pathRef.current) {
        const y1 = Math.sin(start) * 4;
        const y2 = Math.sin(start * 1.3 + 1) * 3;
        const y3 = Math.sin(start * 0.7 + 2) * 5;
        const y4 = Math.sin(start * 1.1 + 0.5) * 4;
        pathRef.current.setAttribute(
          "d",
          `M0,10 Q${window.innerWidth * 0.25},${8 + y1} ${window.innerWidth * 0.5},${10 + y2} T${window.innerWidth},${12 + y3} V20 H0 Z`
        );
      }
      if (pathRef2.current) {
        const y1 = Math.sin(start * 1.5 + 3) * 3;
        const y2 = Math.sin(start * 0.8 + 4) * 4;
        const y3 = Math.sin(start * 1.2 + 5) * 3;
        pathRef2.current.setAttribute(
          "d",
          `M0,15 Q${window.innerWidth * 0.3},${13 + y1} ${window.innerWidth * 0.6},${15 + y2} T${window.innerWidth},${17 + y3} V25 H0 Z`
        );
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="section-divider">
      <svg
        viewBox={`0 0 ${window.innerWidth} 20`}
        preserveAspectRatio="none"
        className="section-divider__svg"
      >
        <path
          ref={pathRef}
          d={`M0,10 Q${window.innerWidth * 0.25},8 ${window.innerWidth * 0.5},10 T${window.innerWidth},12 V20 H0 Z`}
          fill="rgba(255, 138, 114, 0.05)"
        />
        <path
          ref={pathRef2}
          d={`M0,15 Q${window.innerWidth * 0.3},13 ${window.innerWidth * 0.6},15 T${window.innerWidth},17 V25 H0 Z`}
          fill="rgba(255, 187, 168, 0.04)"
        />
      </svg>
    </div>
  );
}
