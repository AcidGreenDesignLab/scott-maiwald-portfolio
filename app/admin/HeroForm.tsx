"use client";

import { useState } from "react";
import { saveHeroData } from "../actions";
import { defaultHero } from "@/components/Hero";

export default function HeroForm({ initialData = defaultHero }: { initialData?: any }) {
  const [data, setData] = useState(initialData || defaultHero);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setLoading(true);
    setSuccess(false);
    const res = await saveHeroData(data);
    setLoading(false);
    if (res?.error) {
      alert("Error saving: " + res.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  function updateMetric(index: number, field: string, value: string) {
    const newMetrics = [...(data.metrics || [])];
    if (!newMetrics[index]) newMetrics[index] = { value: "", label: "" };
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setData({ ...data, metrics: newMetrics });
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-b-xl overflow-hidden">
      <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-12">
        
        {/* TEXT CONTENT */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-800">1. Hero Content</h2>
          
          <div className="space-y-6 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Eyebrow</label>
              <input
                value={data.eyebrow || ""}
                onChange={(e) => setData({ ...data, eyebrow: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                placeholder="e.g. Available for strategic engagements"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Header (HTML Allowed)</label>
              <textarea
                value={data.headerHtml || ""}
                onChange={(e) => setData({ ...data, headerHtml: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:outline-none font-mono text-sm"
                placeholder="e.g. Engineering <span>AI-native</span> experiences"
              />
              <p className="text-xs text-slate-500 mt-2">Use HTML tags like &lt;br /&gt; for line breaks or &lt;span&gt; for colored text.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Sub Header</label>
              <textarea
                value={data.subheader || ""}
                onChange={(e) => setData({ ...data, subheader: e.target.value })}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:border-teal-500 focus:outline-none"
                placeholder="e.g. Designing and scaling AI foundations..."
              />
            </div>
          </div>
        </section>

        {/* CTA BUTTON */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-800">2. CTA Button</h2>
          
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Button Label</label>
              <input
                value={data.cta?.label || ""}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, label: e.target.value }})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                placeholder="e.g. View Impact →"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Destination (Href)</label>
              <input
                value={data.cta?.href || ""}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, href: e.target.value }})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                placeholder="e.g. #work"
              />
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-800">3. Metrics Strip (3 Columns)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => {
              const metric = (data.metrics || [])[i] || { value: "", label: "" };
              return (
                <div key={i} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Big Number / Value</label>
                    <input
                      value={metric.value}
                      onChange={(e) => updateMetric(i, "value", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-bold focus:border-teal-500 focus:outline-none"
                      placeholder="e.g. +218%"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Description (Max 2 lines)</label>
                    <textarea
                      value={metric.label}
                      onChange={(e) => updateMetric(i, "label", e.target.value)}
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-teal-500 focus:outline-none resize-none"
                      placeholder="e.g. Avg. MAU growth"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>

      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end items-center gap-4">
        {success && <span className="text-teal-400 text-sm font-medium">Saved seamlessly!</span>}
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Hero Section"}
        </button>
      </div>
    </div>
  );
}
