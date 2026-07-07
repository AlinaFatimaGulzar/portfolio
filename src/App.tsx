import { lazy, Suspense, useState, useCallback, useEffect, useRef } from "react";
import Nav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import { ExperienceSection } from "./components/Sections";
import { WorkSection } from "./components/Sections";
import ToolkitSection from "./components/Toolkit";
import ProcessSection from "./components/Process";
import ClientLogosSection from "./components/ClientLogos";
import ContactSection from "./components/Contact";
import FooterSection from "./components/Footer";

const WorldCanvas = lazy(() => import("./scenes/WorldCanvas"));

function GradientBlobFallback() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(86,232,197,0.15) 0%, rgba(124,140,255,0.1) 30%, transparent 60%)",
        animation: "slowFloat 7s ease-in-out infinite",
      }}
    />
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    return () => { html.style.scrollBehavior = ""; };
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <Suspense fallback={<GradientBlobFallback />}>
        <WorldCanvas scrollProgress={scrollProgress} />
      </Suspense>

      <div className="app relative z-10">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <ExperienceSection />
          <WorkSection />
      <ToolkitSection />
      <ProcessSection />
      <ClientLogosSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}
