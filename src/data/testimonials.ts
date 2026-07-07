export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Delivered exactly what we needed — clean code, calm process.",
    name: "Jane Smith",
    role: "CEO, Acme Corp",
    avatar: "/assets/avatars/jane.jpg",
  },
  {
    quote: "Alina turns rough product ideas into calm, usable app flows.",
    name: "Sarah K.",
    role: "Product Lead",
    avatar: "/assets/avatars/sarah.jpg",
  },
  {
    quote: "Her Flutter work is fast, thoughtful, and refreshingly practical.",
    name: "Hamza R.",
    role: "Startup Founder",
    avatar: "/assets/avatars/hamza.jpg",
  },
];
