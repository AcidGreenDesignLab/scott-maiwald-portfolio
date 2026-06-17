"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function saveProject(formData: FormData) {
  const id = formData.get("id") as string;
  const isNew = formData.get("isNew") === "true";
  const internalName = formData.get("internalName") as string;
  const label = formData.get("label") as string;
  const headline = formData.get("headline") as string;
  const description = formData.get("description") as string;
  const tagsString = formData.get("tags") as string;

  if (!id || !label || !headline || !description) {
    return { error: "Please fill in all required fields (ID, Eyebrow, Headline, Body Text)." };
  }

  const tags = tagsString.split(",").map((t) => t.trim()).filter(Boolean).sort();

  // Enforce layout constraints on backend
  if (label.length > 45) return { error: `Eyebrow text is too long (${label.length}/45). Please shorten it.` };
  if (headline.length > 70) return { error: `Headline text is too long (${headline.length}/70). Please shorten it.` };
  if (description.length > 200) return { error: `Body Text is too long (${description.length}/200). Please shorten it.` };
  if (tags.length > 4) return { error: `Too many tags provided (${tags.length}). Please limit to 4.` };

  // Handle files
  const files = formData.getAll("images") as File[];
  const projectDir = path.join(process.cwd(), "public", "projects", id);

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }

  // If user uploaded valid files, append them
  if (files && files.length > 0 && files[0].size > 0) {
    let existingCount = 0;
    if (fs.existsSync(projectDir)) {
      existingCount = fs.readdirSync(projectDir).filter(f => f.match(/\.(png|jpe?g|webp|svg|gif)$/i)).length;
    }

    if (existingCount + files.length > 8) {
      return { error: `This project already has ${existingCount} images. Uploading ${files.length} more exceeds the maximum of 8.` };
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      const ext = path.extname(file.name);
      // Ensure sorting order and break browser cache with a timestamp
      const newIndex = existingCount + i + 1;
      const fileName = `${String(newIndex).padStart(2, "0")}-${Date.now()}${ext}`;
      fs.writeFileSync(path.join(projectDir, fileName), buffer);
    }
  }

  // Update JSON
  const dataPath = path.join(process.cwd(), "data", "projects.json");
  let projects = [];
  if (fs.existsSync(dataPath)) {
    projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }

  const newProjectData = {
    id,
    internalName,
    label,
    headline,
    description,
    tags,
    accent: "#2dd4bf",
    accentBg: "rgba(45,212,191,0.08)",
  };

  if (isNew) {
    projects.push(newProjectData);
  } else {
    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      projects[idx] = { ...projects[idx], ...newProjectData };
    } else {
      projects.push(newProjectData);
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProject(id: string) {
  const dataPath = path.join(process.cwd(), "data", "projects.json");
  if (fs.existsSync(dataPath)) {
    const projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const updated = projects.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));
  }

  const projectDir = path.join(process.cwd(), "public", "projects", id);
  if (fs.existsSync(projectDir)) {
    fs.rmSync(projectDir, { recursive: true, force: true });
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteAllImages(id: string) {
  const projectDir = path.join(process.cwd(), "public", "projects", id);
  if (fs.existsSync(projectDir)) {
    const files = fs.readdirSync(projectDir);
    for (const f of files) {
      fs.unlinkSync(path.join(projectDir, f));
    }
  }

  const dataPath = path.join(process.cwd(), "data", "projects.json");
  if (fs.existsSync(dataPath)) {
    const projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      projects[idx].images = [];
      fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteSingleImage(id: string, filename: string) {
  const imagePath = path.join(process.cwd(), "public", "projects", id, filename);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  const dataPath = path.join(process.cwd(), "data", "projects.json");
  if (fs.existsSync(dataPath)) {
    const projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const idx = projects.findIndex((p: any) => p.id === id);
    if (idx >= 0 && projects[idx].images) {
      projects[idx].images = projects[idx].images.filter((img: string) => !img.endsWith(filename));
      fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
    }
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function reorderProjectImages(id: string, filenames: string[]) {
  const projectDir = path.join(process.cwd(), "public", "projects", id);
  if (fs.existsSync(projectDir)) {
    // 1. Rename all to temp names to avoid collisions (e.g. 01.png -> temp_01.png)
    for (const file of filenames) {
      const oldPath = path.join(projectDir, file);
      const tempPath = path.join(projectDir, `temp_${file}`);
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, tempPath);
      }
    }
    
    // 2. Rename from temp to final 01-[timestamp].ext, 02-[timestamp].ext
    const timestamp = Date.now();
    filenames.forEach((file, i) => {
      const tempPath = path.join(projectDir, `temp_${file}`);
      if (fs.existsSync(tempPath)) {
        const ext = path.extname(file);
        const newName = `${String(i + 1).padStart(2, "0")}-${timestamp}${ext}`;
        fs.renameSync(tempPath, path.join(projectDir, newName));
      }
    });
  }
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function reorderProjects(projectIds: string[]) {
  const dataPath = path.join(process.cwd(), "data", "projects.json");
  if (fs.existsSync(dataPath)) {
    const projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    
    const orderedProjects = [];
    for (const id of projectIds) {
      const p = projects.find((x: any) => x.id === id);
      if (p) orderedProjects.push(p);
    }
    
    // Catch any new projects that might have been added concurrently
    const missing = projects.filter((p: any) => !projectIds.includes(p.id));
    
    fs.writeFileSync(dataPath, JSON.stringify([...orderedProjects, ...missing], null, 2));
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// --- CLIENT LOGOS ACTIONS ---

export async function uploadClientLogos(formData: FormData) {
  const files = formData.getAll("logos") as File[];
  const clientsDir = path.join(process.cwd(), "public", "clients");
  const dataPath = path.join(process.cwd(), "data", "clients.json");

  if (!fs.existsSync(clientsDir)) {
    fs.mkdirSync(clientsDir, { recursive: true });
  }

  let clients: string[] = [];
  if (fs.existsSync(dataPath)) {
    clients = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  }

  if (files && files.length > 0 && files[0].size > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Keep original name but clean it
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      
      // Avoid overwrites by appending timestamp if exists
      let finalName = cleanName;
      if (fs.existsSync(path.join(clientsDir, finalName))) {
        const ext = path.extname(cleanName);
        const base = path.basename(cleanName, ext);
        finalName = `${base}-${Date.now()}${ext}`;
      }

      fs.writeFileSync(path.join(clientsDir, finalName), buffer);
      clients.push(finalName);
    }
  }

  fs.writeFileSync(dataPath, JSON.stringify(clients, null, 2));
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteClientLogo(filename: string) {
  const clientsDir = path.join(process.cwd(), "public", "clients");
  const dataPath = path.join(process.cwd(), "data", "clients.json");

  if (fs.existsSync(path.join(clientsDir, filename))) {
    fs.unlinkSync(path.join(clientsDir, filename));
  }

  if (fs.existsSync(dataPath)) {
    let clients: string[] = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    clients = clients.filter(c => c !== filename);
    fs.writeFileSync(dataPath, JSON.stringify(clients, null, 2));
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteAllClientLogos() {
  const clientsDir = path.join(process.cwd(), "public", "clients");
  const dataPath = path.join(process.cwd(), "data", "clients.json");

  if (fs.existsSync(clientsDir)) {
    const files = fs.readdirSync(clientsDir);
    for (const f of files) {
      fs.unlinkSync(path.join(clientsDir, f));
    }
  }

  if (fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function reorderClientLogos(filenames: string[]) {
  const dataPath = path.join(process.cwd(), "data", "clients.json");
  if (fs.existsSync(dataPath)) {
    const current = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    const missing = current.filter((c: string) => !filenames.includes(c));
    fs.writeFileSync(dataPath, JSON.stringify([...filenames, ...missing], null, 2));
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveClientsHeader(header: string) {
  const dataPath = path.join(process.cwd(), "data", "clientsHeader.json");
  
  if (header.length > 50) return { error: `Header is too long (${header.length}/50). Please shorten it.` };

  fs.writeFileSync(dataPath, JSON.stringify({ header: header.toUpperCase() }, null, 2));
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveMenuData(data: any) {
  try {
    const dataPath = path.join(process.cwd(), "data", "menu.json");
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function saveContactData(data: any) {
  try {
    const dataPath = path.join(process.cwd(), "data", "contact.json");
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to save contact data:", error);
    return { success: false, error: "Failed to save contact data" };
  }
}

export async function saveHeroData(data: any) {
  try {
    const dataPath = path.join(process.cwd(), "data", "hero.json");
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function uploadMenuImage(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    if (!file || file.size === 0) {
      return { error: "No file provided" };
    }
    
    const publicDir = path.join(process.cwd(), "public");
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a safe, unique filename
    const ext = file.name.split('.').pop();
    const filename = `logo-${Date.now()}.${ext}`;
    const filePath = path.join(publicDir, filename);
    
    fs.writeFileSync(filePath, buffer);
    
    return { success: true, imagePath: `/${filename}` };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function saveMethodology(data: any) {
  const dataPath = path.join(process.cwd(), "data", "methodology.json");
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveCapabilities(data: any) {
  const dataPath = path.join(process.cwd(), "data", "capabilities.json");
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function saveAgents(data: any) {
  const dataPath = path.join(process.cwd(), "data", "agents.json");
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
