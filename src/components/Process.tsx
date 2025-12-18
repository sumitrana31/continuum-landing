"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { processSteps } from "@/lib/data";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="py-32 md:py-48"
      aria-labelledby="process-heading"
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
            Process
          </motion.span>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-6"
          >
            From brief to final delivery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead"
          >
            A reliable, transparent production process with clear checkpoints.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="relative pl-16 pb-16 last:pb-0"
            >
              {/* Vertical Line */}
              {index < processSteps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.15,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  style={{ transformOrigin: "top" }}
                  className="absolute left-[11px] top-8 w-px h-full bg-white/10"
                />
              )}

              {/* Step Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="absolute left-0 top-0 w-6 h-6 border border-white/50 flex items-center justify-center"
              >
                <span className="text-xs font-medium">{step.id}</span>
              </motion.div>

              {/* Content */}
              <div>
                <span className="text-label block mb-2">{step.duration}</span>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-[var(--foreground-muted)] mb-6 max-w-lg">
                  {step.description}
                </p>

                {/* Deliverables */}
                <div className="flex flex-wrap gap-3">
                  {step.deliverables.map((item, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.15 + i * 0.05,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="text-xs px-3 py-1.5 border border-white/10 text-[var(--foreground-muted)]"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-16 pt-16 border-t border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-px h-8 bg-white/30" />
            <span className="text-sm text-[var(--foreground-muted)]">
              Two revision rounds included in every project
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
