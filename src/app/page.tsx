"use client";

import { useEffect } from "react";
import {
  Nav,
  Hero3D,
  Problem,
  Solution,
  VideoLibrary,
  Gallery,
  Process,
  Pricing,
  LeadMagnet,
  FAQ,
  Footer,
} from "@/components";
import { useScrollEffects } from "@/lib/useScrollReveal";
import { trackEvent } from "@/lib/data";

export default function Home() {
  // Initialize scroll effects (reveal animations + parallax)
  useScrollEffects();

  // Track page view on mount
  useEffect(() => {
    trackEvent("page_view", { page: "home" });
  }, []);

  return (
    <>
      <Nav />

      <main id="main-content">
        <Hero3D />

        {/* Section Divider */}
        <div className="section-divider" aria-hidden="true" />

        <Problem />

        {/* Section Divider */}
        <div className="section-divider-reverse" aria-hidden="true" />

        <Solution />

        {/* Section Divider */}
        <div className="section-divider" aria-hidden="true" />

        <VideoLibrary />

        {/* Section Divider */}
        <div className="section-divider-reverse" aria-hidden="true" />

        <Gallery />

        {/* Section Divider */}
        <div className="section-divider" aria-hidden="true" />

        <Process />

        {/* Section Divider */}
        <div className="section-divider-reverse" aria-hidden="true" />

        <Pricing />

        {/* Section Divider */}
        <div className="section-divider" aria-hidden="true" />

        <LeadMagnet />

        {/* Section Divider */}
        <div className="section-divider-reverse" aria-hidden="true" />

        <FAQ />

        {/* Section Divider */}
        <div className="section-divider" aria-hidden="true" />
      </main>

      <Footer />
    </>
  );
}
