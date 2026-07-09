import { ArrowUp } from "lucide-react";
import { profile } from "../data/site";
import { scrollToTop } from "../hooks/useLenis";

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <p>
        &copy; 2026 {profile.name}. Flutter app developer based in {profile.city}.
      </p>
      <button type="button" onClick={scrollToTop} aria-label="Back to top">
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
