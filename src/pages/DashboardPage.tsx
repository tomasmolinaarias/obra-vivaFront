// src/pages/DashboardPage.tsx

import DashboardHeader from "@/features/dashboard/DashboardHeader";
import DashboardKpis from "@/features/dashboard/DashboardKpis";
import ProjectsSection from "@/features/projects/ProjectsSection";
import DocumentsSection from "@/features/documents/DocumentsSection";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl p-4 md:p-8 space-y-6">
        <DashboardHeader />
        <DashboardKpis />
        <section className="grid gap-4 lg:grid-cols-2 items-stretch">
          <ProjectsSection />
          <DocumentsSection />
        </section>
      </div>
    </main>
  );
}
