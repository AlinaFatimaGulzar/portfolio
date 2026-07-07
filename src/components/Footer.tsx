import { profile } from "../data/site";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-6 font-mono text-[11px] text-muted">
      <span>&copy; 2025 {profile.name} &mdash; Built with Flutter mindset.</span>
      <button
        onClick={scrollToTop}
        className="transition-colors hover:text-mint"
        type="button"
      >
        Scroll back up ↑
      </button>
    </footer>
  );
}
