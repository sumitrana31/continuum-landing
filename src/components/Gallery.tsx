"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { workSamples, brand, trackEvent } from "@/lib/data";

type Sample = (typeof workSamples)[0];

export default function Gallery() {
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const openModal = (sample: Sample) => {
    setSelectedSample(sample);
    trackEvent("work_sample_click", { title: sample.title });
    document.body.style.overflow = "hidden";
  };

  const closeModal = useCallback(() => {
    setSelectedSample(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedSample) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedSample, closeModal]);

  return (
    <section
      id="work"
      className="py-32 md:py-48 bg-elevated"
      aria-labelledby="work-heading"
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
            Portfolio
          </motion.span>
          <motion.h2
            id="work-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-6"
          >
            Sample modules
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead"
          >
            Explore our portfolio of training assets across different styles and topics.
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

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {workSamples.map((sample, index) => (
            <motion.button
              key={sample.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              onClick={() => openModal(sample)}
              className="group bg-[#0a0a0a] p-6 text-left"
              aria-label={`View details for ${sample.title}`}
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-video relative overflow-hidden mb-6 border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-black" />

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/30 flex items-center justify-center opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-3 right-3 text-xs text-white/50">
                  {sample.duration}
                </span>

                {/* Style Tag */}
                <span className="absolute top-3 left-3 text-label">
                  {sample.style}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-medium mb-2 group-hover:text-white/80 transition-colors duration-300">
                {sample.title}
              </h3>

              {/* Format list */}
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
                {sample.formats.map((format, i) => (
                  <span key={format} className="flex items-center gap-1">
                    {format}
                    {i < sample.formats.length - 1 && <span className="ml-2">·</span>}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSample && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={closeModal}
              className="modal-backdrop"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="modal max-w-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-10">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors duration-300"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Modal Content */}
                <div className="pr-8">
                  <span className="text-label block mb-4">{selectedSample.style}</span>

                  <h3 id="modal-title" className="text-2xl font-medium mb-4">
                    {selectedSample.title}
                  </h3>

                  <p className="text-[var(--foreground-muted)] mb-8">{selectedSample.description}</p>

                  {/* Deliverables List */}
                  <div className="mb-10">
                    <h4 className="text-label mb-4">Included Deliverables</h4>
                    <ul className="space-y-3">
                      {selectedSample.deliverables.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <span className="w-1 h-1 bg-white/50 flex-shrink-0" />
                          <span className="text-[var(--foreground-muted)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={brand.bookingUrl}
                    className="btn btn-primary w-full"
                    onClick={() => {
                      trackEvent("modal_cta_click", { sample: selectedSample.title });
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Request a pilot like this
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
