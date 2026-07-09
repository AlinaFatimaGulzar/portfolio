import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/site";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <a href="#top" className="brand-mark" aria-label={`${profile.name} home`}>
        <span>{profile.initials.charAt(0)}</span>
        {profile.initials.slice(1)}
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <a className="nav-contact" href="#contact">
        Contact Me
      </a>

      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} onClick={() => setOpen(false)}>
            {profile.email}
          </a>
        </div>
      )}
    </header>
  );
}
