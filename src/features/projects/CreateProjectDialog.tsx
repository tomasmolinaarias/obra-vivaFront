// src/features/projects/CreateProjectDialog.tsx
import { useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";

import type { Project } from "@/types/api";
import { createProject } from "@/services/projects.service";
import { notifyError, notifySuccess } from "@/shared/alerts/notify";


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

type Props = {
    onCreated: () => Promise<void> | void;
};

export default function CreateProjectDialog({ onCreated }: Props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState<Project["status"]>("draft");

    const canSave = useMemo(() => name.trim().length > 0, [name]);

    const mutation = useSWRMutation("projects/create", async () => {
        return createProject({
            name: name.trim(),
            description: description.trim() || undefined,
            location: location.trim() || undefined,
            status,
        });
    });

    async function onSave() {
        try {
            await mutation.trigger();

            setOpen(false);
            setName("");
            setDescription("");
            setLocation("");
            setStatus("draft");

            await onCreated();
            await notifySuccess("Proyecto creado", "Se guardó correctamente.");
        } catch (e: any) {
            await notifyError("No se pudo guardar", e?.message || "Intenta nuevamente.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Agregar</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Agregar proyecto</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Nombre *</Label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Obra Puerto Cisnes" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Descripción</Label>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opcional" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Ubicación</Label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ej: Coyhaique, Chile" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Estado</Label>
                        <select
                            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Project["status"])}
                        >
                            <option value="draft">draft</option>
                            <option value="active">active</option>
                            <option value="paused">paused</option>
                            <option value="closed">closed</option>
                        </select>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button disabled={!canSave || mutation.isMutating} onClick={onSave}>
                        {mutation.isMutating ? "Guardando..." : "Guardar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
