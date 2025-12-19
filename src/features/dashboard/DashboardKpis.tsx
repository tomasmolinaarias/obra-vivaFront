// src/features/dashboard/DashboardKpis.tsx
import { useApi } from "@/hooks/useApi";
import type { Project, Document } from "@/types/api";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardKpis() {
  const { data: projects, isLoading: projectsLoading } = useApi<Project[]>("/v1/projects/");
  const { data: documents, isLoading: documentsLoading } = useApi<Document[]>("/v1/documents/");

  const isLoading = projectsLoading || documentsLoading;

  const totalProjects = projects?.length ?? 0;
  const totalDocuments = documents?.length ?? 0;

  // MVP: no existe estado pendiente/firmado aún, así que usamos total.
  const docsPendientes = totalDocuments;

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="% habilitación" subtitle="Trabajadores aptos hoy" value={isLoading ? "…" : "—"} />
      <KpiCard
        title="Docs pendientes"
        subtitle="Documentos por completar"
        value={isLoading ? "…" : String(docsPendientes)}
      />
      <KpiCard title="ART / Charlas" subtitle="Registros del día" value={isLoading ? "…" : "—"} />
      <KpiCard title="Reportes" subtitle="Condiciones inseguras" value={isLoading ? "…" : "—"} />
      <KpiCard title="Proyectos" subtitle="Total de obras" value={isLoading ? "…" : String(totalProjects)} />
      <KpiCard title="Documentos" subtitle="Total cargados" value={isLoading ? "…" : String(totalDocuments)} />
    </section>
  );
}

function KpiCard({ title, subtitle, value }: { title: string; subtitle: string; value: string }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-700">{title}</CardTitle>
        <CardDescription className="text-xs">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}
