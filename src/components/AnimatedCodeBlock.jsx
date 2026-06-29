import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  `class Portfolio extends StatefulWidget {
  @override
  _PortfolioState createState() => _PortfolioState();
}

class _PortfolioState extends State<Portfolio> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text("Hello, I'm Alina!"),
        ),
      ),
    );
  }
}`,
  `Widget build(BuildContext context) {
  return Container(
    decoration: BoxDecoration(
      gradient: LinearGradient(
        colors: [Color(0xFF9FA1FF), Color(0xFFAEE2FF)],
      ),
    ),
    child: Text(
      "Crafting beautiful mobile experiences",
      style: TextStyle(
        fontSize: 24,
        fontWeight: FontWeight.bold,
      ),
    ),
  );
}`,
];

export default function AnimatedCodeBlock() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const snippet = codeSnippets[snippetIndex];
    let i = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (i < snippet.length) {
        setDisplayedText(snippet.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }, 3000);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [snippetIndex]);

  return (
    <motion.div
      className="code-block"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="code-block__header">
        <div className="code-block__dots">
          <span className="code-block__dot code-block__dot--red" />
          <span className="code-block__dot code-block__dot--yellow" />
          <span className="code-block__dot code-block__dot--green" />
        </div>
        <span className="code-block__title">main.dart</span>
        <span className="code-block__lang">Dart / Flutter</span>
      </div>
      <div className="code-block__body">
        <pre>
          <code>{displayedText}</code>
          {isTyping && <span className="code-block__cursor" />}
        </pre>
      </div>
    </motion.div>
  );
}
