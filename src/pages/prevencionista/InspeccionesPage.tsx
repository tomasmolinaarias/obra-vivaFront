// src/pages/prevencionista/InspeccionesPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ClipboardCheck, 
  Plus, 
  Calendar,
  MapPin,
  User,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

const MOCK_INSPECCIONES = [
  {
    id: 1,
    tipo: "ANDAMIOS",
    titulo: "Inspección de andamios Sector A",
    area: "Sector A - Pisos 3-5",
    fecha_programada: "2025-03-20",
    hora:  "09:00",
    inspector: "Juan Prevencionista",
    estado: "PROGRAMADA",
    observaciones_abiertas: 0,
  },
  {
    id:  2,
    tipo: "GENERAL",
    titulo: "Inspección general de obra",
    area: "Toda la obra",
    fecha_programada: "2025-03-18",
    hora: "08:00",
    inspector: "Juan Prevencionista",
    estado: "COMPLETADA",
    observaciones_abiertas: 3,
  },
  {
    id: 3,
    tipo: "ELECTRICIDAD",
    titulo: "Inspección tableros eléctricos",
    area: "Subterráneo",
    fecha_programada: "2025-03-19",
    hora: "10:00",
    inspector: "Juan Prevencionista",
    estado: "EN_CURSO",
    observaciones_abiertas: 1,
  },
];

const TIPOS_INSPECCION = [
  { tipo: "GENERAL", color: "bg-blue-100 text-blue-800" },
  { tipo: "ANDAMIOS", color: "bg-orange-100 text-orange-800" },
  { tipo: "ELECTRICIDAD", color: "bg-yellow-100 text-yellow-800" },
  { tipo: "HERRAMIENTAS", color: "bg-green-100 text-green-800" },
  { tipo: "ORDEN_ASEO", color: "bg-purple-100 text-purple-800" },
];

export default function InspeccionesPage() {
  const estadoConfig = {
    PROGRAMADA:  { variant: "secondary" as const, icon: Calendar, color: "text-blue-600" },
    EN_CURSO: { variant: "default" as const, icon: Clock, color: "text-yellow-600" },
    COMPLETADA: { variant: "outline" as const, icon: CheckCircle2, color: "text-green-600" },
    CANCELADA: { variant: "destructive" as const, icon: AlertTriangle, color: "text-red-600" },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardCheck className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold">Inspecciones de Seguridad</h1>
                <p className="text-muted-foreground">Programación y seguimiento de inspecciones</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Inspección
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md: grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">5</p>
                <p className="text-sm text-muted-foreground">Programadas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-muted-foreground">En Curso</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">18</p>
                <p className="text-sm text-muted-foreground">Completadas (mes)</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">7</p>
                <p className="text-sm text-muted-foreground">Observaciones Abiertas</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de inspecciones */}
          <Card>
            <CardHeader>
              <CardTitle>Inspecciones Recientes</CardTitle>
              <CardDescription>Últimas inspecciones programadas y realizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_INSPECCIONES. map((insp) => {
                  const estado = estadoConfig[insp.estado as keyof typeof estadoConfig];
                  const IconEstado = estado.icon;
                  const tipoConfig = TIPOS_INSPECCION.find((t) => t.tipo === insp.tipo);

                  return (
                    <div
                      key={insp.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tipoConfig?.color || "bg-gray-100"}`}>
                          <ClipboardCheck className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${tipoConfig?.color}`}>
                              {insp. tipo}
                            </span>
                          </div>
                          <p className="font-medium mt-1">{insp.titulo}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {insp.area}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {insp.fecha_programada} {insp.hora}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {insp.inspector}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {insp.observaciones_abiertas > 0 && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="text-sm font-medium">{insp.observaciones_abiertas}</span>
                          </div>
                        )}
                        <Badge variant={estado.variant}>
                          <IconEstado className={`mr-1 h-3 w-3 ${estado. color}`} />
                          {insp.estado. replace("_", " ")}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Ver Detalle
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}