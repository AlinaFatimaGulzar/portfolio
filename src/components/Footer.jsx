import { personalData } from "../data/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo">{"<AG />"}</span>
          <p className="footer__tagline">{personalData.tagline}</p>
        </div>
        <div className="footer__links">
          <a href="#home" onClick={(e) => { e.preventDefault(); document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" }); }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }); }}>About</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}>Projects</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}>Contact</a>
        </div>
        <div className="footer__copy">
          &copy; {year} {personalData.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
