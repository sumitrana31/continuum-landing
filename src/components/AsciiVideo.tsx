"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Training-related words to display
const TRAINING_WORDS = [
  "CYBERSECURITY",
  "GDPR",
  "COMPLIANCE",
  "SAFETY",
  "ONBOARDING",
  "LEADERSHIP",
  "DATA PRIVACY",
  "ETHICS",
  "DIVERSITY",
  "PHISHING",
  "HIPAA",
  "SOC 2",
  "ISO 27001",
  "SECURITY",
  "CONDUCT",
  "FIRE SAFETY",
  "FIRST AID",
  "WELLNESS",
  "ERGONOMICS",
  "TRAINING",
];

interface WordPosition {
  id: number;
  word: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

export default function AsciiVideo() {
  const [visibleWords, setVisibleWords] = useState<WordPosition[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate word positions
  const generatePositions = useCallback(
    (cycleNum: number): WordPosition[] => {
      const positions: WordPosition[] = [];
      const numWords = isMobile ? 6 : 12; // Fewer words on mobile
      const usedPositions: { x: number; y: number }[] = [];

      for (let i = 0; i < numWords; i++) {
        const wordIndex = (cycleNum * numWords + i) % TRAINING_WORDS.length;
        const word = TRAINING_WORDS[wordIndex];

        // Generate non-overlapping position
        // On mobile, use more constrained x range to prevent cutoff
        let x: number, y: number;
        let attempts = 0;
        const maxX = isMobile ? 50 : 70; // Narrower range on mobile

        do {
          x = 5 + Math.random() * maxX;
          y = 15 + Math.random() * 60;
          attempts++;
        } while (
          attempts < 20 &&
          usedPositions.some(
            (pos) =>
              Math.abs(pos.x - x) < (isMobile ? 20 : 15) &&
              Math.abs(pos.y - y) < (isMobile ? 12 : 8)
          )
        );

        usedPositions.push({ x, y });

        positions.push({
          id: cycleNum * 1000 + i,
          word,
          x,
          y,
          delay: i * 0.4,
          duration: 5 + Math.random() * 2,
        });
      }

      return positions;
    },
    [isMobile]
  );

  // Initialize and cycle words
  useEffect(() => {
    setVisibleWords(generatePositions(0));
    let cycleNum = 0;

    const interval = setInterval(() => {
      cycleNum += 1;
      setVisibleWords(generatePositions(cycleNum));
    }, 8000);

    return () => clearInterval(interval);
  }, [generatePositions]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating words */}
      <AnimatePresence mode="popLayout">
        {visibleWords.map((wordPos) => (
          <motion.span
            key={wordPos.id}
            className="absolute font-mono text-[10px] sm:text-xs md:text-sm lg:text-base tracking-[0.15em] sm:tracking-[0.2em] text-white pointer-events-none select-none"
            style={{
              left: `${wordPos.x}%`,
              top: `${wordPos.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0.25, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: wordPos.duration,
              delay: wordPos.delay,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1],
            }}
          >
            {wordPos.word}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </div>
  );
}
