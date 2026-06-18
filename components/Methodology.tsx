"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const defaultMethodologySteps = [
  {
    num: "01",
    title: "Discover",
    subtitle: "Map the landscape",
    description:
      "Deep-dive into existing workflows, data assets, and strategic objectives. We surface hidden constraints and untapped leverage points before a single line is written.",
    details: ["Stakeholder interviews", "Data-flow audits", "Opportunity scoring"],
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.06)",
  },
  {
    num: "02",
    title: "Design",
    subtitle: "Architect with precision",
    description:
      "Craft custom AI coworkers and system architectures tailored to your specific processes—not off-the-shelf templates bolted onto legacy infrastructure.",
    details: ["Agent design specs", "Human-in-the-loop controls", "Explainable AI layers"],
    color: "#818cf8",
    bg: "rgba(129,140,248,0.06)",
  },
  {
    num: "03",
    title: "Deploy",
    subtitle: "Ship to production",
    description:
      "Production-ready deployment with observability baked in. Guardrails, fallbacks, and audit trails that keep the system trustworthy under real-world load.",
    details: ["CI/CD pipelines", "Monitoring & alerting", "Policy governance"],
    color: "#10b981",
    bg: "rgba(16,185,129,0.06)",
  },
  {
    num: "04",
    title: "Evolve",
    subtitle: "Compound returns",
    description:
      "Continuous learning loops that improve model performance and product value over time. Compounding returns on every interaction the system accumulates.",
    details: ["RLHF & fine-tuning", "A/B experimentation", "Quarterly strategy review"],
    color: "#c084fc",
    bg: "rgba(192,132,252,0.06)",
  },
];

export default function Methodology({ steps = defaultMethodologySteps }: { steps?: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [active, setActive] = useState(0);

  return (
    <section id="methodology" className="py-32 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 grid-bg opacity-60 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
            How I Engage
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Methodology
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            A repeatable framework that turns ambiguous AI opportunities into
            compounding competitive advantage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">
          {/* step nav */}
          <div className="flex flex-col gap-3 lg:gap-4 h-full">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col flex-1">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  whileHover={{ x: 8 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setActive(i)}
                  className={`text-left rounded-xl p-5 transition-all duration-300 card-glass h-full flex flex-col justify-center ${active === i ? "shadow-lg" : ""}`}
                  style={{
                    borderColor: active === i ? `${step.color}80` : "rgba(255,255,255,0.07)",
                    background: active === i ? step.bg : "rgba(15,23,42,0.5)",
                    boxShadow: active === i ? `0 0 20px ${step.color}15` : "none"
                  }}
                >
                  <div className="flex items-center gap-4 w-full">
                    <span
                      className="text-lg font-bold font-mono tabular-nums px-2.5 py-1 rounded-md"
                      style={{ color: step.color, background: `${step.color}15` }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-base">{step.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{step.subtitle}</p>
                    </div>
                    <span
                      className="ml-auto text-xs transition-opacity duration-200"
                      style={{ color: step.color, opacity: active === i ? 1 : 0 }}
                    >
                      ●
                    </span>
                  </div>
                </motion.button>
                
                {/* Mobile Accordion Content (Hidden on LG) */}
                <motion.div
                  initial={false}
                  animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`lg:hidden overflow-hidden ${active === i ? "mt-4 mb-2" : ""}`}
                >
                  <div className="p-6 rounded-2xl border bg-slate-900/50" style={{ borderColor: `${step.color}30` }}>
                    <p className="text-slate-300 leading-relaxed text-sm mb-5">{step.description}</p>
                    <ul className="flex flex-col gap-2.5">
                      {step.details.map((d: string) => (
                        <li key={d} className="flex items-center gap-3 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* detail panel (Desktop only) */}
          <div className="hidden lg:grid grid-cols-1 grid-rows-1 h-full">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : 12,
                  pointerEvents: active === i ? "auto" : "none",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 rounded-2xl p-8 card-glass flex flex-col justify-between"
                style={{ borderColor: `${step.color}30`, zIndex: active === i ? 10 : 0 }}
              >
                <div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold font-mono mb-8"
                    style={{ background: step.bg, color: step.color, boxShadow: `0 0 20px ${step.color}20` }}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                </div>
                <ul className="flex flex-col gap-2 mt-8">
                  {step.details.map((d: string) => (
                    <li key={d} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
