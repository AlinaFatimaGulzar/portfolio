import { useEffect, useState, useRef } from "react";
import { Github, Linkedin, X as XIcon, Menu } from "lucide-react";
import { profile } from "../data/site";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "TOOLKIT", href: "#toolkit" },
  { label: "PROCESS", href: "#process" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "bg-[#07080C]/70 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <a href="#top" className="font-heading text-[15px] font-medium text-text">
          <span className="bg-gradient-to-r from-mint to-indigo bg-clip-text text-transparent">
            {profile.initials.charAt(0)}
          </span>
          {profile.initials.slice(1)}
        </a>
        <button
          className="z-50 flex h-10 w-10 items-center justify-center text-text hover:text-mint transition-colors"
          onClick={() => setOpen(true)}
          type="button"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            backgroundColor: "rgba(7, 8, 12, 0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-mint hover:text-mint"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            type="button"
            aria-label="Close navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <nav className="flex flex-col items-center gap-3">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="font-heading text-[48px] md:text-[64px] font-bold leading-none text-text transition-colors hover:text-mint"
                onClick={() => setOpen(false)}
                style={{ animation: `navFadeIn 0.4s ${i * 0.08}s both` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className="absolute bottom-10 flex items-center gap-6"
            style={{ animation: "navFadeIn 0.4s 0.4s both" }}
          >
            <a href="https://github.com/AlinaFatimaGulzar" className="text-muted transition-colors hover:text-mint">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/alina-gulzar-a260452a" className="text-muted transition-colors hover:text-mint">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-muted transition-colors hover:text-mint">
              <XIcon size={20} />
            </a>
            <span className="font-mono text-[11px] text-muted">{profile.email}</span>
          </div>
        </div>
      )}
    </>
  );
}
