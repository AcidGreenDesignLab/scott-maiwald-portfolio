"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const textLogos = [
  "Anthropic",
  "OpenAI",
  "Vercel",
  "Stripe",
  "Supabase",
  "Datadog",
  "Snowflake",
  "Databricks",
  "HuggingFace",
  "AWS",
  "Google Cloud",
  "Azure",
];

export default function TrustSignals({ clients = [], header = "TRUSTED BY ENTERPRISES BUILDING WITH AI" }: { clients?: string[], header?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const hasImageLogos = clients && clients.length > 0;
  const itemsToRender = hasImageLogos ? clients : textLogos;

  // Guarantee enough items to fill any ultra-wide screen so the loop never breaks early
  const minItemsPerGroup = 15;
  const repeatCount = Math.max(1, Math.ceil(minItemsPerGroup / itemsToRender.length));
  const repeatedItems = Array(repeatCount).fill(itemsToRender).flat();

  // Calculate animation duration dynamically so speed remains constant 
  // regardless of how many logos the user has uploaded.
  // Increased from 3 to 6 to make the animation much slower and smoother.
  const duration = repeatedItems.length * 6; // 6 seconds per item

  return (
    <section className="py-24 px-6 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xs text-teal-400 font-medium tracking-widest uppercase mb-10"
        >
          {header}
        </motion.p>

        <div className="relative">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />

          <div className="flex overflow-hidden translate-z-0">
            <div 
              className="flex w-max shrink-0 animate-marquee hover:[animation-play-state:paused] will-change-transform"
              style={{ 
                animationDuration: `${duration}s`,
                transform: 'translateZ(0)' // Force hardware acceleration
              }}
            >
              {[...Array(2)].map((_, groupIndex) => (
                <div key={groupIndex} className="flex shrink-0 gap-16 pr-16 items-center">
                  {repeatedItems.map((item, i) => (
                    <div key={`${groupIndex}-${item}-${i}`} className="shrink-0 flex items-center justify-center">
                      {hasImageLogos ? (
                        <div className="px-7 py-3 rounded-full bg-[#ffffff] shadow-[0_0_8px_rgba(255,255,255,0.4)] flex items-center justify-center">
                          <img 
                            src={`/clients/${item}`} 
                            alt={item} 
                            className="h-8 w-auto object-contain"
                            style={{
                              transform: item.toLowerCase().includes("mercury") ? "scale(0.85)" : "none"
                            }}
                          />
                        </div>
                      ) : (
                        <div className="px-6 py-2 rounded-lg border border-white/6 bg-white/3 text-slate-400 text-sm font-semibold whitespace-nowrap hover:border-white/12 hover:text-white transition-colors duration-300 cursor-default">
                          {item}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
