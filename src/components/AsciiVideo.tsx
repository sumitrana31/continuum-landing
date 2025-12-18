"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Character sets for different "densities" - creates depth and texture
const DENSITY_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

export default function AsciiVideo() {
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Configuration
  const cols = 120;
  const rows = 40;

  // Generate ASCII frame based on mathematical functions
  const generateFrame = useCallback((time: number): string => {
    const lines: string[] = [];

    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols; x++) {
        // Normalize coordinates
        const nx = (x / cols - 0.5) * 2;
        const ny = (y / rows - 0.5) * 2;

        // Distance from center
        const dist = Math.sqrt(nx * nx + ny * ny);

        // Multiple wave patterns combined
        // Main circular wave emanating from center
        const wave1 = Math.sin(dist * 8 - time * 2) * 0.5 + 0.5;

        // Horizontal flowing wave (like video timeline)
        const wave2 = Math.sin(nx * 6 + time * 1.5) * Math.cos(ny * 3) * 0.3;

        // Spiral pattern (represents transformation)
        const angle = Math.atan2(ny, nx);
        const spiral = Math.sin(angle * 3 + dist * 5 - time * 1.2) * 0.25;

        // Vertical "data stream" columns
        const dataStream = Math.sin(x * 0.5 + time * 3) * Math.sin(y * 0.3 - time) * 0.2;

        // Pulsing center (like a play button breathing)
        const pulse = Math.exp(-dist * 2) * Math.sin(time * 2) * 0.3;

        // Edge fade for vignette effect
        const vignette = 1 - Math.pow(dist, 1.5) * 0.5;

        // Combine all effects
        let value = (wave1 + wave2 + spiral + dataStream + pulse) * vignette;

        // Add some noise for texture
        value += (Math.random() - 0.5) * 0.05;

        // Clamp and map to character
        value = Math.max(0, Math.min(1, value));
        const charIndex = Math.floor(value * (DENSITY_CHARS.length - 1));
        line += DENSITY_CHARS[charIndex];
      }
      lines.push(line);
    }

    return lines.join("\n");
  }, [cols, rows]);

  // Animation loop
  useEffect(() => {
    let lastTime = 0;

    const animate = (currentTime: number) => {
      // Throttle to ~20fps for performance
      if (currentTime - lastTime > 50) {
        timeRef.current += 0.05;
        setAsciiFrame(generateFrame(timeRef.current));
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateFrame]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.3 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-30"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Main ASCII display */}
      <pre
        className="text-[6px] xs:text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] leading-[1] tracking-tighter font-mono whitespace-pre text-white/[0.15] z-10"
        style={{
          textShadow: "0 0 30px rgba(255,255,255,0.1)",
          fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
        }}
      >
        {asciiFrame}
      </pre>

      {/* Center glow effect */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }}
      />
    </motion.div>
  );
}
