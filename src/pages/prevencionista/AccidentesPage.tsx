// src/pages/prevencionista/AccidentesPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Plus, 
  Calendar,
  MapPin,
  User,
  FileText,
  Clock,
  CheckCircle2
  // XCircle eliminado - no se usa
} from "lucide-react";

const MOCK_EVENTOS = [
  {
    id: 1,
    tipo: "ACCIDENTE",
    gravedad: "LEVE",
    fecha: "2025-03-10",
    hora: "10:30",
    lugar: "Sector A - Piso 2",
    descripcion: "Trabajador sufrió corte menor en mano al manipular herramienta",
    trabajador_afectado: "Pedro Rojas Silva",
    diat_generada: true,
    diat_numero: "DIAT-2025-001",
    investigacion_estado: "COMPLETADA",
    acciones_pendientes: 0,
  },
  {
    id:  2,
    tipo: "INCIDENTE",
    gravedad: "MODERADO",
    fecha: "2025-03-08",
    hora: "14:15",
    lugar: "Bodega principal",
    descripcion: "Caída de material desde altura sin lesionados",
    trabajador_afectado: null,
    diat_generada: false,
    diat_numero: null,
    investigacion_estado: "EN_CURSO",
    acciones_pendientes: 2,
  },
  {
    id: 3,
    tipo: "CUASI_ACCIDENTE",
    gravedad: "ALTO",
    fecha: "2025-03-05",
    hora: "09:00",
    lugar: "Excavación Sector B",
    descripcion:  "Desprendimiento de tierra cerca de trabajadores - sin lesionados",
    trabajador_afectado: null,
    diat_generada: false,
    diat_numero: null,
    investigacion_estado: "PENDIENTE",
    acciones_pendientes: 3,
  },
];

export default function AccidentesPage() {
  const tipoConfig = {
    ACCIDENTE:  { color: "bg-red-100 text-red-800 border-red-200", icon:  AlertTriangle },
    INCIDENTE: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: AlertTriangle },
    CUASI_ACCIDENTE: { color:  "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle },
  };

  const gravedadConfig = {
    LEVE: "bg-green-100 text-green-800",
    MODERADO: "bg-yellow-100 text-yellow-800",
    GRAVE: "bg-orange-100 text-orange-800",
    FATAL: "bg-red-100 text-red-800",
    ALTO: "bg-orange-100 text-orange-800",
  };

  const investigacionConfig = {
    PENDIENTE: { variant: "destructive" as const, icon: Clock },
    EN_CURSO:  { variant: "secondary" as const, icon: Clock },
    COMPLETADA: { variant: "default" as const, icon: CheckCircle2 },
    CERRADA: { variant: "outline" as const, icon: CheckCircle2 },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold">Accidentes e Incidentes</h1>
                <p className="text-muted-foreground">Registro, DIAT e investigación</p>
              </div>
            </div>
            <Button variant="destructive">
              <Plus className="mr-2 h-4 w-4" />
              Registrar Evento
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-5">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">45</p>
                <p className="text-sm text-muted-foreground">Días sin accidentes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">1</p>
                <p className="text-sm text-muted-foreground">Accidentes (año)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">3</p>
                <p className="text-sm text-muted-foreground">Incidentes (año)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-yellow-600">5</p>
                <p className="text-sm text-muted-foreground">Cuasi accidentes</p>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">5</p>
                <p className="text-sm text-muted-foreground">Acciones pendientes</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de eventos */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos Registrados</CardTitle>
              <CardDescription>Historial de accidentes, incidentes y cuasi accidentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_EVENTOS.map((evento) => {
                  const tipo = tipoConfig[evento.tipo as keyof typeof tipoConfig];
                  const investigacion = investigacionConfig[evento. investigacion_estado as keyof typeof investigacionConfig];
                  const IconInvestigacion = investigacion.icon;

                  return (
                    <div
                      key={evento.id}
                      className={`rounded-lg border-2 p-4 ${tipo.color}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={tipo.color}>
                              {evento.tipo. replace("_", " ")}
                            </Badge>
                            <Badge className={gravedadConfig[evento.gravedad as keyof typeof gravedadConfig]}>
                              {evento.gravedad}
                            </Badge>
                            {evento. diat_generada && (
                              <Badge variant="outline" className="bg-white">
                                <FileText className="mr-1 h-3 w-3" />
                                {evento.diat_numero}
                              </Badge>
                            )}
                          </div>
                          
                          <p className="font-semibold">{evento.descripcion}</p>
                          
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {evento. fecha} {evento.hora}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {evento.lugar}
                            </span>
                            {evento.trabajador_afectado && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {evento. trabajador_afectado}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant={investigacion.variant}>
                              <IconInvestigacion className="mr-1 h-3 w-3" />
                              Investigación:  {evento.investigacion_estado. replace("_", " ")}
                            </Badge>
                            
                            {evento.acciones_pendientes > 0 && (
                              <span className="text-xs text-orange-700 font-medium">
                                {evento.acciones_pendientes} acciones pendientes
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            {! evento.diat_generada && evento.tipo === "ACCIDENTE" && (
                              <Button size="sm" variant="outline">
                                Generar DIAT
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              Ver Detalle
                            </Button>
                          </div>
                        </div>
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