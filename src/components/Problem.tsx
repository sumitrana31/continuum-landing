"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { problemCards } from "@/lib/data";

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="problem"
      className="py-32 md:py-48 bg-elevated section-ambient"
      aria-labelledby="problem-heading"
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
            The Problem
          </motion.span>
          <motion.h2
            id="problem-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline"
          >
            Most compliance training is{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/50"
            >
              long
            </motion.span>
            ,{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/50"
            >
              expensive
            </motion.span>
            , and{" "}
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/50"
            >
              ignored
            </motion.span>
            .
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead mt-6"
          >
            When training feels like a chore, completion drops and teams stay exposed.
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

        {/* Pain Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/10">
          {problemCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="group bg-[#0a0a0a] p-8 md:p-10"
            >
              {/* Stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="mb-8"
              >
                <span className="text-5xl md:text-6xl font-light tracking-tight">
                  {card.stat}
                </span>
                <span className="text-xs text-[var(--foreground-muted)] block mt-2 tracking-wide uppercase">
                  {card.statLabel}
                </span>
              </motion.div>

              {/* Content */}
              <h3 className="text-lg font-medium mb-3">{card.title}</h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {card.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 bg-black/40 px-6 py-6"
        >
          <p className="text-sm text-[var(--foreground-muted)] max-w-2xl">
            Continuum replaces long, dull modules with short, scenario-based stories people actually finish.
          </p>
          <a href="#solution" className="btn btn-ghost">
            See the solution
          </a>
        </motion.div>
      </div>
    </section>
  );
}
