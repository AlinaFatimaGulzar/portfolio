import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/data";

const playStoreApps = projects.filter((p) => p.live?.includes("play.google.com"));

export default function PhoneMockup() {
  const cardRef = useRef();
  const [currentApp, setCurrentApp] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  if (playStoreApps.length === 0) return null;

  const app = playStoreApps[currentApp % playStoreApps.length];

  return (
    <motion.div
      className="phone-mockup-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="phone-mockup__label">
        <span className="phone-mockup__badge">LIVE ON PLAY STORE</span>
      </div>
      <div
        ref={cardRef}
        className="phone-mockup"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="phone-mockup__notch" />
        <div className="phone-mockup__screen">
          <div className="phone-mockup__status-bar">
            <span>9:41</span>
            <span className="phone-mockup__icons">
              <span className="mock-signal" />
              <span className="mock-wifi" />
              <span className="mock-battery" />
            </span>
          </div>
          <div className="phone-mockup__content">
            <div className="phone-mockup__app-icon">
              <span>{app.title[0]}</span>
            </div>
            <h4 className="phone-mockup__app-name">{app.title}</h4>
            <p className="phone-mockup__app-desc">{app.description}</p>
            <div className="phone-mockup__rating">
              {"★".repeat(5)}
              <span className="phone-mockup__rating-text">4.8</span>
            </div>
            <a
              href={app.live}
              target="_blank"
              rel="noopener noreferrer"
              className="phone-mockup__install"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M3 20.5v-17a.5.5 0 01.5-.5h.59a.5.5 0 01.35.15l11.06 11.06a.5.5 0 010 .7L4.44 21.85A.5.5 0 014.1 22H3.5a.5.5 0 01-.5-.5zM15.5 11.5l-2.5-2.5H21a1 1 0 011 1v4a1 1 0 01-1 1h-8l2.5-2.5a1 1 0 000-1z" />
              </svg>
              Install
            </a>
          </div>
          <div className="phone-mockup__nav-bar" />
        </div>
        <div className="phone-mockup__button phone-mockup__button--left" />
        <div className="phone-mockup__button phone-mockup__button--right" />
      </div>
      {playStoreApps.length > 1 && (
        <div className="phone-mockup__dots">
          {playStoreApps.map((_, i) => (
            <button
              key={i}
              className={`phone-mockup__dot ${i === currentApp % playStoreApps.length ? "active" : ""}`}
              onClick={() => setCurrentApp(i)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
