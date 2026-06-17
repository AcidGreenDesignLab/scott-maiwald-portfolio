"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

export type Project = {
  id: string;
  label: string;
  headline: string;
  description: string;
  tags: string[];
  accent: string;
  accentBg: string;
  metric?: string;
  metricLabel?: string;
  icon?: string | null;
  images: string[];
};

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {images.length > 1 && index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          ←
        </button>
      )}

      <motion.div
        key={index}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/10" }}
      >
        <Image
          src={images[index]}
          alt={`Design ${index + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      {images.length > 1 && index < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        >
          →
        </button>
      )}

      <div className="absolute top-5 inset-x-0 flex items-center justify-between px-6">
        <span className="text-xs text-white/50 font-mono">
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm transition-colors"
        >
          ✕
        </button>
      </div>
    </motion.div>
  );
}

function ImageStrip({
  images,
  accent,
  onImageClick,
}: {
  images: string[];
  accent: string;
  onImageClick: (index: number) => void;
}) {
  const [active, setActive] = useState(0);

    if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/10] bg-slate-950 flex flex-col items-center justify-center border border-white/10 rounded-2xl overflow-hidden shrink-0 shadow-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-red-500 mb-3 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        <span className="text-slate-500 font-medium text-sm tracking-widest uppercase">No Images</span>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full aspect-[16/10] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-2xl"
      onClick={() => onImageClick(active)}
    >
      {images.map((src, i) => (
        <motion.div
          key={src}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt="UI/UX design mockup"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      ))}
      {/* dot nav */}
      {images.length > 1 && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2.5 z-10 bg-white p-2.5 rounded-full shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActive(i); }}
              className="p-1.5 -m-1.5 group"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  background: active === i ? "#000000" : "rgba(0,0,0,0.2)",
                  transform: active === i ? "scale(1.3)" : "scale(1)",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const displayImages = project.images;

  return (
    <div className="relative w-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          delay: 0.1,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20 transition-all duration-300 group"
      >
        <div className="w-full md:w-1/2 shrink-0 relative transition-transform duration-500" style={{ transform: hovered ? 'scale(1.02)' : 'scale(1)' }}>
          <ImageStrip 
            images={displayImages} 
            accent={project.accent} 
            onImageClick={(i) => setLightboxIndex(i)}
          />
        </div>

        <div className="flex flex-col flex-1 py-8 w-full md:w-1/2">
          <span className="text-xs text-slate-400 font-semibold tracking-widest uppercase mb-3">
          {project.label}
        </span>

        <h3
          className="text-[26px] font-bold text-white mb-4 transition-colors duration-300 leading-tight"
          style={{ color: hovered ? project.accent : "white" }}
        >
          {project.headline}
        </h3>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[13px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[15px] text-slate-400 leading-relaxed mb-8 flex-1">
          {project.description}
        </p>

        <button 
          onClick={(e) => { e.preventDefault(); setLightboxIndex(0); }}
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-white/90 group-hover:text-white transition-colors mt-auto w-fit"
          style={{ color: hovered ? project.accent : "inherit" }}
        >
          View Full-Size Images
          <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </button>
      </div>
    </motion.div>

    <AnimatePresence>
      {lightboxIndex !== null && (
        <Lightbox
          images={displayImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + displayImages.length) % displayImages.length))}
          onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % displayImages.length))}
        />
      )}
    </AnimatePresence>
  </div>
  );
}

export default function ImpactGridAlt2({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
            Featured Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Impact, Not Just Output...
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Every engagement is measured by the business outcomes it
            delivers—not lines of code.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
