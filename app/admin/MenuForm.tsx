"use client";

import { useState, useRef } from "react";
import { saveMenuData, uploadMenuImage } from "../actions";
import { defaultMenu } from "@/components/Navbar";

export default function MenuForm({ initialData = defaultMenu }: { initialData?: any }) {
  const [data, setData] = useState(initialData || defaultMenu);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSave() {
    setLoading(true);
    setSuccess(false);
    const res = await saveMenuData(data);
    setLoading(false);
    if (res?.error) {
      alert("Error saving: " + res.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await uploadMenuImage(formData);
    setLoading(false);
    
    if (res?.error) {
      alert("Upload failed: " + res.error);
    } else if (res?.imagePath) {
      setData({
        ...data,
        logo: { ...data.logo, imagePath: res.imagePath, type: "image" }
      });
    }
    
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addLink() {
    if (data.links?.length >= 5) {
      alert("Maximum of 5 links allowed.");
      return;
    }
    setData({
      ...data,
      links: [...(data.links || []), { label: "New Link", href: "#" }]
    });
  }

  function removeLink(index: number) {
    const newLinks = [...data.links];
    newLinks.splice(index, 1);
    setData({ ...data, links: newLinks });
  }

  function updateLink(index: number, field: string, value: string) {
    const newLinks = [...data.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setData({ ...data, links: newLinks });
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-b-xl overflow-hidden">
      <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-12">
        
        {/* LOGO SECTION */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-800">1. Left Navbar (Logo)</h2>
          
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => setData({ ...data, logo: { ...data.logo, type: "text" }})}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${data.logo?.type !== "image" ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"}`}
            >
              Use Text Logo
            </button>
            <button 
              onClick={() => setData({ ...data, logo: { ...data.logo, type: "image" }})}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${data.logo?.type === "image" ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-400 hover:text-white"}`}
            >
              Use Image Logo
            </button>
          </div>

          <div className="space-y-4 max-w-2xl">
            {data.logo?.type === "image" ? (
              <div className="p-6 border border-dashed border-slate-700 rounded-xl bg-slate-950/50">
                {data.logo.imagePath ? (
                  <div className="mb-4">
                    <img src={data.logo.imagePath} alt="Logo Preview" className="h-12 w-auto object-contain bg-slate-800 p-2 rounded" />
                  </div>
                ) : (
                  <div className="mb-4 text-sm text-slate-400">No image uploaded yet.</div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef}
                  onChange={handleUploadImage}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/10 file:text-teal-400 hover:file:bg-teal-500/20"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">Icon Text</label>
                  <input
                    value={data.logo?.text || ""}
                    onChange={(e) => setData({ ...data, logo: { ...data.logo, text: e.target.value }})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. AI"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1.5">Label Text</label>
                  <input
                    value={data.logo?.label || ""}
                    onChange={(e) => setData({ ...data, logo: { ...data.logo, label: e.target.value }})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. Portfolio"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Destination Link (Href)</label>
              <input
                value={data.logo?.href || ""}
                onChange={(e) => setData({ ...data, logo: { ...data.logo, href: e.target.value }})}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                placeholder="e.g. #"
              />
            </div>
          </div>
        </section>

        {/* LINKS SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">2. Middle Navbar (Text Links)</h2>
            <span className="text-sm text-slate-400">{data.links?.length || 0} / 5 Links</span>
          </div>

          <div className="space-y-4 max-w-2xl">
            {(data.links || []).map((link: any, i: number) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Label</label>
                    <input
                      value={link.label}
                      onChange={(e) => updateLink(i, "label", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Destination (Href)</label>
                    <input
                      value={link.href}
                      onChange={(e) => updateLink(i, "href", e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => removeLink(i)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors mt-6"
                  title="Remove Link"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            
            {(data.links?.length || 0) < 5 && (
              <button
                onClick={addLink}
                className="w-full py-3 border border-dashed border-slate-700 rounded-xl text-sm text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
              >
                <span>+</span> Add Text Link
              </button>
            )}
          </div>
        </section>

        {/* CTA SECTION */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800">
            <h2 className="text-xl font-bold text-white">3. Right Navbar (CTA Button)</h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={data.cta?.visible !== false}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, visible: e.target.checked }})}
                className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-900"
              />
              <span className="text-sm text-slate-400">Show Button</span>
            </label>
          </div>

          {data.cta?.visible !== false && (
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Button Label</label>
                <input
                  value={data.cta?.label || ""}
                  onChange={(e) => setData({ ...data, cta: { ...data.cta, label: e.target.value }})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. Request Consultation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Destination (Href)</label>
                <input
                  value={data.cta?.href || ""}
                  onChange={(e) => setData({ ...data, cta: { ...data.cta, href: e.target.value }})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. #contact"
                />
              </div>
            </div>
          )}
        </section>

      </div>

      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end items-center gap-4">
        {success && <span className="text-teal-400 text-sm font-medium">Saved seamlessly!</span>}
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Menu"}
        </button>
      </div>
    </div>
  );
}
