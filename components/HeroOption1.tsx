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

export default function HeroOption1() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Robot Background */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/tesla.png" 
          alt="AI Robot" 
          fill 
          className="object-cover object-center opacity-75 mix-blend-screen brightness-125 contrast-[1.15]"
          priority
        />
        {/* Gradient fade to integrate with page */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 pointer-events-none" />
      </div>

      {/* Animated Targeting Lines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            x="30%" y="40%" width="120" height="120"
            fill="none" stroke="#2dd4bf" strokeWidth="1"
            animate={{ 
              x: ["30%", "32%", "30%"], 
              y: ["40%", "45%", "40%"],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.rect
            x="60%" y="20%" width="80" height="80"
            fill="none" stroke="#2dd4bf" strokeWidth="1"
            animate={{ 
              x: ["60%", "58%", "60%"], 
              y: ["20%", "25%", "20%"],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          <motion.line
            x1="0" y1="50%" x2="100%" y2="50%"
            stroke="#2dd4bf" strokeWidth="0.5"
            animate={{ y1: ["20%", "80%", "20%"], y2: ["20%", "80%", "20%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle 
            cx="45%" cy="35%" r="4" fill="#2dd4bf"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-16">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-medium mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Available for strategic engagements
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
              background: "linear-gradient(135deg, #2dd4bf 0%, #a78bfa 100%)",
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
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-lg"
        >
          Designing and scaling AI foundations—trusted data, governed by policy,
          integrated into real workflows that compound in value over time.
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
            className="px-8 py-3.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-200"
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
        <span className="text-xs text-slate-400 tracking-widest uppercase">
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
