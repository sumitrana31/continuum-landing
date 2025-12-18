"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ASCII frames for the animation - morphing between video production concepts
const ASCII_FRAMES = [
  // Frame 1: Play button
  `
                    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                 ▄▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▄
               ▄▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▄
             ▄▀░░░░░░░░░░░░▄▄░░░░░░░░░░░░░░░░░░░░░░░░▀▄
            █░░░░░░░░░░░░▄▀░░▀▄░░░░░░░░░░░░░░░░░░░░░░░░█
           █░░░░░░░░░░░░█░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░░░█░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░█░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░█░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░░█░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░░░█░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░█
           █░░░░░░░░░░░░█░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░█
            █░░░░░░░░░░░░▀▄░░▄▀░░░░░░░░░░░░░░░░░░░░░░░░█
             ▀▄░░░░░░░░░░░░▀▀░░░░░░░░░░░░░░░░░░░░░░░░▄▀
               ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
                 ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
                    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`,
  // Frame 2: Film reel
  `
                         ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                      ▄▀░░░░░░░░░░░░░░░░░░░░░▀▄
                    ▄▀░░▄▄▄░░░░░░░░░░░░░▄▄▄░░░░▀▄
                   █░░█░░░█░░░░░░░░░░░░█░░░█░░░░█
                  █░░░█▄▄▄█░░░░░░░░░░░░█▄▄▄█░░░░░█
                  █░░░░░░░░░░░▄▄▄▄▄░░░░░░░░░░░░░░█
                  █░░░░░░░░░▄▀░░░░░▀▄░░░░░░░░░░░░█
                  █░░░░░░░░█░░░░░░░░░█░░░░░░░░░░░█
                  █░░░░░░░░█░░░░░░░░░█░░░░░░░░░░░█
                  █░░░░░░░░░▀▄░░░░░▄▀░░░░░░░░░░░░█
                  █░░░░░░░░░░░▀▀▀▀▀░░░░░░░░░░░░░░█
                  █░░░▄▄▄░░░░░░░░░░░░░░░▄▄▄░░░░░█
                   █░█░░░█░░░░░░░░░░░░░█░░░█░░░█
                    ▀▄█▄▄▄█░░░░░░░░░░░░█▄▄▄█░▄▀
                      ▀▄░░░░░░░░░░░░░░░░░░░▄▀
                         ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`,
  // Frame 3: Camera/Recording
  `
                  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▄▄▄
                 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░█
                 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█░░░█
                 █░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░░░░░░█░░░█
                 █░░░░░█░░░░░░░░░░░░█░░░░░░░░░░░░░░░░█▄▄▄█
                 █░░░░░█░░░░░░░░░░░░█░░░░░░░░░░░░░░░░█
                 █░░░░░█░░░░●░░░░░░░█░░░░░░▄▄▄░░░░░░░█
                 █░░░░░█░░░░░░░░░░░░█░░░░░█░░░█░░░░░░█
                 █░░░░░█░░░░░░░░░░░░█░░░░░█░░░█░░░░░░█
                 █░░░░░▀▀▀▀▀▀▀▀▀▀▀▀▀▀░░░░░░▀▀▀░░░░░░░█
                 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
                 █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
                  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`,
  // Frame 4: Progress/Learning - lightbulb moment
  `
                              ▄▄▄▄▄▄▄▄▄
                           ▄▀░░░░░░░░░░░▀▄
                          █░░░░░░░░░░░░░░░█
                         █░░░░░░░░░░░░░░░░░█
                         █░░░░░░░░░░░░░░░░░█
                          █░░░░░░░░░░░░░░░█
                           ▀▄░░░░░░░░░░░▄▀
                             ▀▄░░░░░░░▄▀
                               █▀▀▀▀▀█
                               █░░░░░█
                               █░░░░░█
                                █░░░█
                                █░░░█
                                 ▀▀▀

                    ✦ ─────────────────────── ✦
                         TRAINING COMPLETE
                    ✦ ─────────────────────── ✦
`,
  // Frame 5: Checkmark/Success
  `
                    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
                 ▄▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▄
               ▄▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▄
             ▄▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀▄
            █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
           █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▄░░░░░░░░█
          █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀░░░░░░░░░░░░█
          █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀░░░░░░░░░░░░░░░█
          █░░░░▄▄░░░░░░░░░░░░░░░░░░░░▄▀░░░░░░░░░░░░░░░░░░█
          █░░░░░░▀▄░░░░░░░░░░░░░░░▄▀░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░▀▄░░░░░░░░▄▀▀░░░░░░░░░░░░░░░░░░░░░░░░█
          █░░░░░░░░░░░░▀▀▀▀▀▀░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
           █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
            █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█
             ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
               ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
                 ▀▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄▀
                    ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`,
];

// Glitch characters for transition effect
const GLITCH_CHARS = "░▒▓█▄▀■□●○◆◇★☆";

export default function AsciiVideo() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [displayText, setDisplayText] = useState(ASCII_FRAMES[0]);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glitchRef = useRef<NodeJS.Timeout | null>(null);

  // Glitch transition effect
  const glitchTransition = (targetFrame: number) => {
    setIsGlitching(true);
    const targetText = ASCII_FRAMES[targetFrame];
    const currentText = displayText;
    let iterations = 0;
    const maxIterations = 8;

    if (glitchRef.current) clearInterval(glitchRef.current);

    glitchRef.current = setInterval(() => {
      iterations++;

      if (iterations >= maxIterations) {
        setDisplayText(targetText);
        setIsGlitching(false);
        if (glitchRef.current) clearInterval(glitchRef.current);
        return;
      }

      // Create glitched version mixing current and target
      const glitchedText = targetText
        .split("")
        .map((char, i) => {
          if (char === " " || char === "\n") return char;
          // More glitch at the start, less as we approach target
          const glitchProbability = 1 - iterations / maxIterations;
          if (Math.random() < glitchProbability * 0.4) {
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
          // Sometimes show current frame character
          if (Math.random() < glitchProbability * 0.2 && currentText[i]) {
            return currentText[i];
          }
          return char;
        })
        .join("");

      setDisplayText(glitchedText);
    }, 50);
  };

  useEffect(() => {
    // Main animation loop
    intervalRef.current = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % ASCII_FRAMES.length;
        glitchTransition(next);
        return next;
      });
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (glitchRef.current) clearInterval(glitchRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      {/* Scanline effect overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
        }}
      />

      {/* ASCII art container */}
      <pre
        className={`
          text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]
          leading-[1.1]
          text-white/20
          font-mono
          whitespace-pre
          transition-all duration-100
          ${isGlitching ? "text-white/30" : ""}
        `}
        style={{
          textShadow: isGlitching
            ? "0 0 10px rgba(255,255,255,0.3), 2px 0 rgba(255,0,0,0.1), -2px 0 rgba(0,255,255,0.1)"
            : "0 0 20px rgba(255,255,255,0.1)",
          transform: isGlitching ? `translateX(${Math.random() * 2 - 1}px)` : "none",
        }}
      >
        {displayText}
      </pre>

      {/* Ambient glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
