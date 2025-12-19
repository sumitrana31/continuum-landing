"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { trackEvent } from "@/lib/data";

// Featured videos - just a small curated selection for demo
const featuredVideos = [
  {
    id: 1,
    title: "Don't Click That!",
    category: "Phishing",
    youtubeId: "_wfhLZSPyCo",
    duration: "2:15",
    description: "Learn to spot fake links, QR traps, and risky attachments",
  },
  {
    id: 2,
    title: "Your Digital Footprint",
    category: "Data Privacy",
    youtubeId: "KvWl_6dtRjQ",
    duration: "2:45",
    description: "Understand how everyday habits can create compliance risk",
  },
  {
    id: 3,
    title: "Phishing & QR Traps",
    category: "Security",
    youtubeId: "pg5c92hdpro",
    duration: "3:00",
    description: "Recognize and avoid modern phishing techniques",
  },
  {
    id: 4,
    title: "AI Knows A Lot, But...",
    category: "AI Safety",
    youtubeId: "W1kCMhKzNQA",
    duration: "2:30",
    description: "Use AI tools safely and responsibly at work",
  },
];

type Video = (typeof featuredVideos)[0];

// Video Modal - Fixed positioning
const VideoModal = ({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) => {
  if (!video) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[200]"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-[201] flex items-center justify-center"
      >
        <div className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
            <div>
              <span className="text-label block mb-1">{video.category}</span>
              <h3 className="text-lg md:text-xl font-medium">{video.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Video */}
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="border-0"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default function VideoLibrary() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleVideoClick = useCallback((video: Video) => {
    setSelectedVideo(video);
    trackEvent("video_play", { title: video.title });
    document.body.style.overflow = "hidden";
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!selectedVideo) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [selectedVideo, handleCloseModal]);

  return (
    <section
      id="videos"
      className="py-32 md:py-48 section-ambient"
      aria-labelledby="videos-heading"
      ref={ref}
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            className="text-label block mb-4"
          >
            Sample Work
          </motion.span>
          <motion.h2
            id="videos-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-headline mb-6"
          >
            Training that keeps attention
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-subhead"
          >
            A selection from our compliance library. Each module is designed to be
            watched, not skipped.
          </motion.p>
        </div>

        {/* Video Grid - Improved Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredVideos.map((video, index) => (
            <motion.button
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              onClick={() => handleVideoClick(video)}
              className="group relative bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 text-left overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden">
                {/* Thumbnail Image */}
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:border-white/50">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 ml-1 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-xs font-medium">
                    {video.duration}
                  </span>
                </div>

                {/* Index Number */}
                <div className="absolute top-4 left-4">
                  <span className="text-4xl md:text-5xl font-light text-white/10 group-hover:text-white/20 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 md:p-6">
                {/* Category */}
                <span className="text-label mb-2 block">{video.category}</span>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-white/90 transition-colors duration-300">
                  {video.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {video.description}
                </p>

                {/* Watch CTA */}
                <div className="mt-4 flex items-center gap-2 text-sm text-white/50 group-hover:text-white/80 transition-colors duration-300">
                  <span>Watch now</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center text-sm text-[var(--foreground-muted)] mt-16"
        >
          50+ modules available across cybersecurity, privacy, AI safety, and more
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal video={selectedVideo} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </section>
  );
}
