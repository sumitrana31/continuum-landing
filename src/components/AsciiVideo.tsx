"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function AsciiVideo() {
  const [dimensions, setDimensions] = useState({ cols: 150, rows: 50 });
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const charWidth = 9;
      const charHeight = 16;
      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / charHeight);
      setDimensions({ cols: Math.min(cols, 180), rows: Math.min(rows, 70) });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Generate frame with video production themed elements
  const generateFrame = useCallback(
    (time: number): string => {
      const { cols, rows } = dimensions;
      const lines: string[] = [];

      // Film strip characters
      const FILM_HOLE = "◘";
      const FILM_EDGE = "│";

      // Waveform characters (different heights)
      const WAVE_CHARS = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

      // Progress/timeline characters
      const PROGRESS_EMPTY = "─";
      const PROGRESS_FILL = "━";
      const PROGRESS_HEAD = "●";

      for (let y = 0; y < rows; y++) {
        let line = "";
        const ny = y / rows; // Normalized y (0-1)

        for (let x = 0; x < cols; x++) {
          const nx = x / cols; // Normalized x (0-1)
          let char = " ";

          // === LEFT FILM STRIP ===
          if (x < 4) {
            if (x === 0 || x === 3) {
              char = FILM_EDGE;
            } else if (y % 4 === 0) {
              char = FILM_HOLE;
            } else {
              char = " ";
            }
          }
          // === RIGHT FILM STRIP ===
          else if (x >= cols - 4) {
            const rx = cols - 1 - x;
            if (rx === 0 || rx === 3) {
              char = FILM_EDGE;
            } else if (y % 4 === 0) {
              char = FILM_HOLE;
            } else {
              char = " ";
            }
          }
          // === TOP TIMELINE ===
          else if (y < 3) {
            if (y === 1) {
              // Animated playhead position
              const playheadPos = ((time * 0.1) % 1) * (cols - 10) + 5;
              const distFromPlayhead = Math.abs(x - playheadPos);

              if (distFromPlayhead < 1) {
                char = PROGRESS_HEAD;
              } else if (x % 10 === 0) {
                char = "┼";
              } else {
                char = x < playheadPos ? PROGRESS_FILL : PROGRESS_EMPTY;
              }
            } else if (y === 0 && x % 20 === 0) {
              // Timecode markers
              const seconds = Math.floor((x / cols) * 120);
              const timecode = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
              const chars = timecode.split("");
              if (x + chars.length < cols - 4) {
                line += chars.join("");
                x += chars.length - 1;
                continue;
              }
            }
          }
          // === BOTTOM WAVEFORM (Audio) ===
          else if (y >= rows - 8) {
            const waveY = rows - y - 1; // Invert so 0 is at bottom
            const waveHeight = 7;

            // Create audio waveform pattern
            const wave1 = Math.sin(x * 0.15 + time * 2) * 0.5;
            const wave2 = Math.sin(x * 0.08 - time * 1.5) * 0.3;
            const wave3 = Math.sin(x * 0.3 + time * 3) * 0.2;
            const combinedWave = (wave1 + wave2 + wave3 + 1) / 2; // Normalize to 0-1

            const waveLevel = Math.floor(combinedWave * waveHeight);

            if (waveY <= waveLevel) {
              // Use different intensity based on how close to peak
              const intensity = Math.min(7, Math.floor((waveLevel - waveY + 1) / waveHeight * 7));
              char = WAVE_CHARS[intensity];
            } else {
              char = " ";
            }
          }
          // === CENTER CONTENT AREA ===
          else {
            // Video frame area with subtle patterns
            const centerX = cols / 2;
            const centerY = rows / 2;
            const distX = Math.abs(x - centerX) / (cols / 2);
            const distY = Math.abs(y - centerY) / (rows / 2);
            const dist = Math.sqrt(distX * distX + distY * distY);

            // Play button triangle in center
            const playBtnSize = Math.min(cols, rows) * 0.15;
            const relX = x - centerX;
            const relY = (y - centerY) * 1.8; // Aspect ratio correction

            // Triangle check: point on right, base on left
            const inTriangle =
              relX > -playBtnSize * 0.5 &&
              relX < playBtnSize * 0.8 &&
              Math.abs(relY) < (playBtnSize * 0.5 - relX * 0.4);

            if (inTriangle) {
              // Pulsing play button
              const pulse = Math.sin(time * 2) * 0.3 + 0.7;
              if (Math.random() < pulse * 0.3) {
                char = "▶";
              } else {
                char = "░";
              }
            }
            // Circular border around play button
            else if (Math.abs(dist - 0.25) < 0.03) {
              const angle = Math.atan2(y - centerY, x - centerX);
              const progress = ((angle + Math.PI) / (2 * Math.PI) + time * 0.1) % 1;
              if (progress < 0.75) {
                char = "○";
              }
            }
            // Subtle scan lines effect
            else if (y % 3 === 0 && Math.random() < 0.02) {
              char = "─";
            }
            // Video noise/grain in background
            else if (Math.random() < 0.008) {
              const noiseChars = ["·", ".", ":", "'"];
              char = noiseChars[Math.floor(Math.random() * noiseChars.length)];
            }
            // Frame markers in corners
            else if (
              ((nx < 0.15 || nx > 0.85) && (ny < 0.2 || ny > 0.75)) &&
              (Math.abs(nx - 0.1) < 0.02 || Math.abs(nx - 0.9) < 0.02 ||
               Math.abs(ny - 0.15) < 0.02 || Math.abs(ny - 0.8) < 0.02)
            ) {
              if ((x + y) % 2 === 0) {
                char = "┼";
              }
            }
          }

          line += char;
        }
        lines.push(line);
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
        // ~20fps
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
        className="absolute inset-0 text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] leading-[1.1] font-mono whitespace-pre text-white/25 overflow-hidden"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: "0 0 10px rgba(255,255,255,0.1)",
        }}
      >
        {asciiFrame}
      </pre>

      {/* Vignette */}
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
