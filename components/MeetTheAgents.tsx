"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export const defaultAgents = [
  {
    id: "data-steward",
    name: "Data Steward",
    role: "Governance & Compliance",
    avatar: "⚖",
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.08)",
    description:
      "Monitors data lineage, enforces policy guardrails, and produces auditable decision trails—so your AI stays explainable and compliant at scale.",
    capabilities: ["Lineage tracking", "Policy enforcement", "Audit logs", "GDPR/HIPAA controls"],
    status: "Always-on",
  },
  {
    id: "insight-engine",
    name: "Insight Engine",
    role: "Analytics & Forecasting",
    avatar: "◈",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.08)",
    description:
      "Continuously synthesizes operational data into forward-looking forecasts—surfacing anomalies and opportunities before they become crises.",
    capabilities: ["Anomaly detection", "Predictive modeling", "NL query interface", "Auto-reporting"],
    status: "Real-time",
  },
  {
    id: "workflow-pilot",
    name: "Workflow Pilot",
    role: "Process Automation",
    avatar: "⬡",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    description:
      "Orchestrates multi-step business processes with human-in-the-loop checkpoints, escalating edge cases and learning from every resolved exception.",
    capabilities: ["Task routing", "Approval flows", "Exception handling", "Continuous learning"],
    status: "Human-in-loop",
  },
];

export default function MeetTheAgents({ agents = defaultAgents }: { agents?: any[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 grid-bg opacity-40 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-500/6 blur-[100px] pointer-events-none"
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
            Digital Coworkers
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Meet the Agents
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Not just tools—autonomous coworkers designed to integrate into your
            team's actual workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHovered(agent.id)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-2xl p-7 card-glass cursor-default transition-all duration-300"
              style={{
                borderColor:
                  hovered === agent.id ? `${agent.color}40` : "rgba(255,255,255,0.07)",
                boxShadow:
                  hovered === agent.id ? `0 0 48px ${agent.color}14` : "none",
              }}
            >
              {/* status dot */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                  style={{ background: agent.bg, color: agent.color }}
                >
                  {agent.avatar}
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: agent.color }}
                  />
                  <span className="text-xs font-medium" style={{ color: agent.color }}>
                    {agent.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mb-1">{agent.role}</p>
              <h3 className="text-lg font-semibold text-white mb-3">{agent.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{agent.description}</p>

              <motion.div
                animate={{ opacity: hovered === agent.id ? 1 : 0.7 }}
                className="flex flex-wrap gap-2"
              >
                {agent.capabilities.map((c: string) => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: agent.bg, color: agent.color }}
                  >
                    {c}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs text-slate-500 mt-10 max-w-lg mx-auto"
        >
          All agents operate with explainable AI principles—every decision is logged,
          auditable, and reversible. Data sovereignty is non-negotiable.
        </motion.p>
      </div>
    </section>
  );
}
