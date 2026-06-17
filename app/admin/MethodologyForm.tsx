"use client";

import { useState, useEffect } from "react";
import { saveMethodology } from "../actions";

const BRAND_COLORS = [
  { color: "#2dd4bf", bg: "rgba(45,212,191,0.06)" }, // Teal
  { color: "#818cf8", bg: "rgba(129,140,248,0.06)" }, // Indigo
];

export default function MethodologyForm({ initialMethodology }: { initialMethodology: any[] }) {
  // Add a unique _id for safe reordering and selection
  const [localSteps, setLocalSteps] = useState(
    initialMethodology.map(s => ({ ...s, _id: s._id || Math.random().toString(36).substr(2, 9) }))
  );
  
  const [selectedId, setSelectedId] = useState<string>(localSteps[0]?._id || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const selectedIndex = localSteps.findIndex(s => s._id === selectedId);
  const selectedStep = localSteps[selectedIndex];

  const handleStepChange = (field: string, value: string) => {
    if (selectedIndex === -1) return;
    const newSteps = [...localSteps];
    if (field === 'details') {
      newSteps[selectedIndex][field] = value.split('\n');
    } else {
      newSteps[selectedIndex][field] = value;
    }
    setLocalSteps(newSteps);
  };

  const handleAddStep = () => {
    const nextColor = BRAND_COLORS[localSteps.length % BRAND_COLORS.length];
    const newStep = {
      _id: Math.random().toString(36).substr(2, 9),
      num: (localSteps.length + 1).toString().padStart(2, '0'),
      title: "New Step",
      subtitle: "Subtitle",
      description: "Description goes here...",
      details: ["Point 1", "Point 2"],
      color: nextColor.color,
      bg: nextColor.bg,
    };
    setLocalSteps([...localSteps, newStep]);
    setSelectedId(newStep._id);
  };

  const handleDeleteStep = () => {
    if (confirm("Are you sure you want to remove this step?")) {
      const newSteps = localSteps.filter(s => s._id !== selectedId);
      setLocalSteps(newSteps);
      if (newSteps.length > 0) {
        setSelectedId(newSteps[0]._id);
      } else {
        setSelectedId("");
      }
    }
  };

  async function handleSaveAll() {
    setIsSaving(true);
    try {
      // Re-number sequentially and clean up empty bullet points
      const stepsToSave = localSteps.map((step, index) => {
        const { _id, ...rest } = step;
        return {
          ...rest,
          num: (index + 1).toString().padStart(2, '0'),
          details: rest.details.filter((line: string) => line.trim() !== '')
        };
      });
      
      const result = await saveMethodology(stepsToSave);
      if (result.error) {
        alert("Error saving: " + result.error);
        return;
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Update local state numbers to reflect the save
      setLocalSteps(localSteps.map((step, index) => ({
        ...step,
        num: (index + 1).toString().padStart(2, '0')
      })));
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[600px]">
      
      {/* Sidebar - Step List */}
      <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Steps</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
          {localSteps.map((step, i) => {
            const isDragging = draggedIndex === i;
            const isDragOver = draggedOverIndex === i;
            
            return (
              <div key={step._id} className="relative">
                {isDragOver && draggedIndex !== null && draggedIndex > i && (
                  <div className="absolute -top-1 left-0 right-0 h-0.5 bg-teal-500 z-10" />
                )}
                {isDragOver && draggedIndex !== null && draggedIndex < i && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 z-10" />
                )}
                <div
                  draggable
                  onDragStart={(e) => {
                    setDraggedIndex(i);
                    e.dataTransfer.setData("text/plain", "");
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDraggedOverIndex(i);
                  }}
                  onDragEnd={() => {
                    setDraggedIndex(null);
                    setDraggedOverIndex(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedIndex === null || draggedIndex === i) {
                      setDraggedIndex(null);
                      setDraggedOverIndex(null);
                      return;
                    }
                    
                    const newList = [...localSteps];
                    const [removed] = newList.splice(draggedIndex, 1);
                    newList.splice(i, 0, removed);
                    
                    // Optimistic update
                    setLocalSteps(newList);
                    setDraggedIndex(null);
                    setDraggedOverIndex(null);
                  }}
                  onClick={() => setSelectedId(step._id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer overflow-hidden relative ${
                    selectedId === step._id
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                  } ${isDragging ? "opacity-30 border-dashed border-slate-500" : ""}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: step.color }} />
                  <svg className="w-4 h-4 text-slate-500 cursor-grab active:cursor-grabbing shrink-0 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="9" cy="12" r="2"/>
                    <circle cx="15" cy="12" r="2"/>
                    <circle cx="9" cy="18" r="2"/>
                    <circle cx="15" cy="18" r="2"/>
                  </svg>
                  <span className="truncate text-white">{step.num}. {step.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleAddStep}
          className="mt-2 text-left px-4 py-3 rounded-lg text-sm font-medium border border-dashed transition-colors border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
        >
          + Add Step
        </button>
      </div>

      {/* Editor */}
      <div className="md:col-span-2 p-6 md:p-8 flex flex-col h-full">
        {!selectedStep ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a step or add a new one.
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-sm" style={{ backgroundColor: selectedStep.bg, color: selectedStep.color }}>
                  {selectedStep.num}
                </span> 
                Edit Step
              </h2>
              <button
                type="button"
                onClick={handleDeleteStep}
                className="text-red-400 text-sm hover:text-red-300 px-3 py-1.5 rounded-md bg-red-400/10 hover:bg-red-400/20 transition-colors"
              >
                Delete Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Title</label>
                <input
                  type="text"
                  value={selectedStep.title}
                  onChange={(e) => handleStepChange("title", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={selectedStep.subtitle}
                  onChange={(e) => handleStepChange("subtitle", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Accent Color</label>
              <div className="flex gap-3">
                {BRAND_COLORS.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const newSteps = [...localSteps];
                      newSteps[selectedIndex].color = c.color;
                      newSteps[selectedIndex].bg = c.bg;
                      setLocalSteps(newSteps);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedStep.color === c.color ? "border-white scale-110 shadow-lg shadow-white/10" : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
                    }`}
                    style={{ backgroundColor: c.color }}
                    aria-label={`Select color ${c.color}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Detailed Description</label>
              <textarea
                value={selectedStep.description}
                onChange={(e) => handleStepChange("description", e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Bullet Points (one per line)</label>
              <textarea
                value={selectedStep.details.join('\n')}
                onChange={(e) => handleStepChange("details", e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Stakeholder interviews&#10;Data-flow audits"
              />
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-800 flex justify-end">
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                className={`font-bold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 ${saveSuccess ? "bg-emerald-400 text-slate-950" : "bg-teal-500 hover:bg-teal-400 text-slate-950"}`}
              >
                {isSaving ? "Saving..." : saveSuccess ? "Success!" : "Save All Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
