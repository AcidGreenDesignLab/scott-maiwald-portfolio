"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const defaultCapabilities = [
  {
    icon: "◈",
    title: "Generative AI & Agentic Systems",
    description:
      "Copilots, multi-agent orchestration, and agentic workflows that operate autonomously within defined policy boundaries.",
    items: ["LLM fine-tuning", "Tool-use & function calling", "RAG pipelines", "Agent orchestration"],
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.06)",
  },
  {
    icon: "⬡",
    title: "AI-Native Product Engineering",
    description:
      "Scalable, microservice-based platforms built to evolve—where AI is a first-class citizen of the system architecture.",
    items: ["Event-driven architecture", "Streaming inference", "MLOps & CI/CD", "Feature stores"],
    color: "#818cf8",
    bg: "rgba(129,140,248,0.06)",
  },
  {
    icon: "◎",
    title: "Edge AI & Computer Vision",
    description:
      "Real-time vision analytics and anomaly detection that run at the edge, reducing latency and protecting data sovereignty.",
    items: ["Object detection", "Anomaly detection", "Model quantization", "On-device inference"],
    color: "#10b981",
    bg: "rgba(16,185,129,0.06)",
  },
];

export default function Capabilities({ capabilities = defaultCapabilities }: { capabilities?: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="capabilities" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Capability highlights
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Deep technical fluency across the full AI product stack—from research to production.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl p-7 card-glass group hover:scale-[1.02] transition-transform duration-300"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-6"
                style={{ background: cap.bg, color: cap.color }}
              >
                {cap.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{cap.description}</p>
              <ul className="flex flex-col gap-2">
                {cap.items.map((item: string) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cap.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="/resume.pdf"
            download="Scott_Maiwald_Sr_UIUXAI_Designer.pdf"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors duration-200"
          >
            Download My Resume
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
