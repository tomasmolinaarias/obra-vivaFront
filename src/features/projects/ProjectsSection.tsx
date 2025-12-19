// src/features/projects/ProjectsSection.tsx
import { useSWRConfig } from "swr";

import { useProjects } from "./useProjects";
import CreateProjectDialog from "./CreateProjectDialog";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const MAX_LIST = 6;

export default function ProjectsSection() {
  const { mutate } = useSWRConfig();
  const { projects, isLoading, refreshKey } = useProjects();

  async function refresh() {
    await mutate(refreshKey);
  }

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Obras / Proyectos</CardTitle>
          <CardDescription>Gestiona y revisa las obras activas</CardDescription>
        </div>

        <CreateProjectDialog onCreated={refresh} />
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading ? (
          <ListSkeleton />
        ) : projects.length > 0 ? (
          <>
            <ul className="space-y-2">
              {projects.slice(0, MAX_LIST).map((p) => (
                <li key={p.id} className="rounded-xl border bg-white p-3 hover:bg-slate-50 transition">
                  <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="mt-1 text-xs text-slate-600 truncate">
                        {p.location || "Sin ubicación"} • #{p.id}
                      </div>
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Total: <span className="font-medium text-slate-900">{projects.length}</span>
              </span>
              {projects.length > MAX_LIST && <span>+{projects.length - MAX_LIST} más</span>}
            </div>
          </>
        ) : (
          <EmptyState title="Sin proyectos" description="Crea el primer proyecto para comenzar a cargar documentos." />
        )}
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: "draft" | "active" | "paused" | "closed" }) {
  if (status === "active") return <Badge>active</Badge>;
  if (status === "paused") return <Badge variant="secondary">paused</Badge>;
  if (status === "closed") return <Badge variant="destructive">closed</Badge>;
  return <Badge variant="outline">draft</Badge>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 text-center">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{description}</div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border bg-white p-3">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="mt-2 h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}
