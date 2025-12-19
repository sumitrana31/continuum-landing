"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Brighter character set for more visibility
const CHARS = " ·:;+*#%@";
const BRIGHT_CHARS = "░▒▓█";

export default function AsciiVideo() {
  const [dimensions, setDimensions] = useState({ cols: 200, rows: 60 });
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const charWidth = 8;
      const charHeight = 14;
      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / charHeight);
      setDimensions({ cols: Math.min(cols, 250), rows: Math.min(rows, 80) });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track mouse for interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate frame with wave patterns
  const generateFrame = useCallback(
    (time: number): string => {
      const { cols, rows } = dimensions;
      const lines: string[] = [];
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          const nx = (x / cols - 0.5) * 2;
          const ny = (y / rows - 0.5) * 2;
          const dist = Math.sqrt(nx * nx + ny * ny);
          const dmx = nx - (mx - 0.5) * 2;
          const dmy = ny - (my - 0.5) * 2;
          const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);

          const bigWave = Math.sin(dist * 3 - time * 0.8) * 0.4;
          const ripple = Math.sin(dist * 12 - time * 3) * Math.exp(-dist * 0.8) * 0.5;
          const flow = Math.sin(nx * 4 + time * 2) * Math.sin(ny * 2 + time * 0.5) * 0.2;
          const sweep = Math.sin((nx + ny) * 5 - time * 1.5) * 0.15;
          const mouseEffect = Math.sin(mouseDist * 15 - time * 4) * Math.exp(-mouseDist * 2) * 0.4;
          const column = Math.sin(x * 0.3 + time * 2 + y * 0.1) * 0.1;
          const pulse = Math.exp(-dist * 1.5) * Math.sin(time * 1.5) * 0.3;
          const edgeGlow = Math.exp(-Math.abs(dist - 0.8) * 8) * Math.sin(time * 2 + dist * 10) * 0.2;

          let value = 0.3 + bigWave + ripple + flow + sweep + mouseEffect + column + pulse + edgeGlow;
          value += (Math.random() - 0.5) * 0.08;
          value = Math.max(0, Math.min(1, value));

          if (value > 0.85) {
            const idx = Math.floor((value - 0.85) / 0.15 * (BRIGHT_CHARS.length - 1));
            line += BRIGHT_CHARS[Math.min(idx, BRIGHT_CHARS.length - 1)];
          } else {
            const idx = Math.floor(value / 0.85 * (CHARS.length - 1));
            line += CHARS[Math.min(idx, CHARS.length - 1)];
          }
        }
        lines.push(line);
      }
      return lines.join("\n");
    },
    [dimensions]
  );

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
        className="absolute inset-0 text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] leading-[1.2] font-mono whitespace-pre text-white/30 overflow-hidden"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
          textShadow: "0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.05)",
        }}
      >
        {asciiFrame}
      </pre>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
      }} />
    </motion.div>
  );
}
