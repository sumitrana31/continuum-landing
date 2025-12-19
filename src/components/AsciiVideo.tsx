"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ASCII art logo - CONTINUUM in large block letters
const LOGO_ART = [
  "  ██████╗ ██████╗ ███╗   ██╗████████╗██╗███╗   ██╗██╗   ██╗██╗   ██╗███╗   ███╗",
  " ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██║████╗  ██║██║   ██║██║   ██║████╗ ████║",
  " ██║     ██║   ██║██╔██╗ ██║   ██║   ██║██╔██╗ ██║██║   ██║██║   ██║██╔████╔██║",
  " ██║     ██║   ██║██║╚██╗██║   ██║   ██║██║╚██╗██║██║   ██║██║   ██║██║╚██╔╝██║",
  " ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║██║ ╚████║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║",
  "  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝",
];

const LOGO_WIDTH = LOGO_ART[0].length;
const LOGO_HEIGHT = LOGO_ART.length;

// Glitch characters
const GLITCH_CHARS = "░▒▓█▄▀╔╗╚╝║═";

export default function AsciiVideo() {
  const [dimensions, setDimensions] = useState({ cols: 150, rows: 50 });
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const charWidth = 8;
      const charHeight = 14;
      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / charHeight);
      setDimensions({ cols: Math.min(cols, 200), rows: Math.min(rows, 80) });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate frame with animated logo
  const generateFrame = useCallback(
    (time: number): string => {
      const { cols, rows } = dimensions;
      const lines: string[] = [];

      // Calculate logo position (centered)
      const logoStartX = Math.floor((cols - LOGO_WIDTH) / 2);
      const logoStartY = Math.floor((rows - LOGO_HEIGHT) / 2);

      // Wave parameters
      const waveAmplitude = 2;
      const waveFrequency = 0.1;
      const waveSpeed = 2;

      for (let y = 0; y < rows; y++) {
        let line = "";

        for (let x = 0; x < cols; x++) {
          let char = " ";

          // Check if we're in the logo area
          const logoX = x - logoStartX;
          const logoY = y - logoStartY;

          // Apply wave distortion to Y position
          const wave = Math.sin(x * waveFrequency + time * waveSpeed) * waveAmplitude;
          const distortedLogoY = Math.round(logoY - wave);

          // Check if this position is within the logo bounds
          if (
            logoX >= 0 &&
            logoX < LOGO_WIDTH &&
            distortedLogoY >= 0 &&
            distortedLogoY < LOGO_HEIGHT
          ) {
            const logoChar = LOGO_ART[distortedLogoY]?.[logoX];

            if (logoChar && logoChar !== " ") {
              // Apply glitch effect randomly
              const glitchChance = 0.02 + Math.sin(time * 3) * 0.01;

              if (Math.random() < glitchChance) {
                char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              } else {
                // Pulsing brightness effect
                const pulse = Math.sin(time * 2 + x * 0.05) * 0.5 + 0.5;
                if (pulse > 0.7 && logoChar === "█") {
                  char = "▓";
                } else if (pulse < 0.3 && logoChar === "█") {
                  char = "░";
                } else {
                  char = logoChar;
                }
              }
            }
          }

          // Background particles/noise
          if (char === " ") {
            // Subtle background noise
            if (Math.random() < 0.003) {
              const noiseChars = ["·", ".", ":", "°"];
              char = noiseChars[Math.floor(Math.random() * noiseChars.length)];
            }

            // Vertical scan lines
            if (x % 8 === 0 && Math.random() < 0.02) {
              char = "│";
            }

            // Horizontal data streams (matrix-style)
            const streamY = (y + Math.floor(time * 10)) % rows;
            if (streamY < 3 && Math.random() < 0.01) {
              char = "─";
            }
          }

          line += char;
        }
        lines.push(line);
      }

      // Add decorative elements

      // Top border with animated progress
      const progressPos = Math.floor((time * 0.15 % 1) * (cols - 10)) + 5;
      let topLine = lines[2] || "";
      topLine = topLine.split("").map((c, i) => {
        if (i < 4 || i >= cols - 4) return c;
        if (Math.abs(i - progressPos) < 2) return "●";
        if (i % 15 === 0) return "┼";
        if (c === " ") return "─";
        return c;
      }).join("");
      lines[2] = topLine;

      // Bottom waveform
      for (let y = rows - 6; y < rows - 1; y++) {
        let bottomLine = "";
        const waveRow = rows - 1 - y;

        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(x * 0.12 + time * 2.5) * 0.5;
          const wave2 = Math.sin(x * 0.07 - time * 1.8) * 0.3;
          const wave3 = Math.sin(x * 0.2 + time * 3.5) * 0.2;
          const waveHeight = (wave1 + wave2 + wave3 + 1) / 2 * 5;

          if (waveRow < waveHeight) {
            const intensity = Math.floor((waveHeight - waveRow) / 5 * 7);
            const bars = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
            bottomLine += bars[Math.min(intensity, 7)];
          } else {
            bottomLine += " ";
          }
        }
        lines[y] = bottomLine;
      }

      return lines.join("\n");
    },
    [dimensions]
  );

  // Animation loop
  useEffect(() => {
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime > 50) {
        timeRef.current += 0.05;
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
      {/* Full screen ASCII */}
      <pre
        className="absolute inset-0 text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] leading-[1.15] font-mono whitespace-pre text-white/20 overflow-hidden flex items-center justify-center"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        {asciiFrame}
      </pre>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </motion.div>
  );
}
