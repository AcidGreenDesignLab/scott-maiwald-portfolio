"use client";

import { motion } from "framer-motion";

export const defaultHero = {
  eyebrow: "Available for strategic engagements",
  headerHtml: "Engineering <span style=\"background: linear-gradient(135deg, #2dd4bf 0%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;\">AI-native</span><br />experiences",
  subheader: "Designing and scaling AI foundations—trusted data, governed by policy, integrated into real workflows that compound in value over time.",
  cta: { label: "View Impact →", href: "#work" },
  metrics: [
    { value: "+218%", label: "Avg. MAU growth across products" },
    { value: "20%", label: "Reduction in driver wait-time" },
    { value: "4", label: "AI-native platforms shipped" },
  ]
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero({ hero = defaultHero }: { hero?: any }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 pointer-events-none"
      >
        <source src="/RobotScan_Sml.mp4" type="video/mp4" />
      </video>

      {/* fade to background at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent z-0 pointer-events-none" />

      {/* ambient glow and grid */}
      {/* 
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/30 blur-[120px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 40, 0], scale: [1, 1.1, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-indigo-500/30 blur-[120px] pointer-events-none"
      /> 
      */}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 text-sm font-bold mb-8 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05] mb-8"
          dangerouslySetInnerHTML={{ __html: hero.headerHtml }}
        />

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl text-white max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {hero.subheader}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <motion.a
            href={hero.cta?.href || "#work"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-200"
          >
            {hero.cta?.label || "View Impact →"}
          </motion.a>
        </motion.div>

        {/* stat strip */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-8 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/8 rounded-2xl px-8 py-6 card-glass"
        >
          {(hero.metrics || []).map((s: any, i: number) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-1 sm:px-8 first:pt-0 pt-6 sm:pt-0"
            >
              <span
                className="text-3xl font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #2dd4bf 0%, #34d399 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs text-slate-400 text-center leading-snug">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-500 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-teal-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
