"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// ASCII art font - each letter is 6 chars wide, 7 lines tall
const ASCII_FONT: Record<string, string[]> = {
  T: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "  ██  "],
  R: ["█████ ", "██  ██", "██  ██", "█████ ", "██ ██ ", "██  ██", "██  ██"],
  A: [" ████ ", "██  ██", "██  ██", "██████", "██  ██", "██  ██", "██  ██"],
  I: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "  ██  ", "██████"],
  N: ["██  ██", "███ ██", "██████", "██ ███", "██  ██", "██  ██", "██  ██"],
  G: [" ████ ", "██  ██", "██    ", "██ ███", "██  ██", "██  ██", " ████ "],
  P: ["█████ ", "██  ██", "██  ██", "█████ ", "██    ", "██    ", "██    "],
  E: ["██████", "██    ", "██    ", "█████ ", "██    ", "██    ", "██████"],
  O: [" ████ ", "██  ██", "██  ██", "██  ██", "██  ██", "██  ██", " ████ "],
  L: ["██    ", "██    ", "██    ", "██    ", "██    ", "██    ", "██████"],
  C: [" ████ ", "██  ██", "██    ", "██    ", "██    ", "██  ██", " ████ "],
  U: ["██  ██", "██  ██", "██  ██", "██  ██", "██  ██", "██  ██", " ████ "],
  Y: ["██  ██", "██  ██", " ████ ", "  ██  ", "  ██  ", "  ██  ", "  ██  "],
  F: ["██████", "██    ", "██    ", "█████ ", "██    ", "██    ", "██    "],
  S: [" █████", "██    ", "██    ", " ████ ", "    ██", "    ██", "█████ "],
  H: ["██  ██", "██  ██", "██  ██", "██████", "██  ██", "██  ██", "██  ██"],
  " ": ["   ", "   ", "   ", "   ", "   ", "   ", "   "],
  ".": ["  ", "  ", "  ", "  ", "  ", "██", "██"],
};

interface AsciiHeadingProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function AsciiHeading({
  text,
  delay = 0,
  className = "",
}: AsciiHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Convert text to ASCII art - memoized so it only runs once
  const asciiLines = useMemo(() => {
    const lines: string[] = ["", "", "", "", "", "", ""];
    const chars = text.toUpperCase().split("");

    chars.forEach((char) => {
      const charArt = ASCII_FONT[char] || ASCII_FONT[" "];
      for (let i = 0; i < 7; i++) {
        lines[i] += (charArt[i] || "      ") + " ";
      }
    });

    return lines.join("\n");
  }, [text]);

  // Simple reveal after delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <pre
        className="ascii-heading text-[4px] xs:text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] leading-[1.1] font-mono whitespace-pre text-white/90"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
        }}
      >
        {asciiLines}
      </pre>
    </motion.div>
  );
}
