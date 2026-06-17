"use client";

import { useState } from "react";
import { saveAgents } from "../actions";

const BRAND_COLORS = [
  { color: "#2dd4bf", bg: "rgba(45,212,191,0.08)" }, // Teal
  { color: "#818cf8", bg: "rgba(129,140,248,0.08)" }, // Indigo
];

const ICONS = ["⚖", "◈", "⬡", "◎", "✧", "✦", "◱", "◲", "⧉", "❖"];

export default function AgentsForm({ initialAgents }: { initialAgents: any[] }) {
  const [localAgents, setLocalAgents] = useState(
    initialAgents.map(a => ({ ...a, _id: a._id || Math.random().toString(36).substr(2, 9) }))
  );
  
  const [selectedId, setSelectedId] = useState<string>(localAgents[0]?._id || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const selectedIndex = localAgents.findIndex(a => a._id === selectedId);
  const selectedAgent = localAgents[selectedIndex];

  const handleAgentChange = (field: string, value: string) => {
    if (selectedIndex === -1) return;
    const newAgents = [...localAgents];
    if (field === 'capabilities') {
      newAgents[selectedIndex][field] = value.split('\n');
    } else {
      newAgents[selectedIndex][field] = value;
    }
    setLocalAgents(newAgents);
  };

  const handleAddAgent = () => {
    const nextColor = BRAND_COLORS[localAgents.length % BRAND_COLORS.length];
    const newAgent = {
      _id: Math.random().toString(36).substr(2, 9),
      id: "new-agent-" + Math.random().toString(36).substr(2, 5),
      name: "New Agent",
      role: "Role",
      status: "Status",
      description: "Description goes here...",
      capabilities: ["Capability 1", "Capability 2"],
      avatar: ICONS[localAgents.length % ICONS.length],
      color: nextColor.color,
      bg: nextColor.bg,
    };
    setLocalAgents([...localAgents, newAgent]);
    setSelectedId(newAgent._id);
  };

  const handleDeleteAgent = () => {
    if (confirm("Are you sure you want to remove this coworker?")) {
      const newAgents = localAgents.filter(a => a._id !== selectedId);
      setLocalAgents(newAgents);
      if (newAgents.length > 0) {
        setSelectedId(newAgents[0]._id);
      } else {
        setSelectedId("");
      }
    }
  };

  async function handleSaveAll() {
    setIsSaving(true);
    try {
      const agentsToSave = localAgents.map((agent) => {
        const { _id, ...rest } = agent;
        return {
          ...rest,
          // Auto-generate a clean ID string if not present or just derived from name
          id: rest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          capabilities: rest.capabilities.filter((line: string) => line.trim() !== '')
        };
      });
      
      const result = await saveAgents(agentsToSave);
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
      
      {/* Sidebar - Agent List */}
      <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Coworkers</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
          {localAgents.map((agent, i) => {
            const isDragging = draggedIndex === i;
            const isDragOver = draggedOverIndex === i;
            
            return (
              <div key={agent._id} className="relative">
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
                    
                    const newList = [...localAgents];
                    const [removed] = newList.splice(draggedIndex, 1);
                    newList.splice(i, 0, removed);
                    
                    setLocalAgents(newList);
                    setDraggedIndex(null);
                    setDraggedOverIndex(null);
                  }}
                  onClick={() => setSelectedId(agent._id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer overflow-hidden relative ${
                    selectedId === agent._id
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                  } ${isDragging ? "opacity-30 border-dashed border-slate-500" : ""}`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: agent.color }} />
                  <svg className="w-4 h-4 text-slate-500 cursor-grab active:cursor-grabbing shrink-0 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="9" cy="12" r="2"/>
                    <circle cx="15" cy="12" r="2"/>
                    <circle cx="9" cy="18" r="2"/>
                    <circle cx="15" cy="18" r="2"/>
                  </svg>
                  <span className="truncate text-white">{agent.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleAddAgent}
          className="mt-2 text-left px-4 py-3 rounded-lg text-sm font-medium border border-dashed transition-colors border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
        >
          + Add Coworker
        </button>
      </div>

      {/* Editor */}
      <div className="md:col-span-2 p-6 md:p-8 flex flex-col h-full">
        {!selectedAgent ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a coworker or add a new one.
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-sm" style={{ backgroundColor: selectedAgent.bg, color: selectedAgent.color }}>
                  {selectedAgent.avatar}
                </span> 
                Edit Coworker
              </h2>
              <button
                type="button"
                onClick={handleDeleteAgent}
                className="text-red-400 text-sm hover:text-red-300 px-3 py-1.5 rounded-md bg-red-400/10 hover:bg-red-400/20 transition-colors"
              >
                Delete
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
                <input
                  type="text"
                  value={selectedAgent.name}
                  onChange={(e) => handleAgentChange("name", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Role (Subtitle)</label>
                <input
                  type="text"
                  value={selectedAgent.role}
                  onChange={(e) => handleAgentChange("role", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Icon (Avatar)</label>
                <div className="flex flex-wrap gap-2">
                  {ICONS.map((icon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAgentChange("avatar", icon)}
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center text-lg transition-all ${
                        selectedAgent.avatar === icon 
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
                        const newAgents = [...localAgents];
                        newAgents[selectedIndex].color = c.color;
                        newAgents[selectedIndex].bg = c.bg;
                        setLocalAgents(newAgents);
                      }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedAgent.color === c.color ? "border-white scale-110 shadow-lg shadow-white/10" : "border-transparent opacity-60 hover:opacity-100 hover:scale-110"
                      }`}
                      style={{ backgroundColor: c.color }}
                      aria-label={`Select color ${c.color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Status Label (e.g. Always-on)</label>
              <input
                type="text"
                value={selectedAgent.status}
                onChange={(e) => handleAgentChange("status", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Description</label>
              <textarea
                value={selectedAgent.description}
                onChange={(e) => handleAgentChange("description", e.target.value)}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Capabilities (one per line, shown as pills)</label>
              <textarea
                value={selectedAgent.capabilities.join('\n')}
                onChange={(e) => handleAgentChange("capabilities", e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors resize-none"
                placeholder="Capability 1&#10;Capability 2"
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
