"use client";

import { useState } from "react";
import AdminForm from "./AdminForm";
import HeroForm from "./HeroForm";
import ClientsForm from "./ClientsForm";
import MenuForm from "./MenuForm";
import DesignSystem from "./DesignSystem";
import MethodologyForm from "./MethodologyForm";
import CapabilitiesForm from "./CapabilitiesForm";
import AgentsForm from "./AgentsForm";
import ContactForm from "./ContactForm";

export default function AdminDashboard({ 
  projects, 
  clients, 
  clientsHeader, 
  methodology, 
  capabilities, 
  agents,
  hero,
  menu,
  contact 
}: { 
  projects: any[], 
  clients: string[], 
  clientsHeader: string, 
  methodology: any[], 
  capabilities: any[], 
  agents: any[],
  hero?: any,
  menu?: any,
  contact?: any
}) {
  const [activeTab, setActiveTab] = useState<"menu" | "hero" | "projects" | "clients" | "methodology" | "expertise" | "agents" | "contact" | "design">("menu");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Portfolio Admin Dashboard</h1>
      </div>

      {/* Traditional Tabs */}
      <div className="flex space-x-2 px-2">
        <button
          onClick={() => setActiveTab("menu")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "menu"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Menu
        </button>
        <button
          onClick={() => setActiveTab("hero")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "hero"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Hero
        </button>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "projects"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          Featured Work
        </button>
        <button
          onClick={() => setActiveTab("clients")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "clients"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          Client List
        </button>
        <button
          onClick={() => setActiveTab("methodology")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "methodology"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          How I Engage
        </button>
        <button
          onClick={() => setActiveTab("expertise")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "expertise"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          Expertise
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ${
            activeTab === "contact"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          Contact
        </button>
        <button
          onClick={() => setActiveTab("design")}
          className={`px-6 py-3 text-sm font-semibold rounded-t-lg transition-colors relative top-[1px] ml-auto ${
            activeTab === "design"
              ? "bg-slate-900 text-teal-400 border-x border-t border-slate-800"
              : "bg-slate-950 text-slate-500 hover:text-white border-x border-t border-transparent"
          }`}
        >
          Design System
        </button>
      </div>

      {/* Unified Content Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-b-xl rounded-tr-xl">
        {activeTab === "menu" ? (
          <MenuForm initialData={menu} />
        ) : activeTab === "hero" ? (
          <HeroForm initialData={hero} />
        ) : activeTab === "projects" ? (
          <AdminForm projects={projects} />
        ) : activeTab === "clients" ? (
          <ClientsForm initialClients={clients} initialHeader={clientsHeader} />
        ) : activeTab === "methodology" ? (
          <MethodologyForm initialMethodology={methodology} />
        ) : activeTab === "expertise" ? (
          <CapabilitiesForm initialCapabilities={capabilities} />
        ) : activeTab === "contact" ? (
          <ContactForm initialData={contact} />
        ) : (
          <DesignSystem />
        )}
      </div>
    </div>
  );
}
