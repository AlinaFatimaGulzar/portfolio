export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Alina delivered exactly what we envisioned - fast, polished, and with code our team could maintain. A rare combination of taste and technical depth.",
    name: "Umer Qureshi",
    role: "Product Lead, BitStorm Solutions",
  },
  {
    quote:
      "She understood the brief better than I articulated it and came back with solutions I hadn't thought of. Would work with her again without hesitation.",
    name: "Sara Malik",
    role: "Founder, SuperAppBox",
  },
  {
    quote:
      "The app shipped in 10 weeks, passed App Store review first try, and users genuinely enjoy it. That last part is the hardest to achieve.",
    name: "Hamza Riaz",
    role: "CTO, Indie Labs",
  },
];
