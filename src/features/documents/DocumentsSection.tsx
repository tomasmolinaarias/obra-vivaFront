// src/features/documents/DocumentsSection.tsx
import { useSWRConfig } from "swr";

import { useDocuments } from "./useDocuments";
import CreateDocumentDialog from "./CreateDocumentDialog";
import { useProjects } from "@/features/projects/useProjects";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { formatDate } from "@/shared/utils/formatDate";

const MAX_LIST = 6;

export default function DocumentsSection() {
  const { mutate } = useSWRConfig();

  const { documents, isLoading: docsLoading, refreshKey: docsKey } = useDocuments();
  const { projects, isLoading: projectsLoading } = useProjects();

  async function refreshDocs() {
    await mutate(docsKey);
  }

  const isLoading = docsLoading || projectsLoading;

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Documentos</CardTitle>
          <CardDescription>Registros creados para fiscalización y control</CardDescription>
        </div>

        <CreateDocumentDialog projects={projects} onCreated={refreshDocs} />
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading ? (
          <ListSkeleton />
        ) : documents.length > 0 ? (
          <>
            <ul className="space-y-2">
              {documents.slice(0, MAX_LIST).map((d) => (
                <li key={d.id} className="rounded-xl border bg-white p-3 hover:bg-slate-50 transition">
                  <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{d.name}</div>
                      <div className="mt-1 text-xs text-slate-600 truncate">
                        Proyecto #{d.project} • {formatDate(d.created_at)}
                      </div>
                      {d.description ? (
                        <div className="mt-2 text-sm text-slate-700 line-clamp-2">{d.description}</div>
                      ) : null}
                    </div>

                    <Badge variant="outline">Doc</Badge>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Total: <span className="font-medium text-slate-900">{documents.length}</span>
              </span>
              {documents.length > MAX_LIST && <span>+{documents.length - MAX_LIST} más</span>}
            </div>
          </>
        ) : (
          <EmptyState title="Sin documentos" description="Crea documentos para dejar evidencia y control trazable." />
        )}
      </CardContent>
    </Card>
  );
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
