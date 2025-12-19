// src/features/documents/CreateDocumentDialog.tsx
import { useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";

import type { Project } from "@/types/api";
import { createDocument } from "@/services/documents.service";
import { notifyError,notifySuccess } from "@/shared/alerts/notify";

import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription } from "@/components/ui/alert";


type Props = {
  projects: Project[];
  onCreated: () => Promise<void> | void;
};

export default function CreateDocumentDialog({ projects, onCreated }: Props) {
  const defaultProjectId = projects?.[0]?.id ?? 0;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<number>(defaultProjectId);

  const canSave = useMemo(
    () => name.trim().length > 0 && (projectId || defaultProjectId) > 0,
    [name, projectId, defaultProjectId]
  );

  const mutation = useSWRMutation("documents/create", async () => {
    const project = projectId || defaultProjectId;
    return createDocument({
      name: name.trim(),
      description: description.trim() || undefined,
      project,
    });
  });

  async function onSave() {
    try {
      await mutation.trigger();

      setOpen(false);
      setName("");
      setDescription("");
      setProjectId(defaultProjectId);

      await onCreated();
      await notifySuccess("Documento creado", "Se guardó correctamente.");
    } catch (e: any) {
      await notifyError("No se pudo guardar", e?.message || "Intenta nuevamente.");
    }
  }

  const hasProjects = defaultProjectId > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={!hasProjects}>Agregar</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar documento</DialogTitle>
        </DialogHeader>

        {!hasProjects ? (
          <Alert variant="destructive">
            <AlertDescription>Debes crear al menos 1 proyecto antes de crear documentos.</AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Nombre *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Reglamento Interno" />
            </div>

            <div className="grid gap-2">
              <Label>Descripción</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opcional" />
            </div>

            <div className="grid gap-2">
              <Label>Proyecto *</Label>
              <select
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                value={projectId || defaultProjectId}
                onChange={(e) => setProjectId(Number(e.target.value))}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.id} - {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button disabled={!canSave || mutation.isMutating || !hasProjects} onClick={onSave}>
            {mutation.isMutating ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
