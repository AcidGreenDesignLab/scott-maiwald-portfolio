"use client";

import React from "react";

export default function DesignSystem() {
  return (
    <div className="p-6 md:p-10 space-y-16">
      
      {/* Colors Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Colors</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Slate Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <ColorSwatch name="slate-950" bgClass="bg-slate-950" hex="#0a0f1e" />
              <ColorSwatch name="slate-900" bgClass="bg-slate-900" hex="#0f172a" />
              <ColorSwatch name="slate-800" bgClass="bg-slate-800" hex="#1e293b" />
              <ColorSwatch name="slate-700" bgClass="bg-slate-700" hex="#334155" />
              <ColorSwatch name="slate-400" bgClass="bg-slate-400" hex="#94a3b8" />
              <ColorSwatch name="slate-200" bgClass="bg-slate-200" hex="#e2e8f0" textColor="text-slate-950" />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Accents</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch name="teal-400" bgClass="bg-teal-400" hex="#33ff85" textColor="text-slate-950" />
              <ColorSwatch name="teal-500" bgClass="bg-teal-500" hex="#00ff66" textColor="text-slate-950" />
              <ColorSwatch name="emerald-400" bgClass="bg-emerald-400" hex="#33f3ff" textColor="text-slate-950" />
              <ColorSwatch name="emerald-500" bgClass="bg-emerald-500" hex="#00f0ff" textColor="text-slate-950" />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Typography</h2>
        
        <div className="space-y-10">
          <TypeSpecimen 
            label="H1 - Hero Title" 
            classes="text-5xl md:text-7xl font-bold tracking-tight text-white"
            sample="We Design Digital Products."
          />
          <TypeSpecimen 
            label="H2 - Section Title" 
            classes="text-4xl md:text-5xl font-bold text-white tracking-tight"
            sample="Impact, Not Just Output..."
          />
          <TypeSpecimen 
            label="H3 - Card Title" 
            classes="text-[26px] font-bold text-white leading-tight"
            sample="Seamless Web3 Payments"
          />
          <TypeSpecimen 
            label="Eyebrow" 
            classes="text-xs text-teal-400 font-medium tracking-widest uppercase"
            sample="Featured Work"
          />
          <TypeSpecimen 
            label="Body Text & Menu Links" 
            classes="text-slate-400 text-lg max-w-xl"
            sample="Every engagement is measured by the business outcomes it delivers—not lines of code. We specialize in turning complex problems into elegant, intuitive digital experiences."
          />
        </div>
      </section>

      {/* Components Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Components</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Buttons</h3>
            <div className="flex flex-wrap items-center gap-6 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
              
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs text-slate-500">Primary (Save)</span>
                <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-lg transition-colors">
                  Save Project
                </button>
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="text-xs text-slate-500">Secondary (Admin Actions)</span>
                <button className="bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors">
                  Choose Files
                </button>
              </div>

              <div className="flex flex-col items-start gap-2">
                <span className="text-xs text-slate-500">Translucent Pill (Nav)</span>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors duration-200">
                  Request Consultation
                </button>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Tags</h3>
            <div className="flex flex-wrap items-center gap-6 p-6 border border-slate-800 rounded-xl bg-slate-900/50">
              
              <div className="flex flex-col items-start gap-2">
                <span className="text-xs text-slate-500">Project Tag (Translucent)</span>
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[13px] font-medium">
                  Mobile App
                </span>
              </div>

            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Form Inputs</h3>
            <div className="max-w-md p-6 border border-slate-800 rounded-xl bg-slate-900/50 space-y-4">
              <label className="block text-sm font-medium text-slate-400">Project Label</label>
              <input
                type="text"
                placeholder="Fintech • 2023"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Visual Effects Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">Visual Effects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Glassmorphism Card</span>
            <div className="w-full h-48 rounded-2xl flex items-center justify-center p-6 bg-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal-500 rounded-full blur-[60px] opacity-20 pointer-events-none" />
              <div className="relative w-full h-full card-glass rounded-xl flex items-center justify-center border border-white/5 shadow-[0_0_40px_rgba(0,255,102,0.1)]">
                <span className="text-white font-medium">.card-glass</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Grid Background</span>
            <div className="w-full h-48 rounded-2xl flex items-center justify-center p-6 bg-slate-950 border border-slate-800 grid-bg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
              <span className="relative text-teal-400 font-medium bg-slate-950 px-3 py-1 rounded border border-slate-800">.grid-bg</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ColorSwatch({ name, bgClass, hex, textColor = "text-white" }: { name: string, bgClass: string, hex: string, textColor?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`w-full h-24 rounded-lg border border-white/5 flex items-end justify-start p-3 ${bgClass}`}>
        <span className={`text-xs font-medium opacity-90 ${textColor}`}>{hex}</span>
      </div>
      <span className="text-sm font-medium text-slate-300">{name}</span>
    </div>
  );
}

function TypeSpecimen({ label, classes, sample }: { label: string, classes: string, sample: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/50 pb-2">
        <span className="text-xs text-teal-400 font-medium tracking-widest uppercase">{label}</span>
        <code className="text-xs text-slate-500 font-mono bg-slate-900 px-2 py-1 rounded">
          {classes}
        </code>
      </div>
      <p className={classes}>{sample}</p>
    </div>
  );
}
