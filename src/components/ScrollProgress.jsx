import { useState, useEffect } from "react";

const sections = ["home", "about", "skills", "projects", "experience", "education", "contact"];

export default function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      let currentIndex = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentIndex = i;
          }
        }
      });
      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scroll-progress">
      <div className="scroll-progress__track">
        <div
          className="scroll-progress__fill"
          style={{ height: `${progress}%` }}
        />
      </div>
      <div className="scroll-progress__nodes">
        {sections.map((id, i) => (
          <button
            key={id}
            className={`scroll-progress__node ${i === activeIndex ? "active" : ""}`}
            onClick={() => scrollTo(id)}
            aria-label={`Scroll to ${id}`}
          />
        ))}
      </div>
    </div>
  );
}
