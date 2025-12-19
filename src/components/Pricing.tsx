"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { pricingPlans, pricingIncludes, brand, trackEvent } from "@/lib/data";

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleCtaClick = (planId: string) => {
    trackEvent("pricing_cta_click", { plan: planId });
  };

  return (
    <section
      id="pricing"
      className="py-32 md:py-48 bg-elevated section-ambient"
      aria-labelledby="pricing-heading"
      ref={ref}
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-label block mb-4"
          >
            Pricing
          </motion.span>
          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-6"
          >
            Pricing that scales with you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead"
          >
            Start with a pilot or scale into a full pathway. Every plan includes the full asset pack.
          </motion.p>
        </div>

        {/* Horizontal line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-white/20 mb-16"
        />

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className={`group relative bg-black p-8 md:p-10 ${
                plan.popular ? "border-t-2 border-t-white" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -top-3 left-8 text-label bg-black px-2"
                >
                  Most Popular
                </motion.span>
              )}

              {/* Plan Header */}
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">{plan.name}</h3>
                <p className="text-sm text-[var(--foreground-muted)] mb-6">
                  {plan.description}
                </p>
                <div className="text-4xl font-light tracking-tight">{plan.price}</div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + index * 0.1 + i * 0.05,
                    }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="w-1 h-1 bg-white/50 mt-2 flex-shrink-0" />
                    <span className="text-[var(--foreground-muted)]">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={brand.bookingUrl}
                className={`btn w-full ${plan.popular ? "btn-primary" : "btn-secondary"}`}
                onClick={() => handleCtaClick(plan.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Includes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 border border-white/10 bg-black/40 px-8 py-8"
        >
          <span className="text-label block mb-6">Every plan includes</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricingIncludes.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="w-1 h-1 bg-white/50 mt-2 flex-shrink-0" />
                <span className="text-[var(--foreground-muted)]">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div className="w-8 h-px bg-white/20" />
          <p className="text-sm text-[var(--foreground-muted)]">
            Need something custom?{" "}
            <a
              href={brand.bookingUrl}
              className="text-white hover:text-white/80 transition-colors duration-300"
            >
              Let&apos;s talk
            </a>
          </p>
          <div className="w-8 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}
