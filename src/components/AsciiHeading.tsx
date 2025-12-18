"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ASCII art font - each letter is 6 chars wide, 7 lines tall
const ASCII_FONT: Record<string, string[]> = {
  T: [
    "██████",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
  ],
  R: [
    "█████ ",
    "██  ██",
    "██  ██",
    "█████ ",
    "██ ██ ",
    "██  ██",
    "██  ██",
  ],
  A: [
    " ████ ",
    "██  ██",
    "██  ██",
    "██████",
    "██  ██",
    "██  ██",
    "██  ██",
  ],
  I: [
    "██████",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "██████",
  ],
  N: [
    "██  ██",
    "███ ██",
    "██████",
    "██ ███",
    "██  ██",
    "██  ██",
    "██  ██",
  ],
  G: [
    " ████ ",
    "██  ██",
    "██    ",
    "██ ███",
    "██  ██",
    "██  ██",
    " ████ ",
  ],
  P: [
    "█████ ",
    "██  ██",
    "██  ██",
    "█████ ",
    "██    ",
    "██    ",
    "██    ",
  ],
  E: [
    "██████",
    "██    ",
    "██    ",
    "█████ ",
    "██    ",
    "██    ",
    "██████",
  ],
  O: [
    " ████ ",
    "██  ██",
    "██  ██",
    "██  ██",
    "██  ██",
    "██  ██",
    " ████ ",
  ],
  L: [
    "██    ",
    "██    ",
    "██    ",
    "██    ",
    "██    ",
    "██    ",
    "██████",
  ],
  C: [
    " ████ ",
    "██  ██",
    "██    ",
    "██    ",
    "██    ",
    "██  ██",
    " ████ ",
  ],
  U: [
    "██  ██",
    "██  ██",
    "██  ██",
    "██  ██",
    "██  ██",
    "██  ██",
    " ████ ",
  ],
  Y: [
    "██  ██",
    "██  ██",
    " ████ ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
    "  ██  ",
  ],
  F: [
    "██████",
    "██    ",
    "██    ",
    "█████ ",
    "██    ",
    "██    ",
    "██    ",
  ],
  S: [
    " █████",
    "██    ",
    "██    ",
    " ████ ",
    "    ██",
    "    ██",
    "█████ ",
  ],
  H: [
    "██  ██",
    "██  ██",
    "██  ██",
    "██████",
    "██  ██",
    "██  ██",
    "██  ██",
  ],
  " ": [
    "   ",
    "   ",
    "   ",
    "   ",
    "   ",
    "   ",
    "   ",
  ],
  ".": [
    "  ",
    "  ",
    "  ",
    "  ",
    "  ",
    "██",
    "██",
  ],
};

const GLITCH_CHARS = "░▒▓█▄▀■□●◆★☆";

interface AsciiHeadingProps {
  text: string;
  delay?: number;
  className?: string;
  glitchIntensity?: number;
}

export default function AsciiHeading({
  text,
  delay = 0,
  className = "",
  glitchIntensity = 0.02,
}: AsciiHeadingProps) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert text to ASCII art
  const textToAscii = (str: string): string[] => {
    const lines: string[] = ["", "", "", "", "", "", ""];
    const chars = str.toUpperCase().split("");

    chars.forEach((char) => {
      const charArt = ASCII_FONT[char] || ASCII_FONT[" "];
      for (let i = 0; i < 7; i++) {
        lines[i] += (charArt[i] || "      ") + " ";
      }
    });

    return lines;
  };

  // Glitch effect
  const applyGlitch = (lines: string[], intensity: number): string[] => {
    return lines.map((line) =>
      line
        .split("")
        .map((char) => {
          if (char === " " || char === "\n") return char;
          if (Math.random() < intensity) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          return char;
        })
        .join("")
    );
  };

  // Reveal animation
  useEffect(() => {
    const targetLines = textToAscii(text);
    const totalChars = targetLines[0].length;

    const revealTimer = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setRevealed((prev) => {
          if (prev >= totalChars) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 2;
        });
      }, 20);
    }, delay * 1000);

    return () => {
      clearTimeout(revealTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  // Update display with reveal and glitch
  useEffect(() => {
    const targetLines = textToAscii(text);

    // Apply reveal mask
    const revealedLines = targetLines.map((line) =>
      line
        .split("")
        .map((char, i) => (i < revealed ? char : " "))
        .join("")
    );

    // Apply random glitch
    if (Math.random() < 0.1) {
      setIsGlitching(true);
      setDisplayLines(applyGlitch(revealedLines, glitchIntensity * 3));
      setTimeout(() => {
        setIsGlitching(false);
        setDisplayLines(applyGlitch(revealedLines, glitchIntensity));
      }, 50);
    } else {
      setDisplayLines(applyGlitch(revealedLines, glitchIntensity));
    }
  }, [revealed, text, glitchIntensity]);

  // Periodic glitch
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <pre
        className={`
          text-[4px] xs:text-[5px] sm:text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px]
          leading-[1.1] font-mono whitespace-pre
          transition-all duration-75
          ${isGlitching ? "text-white" : "text-white/90"}
        `}
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: isGlitching
            ? "2px 0 #ff0040, -2px 0 #00ffff, 0 0 20px rgba(255,255,255,0.5)"
            : "0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)",
          transform: isGlitching ? `translateX(${Math.random() * 4 - 2}px)` : "none",
        }}
      >
        {displayLines.join("\n")}
      </pre>
    </motion.div>
  );
}
