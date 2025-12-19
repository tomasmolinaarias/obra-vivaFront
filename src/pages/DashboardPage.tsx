import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";

import { logout } from "../services/auth.service";
import { useApi } from "../hooks/useApi";
import type { Me, Project, Document } from "../types/api";
import { createProject } from "../services/projects.service";
import { createDocument } from "../services/documents.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  const { mutate } = useSWRConfig();

  const { data: me, error: meError, isLoading: meLoading } = useApi<Me>("/v1/me/");
  const { data: projects, error: projectsError, isLoading: projectsLoading } = useApi<Project[]>("/v1/projects/");
  const { data: documents, error: documentsError, isLoading: documentsLoading } = useApi<Document[]>("/v1/documents/");

  const isLoading = meLoading || projectsLoading || documentsLoading;
  const hasError = meError || projectsError || documentsError;

  const totalProjects = projects?.length ?? 0;
  const totalDocuments = documents?.length ?? 0;
  const docsPendientes = totalDocuments;

  // ---------------------------
  // MODAL: Crear Proyecto
  // ---------------------------
  const [openProject, setOpenProject] = useState(false);
  const [pName, setPName] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pLoc, setPLoc] = useState("");
  const [pStatus, setPStatus] = useState<Project["status"]>("draft");

  const canCreateProject = useMemo(() => pName.trim().length > 0, [pName]);

  const projectMutation = useSWRMutation("projects/create", async (_key: string) => {
    return createProject({
      name: pName.trim(),
      description: pDesc.trim() || undefined,
      location: pLoc.trim() || undefined,
      status: pStatus,
    });
  });

  async function onCreateProject() {
    try {
      await projectMutation.trigger();

      setOpenProject(false);
      setPName("");
      setPDesc("");
      setPLoc("");
      setPStatus("draft");

      await mutate("/v1/projects/");
      await Swal.fire({
        icon: "success",
        title: "Proyecto creado",
        text: "Se guardó correctamente.",
        confirmButtonText: "Aceptar",
      });
    } catch (e: any) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: e?.message || "Intenta nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  }

  // ---------------------------
  // MODAL: Crear Documento
  // ---------------------------
  const [openDoc, setOpenDoc] = useState(false);
  const [dName, setDName] = useState("");
  const [dDesc, setDDesc] = useState("");
  const [dProjectId, setDProjectId] = useState<number>(() => projects?.[0]?.id ?? 0);

  // si cambia la lista de proyectos y el usuario no ha seleccionado nada, setea uno por defecto
  const defaultProjectId = projects?.[0]?.id ?? 0;

  const canCreateDoc = useMemo(() => dName.trim().length > 0 && (dProjectId || defaultProjectId) > 0, [
    dName,
    dProjectId,
    defaultProjectId,
  ]);

  const documentMutation = useSWRMutation("documents/create", async (_key: string) => {
    const project = dProjectId || defaultProjectId;

    return createDocument({
      name: dName.trim(),
      description: dDesc.trim() || undefined,
      project,
    });
  });

  async function onCreateDocument() {
    try {
      await documentMutation.trigger();

      setOpenDoc(false);
      setDName("");
      setDDesc("");
      setDProjectId(defaultProjectId);

      await mutate("/v1/documents/");
      await Swal.fire({
        icon: "success",
        title: "Documento creado",
        text: "Se guardó correctamente.",
        confirmButtonText: "Aceptar",
      });
    } catch (e: any) {
      await Swal.fire({
        icon: "error",
        title: "No se pudo guardar",
        text: e?.message || "Intenta nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-slate-600">Cumplimiento general</p>

          <p className="mt-2 text-sm text-slate-700">
            {meLoading ? (
              "Cargando usuario..."
            ) : me ? (
              <>
                Sesión: <span className="font-medium">{me.email}</span>
              </>
            ) : (
              "Sesión: —"
            )}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Salir
        </Button>
      </header>

      {hasError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            No se pudieron cargar los datos. Revisa backend, CORS y que el token sea válido.
          </AlertDescription>
        </Alert>
      )}

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="% habilitación" value={isLoading ? "…" : "—"} />
        <KpiCard title="Docs pendientes" value={isLoading ? "…" : String(docsPendientes)} />
        <KpiCard title="ART/Charlas hoy" value={isLoading ? "…" : "—"} />
        <KpiCard title="Reportes abiertos" value={isLoading ? "…" : "—"} />
      </section>

      <section className="mt-6 grid gap-3 lg:grid-cols-2">
        {/* PROYECTOS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Obras / Proyectos</CardTitle>

            <Dialog open={openProject} onOpenChange={setOpenProject}>
              <DialogTrigger asChild>
                <Button size="sm">Agregar</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar proyecto</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nombre *</Label>
                    <Input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Ej: Obra Puerto Cisnes" />
                  </div>

                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Textarea value={pDesc} onChange={(e) => setPDesc(e.target.value)} placeholder="Opcional" />
                  </div>

                  <div className="space-y-2">
                    <Label>Ubicación</Label>
                    <Input value={pLoc} onChange={(e) => setPLoc(e.target.value)} placeholder="Ej: Coyhaique, Chile" />
                  </div>

                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <select
                      className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                      value={pStatus}
                      onChange={(e) => setPStatus(e.target.value as Project["status"])}
                    >
                      <option value="draft">draft</option>
                      <option value="active">active</option>
                      <option value="paused">paused</option>
                      <option value="closed">closed</option>
                    </select>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setOpenProject(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={onCreateProject}
                    disabled={!canCreateProject || projectMutation.isMutating}
                  >
                    {projectMutation.isMutating ? "Guardando..." : "Guardar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="text-sm text-slate-700">
            {projectsLoading ? (
              "Cargando proyectos..."
            ) : projects && projects.length > 0 ? (
              <ul className="space-y-2">
                {projects.slice(0, 6).map((p) => (
                  <li key={p.id} className="rounded-xl border bg-white p-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-slate-600">
                      Estado: {p.status} · Ubicación: {p.location || "—"}
                    </div>
                  </li>
                ))}
                {projects.length > 6 && <div className="text-slate-500">+{projects.length - 6} más</div>}
              </ul>
            ) : (
              <div className="text-slate-600">No hay proyectos aún.</div>
            )}

            {!projectsLoading && (
              <div className="mt-3 text-slate-500">
                Total: <span className="font-medium">{totalProjects}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* DOCUMENTOS */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Documentos</CardTitle>

            <Dialog open={openDoc} onOpenChange={setOpenDoc}>
              <DialogTrigger asChild>
                <Button size="sm" disabled={!defaultProjectId}>
                  Agregar
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar documento</DialogTitle>
                </DialogHeader>

                {!defaultProjectId ? (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Debes crear al menos 1 proyecto antes de crear documentos.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Nombre *</Label>
                      <Input value={dName} onChange={(e) => setDName(e.target.value)} placeholder="Ej: Reglamento Interno" />
                    </div>

                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea value={dDesc} onChange={(e) => setDDesc(e.target.value)} placeholder="Opcional" />
                    </div>

                    <div className="space-y-2">
                      <Label>Proyecto *</Label>
                      <select
                        className="w-full rounded-md border bg-white px-3 py-2 text-sm"
                        value={dProjectId || defaultProjectId}
                        onChange={(e) => setDProjectId(Number(e.target.value))}
                      >
                        {projects?.map((p) => (
                          <option key={p.id} value={p.id}>
                            #{p.id} - {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <DialogFooter className="gap-2">
                  <Button variant="outline" onClick={() => setOpenDoc(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={onCreateDocument}
                    disabled={!canCreateDoc || documentMutation.isMutating || !defaultProjectId}
                  >
                    {documentMutation.isMutating ? "Guardando..." : "Guardar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="text-sm text-slate-700">
            {documentsLoading ? (
              "Cargando documentos..."
            ) : documents && documents.length > 0 ? (
              <ul className="space-y-2">
                {documents.slice(0, 6).map((d) => (
                  <li key={d.id} className="rounded-xl border bg-white p-3">
                    <div className="font-medium">{d.name}</div>
                    <div className="text-slate-600">
                      Proyecto: {d.project} · {d.created_at}
                    </div>
                  </li>
                ))}
                {documents.length > 6 && <div className="text-slate-500">+{documents.length - 6} más</div>}
              </ul>
            ) : (
              <div className="text-slate-600">No hay documentos aún.</div>
            )}

            {!documentsLoading && (
              <div className="mt-3 text-slate-500">
                Total: <span className="font-medium">{totalDocuments}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-slate-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
      </CardContent>
    </Card>
  );
}
