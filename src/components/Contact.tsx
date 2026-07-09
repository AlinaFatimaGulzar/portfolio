import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "../data/site";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);

    try {
      const res = await fetch("https://formsubmit.co/ajax/alinagulzar177@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("Failed to send");
      form.reset();
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 3000);
    } catch {
      alert("Something went wrong. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2 className="section-title">Let&apos;s build your next app.</h2>
        <p className="section-lead">
          Tell me what you are building, where the product stands, and what you
          want the next version to feel like.
        </p>

        <a className="mail-link" href={`mailto:${profile.email}`}>
          <Mail size={18} />
          {profile.email}
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" required />
        <input name="email" type="email" placeholder="Your email" required />
        <textarea name="message" rows={5} placeholder="Tell me about the project" required />
        <input type="hidden" name="_subject" value="Portfolio enquiry" />
        <input type="hidden" name="_captcha" value="false" />
        <button className="btn btn-primary" type="submit" disabled={sending}>
          {sending ? "Sending..." : submitted ? "Message sent" : "Send Message"}
          {!sending && <ArrowRight size={16} />}
        </button>
      </form>
    </section>
  );
}
