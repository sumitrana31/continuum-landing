"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { leadMagnet, submitLeadForm, trackEvent } from "@/lib/data";

interface FormData {
  name: string;
  email: string;
  company: string;
  topic: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
}

export default function LeadMagnet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    topic: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setIsSuccess(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    trackEvent("lead_form_submit", { source: "lead_magnet" });

    try {
      const result = await submitLeadForm({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        topic: formData.topic || undefined,
      });

      if (result.success) {
        setIsSuccess(true);
        trackEvent("lead_form_success", { source: "lead_magnet" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      trackEvent("lead_form_error", { source: "lead_magnet" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="book-a-call"
      className="py-32 md:py-48 section-ambient"
      aria-labelledby="book-call-heading"
      ref={ref}
    >
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="border border-white/20 bg-[#0a0a0a]"
          >
            <div className="grid md:grid-cols-2">
              {/* Left Column - Content */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-label block mb-6"
                >
                  Pilot Kit
                </motion.span>
                <motion.h2
                  id="book-call-heading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  className="text-2xl md:text-3xl font-medium mb-8"
                >
                  {leadMagnet.title}
                </motion.h2>
                <ul className="space-y-4">
                  {leadMagnet.bullets.map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + index * 0.1,
                        ease: [0.16, 1, 0.3, 1] as const,
                      }}
                      className="flex items-start gap-4"
                    >
                      <span className="w-1 h-1 bg-white/50 mt-2.5 flex-shrink-0" />
                      <span className="text-[var(--foreground-muted)]">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--foreground-muted)] mt-6">
                  No spam. Use the kit whether or not you hire us.
                </p>
              </div>

              {/* Right Column - Form */}
              <div className="p-8 md:p-12">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 border border-white/30 flex items-center justify-center mb-6">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-lg font-medium mb-2">Success</p>
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {leadMagnet.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Honeypot field */}
                    <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange("website")}
                      />
                    </div>

                    <div className="space-y-5">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <label htmlFor="name" className="text-xs text-[var(--foreground-muted)] block mb-2">
                          Name <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={`form-input ${errors.name ? "border-red-500/50" : ""}`}
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange("name")}
                          required
                          aria-describedby={errors.name ? "name-error" : undefined}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-400/80 text-xs mt-2">
                            {errors.name}
                          </p>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.35 }}
                      >
                        <label htmlFor="email" className="text-xs text-[var(--foreground-muted)] block mb-2">
                          Email <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={`form-input ${errors.email ? "border-red-500/50" : ""}`}
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={handleChange("email")}
                          required
                          aria-describedby={errors.email ? "email-error" : undefined}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-400/80 text-xs mt-2">
                            {errors.email}
                          </p>
                        )}
                      </motion.div>

                      {/* Company */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <label htmlFor="company" className="text-xs text-[var(--foreground-muted)] block mb-2">
                          Company <span className="text-white/50">*</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          className={`form-input ${errors.company ? "border-red-500/50" : ""}`}
                          placeholder="Company or organisation"
                          value={formData.company}
                          onChange={handleChange("company")}
                          required
                          aria-describedby={errors.company ? "company-error" : undefined}
                          aria-invalid={!!errors.company}
                        />
                        {errors.company && (
                          <p id="company-error" className="text-red-400/80 text-xs mt-2">
                            {errors.company}
                          </p>
                        )}
                      </motion.div>

                      {/* Topic (Optional) */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.45 }}
                      >
                        <label htmlFor="topic" className="text-xs text-[var(--foreground-muted)] block mb-2">
                          What topic should we pilot first?
                        </label>
                        <input
                          type="text"
                          id="topic"
                          name="topic"
                          className="form-input"
                          placeholder="e.g., GDPR, phishing, harassment"
                          value={formData.topic}
                          onChange={handleChange("topic")}
                        />
                      </motion.div>

                      {/* Submit */}
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        type="submit"
                        className="btn btn-primary w-full mt-2"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border border-black/30 border-t-black rounded-full"
                            />
                            Sending...
                          </span>
                        ) : (
                          "Request the pilot kit"
                        )}
                      </motion.button>
                      <p className="text-xs text-[var(--foreground-muted)] text-center">
                        We will send the kit and follow up with next steps.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
