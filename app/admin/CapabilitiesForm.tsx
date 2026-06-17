"use client";

import { useState } from "react";
import { saveCapabilities } from "../actions";

const BRAND_COLORS = [
  { color: "#2dd4bf", bg: "rgba(45,212,191,0.06)" }, // Teal
  { color: "#818cf8", bg: "rgba(129,140,248,0.06)" }, // Indigo
];

const ICONS = ["◈", "⬡", "◎", "✧", "✦", "◱", "◲"];

export default function CapabilitiesForm({ initialCapabilities }: { initialCapabilities: any[] }) {
  const [localCaps, setLocalCaps] = useState(
    initialCapabilities.map(c => ({ ...c, _id: c._id || Math.random().toString(36).substr(2, 9) }))
  );
  
  const [selectedId, setSelectedId] = useState<string>(localCaps[0]?._id || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFileName(file.name);
        setUploadStatus("Upload successful!");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (err) {
      setUploadStatus("Error uploading.");
    }
  };

  const handleDeleteFile = async () => {
    setUploadStatus("Deleting...");
    try {
      const res = await fetch("/api/delete-resume", { method: "DELETE" });
      if (res.ok) {
        setFileName("");
        setUploadStatus("File deleted.");
        setTimeout(() => setUploadStatus(""), 3000);
      } else {
        setUploadStatus("Delete failed.");
      }
    } catch (err) {
      setUploadStatus("Error deleting.");
    }
  };

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const selectedIndex = localCaps.findIndex(c => c._id === selectedId);
  const selectedCap = localCaps[selectedIndex];

  const handleCapChange = (field: string, value: string) => {
    if (selectedIndex === -1) return;
    const newCaps = [...localCaps];
    if (field === 'items') {
      newCaps[selectedIndex][field] = value.split('\n');
    } else {
      newCaps[selectedIndex][field] = value;
    }
    setLocalCaps(newCaps);
  };

  const handleAddCap = () => {
    const nextColor = BRAND_COLORS[localCaps.length % BRAND_COLORS.length];
    const newCap = {
      _id: Math.random().toString(36).substr(2, 9),
      title: "New Capability",
      description: "Description goes here...",
      items: ["Point 1", "Point 2"],
      icon: ICONS[localCaps.length % ICONS.length],
      color: nextColor.color,
      bg: nextColor.bg,
    };
    setLocalCaps([...localCaps, newCap]);
    setSelectedId(newCap._id);
  };

  const handleDeleteCap = () => {
    if (confirm("Are you sure you want to remove this capability?")) {
      const newCaps = localCaps.filter(c => c._id !== selectedId);
      setLocalCaps(newCaps);
      if (newCaps.length > 0) {
        setSelectedId(newCaps[0]._id);
      } else {
        setSelectedId("");
      }
    }
  };

  async function handleSaveAll() {
    setIsSaving(true);
    try {
      const capsToSave = localCaps.map((cap) => {
        const { _id, ...rest } = cap;
        return {
          ...rest,
          items: rest.items.filter((line: string) => line.trim() !== '')
        };
      });
      
      const result = await saveCapabilities(capsToSave);
      if (result.error) {
        alert("Error saving: " + result.error);
        return;
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[600px]">
      
      {/* Sidebar - Capability List */}
      <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Capabilities</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
          {localCaps.map((cap, i) => {
            const isDragging = draggedIndex === i;
            const isDragOver = draggedOverIndex === i;
            
            return (
              <div key={cap._id} className="relative">
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
                    
                    const newList = [...localCaps];
                    const [removed] = newList.splice(draggedIndex, 1);
                    newList.splice(i, 0, removed);
                    
                    setLocalCaps(newList);
                    setDraggedIndex(null);
                    setDraggedOverIndex(null);
                  }}
                  onClick={() => setSelectedId(cap._id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer overflow-hidden relative ${
                    selectedId === cap._id
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                  } ${isDragging ? "opacity-30 border-dashed border-slate-500" : ""}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: cap.color }} />
                  <svg className="w-4 h-4 text-slate-500 cursor-grab active:cursor-grabbing shrink-0 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="9" cy="12" r="2"/>
                    <circle cx="15" cy="12" r="2"/>
                    <circle cx="9" cy="18" r="2"/>
                    <circle cx="15" cy="18" r="2"/>
                  </svg>
                  <span className="truncate text-white">{cap.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleAddCap}
          className="mt-2 text-left px-4 py-3 rounded-lg text-sm font-medium border border-dashed transition-colors border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
        >
          + Add Capability
        </button>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-white mb-3">Resume</h3>
          <p className="text-xs text-slate-400 mb-3">Upload a PDF to be downloaded from the Expertise section.</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <label className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg cursor-pointer transition-colors">
                Choose File
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <div className="flex flex-col overflow-hidden">
                <span 
                  className={`text-sm truncate ${fileName ? "text-teal-400 font-medium" : "text-slate-500 italic"}`}
                  title={fileName || "No File Uploaded"}
                >
                  {fileName || "No File Uploaded"}
                </span>
                {fileName && (
                  <button 
                    onClick={handleDeleteFile}
                    className="text-xs text-red-400 hover:text-red-300 text-left mt-0.5 transition-colors"
                  >
                    Delete Current File
                  </button>
                )}
              </div>
            </div>
          </div>
          {uploadStatus && <p className={`text-xs mt-2 ${uploadStatus.includes("Error") || uploadStatus.includes("failed") ? "text-red-400" : "text-teal-400"}`}>{uploadStatus}</p>}
        </div>
      </div>

      {/* Editor */}
      <div className="md:col-span-2 p-6 md:p-8 flex flex-col h-full">
        {!selectedCap ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a capability or add a new one.
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-sm" style={{ backgroundColor: selectedCap.bg, color: selectedCap.color }}>
                  {selectedCap.icon}
                </span> 
                Edit Capability
              </h2>
              <button
                type="button"
                onClick={handleDeleteCap}
                className="text-red-400 text-sm hover:text-red-300 px-3 py-1.5 rounded-md bg-red-400/10 hover:bg-red-400/20 transition-colors"
              >
                Delete Capability
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Title</label>
              <input
                type="text"
                value={selectedCap.title}
                onChange={(e) => handleCapChange("title", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Icon</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map((icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCapChange("icon", icon)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all ${
                        selectedCap.icon === icon 
                          ? "border-white bg-white/10 text-white" 
                          : "border-slate-800 bg-slate-950 text-slate-500 hover:text-white hover:border-slate-600"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
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
                        const newCaps = [...localCaps];
                        newCaps[selectedIndex].color = c.color;
                        newCaps[selectedIndex].bg = c.bg;
                        setLocalCaps(newCaps);
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedCap.color === c.color ? "border-white scale-110 shadow-lg shadow-white/10" : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
                      }`}
                      style={{ backgroundColor: c.color }}
                      aria-label={`Select color ${c.color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Description</label>
              <textarea
                value={selectedCap.description}
                onChange={(e) => handleCapChange("description", e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Bulleted List (one per line)</label>
              <textarea
                value={selectedCap.items.join('\n')}
                onChange={(e) => handleCapChange("items", e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Item 1&#10;Item 2"
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
