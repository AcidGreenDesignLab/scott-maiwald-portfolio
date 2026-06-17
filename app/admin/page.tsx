import fs from "fs";
import path from "path";
import AdminDashboard from "./AdminDashboard";
import { defaultMenu } from "@/components/Navbar";
import { defaultHero } from "@/components/Hero";
import { defaultMethodologySteps } from "@/components/Methodology";
import { defaultCapabilities } from "@/components/Capabilities";
import { defaultAgents } from "@/components/MeetTheAgents";
import { defaultContact } from "@/components/Contact";

export default function AdminPage() {
  let menu = defaultMenu;
  try {
    const menuPath = path.join(process.cwd(), "data", "menu.json");
    if (fs.existsSync(menuPath)) {
      menu = JSON.parse(fs.readFileSync(menuPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading menu.json", e);
  }

  let hero = defaultHero;
  try {
    const heroPath = path.join(process.cwd(), "data", "hero.json");
    if (fs.existsSync(heroPath)) {
      hero = JSON.parse(fs.readFileSync(heroPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading hero.json", e);
  }

  const dataPath = path.join(process.cwd(), "data", "projects.json");
  const clientsPath = path.join(process.cwd(), "data", "clients.json");
  
  let projects = [];
  try {
    if (fs.existsSync(dataPath)) {
      projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading projects.json", e);
  }

  let clients: string[] = [];
  try {
    if (fs.existsSync(clientsPath)) {
      clients = JSON.parse(fs.readFileSync(clientsPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading clients.json", e);
  }

  let clientsHeader = "TRUSTED BY ENTERPRISES BUILDING WITH AI";
  try {
    const headerPath = path.join(process.cwd(), "data", "clientsHeader.json");
    if (fs.existsSync(headerPath)) {
      const data = JSON.parse(fs.readFileSync(headerPath, "utf8"));
      if (data.header) clientsHeader = data.header;
    }
  } catch (e) {
    console.error("Error reading clientsHeader.json", e);
  }

  let methodology = defaultMethodologySteps;
  try {
    const methPath = path.join(process.cwd(), "data", "methodology.json");
    if (fs.existsSync(methPath)) {
      methodology = JSON.parse(fs.readFileSync(methPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading methodology.json", e);
  }

  let capabilities = defaultCapabilities;
  try {
    const capPath = path.join(process.cwd(), "data", "capabilities.json");
    if (fs.existsSync(capPath)) {
      capabilities = JSON.parse(fs.readFileSync(capPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading capabilities.json", e);
  }

  let agents = defaultAgents;
  try {
    const agentsPath = path.join(process.cwd(), "data", "agents.json");
    if (fs.existsSync(agentsPath)) {
      agents = JSON.parse(fs.readFileSync(agentsPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading agents.json", e);
  }

  let contact = defaultContact;
  try {
    const contactPath = path.join(process.cwd(), "data", "contact.json");
    if (fs.existsSync(contactPath)) {
      contact = JSON.parse(fs.readFileSync(contactPath, "utf8"));
    }
  } catch (e) {
    console.error("Error reading contact.json", e);
  }

  const projectsDir = path.join(process.cwd(), "public", "projects");
  const projectImages: Record<string, string[]> = {};

  try {
    if (fs.existsSync(projectsDir)) {
      const projectFolders = fs.readdirSync(projectsDir);
      for (const folder of projectFolders) {
        if (!folder.startsWith(".")) {
          const folderPath = path.join(projectsDir, folder);
          if (fs.statSync(folderPath).isDirectory()) {
            const files = fs.readdirSync(folderPath)
              .filter((f) => f.match(/\.(png|jpe?g|webp|svg|gif)$/i))
              .sort();
            projectImages[folder] = files.map((f) => `/projects/${folder}/${f}`);
          }
        }
      }
    }
  } catch (e) {
    console.error("Error reading project images", e);
  }

  const finalProjects = projects.map((p: any) => ({
    ...p,
    images: projectImages[p.id] && projectImages[p.id].length > 0 
      ? projectImages[p.id] 
      : p.images || []
  }));

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10 pb-20">
      <AdminDashboard 
        menu={menu}
        hero={hero}
        projects={finalProjects} 
        clients={clients} 
        clientsHeader={clientsHeader}
        methodology={methodology}
        capabilities={capabilities}
        agents={agents}
        contact={contact}
      />
    </div>
  );
}
