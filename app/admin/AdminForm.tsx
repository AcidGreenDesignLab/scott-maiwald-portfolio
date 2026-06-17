"use client";

import { useState, useRef, useEffect } from "react";
import { saveProject, deleteProject, deleteAllImages, deleteSingleImage, reorderProjects, reorderProjectImages } from "../actions";

export default function AdminForm({ projects }: { projects: any[] }) {
  const defaultProject = projects.length > 0 ? projects[0] : null;

  const [selectedId, setSelectedId] = useState<string>(defaultProject?.id || "");
  const [isNew, setIsNew] = useState(!defaultProject);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state
  const [id, setId] = useState(defaultProject?.id || "");
  const [internalName, setInternalName] = useState(defaultProject?.internalName || "");
  const [label, setLabel] = useState(defaultProject?.label || "");
  const [headline, setHeadline] = useState(defaultProject?.headline || "");
  const [description, setDescription] = useState(defaultProject?.description || "");
  const [tags, setTags] = useState(defaultProject?.tags?.join(", ") || "");
  const [currentImageCount, setCurrentImageCount] = useState(defaultProject?.images?.length || 0);
  const [uploadCount, setUploadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Drag and drop state
  const [localProjects, setLocalProjects] = useState(projects);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const [currentImages, setCurrentImages] = useState<string[]>(defaultProject?.images || []);
  const [draggedImgIndex, setDraggedImgIndex] = useState<number | null>(null);
  const [draggedImgOverIndex, setDraggedImgOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setLocalProjects(projects);
    if (selectedId && selectedId !== "NEW") {
      const p = projects.find(x => x.id === selectedId);
      if (p) {
        setCurrentImages(p.images || []);
        setCurrentImageCount(p.images?.length || 0);
      }
    }
  }, [projects, selectedId]);

  function handleSelect(pid: string) {
    setUploadCount(0);
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (pid === "NEW") {
      setSelectedId("NEW");
      setIsNew(true);
      setId("");
      setInternalName("");
      setLabel("");
      setHeadline("");
      setDescription("");
      setTags("");
      setCurrentImageCount(0);
      setCurrentImages([]);
    } else {
      const p = projects.find((x) => x.id === pid);
      if (p) {
        setSelectedId(p.id);
        setIsNew(false);
        setId(p.id);
        setInternalName(p.internalName || "");
        setLabel(p.label);
        setHeadline(p.headline);
        setDescription(p.description);
        setTags(p.tags?.join(", ") || "");
        setCurrentImageCount(p.images?.length || 0);
        setCurrentImages(p.images || []);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("isNew", isNew.toString());
      if (!isNew) {
        formData.set("id", selectedId); // lock ID if editing
      } else {
        // Auto-generate id from internalName if empty
        const internalName = formData.get("internalName") as string || "";
        const generatedId = internalName.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
        formData.set("id", generatedId);
      }
      
      const result = await saveProject(formData);
      if (result && result.error) {
        alert("Action Failed: " + result.error);
        return;
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setUploadCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      if (isNew) {
        setIsNew(false);
        setSelectedId(formData.get("id") as string);
      }
      
      // Server action will trigger a re-render with updated projects prop,
      // which our useEffect will catch to update currentImages and count automatically.

    } catch (err: any) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (confirm("Are you sure you want to delete this project? This will delete the folder and images permanently.")) {
      setLoading(true);
      await deleteProject(selectedId);
      setSelectedId("");
      setLoading(false);
    }
  }

  async function handleDeleteImages() {
    if (confirm("Are you sure you want to delete all images for this project?")) {
      setLoading(true);
      await deleteAllImages(selectedId);
      setCurrentImageCount(0);
      setUploadCount(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("All images deleted.");
      setLoading(false);
    }
  }

  async function handleDeleteSingleImage(imgPath: string) {
    if (confirm("Are you sure you want to delete this image?")) {
      setLoading(true);
      const filename = imgPath.split('/').pop()!;
      await deleteSingleImage(selectedId, filename);
      
      const newImages = currentImages.filter(p => p !== imgPath);
      setCurrentImages(newImages);
      setCurrentImageCount(newImages.length);
      setLoading(false);
    }
  }

  return (
    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800 min-h-[600px]">
      {/* Sidebar - Project List */}
      <div className="p-6 md:p-8 flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-white">Your Projects</h2>
          {localProjects.map((p, i) => {
            const isDragging = draggedIndex === i;
            const isDragOver = draggedOverIndex === i;
            
            return (
              <div key={p.id} className="relative">
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
                    // Required for Firefox to drag
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
                    
                    const newList = [...localProjects];
                    const [removed] = newList.splice(draggedIndex, 1);
                    newList.splice(i, 0, removed);
                    
                    // Optimistic update
                    setLocalProjects(newList);
                    setDraggedIndex(null);
                    setDraggedOverIndex(null);
                    
                    // Save to backend
                    await reorderProjects(newList.map(x => x.id));
                  }}
                  onClick={() => handleSelect(p.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    selectedId === p.id
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                  } ${isDragging ? "opacity-30 border-dashed border-slate-500" : ""}`}
                >
                  <svg className="w-4 h-4 text-slate-500 cursor-grab active:cursor-grabbing shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="2"/>
                    <circle cx="15" cy="6" r="2"/>
                    <circle cx="9" cy="12" r="2"/>
                    <circle cx="15" cy="12" r="2"/>
                    <circle cx="9" cy="18" r="2"/>
                    <circle cx="15" cy="18" r="2"/>
                  </svg>
                  <span className="truncate">{p.internalName || p.label || p.id}</span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => handleSelect("NEW")}
          className={`mt-4 text-left px-4 py-3 rounded-lg text-sm font-medium border border-dashed transition-colors ${
            selectedId === "NEW"
              ? "bg-teal-500/20 text-teal-400 border-teal-500/50"
              : "border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
          }`}
        >
          + Create New Project
        </button>
      </div>

      {/* Editor */}
      <div className="md:col-span-2 p-6 md:p-8">
        {!selectedId ? (
          <div className="h-full flex items-center justify-center text-slate-500">
            Select a project or create a new one.
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-5">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-white">
                {isNew ? "Create Project" : "Edit Project"}
              </h2>
              {!isNew && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-400 text-sm hover:text-red-300 px-3 py-1.5 rounded-md bg-red-400/10 hover:bg-red-400/20 transition-colors"
                >
                  Delete Project
                </button>
              )}
            </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Internal Name (Admin Only)</label>
                <input
                  name="internalName"
                  value={internalName}
                  onChange={(e) => setInternalName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-slate-400">Eyebrow (Label)</label>
                <span className={`text-xs font-medium ${label.length >= 45 ? "text-red-500" : "text-slate-500"}`}>{label.length}/45</span>
              </div>
              <input
                name="label"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value.toUpperCase())}
                placeholder="KAISER PERMANENTE · IOS APP DESIGN"
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-white uppercase focus:outline-none transition-colors ${label.length > 45 ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-teal-500"}`}
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-slate-400">Headline</label>
                <span className={`text-xs font-medium ${headline.length >= 70 ? "text-red-500" : "text-slate-500"}`}>{headline.length}/70</span>
              </div>
              <input
                name="headline"
                required
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Chemotherapy Side Effects App"
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-white focus:outline-none transition-colors ${headline.length > 70 ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-teal-500"}`}
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-slate-400">Tags (Pills)</label>
                <span className={`text-xs font-medium ${(tags.split(',').filter(t => t.trim()).length) > 4 ? "text-red-500" : "text-slate-500"}`}>
                  {tags.split(',').filter(t => t.trim()).length}/4
                </span>
              </div>
              <input
                name="tags"
                required
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Prototyping, UI Design, UX Research"
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-white focus:outline-none transition-colors ${(tags.split(',').filter(t => t.trim()).length) > 4 ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-teal-500"}`}
              />
              <p className="text-xs text-slate-500 mt-1">Comma-separated.</p>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1">
                <label className="block text-sm font-medium text-slate-400">Body Text</label>
                <span className={`text-xs font-medium ${description.length >= 200 ? "text-red-500" : "text-slate-500"}`}>{description.length}/200</span>
              </div>
              <textarea
                name="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-white focus:outline-none transition-colors resize-none ${description.length > 200 ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-teal-500"}`}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-slate-200">
                  Project Images
                </label>
                <span className={`text-xs font-bold ${currentImageCount + uploadCount >= 8 ? "text-red-500" : "text-teal-400"}`}>
                  {currentImageCount + uploadCount}/8 IN USE
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex-shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg cursor-pointer transition-colors">
                  Choose Files
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={(e) => {
                      setUploadCount(e.target.files?.length || 0);
                      if (e.target.files && e.target.files.length > 0) {
                        setTimeout(() => formRef.current?.requestSubmit(), 0);
                      }
                    }}
                    className="hidden"
                  />
                </label>
                
                {uploadCount > 0 && (
                  <span className="text-sm text-slate-300">
                    +{uploadCount} ready to upload
                  </span>
                )}

                {!isNew && currentImageCount > 0 && (
                  <button
                    type="button"
                    onClick={handleDeleteImages}
                    className="ml-auto text-red-400 text-xs hover:text-red-300 px-3 py-2 rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-colors"
                  >
                    Delete All Images
                  </button>
                )}
              </div>
              
              <p className="text-xs text-slate-500 mt-3">
                New uploads will be appended to your existing images. Maximum 8 total.
              </p>

              {!isNew && currentImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
                  <div className="col-span-full mb-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Images (Drag to Reorder)</span>
                  </div>
                  {currentImages.map((imgPath, i) => {
                    const isDragging = draggedImgIndex === i;
                    const isDragOver = draggedImgOverIndex === i;
                    
                    return (
                      <div key={imgPath} className="relative group">
                        {isDragOver && draggedImgIndex !== null && draggedImgIndex > i && (
                          <div className="absolute -left-1.5 top-0 bottom-0 w-0.5 bg-teal-500 z-10" />
                        )}
                        {isDragOver && draggedImgIndex !== null && draggedImgIndex < i && (
                          <div className="absolute -right-1.5 top-0 bottom-0 w-0.5 bg-teal-500 z-10" />
                        )}
                        <div
                          draggable
                          onDragStart={(e) => {
                            setDraggedImgIndex(i);
                            e.dataTransfer.setData("text/plain", "");
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDraggedImgOverIndex(i);
                          }}
                          onDragEnd={() => {
                            setDraggedImgIndex(null);
                            setDraggedImgOverIndex(null);
                          }}
                          onDrop={async (e) => {
                            e.preventDefault();
                            if (draggedImgIndex === null || draggedImgIndex === i) {
                              setDraggedImgIndex(null);
                              setDraggedImgOverIndex(null);
                              return;
                            }
                            
                            const newList = [...currentImages];
                            const [removed] = newList.splice(draggedImgIndex, 1);
                            newList.splice(i, 0, removed);
                            
                            setCurrentImages(newList);
                            setDraggedImgIndex(null);
                            setDraggedImgOverIndex(null);
                            
                            const filenames = newList.map(p => p.split('/').pop()!);
                            await reorderProjectImages(selectedId, filenames);
                          }}
                          className={`relative aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing transition-all border ${
                            isDragging ? "opacity-50 border-dashed border-slate-400" : "border-slate-800 hover:border-slate-500 shadow-sm"
                          }`}
                        >
                          <img
                            src={imgPath}
                            alt={`Image ${i + 1}`}
                            className="w-full h-full object-cover"
                            draggable={false}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSingleImage(imgPath);
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-md text-white/70 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Image"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || saveSuccess}
              className={`mt-6 w-full md:w-1/3 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 self-end ${saveSuccess ? "bg-emerald-400 text-slate-950" : "bg-teal-500 hover:bg-teal-400 text-slate-950"}`}
            >
              {loading ? "Saving..." : saveSuccess ? "Success!" : "Save Project"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
