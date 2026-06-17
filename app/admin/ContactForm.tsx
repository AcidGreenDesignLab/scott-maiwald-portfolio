"use client";

import { useState } from "react";
import { saveContactData } from "../actions";
import { defaultContact } from "@/components/Contact";

export default function ContactForm({ initialData = defaultContact }: { initialData?: any }) {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    setSuccess(false);
    const res = await saveContactData(data);
    setIsSaving(false);
    if (res?.error) {
      alert("Error saving: " + res.error);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  function updateField(key: string, value: string) {
    setData((prev: any) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-b-xl overflow-hidden">
      <div className="p-6 md:p-8 flex-1 overflow-y-auto space-y-12">
        
        <section>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Contact Section</h2>
            <p className="text-sm text-slate-400 mb-8">Edit the text, labels, and placeholders for your contact form.</p>
          </div>

      <div className="space-y-6 bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-3">Header Text</h3>
        <div className="grid gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Eyebrow</label>
            <input
              type="text"
              value={data.eyebrow}
              onChange={(e) => updateField("eyebrow", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Main Header</label>
            <input
              type="text"
              value={data.header}
              onChange={(e) => updateField("header", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Sub-header</label>
            <textarea
              rows={2}
              value={data.subHeader}
              onChange={(e) => updateField("subHeader", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-3">Form Fields</h3>
        <div className="grid gap-6 mb-6 pb-6 border-b border-white/10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Destination Email</label>
            <p className="text-xs text-slate-400">The email address that will receive the consultation requests.</p>
            <input
              type="email"
              value={data.adminEmail || "scott.maiwald@gmail.com"}
              onChange={(e) => updateField("adminEmail", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 max-w-md"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Name Label</label>
            <input
              type="text"
              value={data.nameLabel}
              onChange={(e) => updateField("nameLabel", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Name Placeholder</label>
            <input
              type="text"
              value={data.namePlaceholder}
              onChange={(e) => updateField("namePlaceholder", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email Label</label>
            <input
              type="text"
              value={data.emailLabel}
              onChange={(e) => updateField("emailLabel", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email Placeholder</label>
            <input
              type="text"
              value={data.emailPlaceholder}
              onChange={(e) => updateField("emailPlaceholder", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Message Label</label>
            <input
              type="text"
              value={data.messageLabel}
              onChange={(e) => updateField("messageLabel", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Message Placeholder</label>
            <input
              type="text"
              value={data.messagePlaceholder}
              onChange={(e) => updateField("messagePlaceholder", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-sm font-medium text-slate-300">Button CTA Text</label>
            <input
              type="text"
              value={data.buttonText}
              onChange={(e) => updateField("buttonText", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-3">Success Message</h3>
        <div className="grid gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Success Header</label>
            <input
              type="text"
              value={data.successHeader}
              onChange={(e) => updateField("successHeader", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Success Description</label>
            <textarea
              rows={2}
              value={data.successMessage}
              onChange={(e) => updateField("successMessage", e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-teal-500/50 resize-none"
            />
          </div>
        </div>
      </div>
        </section>
      </div>

      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end items-center gap-4">
        {success && <span className="text-teal-400 text-sm font-medium">Saved seamlessly!</span>}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
