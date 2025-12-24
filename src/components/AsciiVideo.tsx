"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

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
  "DIVERSITY",
  "INCLUSION",
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
  "CONFLICT RESOLUTION",
];

// Noise characters for background
const NOISE_CHARS = " ·:;·  · ";

interface WordInstance {
  word: string;
  x: number;
  y: number;
  fadeOffset: number;
  speed: number;
}

export default function AsciiVideo() {
  const [dimensions, setDimensions] = useState({ cols: 200, rows: 60 });
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const wordsRef = useRef<WordInstance[]>([]);

  // Update dimensions based on screen size with responsive character sizing
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let charWidth: number;
      let charHeight: number;

      if (width >= 1024) {
        charWidth = 8.4;
        charHeight = 16.8;
      } else if (width >= 768) {
        charWidth = 7.2;
        charHeight = 14.4;
      } else if (width >= 640) {
        charWidth = 6;
        charHeight = 12;
      } else {
        charWidth = 4.8;
        charHeight = 9.6;
      }

      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / charHeight);
      setDimensions({ cols: Math.min(cols, 300), rows: Math.min(rows, 120) });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Initialize word positions
  useEffect(() => {
    const { cols, rows } = dimensions;
    if (cols < 10 || rows < 10) return;

    const words: WordInstance[] = [];
    const numWords = Math.floor((cols * rows) / 400); // Density based on screen size

    for (let i = 0; i < Math.max(numWords, 8); i++) {
      const word = TRAINING_WORDS[i % TRAINING_WORDS.length];
      words.push({
        word,
        x: Math.floor(Math.random() * (cols - word.length - 4)) + 2,
        y: Math.floor(Math.random() * (rows - 4)) + 2,
        fadeOffset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      });
    }

    wordsRef.current = words;
  }, [dimensions]);

  // Generate frame with floating words
  const generateFrame = useCallback(
    (time: number): string => {
      const { cols, rows } = dimensions;

      // Create grid filled with subtle noise
      const grid: string[][] = [];
      for (let y = 0; y < rows; y++) {
        const row: string[] = [];
        for (let x = 0; x < cols; x++) {
          // Subtle background noise
          const noiseValue = Math.sin(x * 0.1 + time * 0.5) * Math.sin(y * 0.15 + time * 0.3);
          const noise = Math.random() * 0.3 + noiseValue * 0.1;
          if (noise > 0.85) {
            row.push(NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]);
          } else {
            row.push(" ");
          }
        }
        grid.push(row);
      }

      // Place words with fade effect
      wordsRef.current.forEach((wordInstance) => {
        const { word, x, y, fadeOffset, speed } = wordInstance;

        // Calculate fade (0 to 1, cycling)
        const fadeValue = (Math.sin(time * speed + fadeOffset) + 1) / 2;

        // Only show word if fade is above threshold
        if (fadeValue > 0.3) {
          const opacity = (fadeValue - 0.3) / 0.7; // Normalize to 0-1

          for (let i = 0; i < word.length; i++) {
            const charX = x + i;
            const charY = y;

            if (charX >= 0 && charX < cols && charY >= 0 && charY < rows) {
              // Apply character based on opacity
              if (opacity > 0.7) {
                grid[charY][charX] = word[i];
              } else if (opacity > 0.4) {
                // Partially visible - use dimmer chars
                const dimChars = "·:;+";
                grid[charY][charX] = word[i] === " " ? " " : dimChars[Math.floor(opacity * dimChars.length)];
              } else {
                // Very dim
                grid[charY][charX] = opacity > 0.2 ? "·" : " ";
              }
            }
          }
        }
      });

      // Convert grid to string
      return grid.map(row => row.join("")).join("\n");
    },
    [dimensions]
  );

  // Slowly move words around
  useEffect(() => {
    const moveInterval = setInterval(() => {
      const { cols, rows } = dimensions;

      wordsRef.current = wordsRef.current.map((wordInstance) => {
        // Slowly drift words
        let newX = wordInstance.x + (Math.random() - 0.5) * 2;
        let newY = wordInstance.y + (Math.random() - 0.5) * 0.5;

        // Keep in bounds
        newX = Math.max(2, Math.min(cols - wordInstance.word.length - 2, newX));
        newY = Math.max(2, Math.min(rows - 2, newY));

        return {
          ...wordInstance,
          x: Math.floor(newX),
          y: Math.floor(newY),
        };
      });
    }, 2000);

    return () => clearInterval(moveInterval);
  }, [dimensions]);

  // Animation loop at ~25fps
  useEffect(() => {
    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (currentTime - lastTime > 40) {
        timeRef.current += 0.04;
        setAsciiFrame(generateFrame(timeRef.current));
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [generateFrame]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 overflow-hidden"
    >
      <pre
        className="absolute inset-0 w-full h-full text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] leading-[1.2] font-mono whitespace-pre text-white/40 overflow-hidden"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: "0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1)",
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      >
        {asciiFrame}
      </pre>
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)",
      }} />
    </motion.div>
  );
}
