// src/pages/prevencionista/AstPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileSignature, 
  Plus, 
  Calendar,
  Users,
  AlertTriangle
  // CheckCircle2 y Clock eliminados - no se usan
} from "lucide-react";

const MOCK_AST = [
  {
    id: 1,
    codigo: "AST-2025-001",
    actividad: "Excavación manual para fundaciones",
    area: "Sector B",
    fecha: "2025-03-20",
    supervisor: "Carlos Supervisor",
    estado: "ACTIVO",
    trabajadores_firmados: 5,
    trabajadores_total: 6,
    riesgos: ["Derrumbe", "Golpes", "Atrapamiento"],
  },
  {
    id:  2,
    codigo: "AST-2025-002",
    actividad: "Hormigonado de losa piso 3",
    area:  "Sector A - Piso 3",
    fecha: "2025-03-19",
    supervisor: "Pedro Supervisor",
    estado: "FIRMADO",
    trabajadores_firmados: 8,
    trabajadores_total:  8,
    riesgos:  ["Caída de altura", "Proyección de partículas", "Sobreesfuerzo"],
  },
  {
    id: 3,
    codigo: "AST-2025-003",
    actividad: "Instalación eléctrica tableros",
    area: "Subterráneo",
    fecha:  "2025-03-21",
    supervisor: "Luis Supervisor",
    estado: "BORRADOR",
    trabajadores_firmados: 0,
    trabajadores_total:  4,
    riesgos:  ["Contacto eléctrico", "Quemaduras"],
  },
];

export default function AstPage() {
  const estadoConfig = {
    BORRADOR: { variant: "outline" as const, color: "text-gray-600" },
    ACTIVO: { variant: "secondary" as const, color: "text-blue-600" },
    FIRMADO: { variant: "default" as const, color: "text-green-600" },
    CERRADO: { variant: "destructive" as const, color: "text-red-600" },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileSignature className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold">AST / ART</h1>
                <p className="text-muted-foreground">Análisis Seguro de Trabajo</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Crear AST
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">12</p>
                <p className="text-sm text-muted-foreground">AST Activos Hoy</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">156</p>
                <p className="text-sm text-muted-foreground">Firmados (mes)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">87</p>
                <p className="text-sm text-muted-foreground">Trabajadores Cubiertos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-orange-600">23</p>
                <p className="text-sm text-muted-foreground">Riesgos Identificados</p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de AST */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Trabajo Recientes</CardTitle>
              <CardDescription>AST/ART creados y en proceso de firma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_AST.map((ast) => {
                  const estado = estadoConfig[ast.estado as keyof typeof estadoConfig];
                  const porcentajeFirmas = Math.round((ast.trabajadores_firmados / ast.trabajadores_total) * 100);

                  return (
                    <div
                      key={ast. id}
                      className="rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{ast.codigo}</Badge>
                            <Badge variant={estado.variant}>{ast.estado}</Badge>
                          </div>
                          <p className="font-semibold">{ast.actividad}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {ast.fecha}
                            </span>
                            <span>{ast.area}</span>
                            <span>Supervisor: {ast.supervisor}</span>
                          </div>
                          
                          {/* Riesgos */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {ast.riesgos.map((riesgo, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-xs text-red-700"
                              >
                                <AlertTriangle className="h-3 w-3" />
                                {riesgo}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Progreso de firmas */}
                        <div className="text-right ml-4">
                          <div className="flex items-center gap-2 justify-end">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {ast.trabajadores_firmados}/{ast.trabajadores_total}
                            </span>
                          </div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
                            <div
                              className={`h-full rounded-full ${
                                porcentajeFirmas === 100 ? "bg-green-500" : "bg-blue-500"
                              }`}
                              style={{ width: `${porcentajeFirmas}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {porcentajeFirmas}% firmado
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Ver Detalle
                          </Button>
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