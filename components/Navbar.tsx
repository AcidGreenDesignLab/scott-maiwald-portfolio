"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export const defaultMenu = {
  logo: { type: "text", text: "AI", label: "Portfolio", href: "#", imagePath: "" },
  links: [
    { label: "Work", href: "#work" },
    { label: "Methodology", href: "#methodology" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Request Consultation", href: "#contact", visible: true }
};

export default function Navbar({ menu = defaultMenu }: { menu?: any }) {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(10,15,30,0)", "rgba(10,15,30,0.92)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-sm border-b border-white/0 transition-colors"
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href={menu.logo?.href || "#"} className="flex items-center gap-2 group">
          {menu.logo?.type === "image" && menu.logo.imagePath ? (
            <img src={menu.logo.imagePath} alt="Logo" className="h-8 w-auto object-contain" />
          ) : (
            <>
              <span className="w-7 h-7 rounded-md bg-teal-500 flex items-center justify-center text-slate-950 font-bold text-sm select-none">
                {menu.logo?.text || "AI"}
              </span>
              <span className="font-semibold text-white text-sm tracking-tight">
                {menu.logo?.label || "Portfolio"}
              </span>
            </>
          )}
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {(menu.links || []).map((l: any) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {menu.cta?.visible !== false && (
          <a
            href={menu.cta?.href || "#contact"}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors duration-200"
          >
            {menu.cta?.label || "Request Consultation"}
          </a>
        )}
      </nav>
    </motion.header>
  );
}
