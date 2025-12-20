// src/pages/prevencionista/DocumentosSeguridadPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Download, 
  Eye, 
  Clock,
  CheckCircle2,
  AlertCircle,
  History
} from "lucide-react";

const MOCK_DOCUMENTOS = [
  {
    id:  1,
    tipo: "PSST",
    codigo: "PSST-001",
    nombre: "Plan de Seguridad y Salud en el Trabajo",
    version: 3,
    estado: "VIGENTE",
    fecha_vigencia: "2025-12-31",
    autor: "Juan Prevencionista",
    ultima_revision: "2025-01-15",
  },
  {
    id:  2,
    tipo: "IPER",
    codigo: "IPER-001",
    nombre: "Matriz de Identificación de Peligros y Evaluación de Riesgos",
    version: 5,
    estado: "REVISION",
    fecha_vigencia: "2025-06-30",
    autor: "Juan Prevencionista",
    ultima_revision: "2024-12-20",
  },
  {
    id: 3,
    tipo: "PTS",
    codigo: "PTS-001",
    nombre: "Procedimiento de Trabajo Seguro - Excavaciones",
    version: 2,
    estado: "VIGENTE",
    fecha_vigencia:  "2025-12-31",
    autor: "Juan Prevencionista",
    ultima_revision: "2025-02-01",
  },
  {
    id: 4,
    tipo: "PTS",
    codigo: "PTS-002",
    nombre:  "Procedimiento de Trabajo Seguro - Trabajo en Altura",
    version:  1,
    estado: "BORRADOR",
    fecha_vigencia: null,
    autor: "Juan Prevencionista",
    ultima_revision: "2025-03-15",
  },
];

const TIPOS_DOCUMENTO = [
  { tipo: "PSST", nombre:  "Plan de Seguridad", color: "bg-blue-100 text-blue-800" },
  { tipo: "IPER", nombre: "Matriz IPER", color: "bg-purple-100 text-purple-800" },
  { tipo: "PTS", nombre: "Procedimiento", color: "bg-green-100 text-green-800" },
];

export default function DocumentosSeguridadPage() {
  const estadoBadge = {
    VIGENTE: { variant: "default" as const, icon: CheckCircle2 },
    REVISION: { variant: "secondary" as const, icon: Clock },
    BORRADOR: { variant: "outline" as const, icon: AlertCircle },
    OBSOLETO: { variant: "destructive" as const, icon: AlertCircle },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">Documentos de Seguridad</h1>
                <p className="text-muted-foreground">PSST, IPER, PTS y procedimientos</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Documento
            </Button>
          </div>

          {/* Resumen por tipo */}
          <div className="grid gap-4 md:grid-cols-3">
            {TIPOS_DOCUMENTO.map((tipo) => {
              const cantidad = MOCK_DOCUMENTOS. filter((d) => d.tipo === tipo. tipo).length;
              return (
                <Card key={tipo. tipo}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-xs font-medium px-2 py-1 rounded ${tipo.color}`}>
                          {tipo.tipo}
                        </p>
                        <p className="text-sm mt-2">{tipo.nombre}</p>
                      </div>
                      <p className="text-3xl font-bold">{cantidad}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Lista de documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Documentos Registrados</CardTitle>
              <CardDescription>
                Control de versiones y vigencia de documentos de seguridad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {MOCK_DOCUMENTOS.map((doc) => {
                  const estado = estadoBadge[doc.estado as keyof typeof estadoBadge];
                  const IconEstado = estado.icon;
                  const tipoInfo = TIPOS_DOCUMENTO.find((t) => t.tipo === doc.tipo);

                  return (
                    <div
                      key={doc. id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                          <FileText className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded ${tipoInfo?. color}`}>
                              {doc.codigo}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              v{doc.version}
                            </Badge>
                          </div>
                          <p className="font-medium mt-1">{doc.nombre}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Autor: {doc.autor} • Última revisión: {doc. ultima_revision}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge variant={estado.variant}>
                            <IconEstado className="mr-1 h-3 w-3" />
                            {doc.estado}
                          </Badge>
                          {doc.fecha_vigencia && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Vigente hasta: {doc.fecha_vigencia}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" title="Ver documento">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Historial">
                            <History className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Descargar PDF">
                            <Download className="h-4 w-4" />
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