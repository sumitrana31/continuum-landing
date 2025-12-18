"use client";

import { useEffect, useRef, useCallback } from "react";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const containerRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    []
  );

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // If reduced motion is preferred, make everything visible immediately
      document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
        el.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    // Observe all reveal elements
    const elements = document.querySelectorAll(".reveal, .reveal-stagger");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [handleIntersection, threshold, rootMargin]);

  return containerRef;
}

// Hook for parallax scroll effect on hero background
export function useParallaxScroll() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroSection = document.getElementById("hero");

          if (heroSection && scrollY < window.innerHeight) {
            // Subtle parallax on hero background
            const parallaxValue = scrollY * 0.3;
            heroSection.style.setProperty(
              "--parallax-offset",
              `${parallaxValue}px`
            );
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

// Combined hook for all scroll effects
export function useScrollEffects() {
  useScrollReveal();
  useParallaxScroll();
}

export default useScrollReveal;
