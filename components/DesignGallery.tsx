"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const allImages = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/eef4ad237227981.68fbf745ae06e.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/84f880237227981.68fbf745b0dd9.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/d9f99f237227981.68fbf745b060c.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e05a04237227981.68fbf745b40a4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b9b0e2237227981.68fbf745b192c.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/fa981e237227981.68fbf745b2609.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/ebb24a237227981.698ac9292ba9a.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/de28ba237227981.68fbf745ae621.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/f4d5c1237227981.68fbf745b1e69.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/ae6c6a237227981.68fbf745b3b65.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0115da237227981.68fbf745afb34.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/1ceca3237227981.68fbf745b00a4.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9de032237227981.68fbf745af552.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0bde27237227981.68fbf745b3337.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4767c3237227981.68fbf745b49fa.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/3d22be237227981.68fbf745b2b44.png",
  "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/b90881237227981.69c6c61145cb7.png",
];

function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
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
      {/* prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        ←
      </button>

      {/* image */}
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
          src={allImages[index]}
          alt={`Design ${index + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      {/* next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
      >
        →
      </button>

      {/* counter + close */}
      <div className="absolute top-5 inset-x-0 flex items-center justify-between px-6">
        <span className="text-xs text-white/50 font-mono">
          {index + 1} / {allImages.length}
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

export default function DesignGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function prev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + allImages.length) % allImages.length
    );
  }
  function next() {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % allImages.length
    );
  }

  return (
    <>
      <section id="gallery" className="py-32 px-6 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 grid-bg opacity-40 pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="text-teal-400 text-sm font-medium tracking-widest uppercase mb-4">
              Design Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              35+ years of UI/UX craft
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              A selection of interface designs across healthcare, travel,
              aerospace, and AI-native products. Click any to expand.
            </p>
          </motion.div>

          {/* masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {allImages.map((src, i) => (
              <motion.button
                key={src}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: Math.min(i * 0.04, 0.4),
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                onClick={() => setLightboxIndex(i)}
                className="relative w-full break-inside-avoid rounded-xl overflow-hidden group block cursor-zoom-in"
                style={{ display: "inline-block" }}
              >
                <Image
                  src={src}
                  alt={`UI/UX design ${i + 1}`}
                  width={700}
                  height={440}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-white/80 font-medium">
                    View full size →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="https://www.behance.net/gallery/237227981/Scott-Maiwald-Sr-UIUX-Designer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:border-teal-500/40 hover:text-teal-400 transition-colors duration-200"
            >
              View full Behance portfolio ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
