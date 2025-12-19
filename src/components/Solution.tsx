"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { deliverables, differentiators } from "@/lib/data";

const DeliverableIcon = ({ type }: { type: string }) => {
  const iconClass = "w-5 h-5";

  switch (type) {
    case "video":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case "document":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case "presentation":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17h6m-6-4h6" />
        </svg>
      );
    case "image":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case "captions":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      );
    case "script":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solution"
      className="py-32 md:py-48 section-ambient"
      aria-labelledby="solution-heading"
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
            The Solution
          </motion.span>
          <motion.h2
            id="solution-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-6"
          >
            Microlearning with production value
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead"
          >
            Short, scenario-driven modules and supporting assets that ship together for your LMS.
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

        {/* Deliverables Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="group bg-black p-8 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-4 transition-all duration-500 group-hover:border-white">
                <DeliverableIcon type={item.icon} />
              </div>
              <span className="text-sm text-[var(--foreground-muted)] group-hover:text-white transition-colors duration-500">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Differentiators */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.6 + index * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="card"
            >
              <span className="text-label block mb-3">{`0${index + 1}`}</span>
              <h3 className="text-lg font-medium mb-3">{item.title}</h3>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="text-center text-sm text-[var(--foreground-muted)] mt-12"
        >
          Everything packaged and ready for your LMS
        </motion.p>
      </div>
    </section>
  );
}
