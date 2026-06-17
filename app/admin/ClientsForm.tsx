"use client";

import { useState, useRef, useEffect } from "react";
import { uploadClientLogos, deleteClientLogo, deleteAllClientLogos, reorderClientLogos, saveClientsHeader } from "../actions";

export default function ClientsForm({ initialClients, initialHeader }: { initialClients: string[], initialHeader: string }) {
  const [clients, setClients] = useState<string[]>(initialClients);
  const [header, setHeader] = useState(initialHeader);
  const [loading, setLoading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const [headerSuccess, setHeaderSuccess] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setClients(initialClients);
  }, [initialClients]);

  useEffect(() => {
    setHeader(initialHeader);
  }, [initialHeader]);

  async function handleSaveChanges() {
    setLoading(true);
    await saveClientsHeader(header);
    setHeaderSuccess(true);
    setTimeout(() => setHeaderSuccess(false), 3000);
    setLoading(false);
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (uploadCount === 0) return;
    
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await uploadClientLogos(formData);
      if (result && result.error) {
        alert("Action Failed: " + result.error);
        return;
      }
      setUploadCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(filename: string) {
    if (confirm("Delete this logo?")) {
      setLoading(true);
      await deleteClientLogo(filename);
      setLoading(false);
    }
  }

  async function handleDeleteAll() {
    if (confirm("Are you sure you want to delete ALL logos?")) {
      setLoading(true);
      await deleteAllClientLogos();
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-8 min-h-[600px]">
      <div className="mb-10 pb-10 border-b border-slate-800">
        <h2 className="text-xl font-semibold text-white mb-6">Header Settings</h2>
        <div>
          <div className="flex justify-between items-end mb-1">
            <label className="block text-sm font-medium text-slate-400">Section Header (Eyebrow)</label>
            <span className={`text-xs font-medium ${header.length >= 50 ? "text-red-500" : "text-slate-500"}`}>{header.length}/50</span>
          </div>
          <div className="mt-2">
            <input
              value={header}
              onChange={(e) => setHeader(e.target.value.toUpperCase())}
              maxLength={50}
              placeholder="TRUSTED BY ENTERPRISES BUILDING WITH AI"
              className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-white uppercase focus:outline-none transition-colors ${header.length >= 50 ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-teal-500"}`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Manage Client Logos</h2>
        <span className="text-teal-400 font-bold text-sm bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
          {clients.length} LOGOS IN USE
        </span>
      </div>

      <form onSubmit={handleUpload} className="mb-10 pb-10 border-b border-slate-800">
        <label className="block text-sm font-medium text-slate-300 mb-3">Upload New Logos</label>
        <div className="flex items-center gap-4">
          <label className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-3 px-6 rounded-lg cursor-pointer transition-colors border border-slate-700 hover:border-slate-500">
            Choose Files
            <input
              type="file"
              name="logos"
              multiple
              accept="image/*,.svg"
              ref={fileInputRef}
              onChange={(e) => setUploadCount(e.target.files?.length || 0)}
              className="hidden"
            />
          </label>
          
          <button
            type="submit"
            disabled={loading || (uploadCount === 0 && !uploadSuccess)}
            className={`font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 ${uploadSuccess ? "bg-emerald-400 text-slate-950" : "bg-teal-500 hover:bg-teal-400 text-slate-950"}`}
          >
            {loading ? "Uploading..." : uploadSuccess ? "Success!" : `Upload ${uploadCount > 0 ? uploadCount : ""} Logos`}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Upload .SVG, .PNG, or .JPG files. They will be appended to the list.
        </p>
      </form>

      {clients.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-slate-300 uppercase tracking-widest">Active Logos (Drag to reorder)</h3>
            <button
              onClick={handleDeleteAll}
              className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 transition-colors"
            >
              Delete All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((filename, i) => {
              const isDragging = draggedIndex === i;
              const isDragOver = draggedOverIndex === i;

              return (
                <div key={filename} className="relative group">
                  {isDragOver && draggedIndex !== null && draggedIndex > i && (
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-teal-500 z-10 rounded" />
                  )}
                  {isDragOver && draggedIndex !== null && draggedIndex < i && (
                    <div className="absolute -right-2 top-0 bottom-0 w-1 bg-teal-500 z-10 rounded" />
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
                    onDrop={async (e) => {
                      e.preventDefault();
                      if (draggedIndex === null || draggedIndex === i) {
                        setDraggedIndex(null);
                        setDraggedOverIndex(null);
                        return;
                      }
                      
                      const newList = [...clients];
                      const [removed] = newList.splice(draggedIndex, 1);
                      newList.splice(i, 0, removed);
                      
                      setClients(newList);
                      setDraggedIndex(null);
                      setDraggedOverIndex(null);
                      
                      await reorderClientLogos(newList);
                    }}
                    className={`relative aspect-video bg-white border rounded-lg p-4 flex items-center justify-center cursor-grab active:cursor-grabbing transition-all ${
                      isDragging ? "opacity-50 border-dashed border-slate-400" : "border-slate-200 group-hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <img
                      src={`/clients/${filename}`}
                      alt={filename}
                      className="max-w-full max-h-full object-contain"
                    />
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(filename);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 text-white rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-500 hover:border-red-500 shadow-xl"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-800 rounded-xl text-slate-500">
          No logos uploaded yet.
        </div>
      )}

      <div className="mt-12 flex justify-end">
        <button
          onClick={handleSaveChanges}
          disabled={loading || headerSuccess}
          className={`w-full md:w-1/3 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 ${headerSuccess ? "bg-emerald-400 text-slate-950" : "bg-teal-500 hover:bg-teal-400 text-slate-950"}`}
        >
          {loading ? "Saving..." : headerSuccess ? "Success!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
