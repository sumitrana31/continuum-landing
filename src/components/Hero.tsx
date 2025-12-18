"use client";

import { brand, proofChips, trackEvent } from "@/lib/data";

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

export default function Hero() {
  const handlePrimaryCta = () => {
    trackEvent("hero_cta_click", { cta: "primary" });
  };

  const handleSecondaryCta = () => {
    trackEvent("hero_cta_click", { cta: "secondary" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-cinematic vignette overflow-hidden"
      aria-label="Hero"
    >
      {/* Light Streak Effect */}
      <div className="light-streak top-1/4" aria-hidden="true" />
      <div className="light-streak top-3/4" style={{ animationDelay: "4s" }} aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 text-center pt-20 pb-32">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <h1 className="text-display mb-6 reveal">
            <span className="block">Training</span>
            <span className="block">people actually</span>
            <span className="block text-accent">finish.</span>
          </h1>

          {/* Subhead */}
          <p className="text-subhead mb-10 max-w-2xl mx-auto reveal" style={{ transitionDelay: "100ms" }}>
            {brand.heroSubhead}
          </p>

          {/* Proof Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 reveal" style={{ transitionDelay: "200ms" }}>
            {proofChips.map((chip) => (
              <span key={chip.label} className="chip chip-accent">
                <ChipIcon type={chip.icon} />
                {chip.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal" style={{ transitionDelay: "300ms" }}>
            <a
              href={brand.bookingUrl}
              className="btn btn-primary text-base px-10 py-4"
              onClick={handlePrimaryCta}
            >
              {brand.primaryCta}
            </a>
            <a
              href="#work"
              className="btn btn-secondary text-base px-8 py-4"
              onClick={handleSecondaryCta}
            >
              {brand.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="scroll-indicator-line" />
      </div>
    </section>
  );
}
