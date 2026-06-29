import { motion } from "framer-motion";

export default function TextReveal({ children, className, as = "p" }) {
  const text = typeof children === "string" ? children : "";

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    },
  };

  if (!text) return <>{children}</>;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariants} style={{ display: char === " " ? "inline" : "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
