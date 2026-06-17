import Navbar from "@/components/Navbar";
import HeroOption2 from "@/components/HeroOption2";
import TrustSignals from "@/components/TrustSignals";
import ImpactGrid from "@/components/ImpactGrid";
import Methodology from "@/components/Methodology";
import Capabilities from "@/components/Capabilities";
import MeetTheAgents from "@/components/MeetTheAgents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import fs from "fs";
import path from "path";

export default function Option2() {
  const projectsDir = path.join(process.cwd(), "public", "projects");
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

  let clients = [];
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
    <>
      <Navbar />
      <main>
        <HeroOption2 />
        <TrustSignals clients={clients} header={clientsHeader} />
        <ImpactGrid projects={finalProjects} />
        <Methodology />
        <Capabilities />
        <MeetTheAgents />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
