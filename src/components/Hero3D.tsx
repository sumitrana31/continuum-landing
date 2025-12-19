"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { brand, trackEvent } from "@/lib/data";
import AsciiVideo from "./AsciiVideo";

export default function Hero3D() {
  const handlePrimaryCta = () => {
    trackEvent("hero_cta_click", { cta: "primary" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      aria-label="Hero"
    >
      {/* Full-screen ASCII Animation Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <AsciiVideo />
        </Suspense>
      </div>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content - visible immediately */}
      <div className="container relative z-10 pt-32 pb-40">
        <div className="max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-label">Training Production Studio</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-display mb-12">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="block"
            >
              Training
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="block"
            >
              people actually
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="block text-[var(--foreground-muted)]"
            >
              finish.
            </motion.span>
          </h1>

          {/* Horizontal line reveal */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-white/20 mb-12 max-w-md"
          />

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead max-w-xl mb-12"
          >
            {brand.heroSubhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.a
              href={brand.bookingUrl}
              className="btn btn-primary"
              onClick={handlePrimaryCta}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {brand.primaryCta}
            </motion.a>
            <motion.a
              href="#videos"
              className="btn btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Sample Work
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="scroll-indicator-line" />
      </motion.div>

      {/* Bottom stats - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-12 text-sm"
      >
        <div>
          <span className="text-[var(--foreground-muted)] block">First cut</span>
          <span className="font-medium">48 hours</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div>
          <span className="text-[var(--foreground-muted)] block">Final delivery</span>
          <span className="font-medium">~3 days</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div>
          <span className="text-[var(--foreground-muted)] block">Revisions</span>
          <span className="font-medium">2 included</span>
        </div>
      </motion.div>
    </section>
  );
}
