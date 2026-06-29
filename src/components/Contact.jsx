import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks } from "../data/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section contact">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section__title">Get In Touch</h2>
        <div className="section__line" />
      </motion.div>

      <div className="contact__content">
        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="form__group">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form__group">
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form__group">
            <textarea
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn--accent btn--full">
            {sent ? "Message Sent! ✓" : "Send Message"}
          </button>
        </motion.form>

        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="contact__heading">Let's work together</h3>
          <p className="contact__text">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing.
          </p>
          <div className="contact__socials">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="contact__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
