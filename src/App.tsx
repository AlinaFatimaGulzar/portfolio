import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { AboutSection, WorkSection } from "./components/Sections";
import ToolkitSection from "./components/Toolkit";
import ProcessSection from "./components/Process";
import ContactSection from "./components/Contact";
import FooterSection from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <div className="app">
      <Nav />
      <main>
        <Hero />
        <AboutSection />
        <ToolkitSection />
        <WorkSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
