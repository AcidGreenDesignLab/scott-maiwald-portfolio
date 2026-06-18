"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const defaultContact = {
  eyebrow: "Get In Touch",
  header: "Ready to build?",
  subHeader: "Let's map your AI opportunity and define a path to measurable impact.",
  successHeader: "Message received",
  successMessage: "I'll review your request and follow up within 24 hours.",
  nameLabel: "Name",
  namePlaceholder: "Jane Smith",
  emailLabel: "Email",
  emailPlaceholder: "jane@company.com",
  messageLabel: "Your message",
  messagePlaceholder: "Describe the project, role, or what you're looking to build...",
  buttonText: "Request a Consultation →",
  adminEmail: "scott.maiwald@gmail.com"
};

export default function Contact({ contact = defaultContact }: { contact?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const emailEndpoint = contact.adminEmail || "scott.maiwald@gmail.com";
      await fetch(`https://formsubmit.co/ajax/${emailEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error", error);
      setSubmitted(true);
    }
  }

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-teal-500/8 blur-[120px] pointer-events-none"
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
            {contact.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {contact.header}
          </h2>
          <p className="text-slate-400 text-lg">
            {contact.subHeader}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-2xl p-8 card-glass"
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/15 flex items-center justify-center text-2xl">
                ✓
              </div>
              <h3 className="text-xl font-semibold text-white">{contact.successHeader}</h3>
              <p className="text-slate-400 text-sm">
                {contact.successMessage}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">{contact.nameLabel}</label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder={contact.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-400 font-medium">{contact.emailLabel}</label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder={contact.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 font-medium">
                  {contact.messageLabel}
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder={contact.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-colors duration-200"
              >
                {contact.buttonText}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
