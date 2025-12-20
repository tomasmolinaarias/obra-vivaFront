// src/pages/prevencionista/ReportesPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Download,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2
  // Users eliminado - no se usa
} from "lucide-react";

const REPORTES_DISPONIBLES = [
  {
    id: 1,
    nombre: "Reporte Semanal de Seguridad",
    descripcion: "Resumen de actividades de prevención de la semana",
    tipo: "SEMANAL",
    ultimaGeneracion: "2025-03-17",
  },
  {
    id:  2,
    nombre: "Reporte Mensual de Seguridad",
    descripcion:  "Estadísticas e indicadores del mes",
    tipo: "MENSUAL",
    ultimaGeneracion: "2025-03-01",
  },
  {
    id: 3,
    nombre: "Informe de Accidentabilidad",
    descripcion: "Análisis de accidentes e incidentes",
    tipo:  "MENSUAL",
    ultimaGeneracion: "2025-03-01",
  },
  {
    id: 4,
    nombre: "Cumplimiento de Capacitaciones",
    descripcion:  "Estado de charlas e inducciones",
    tipo: "MENSUAL",
    ultimaGeneracion: "2025-03-01",
  },
  {
    id: 5,
    nombre: "Informe para Mandante",
    descripcion: "Reporte ejecutivo para presentar al mandante",
    tipo:  "MENSUAL",
    ultimaGeneracion: "2025-03-01",
  },
];

const KPI_DATA = [
  { nombre: "Tasa de Accidentabilidad", valor: "0.5%", tendencia: "down", meta: "< 1%", cumple: true },
  { nombre: "Cumplimiento Inducciones", valor: "94%", tendencia: "up", meta: "> 95%", cumple: false },
  { nombre: "Cierre de Observaciones", valor: "87%", tendencia: "up", meta: "> 80%", cumple: true },
  { nombre: "Charlas Realizadas", valor: "18/20", tendencia: "up", meta: "20/mes", cumple: false },
  { nombre: "Inspecciones Completadas", valor: "100%", tendencia: "same", meta: "100%", cumple: true },
  { nombre: "EPP al día", valor: "92%", tendencia: "down", meta: "> 95%", cumple: false },
];

export default function ReportesPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold">Reportes y KPIs</h1>
                <p className="text-muted-foreground">Indicadores y reportes de seguridad</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Seleccionar Período
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar Todo
              </Button>
            </div>
          </div>

          {/* KPIs Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle>Indicadores Clave (KPIs)</CardTitle>
              <CardDescription>Estado actual de indicadores de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {KPI_DATA.map((kpi, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border p-4 ${
                      kpi.cumple ?  "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">{kpi.nombre}</span>
                      {kpi.tendencia === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {kpi.tendencia === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-bold">{kpi.valor}</span>
                      <div className="text-right">
                        <Badge variant={kpi.cumple ?  "default" : "secondary"}>
                          {kpi.cumple ? (
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          Meta: {kpi.meta}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Evolución Mensual</CardTitle>
              <CardDescription>Tendencia de indicadores en el tiempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-16 rounded-lg border-2 border-dashed bg-gray-50">
                <BarChart3 className="h-16 w-16 text-muted-foreground opacity-30" />
                <p className="mt-4 text-muted-foreground">Gráficos de tendencia</p>
                <p className="text-sm text-muted-foreground">(Integración con librería de gráficos pendiente)</p>
              </div>
            </CardContent>
          </Card>

          {/* Lista de reportes */}
          <Card>
            <CardHeader>
              <CardTitle>Reportes Disponibles</CardTitle>
              <CardDescription>Genera y descarga reportes de seguridad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {REPORTES_DISPONIBLES.map((reporte) => (
                  <div
                    key={reporte. id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                        <FileText className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{reporte.nombre}</p>
                          <Badge variant="outline">{reporte.tipo}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{reporte.descripcion}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Última generación: {reporte.ultimaGeneracion}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Excel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}