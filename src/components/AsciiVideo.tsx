"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Extended character sets for smoother gradients
const CHARS = " .·:;-=+*#%@";
const BRIGHT_CHARS = "░▒▓█";
const WATER_CHARS = " ~≈≋∿⌇⌇⌇∿≋≈~";

// Ripple data structure
interface Ripple {
  x: number;
  y: number;
  birth: number;
  strength: number;
  speed: number;
}

export default function AsciiVideo() {
  const [dimensions, setDimensions] = useState({ cols: 200, rows: 60 });
  const [asciiFrame, setAsciiFrame] = useState<string>("");
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, velocity: 0 });
  const ripplesRef = useRef<Ripple[]>([]);

  // Update dimensions based on screen size
  useEffect(() => {
    const updateDimensions = () => {
      const charWidth = 8;
      const charHeight = 14;
      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / charHeight);
      setDimensions({ cols: Math.min(cols, 280), rows: Math.min(rows, 100) });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Track mouse with velocity for dynamic ripples
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX / window.innerWidth;
      const newY = e.clientY / window.innerHeight;
      const dx = newX - mouseRef.current.x;
      const dy = newY - mouseRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      mouseRef.current = {
        prevX: mouseRef.current.x,
        prevY: mouseRef.current.y,
        x: newX,
        y: newY,
        velocity: velocity * 50,
      };

      // Create ripples on fast movement
      if (velocity > 0.008) {
        ripplesRef.current.push({
          x: newX,
          y: newY,
          birth: timeRef.current,
          strength: Math.min(velocity * 80, 1.5),
          speed: 2 + Math.random() * 0.5,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      // Create strong ripple on click
      ripplesRef.current.push({
        x,
        y,
        birth: timeRef.current,
        strength: 2.5,
        speed: 3,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // Generate frame with hyper-realistic ripples
  const generateFrame = useCallback(
    (time: number): string => {
      const { cols, rows } = dimensions;
      const lines: string[] = [];
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mVel = mouseRef.current.velocity;

      // Clean up old ripples (decay after 4 seconds)
      ripplesRef.current = ripplesRef.current.filter(
        (r) => time - r.birth < 4
      );

      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < cols; x++) {
          // Normalized coordinates (-1 to 1)
          const nx = (x / cols - 0.5) * 2;
          const ny = (y / rows - 0.5) * 2;
          const dist = Math.sqrt(nx * nx + ny * ny);

          // Mouse distance
          const dmx = nx - (mx - 0.5) * 2;
          const dmy = ny - (my - 0.5) * 2;
          const mouseDist = Math.sqrt(dmx * dmx + dmy * dmy);

          // === BASE WATER SURFACE ===
          // Deep underwater ambient movement
          const deepWave = Math.sin(dist * 2 - time * 0.3) * 0.15;

          // Surface tension waves
          const surfaceWave1 = Math.sin(nx * 8 + time * 1.2) * Math.cos(ny * 6 - time * 0.8) * 0.12;
          const surfaceWave2 = Math.sin((nx + ny) * 5 - time) * 0.08;

          // === REALISTIC RIPPLE PHYSICS ===
          let rippleValue = 0;

          // Process all active ripples with proper physics
          for (const ripple of ripplesRef.current) {
            const age = time - ripple.birth;
            const rx = (ripple.x - 0.5) * 2;
            const ry = (ripple.y - 0.5) * 2;
            const rdx = nx - rx;
            const rdy = ny - ry;
            const rippleDist = Math.sqrt(rdx * rdx + rdy * rdy);

            // Wave physics: expanding ring with decay
            const waveRadius = age * ripple.speed * 0.3;
            const ringDist = Math.abs(rippleDist - waveRadius);

            // Sharper wave front with exponential decay
            const waveAmplitude = ripple.strength * Math.exp(-age * 0.8) * Math.exp(-ringDist * 15);

            // Interference pattern - multiple harmonics
            const phase1 = Math.sin((rippleDist - age * ripple.speed) * 25) * waveAmplitude;
            const phase2 = Math.sin((rippleDist - age * ripple.speed * 0.7) * 18) * waveAmplitude * 0.5;
            const phase3 = Math.sin((rippleDist - age * ripple.speed * 1.3) * 32) * waveAmplitude * 0.25;

            rippleValue += phase1 + phase2 + phase3;
          }

          // === MOUSE TRACKING RIPPLE ===
          // Continuous ripple following mouse with intensity based on velocity
          const mouseWave1 = Math.sin(mouseDist * 30 - time * 6) * Math.exp(-mouseDist * 4) * (0.2 + mVel * 0.3);
          const mouseWave2 = Math.sin(mouseDist * 20 - time * 4) * Math.exp(-mouseDist * 3) * (0.15 + mVel * 0.2);
          const mouseWave3 = Math.sin(mouseDist * 40 - time * 8) * Math.exp(-mouseDist * 6) * mVel * 0.4;

          // === AMBIENT EFFECTS ===
          // Caustics simulation (light patterns on water)
          const caustic1 = Math.sin(nx * 12 + time * 2) * Math.sin(ny * 10 - time * 1.5) * 0.06;
          const caustic2 = Math.cos((nx - ny) * 8 + time) * 0.04;

          // Breathing pulse from center
          const pulse = Math.exp(-dist * 2) * Math.sin(time * 1.2) * 0.15;

          // Edge distortion
          const edgeEffect = Math.exp(-Math.abs(dist - 0.9) * 10) * Math.sin(time * 2.5 + dist * 15) * 0.1;

          // Perlin-like noise approximation
          const noise = (
            Math.sin(nx * 20 + ny * 15 + time) *
            Math.cos(nx * 15 - ny * 20 + time * 0.5) * 0.04
          );

          // === COMBINE ALL EFFECTS ===
          let value = 0.35 +
            deepWave +
            surfaceWave1 + surfaceWave2 +
            rippleValue * 0.6 +
            mouseWave1 + mouseWave2 + mouseWave3 +
            caustic1 + caustic2 +
            pulse +
            edgeEffect +
            noise;

          // Add subtle randomness for texture
          value += (Math.random() - 0.5) * 0.04;

          // Clamp value
          value = Math.max(0, Math.min(1, value));

          // === CHARACTER MAPPING ===
          // Use different character sets based on intensity for more realism
          let char: string;
          if (value > 0.88) {
            // Brightest - use block characters
            const idx = Math.floor((value - 0.88) / 0.12 * (BRIGHT_CHARS.length - 1));
            char = BRIGHT_CHARS[Math.min(idx, BRIGHT_CHARS.length - 1)];
          } else if (value > 0.6 && rippleValue > 0.1) {
            // Active ripple areas - use water-specific chars
            const idx = Math.floor((value - 0.6) / 0.28 * (WATER_CHARS.length - 1));
            char = WATER_CHARS[Math.min(idx, WATER_CHARS.length - 1)];
          } else {
            // Standard gradient
            const idx = Math.floor(value / 0.88 * (CHARS.length - 1));
            char = CHARS[Math.min(idx, CHARS.length - 1)];
          }

          line += char;
        }
        lines.push(line);
      }
      return lines.join("\n");
    },
    [dimensions]
  );

  // Animation loop at ~30fps for smoother ripples
  useEffect(() => {
    let lastTime = 0;
    const animate = (currentTime: number) => {
      if (currentTime - lastTime > 33) { // ~30fps
        timeRef.current += 0.033;
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
      className="absolute inset-0 overflow-hidden cursor-crosshair"
    >
      <pre
        className="absolute inset-0 text-[7px] sm:text-[9px] md:text-[11px] lg:text-[13px] leading-[1.15] font-mono whitespace-pre text-white/35 overflow-hidden select-none"
        style={{
          fontFamily: "ui-monospace, 'SF Mono', Menlo, Monaco, monospace",
          textShadow: "0 0 15px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.08), 0 0 60px rgba(255,255,255,0.03)",
          letterSpacing: "-0.5px",
        }}
      >
        {asciiFrame}
      </pre>

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 3px)",
        }}
      />

      {/* Subtle horizontal interference */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </motion.div>
  );
}
