// src/pages/prevencionista/ProtocolosPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users
  // FileText eliminado - no se usa
} from "lucide-react";

const PROTOCOLOS = [
  {
    id: 1,
    nombre: "PREXOR",
    descripcion: "Protocolo de Exposición Ocupacional a Ruido",
    trabajadores_aplica: 25,
    trabajadores_cumple: 22,
    trabajadores_no_cumple: 3,
    ultima_evaluacion: "2025-02-15",
    proxima_evaluacion: "2025-08-15",
  },
  {
    id:  2,
    nombre: "PLANESI",
    descripcion: "Plan Nacional de Erradicación de la Silicosis",
    trabajadores_aplica: 15,
    trabajadores_cumple: 15,
    trabajadores_no_cumple: 0,
    ultima_evaluacion: "2025-01-20",
    proxima_evaluacion: "2025-07-20",
  },
  {
    id: 3,
    nombre: "TMERT",
    descripcion: "Trastornos Musculoesqueléticos de Extremidades Superiores",
    trabajadores_aplica: 30,
    trabajadores_cumple:  28,
    trabajadores_no_cumple: 2,
    ultima_evaluacion: "2025-03-01",
    proxima_evaluacion: "2025-09-01",
  },
  {
    id: 4,
    nombre: "MMC",
    descripcion: "Manejo Manual de Carga",
    trabajadores_aplica: 45,
    trabajadores_cumple: 40,
    trabajadores_no_cumple: 5,
    ultima_evaluacion: "2025-02-01",
    proxima_evaluacion: "2025-08-01",
  },
  {
    id: 5,
    nombre: "Trabajo en Altura",
    descripcion: "Protocolo para Trabajo en Altura Física",
    trabajadores_aplica: 20,
    trabajadores_cumple: 18,
    trabajadores_no_cumple: 2,
    ultima_evaluacion: "2025-03-10",
    proxima_evaluacion: "2025-09-10",
  },
];

export default function ProtocolosPage() {
  const totalTrabajadores = PROTOCOLOS.reduce((acc, p) => acc + p.trabajadores_aplica, 0);
  const totalCumple = PROTOCOLOS. reduce((acc, p) => acc + p.trabajadores_cumple, 0);
  const totalNoCumple = PROTOCOLOS.reduce((acc, p) => acc + p.trabajadores_no_cumple, 0);
  const porcentajeCumplimiento = Math.round((totalCumple / totalTrabajadores) * 100);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-pink-600" />
              <div>
                <h1 className="text-2xl font-bold">Protocolos MINSAL / Mutual</h1>
                <p className="text-muted-foreground">Gestión de protocolos de vigilancia</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Evaluación
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-pink-600">{PROTOCOLOS.length}</p>
                <p className="text-sm text-muted-foreground">Protocolos Activos</p>
              </CardContent>
            </Card>
            <Card className={porcentajeCumplimiento >= 90 ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
              <CardContent className="p-4 text-center">
                <p className={`text-3xl font-bold ${porcentajeCumplimiento >= 90 ? "text-green-600" : "text-yellow-600"}`}>
                  {porcentajeCumplimiento}%
                </p>
                <p className="text-sm text-muted-foreground">Cumplimiento General</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{totalCumple}</p>
                <p className="text-sm text-muted-foreground">Trabajadores OK</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{totalNoCumple}</p>
                <p className="text-sm text-muted-foreground">Requieren Atención</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de protocolos */}
          <Card>
            <CardHeader>
              <CardTitle>Estado de Protocolos</CardTitle>
              <CardDescription>Cumplimiento por protocolo de vigilancia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {PROTOCOLOS.map((protocolo) => {
                  const porcentaje = Math.round((protocolo.trabajadores_cumple / protocolo.trabajadores_aplica) * 100);
                  const esCritico = protocolo.trabajadores_no_cumple > 0;

                  return (
                    <div
                      key={protocolo.id}
                      className={`rounded-lg border p-4 ${
                        esCritico ?  "border-orange-200 bg-orange-50" :  "border-green-200 bg-green-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={esCritico ? "destructive" : "default"}>
                              {protocolo.nombre}
                            </Badge>
                            {! esCritico && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {esCritico && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{protocolo.descripcion}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Última evaluación: {protocolo.ultima_evaluacion}</span>
                            <span>Próxima:  {protocolo.proxima_evaluacion}</span>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{protocolo.trabajadores_aplica}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Aplica</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="font-semibold">{protocolo. trabajadores_cumple}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">Cumple</p>
                            </div>
                            {protocolo.trabajadores_no_cumple > 0 && (
                              <div className="text-center">
                                <div className="flex items-center gap-1 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  <span className="font-semibold">{protocolo.trabajadores_no_cumple}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">No cumple</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Barra de progreso */}
                          <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                            <div
                              className={`h-full rounded-full ${porcentaje === 100 ? "bg-green-500" : "bg-orange-500"}`}
                              style={{ width: `${porcentaje}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{porcentaje}% cumplimiento</p>
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