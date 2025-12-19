"use client";

import { Fragment, Suspense } from "react";
import { motion } from "framer-motion";
import { brand, trackEvent, proofChips, audienceSegments, outcomeStats } from "@/lib/data";
import AsciiVideo from "./AsciiVideo";

const ChipIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "clock":
      return (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
        </svg>
      );
    case "check":
      return (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      );
    case "refresh":
      return (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      );
    default:
      return null;
  }
};

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
        <div className="max-w-5xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-label">{brand.heroEyebrow}</span>
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

          {/* Proof Chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            {proofChips.map((chip) => (
              <span key={chip.label} className="chip chip-accent">
                <ChipIcon type={chip.icon} />
                {chip.label}
              </span>
            ))}
          </motion.div>

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
              {brand.secondaryCta}
            </motion.a>
          </motion.div>

          {/* Audience */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <span className="text-label">Built for</span>
            {audienceSegments.map((segment) => (
              <span key={segment} className="chip">
                {segment}
              </span>
            ))}
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
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-10 text-sm bg-black/30 border border-white/10 px-6 py-4 backdrop-blur-sm"
      >
        {outcomeStats.map((stat, index) => (
          <Fragment key={stat.label}>
            <div>
              <span className="text-[var(--foreground-muted)] block">{stat.label}</span>
              <span className="font-medium">{stat.value}</span>
            </div>
            {index < outcomeStats.length - 1 && <div className="w-px h-8 bg-white/20" />}
          </Fragment>
        ))}
      </motion.div>
    </section>
  );
}
