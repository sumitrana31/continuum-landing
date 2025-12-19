"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { brand, footer, trackEvent } from "@/lib/data";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCtaClick = () => {
    trackEvent("footer_cta_click", { location: "footer" });
  };

  const handleSecondaryClick = () => {
    trackEvent("footer_cta_click", { location: "footer", cta: "secondary" });
  };

  return (
    <footer className="py-32 md:py-48 section-ambient" role="contentinfo" ref={ref}>
      <div className="container">
        {/* Final CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-8"
          >
            {footer.tagline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead mb-12"
          >
            Ready to create training that gets watched and remembered?
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              href={brand.bookingUrl}
              className="btn btn-primary px-12 py-4"
              onClick={handleCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {brand.primaryCta}
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              href="#videos"
              className="btn btn-secondary px-10 py-4"
              onClick={handleSecondaryClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {brand.secondaryCta}
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ transformOrigin: "center" }}
          className="h-px bg-white/10 mb-12"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Brand */}
          <Image
            src="/images/logo-512.png"
            alt={brand.name}
            width={512}
            height={512}
            className="h-7 w-auto"
          />

          {/* Disclaimer */}
          <p className="text-xs text-[var(--foreground-muted)] text-center md:text-left max-w-xl">
            {footer.disclaimer}
          </p>

          {/* Copyright */}
          <p className="text-xs text-[var(--foreground-muted)]">{footer.copyright}</p>
        </motion.div>
      </div>
    </footer>
  );
}
