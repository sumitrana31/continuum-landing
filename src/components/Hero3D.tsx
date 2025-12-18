"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { brand, trackEvent } from "@/lib/data";
import AsciiVideo from "./AsciiVideo";
import AsciiHeading from "./AsciiHeading";

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

      {/* Content overlay gradient - subtle to let ASCII show through */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-40">
        <div className="max-w-6xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-label tracking-[0.3em] text-white/60">
              TRAINING PRODUCTION STUDIO
            </span>
          </motion.div>

          {/* ASCII Art Headlines */}
          <h1 className="mb-8" aria-label="Training people actually finish.">
            <AsciiHeading text="TRAINING" delay={0.3} className="mb-2" />
            <AsciiHeading text="PEOPLE" delay={0.5} className="mb-2" />
            <AsciiHeading text="ACTUALLY" delay={0.7} className="mb-2" />
            <AsciiHeading text="FINISH." delay={0.9} className="opacity-60" />
          </h1>

          {/* Horizontal line reveal */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-white/30 mb-8 max-w-lg"
          />

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.3,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="text-lg md:text-xl text-white/70 max-w-xl mb-10 font-light"
          >
            {brand.heroSubhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
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
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="scroll-indicator-line" />
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-12 text-sm"
      >
        <div>
          <span className="text-white/50 block text-xs uppercase tracking-wider">
            First cut
          </span>
          <span className="font-medium text-white/90">48 hours</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div>
          <span className="text-white/50 block text-xs uppercase tracking-wider">
            Final delivery
          </span>
          <span className="font-medium text-white/90">~3 days</span>
        </div>
        <div className="w-px h-8 bg-white/20" />
        <div>
          <span className="text-white/50 block text-xs uppercase tracking-wider">
            Revisions
          </span>
          <span className="font-medium text-white/90">2 included</span>
        </div>
      </motion.div>
    </section>
  );
}
