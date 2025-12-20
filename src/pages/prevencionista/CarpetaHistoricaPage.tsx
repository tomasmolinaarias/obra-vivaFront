// src/pages/prevencionista/CarpetaHistoricaPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Search, User, FileText, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

// Mock data para demostración
const MOCK_TRABAJADORES_BUSQUEDA = [
  {
    id: 101,
    rut: "12. 345.678-9",
    nombre: "Juan Carlos Pérez González",
    empresa: "Constructora ABC",
    cargo: "Maestro Albañil",
    estado: "APTO" as const,
    documentos_completados: 6,
    documentos_total:  6,
    fecha_ingreso: "2025-01-15",
  },
  {
    id:  102,
    rut:  "11.222.333-4",
    nombre: "María Elena Soto Muñoz",
    empresa: "Eléctricos DEF",
    cargo: "Electricista",
    estado: "APTO" as const,
    documentos_completados: 7,
    documentos_total:  7,
    fecha_ingreso: "2025-02-01",
  },
  {
    id: 103,
    rut: "15.666.777-8",
    nombre: "Pedro Antonio Rojas Silva",
    empresa: "Constructora ABC",
    cargo: "Jornal",
    estado: "NO_APTO" as const,
    documentos_completados: 4,
    documentos_total:  6,
    fecha_ingreso:  "2025-03-10",
  },
];

export default function CarpetaHistoricaPage() {
  const [busqueda, setBusqueda] = useState("");
  const [selectedTrabajador, setSelectedTrabajador] = useState<typeof MOCK_TRABAJADORES_BUSQUEDA[0] | null>(null);

  const trabajadoresFiltrados = MOCK_TRABAJADORES_BUSQUEDA.filter(
    (t) =>
      t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.rut.includes(busqueda)
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <FolderOpen className="h-8 w-8 text-amber-600" />
            <div>
              <h1 className="text-2xl font-bold">Carpeta Histórica</h1>
              <p className="text-muted-foreground">Documentación completa por trabajador</p>
            </div>
          </div>

          {/* Buscador */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Buscar Trabajador</CardTitle>
              <CardDescription>Busca por nombre o RUT</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Ej: 12.345.678-9 o Juan Pérez"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Buscar</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista de trabajadores */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resultados</CardTitle>
                </CardHeader>
                <CardContent>
                  {trabajadoresFiltrados.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No se encontraron trabajadores
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {trabajadoresFiltrados.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTrabajador(t)}
                          className={`cursor-pointer rounded-lg border p-3 transition-all ${
                            selectedTrabajador?. id === t.id
                              ? "ring-2 ring-blue-500 bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                              <User className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{t. nombre}</p>
                              <p className="text-xs text-muted-foreground">{t.rut}</p>
                            </div>
                            <Badge
                              variant={t.estado === "APTO" ? "default" : "destructive"}
                            >
                              {t.estado}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Detalle de carpeta */}
            <div className="lg:col-span-2">
              {selectedTrabajador ?  (
                <CarpetaDetalle trabajador={selectedTrabajador} />
              ) : (
                <Card className="h-full">
                  <CardContent className="flex h-full min-h-[400px] items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <FolderOpen className="mx-auto h-16 w-16 opacity-30" />
                      <p className="mt-4">Selecciona un trabajador para ver su carpeta histórica</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CarpetaDetalle({ trabajador }: { trabajador: typeof MOCK_TRABAJADORES_BUSQUEDA[0] }) {
  const secciones = [
    {
      titulo: "Documentos de Ingreso",
      icon: FileText,
      items: [
        { nombre: "Contrato de trabajo", estado: "firmado", fecha: "2025-01-15" },
        { nombre:  "Inducción de obra", estado: "firmado", fecha: "2025-01-15" },
        { nombre: "Reglamento interno", estado: "firmado", fecha: "2025-01-15" },
        { nombre: "Entrega de EPP", estado: trabajador.estado === "APTO" ? "firmado" : "pendiente", fecha: trabajador.estado === "APTO" ? "2025-01-15" :  null },
        { nombre: "Declaración de riesgos", estado: trabajador. estado === "APTO" ?  "firmado" : "pendiente", fecha: trabajador.estado === "APTO" ? "2025-01-15" : null },
        { nombre: "Examen preocupacional", estado: "firmado", fecha: "2025-01-14" },
      ],
    },
    {
      titulo: "Charlas de Seguridad",
      icon: Calendar,
      items: [
        { nombre: "Charla 5 min - Trabajo en altura", estado: "asistió", fecha: "2025-03-15" },
        { nombre: "Charla 5 min - Uso de EPP", estado: "asistió", fecha: "2025-03-10" },
        { nombre: "Charla 5 min - Orden y aseo", estado: "asistió", fecha: "2025-03-05" },
      ],
    },
    {
      titulo: "AST/ART Firmados",
      icon: FileText,
      items: [
        { nombre: "AST-001 - Excavación manual", estado: "firmado", fecha: "2025-03-12" },
        { nombre: "AST-002 - Hormigonado losa", estado: "firmado", fecha: "2025-03-08" },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{trabajador.nombre}</CardTitle>
            <CardDescription>
              {trabajador. rut} • {trabajador.empresa} • {trabajador.cargo}
            </CardDescription>
          </div>
          <Badge variant={trabajador.estado === "APTO" ? "default" : "destructive"} className="text-base px-3 py-1">
            {trabajador.estado}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resumen */}
        <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {trabajador.documentos_completados}/{trabajador.documentos_total}
            </p>
            <p className="text-xs text-muted-foreground">Documentos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-xs text-muted-foreground">Charlas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">2</p>
            <p className="text-xs text-muted-foreground">AST Firmados</p>
          </div>
        </div>

        {/* Secciones */}
        {secciones.map((seccion, idx) => (
          <div key={idx}>
            <h4 className="flex items-center gap-2 font-semibold mb-3">
              <seccion.icon className="h-4 w-4" />
              {seccion.titulo}
            </h4>
            <div className="space-y-2">
              {seccion.items. map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-center justify-between rounded border p-2"
                >
                  <div className="flex items-center gap-2">
                    {item.estado === "firmado" || item.estado === "asistió" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">{item.nombre}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.fecha || "Pendiente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Acciones */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" className="flex-1">
            Descargar Carpeta (PDF)
          </Button>
          <Button variant="outline" className="flex-1">
            Descargar Carpeta (ZIP)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}