// src/pages/prevencionista/DashboardPrevencionistaPage.tsx

import DashboardPrevencionista from "@/features/prevencionista/dashboard/DashboardPrevencionista";
import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";

export default function DashboardPrevencionistaPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <DashboardPrevencionista />
      </main>
    </div>
  );
}