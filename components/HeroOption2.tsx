"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "+218%", label: "Avg. MAU growth across products" },
  { value: "20%", label: "Reduction in driver wait-time" },
  { value: "4", label: "AI-native platforms shipped" },
];

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

export default function HeroOption2() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0a0a0a]">
      
      {/* ASCII Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/ascii.png" 
          alt="ASCII Matrix" 
          fill 
          className="object-cover object-center opacity-30 mix-blend-color-dodge"
          priority
        />
        {/* Gradient fade to integrate with page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        <div className="absolute inset-0 bg-[#0a0a0a]/20 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-16">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono font-medium mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          [ SYSTEM.ONLINE ]
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white leading-[1.05] mb-8"
        >
          Engineering{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI-native
          </span>
          <br />
          experiences
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-lg font-mono text-sm tracking-tight"
        >
          &gt; Designing and scaling AI foundations—trusted data, governed by policy,
          integrated into real workflows that compound in value over time_
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-xl bg-blue-500 text-white font-bold text-sm hover:bg-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200"
          >
            View Impact →
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:border-white/40 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm bg-black/20"
          >
            Request a Consultation
          </motion.a>
        </motion.div>

        {/* stat strip */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-8 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur-md bg-black/40"
        >
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex-1 flex flex-col items-center gap-1 sm:px-8 first:pt-0 pt-6 sm:pt-0"
            >
              <span
                className="text-3xl font-bold font-mono"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs text-slate-400 text-center leading-snug font-mono">
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
        <span className="text-xs text-slate-400 tracking-widest uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-blue-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
