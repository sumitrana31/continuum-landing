"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Training-related words to display
const TRAINING_WORDS = [
  "CYBERSECURITY",
  "GDPR ESSENTIALS",
  "COMPLIANCE",
  "SAFETY TRAINING",
  "ONBOARDING",
  "LEADERSHIP",
  "DATA PRIVACY",
  "ANTI-HARASSMENT",
  "WORKPLACE SAFETY",
  "ETHICS",
  "DIVERSITY & INCLUSION",
  "PHISHING AWARENESS",
  "HIPAA",
  "SOC 2",
  "ISO 27001",
  "RISK MANAGEMENT",
  "SECURITY AWARENESS",
  "CODE OF CONDUCT",
  "FIRE SAFETY",
  "FIRST AID",
  "MENTAL HEALTH",
  "ERGONOMICS",
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
  const [cycle, setCycle] = useState(0);

  // Generate word positions - memoized to avoid recalculation
  const generatePositions = useMemo(() => {
    return (cycleNum: number): WordPosition[] => {
      const positions: WordPosition[] = [];
      const numWords = 12; // Fixed number of words per cycle
      const usedPositions: { x: number; y: number }[] = [];

      for (let i = 0; i < numWords; i++) {
        const wordIndex = (cycleNum * numWords + i) % TRAINING_WORDS.length;

        // Generate non-overlapping position
        let x: number, y: number;
        let attempts = 0;
        do {
          x = 5 + Math.random() * 70; // 5-75% from left
          y = 10 + Math.random() * 70; // 10-80% from top
          attempts++;
        } while (
          attempts < 20 &&
          usedPositions.some(
            (pos) => Math.abs(pos.x - x) < 15 && Math.abs(pos.y - y) < 8
          )
        );

        usedPositions.push({ x, y });

        positions.push({
          id: cycleNum * 1000 + i,
          word: TRAINING_WORDS[wordIndex],
          x,
          y,
          delay: i * 0.3,
          duration: 4 + Math.random() * 2,
        });
      }

      return positions;
    };
  }, []);

  // Initialize and cycle words
  useEffect(() => {
    setVisibleWords(generatePositions(0));

    const interval = setInterval(() => {
      setCycle((prev) => {
        const next = prev + 1;
        setVisibleWords(generatePositions(next));
        return next;
      });
    }, 8000); // New batch every 8 seconds

    return () => clearInterval(interval);
  }, [generatePositions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 overflow-hidden"
    >
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating words */}
      <AnimatePresence mode="popLayout">
        {visibleWords.map((wordPos) => (
          <motion.div
            key={wordPos.id}
            className="absolute font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-white/20 whitespace-nowrap pointer-events-none select-none"
            style={{
              left: `${wordPos.x}%`,
              top: `${wordPos.y}%`,
              textShadow: "0 0 30px rgba(255,255,255,0.3)",
            }}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{
              opacity: [0, 0.4, 0.4, 0],
              scale: [0.8, 1, 1, 0.9],
              filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"],
            }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            transition={{
              duration: wordPos.duration,
              delay: wordPos.delay,
              ease: "easeInOut",
              times: [0, 0.2, 0.8, 1],
            }}
          >
            {wordPos.word}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </motion.div>
  );
}
