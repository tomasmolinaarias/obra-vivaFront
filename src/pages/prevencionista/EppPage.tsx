// src/pages/prevencionista/EppPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  HardHat, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  User
} from "lucide-react";
import { useState } from "react";

const MOCK_EPP = [
  {
    id: 1,
    trabajador_nombre: "Juan Carlos Pérez",
    trabajador_rut:  "12.345.678-9",
    tipo:  "CASCO",
    descripcion: "Casco de seguridad 3M H-700",
    fecha_entrega: "2025-01-15",
    fecha_vencimiento: "2026-01-15",
    estado: "VIGENTE" as const,
    dias_restantes: 392,
  },
  {
    id:  2,
    trabajador_nombre: "Juan Carlos Pérez",
    trabajador_rut: "12.345.678-9",
    tipo: "ARNES",
    descripcion: "Arnés de seguridad completo",
    fecha_entrega: "2025-01-15",
    fecha_vencimiento: "2025-04-15",
    estado: "POR_VENCER" as const,
    dias_restantes: 26,
  },
  {
    id: 3,
    trabajador_nombre: "María Elena Soto",
    trabajador_rut: "11.222.333-4",
    tipo: "GUANTES",
    descripcion: "Guantes dieléctricos clase 00",
    fecha_entrega:  "2024-06-01",
    fecha_vencimiento: "2025-03-01",
    estado: "VENCIDO" as const,
    dias_restantes: -19,
  },
  {
    id: 4,
    trabajador_nombre: "Pedro Rojas",
    trabajador_rut: "15.666.777-8",
    tipo:  "ZAPATOS_SEGURIDAD",
    descripcion:  "Zapatos punta acero",
    fecha_entrega: "2025-02-01",
    fecha_vencimiento: "2026-02-01",
    estado: "VIGENTE" as const,
    dias_restantes: 409,
  },
];

const ALERTAS_EPP = [
  { tipo: "VENCIDO", cantidad: 3, mensaje: "EPP vencidos requieren reemplazo inmediato" },
  { tipo: "POR_VENCER", cantidad:  5, mensaje: "EPP vencen en los próximos 30 días" },
  { tipo: "NO_ASIGNADO", cantidad: 2, mensaje: "Trabajadores sin EPP completo asignado" },
];

export default function EppPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null);

  const eppFiltrado = MOCK_EPP.filter((epp) => {
    const matchBusqueda =
      epp.trabajador_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      epp.trabajador_rut. includes(busqueda) ||
      epp.tipo. toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = ! filtroEstado || epp. estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  const estadoColors = {
    VIGENTE:  "bg-green-100 text-green-800 border-green-200",
    POR_VENCER: "bg-yellow-100 text-yellow-800 border-yellow-200",
    VENCIDO: "bg-red-100 text-red-800 border-red-200",
    NO_ASIGNADO: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardHat className="h-8 w-8 text-yellow-600" />
              <div>
                <h1 className="text-2xl font-bold">Gestión de EPP</h1>
                <p className="text-muted-foreground">Control de equipos de protección personal</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Asignar EPP
            </Button>
          </div>

          {/* Alertas */}
          <div className="grid gap-4 md:grid-cols-3">
            {ALERTAS_EPP.map((alerta, idx) => (
              <Card
                key={idx}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  alerta.tipo === "VENCIDO"
                    ? "border-red-200 bg-red-50"
                    : alerta.tipo === "POR_VENCER"
                    ?  "border-yellow-200 bg-yellow-50"
                    : "border-gray-200"
                }`}
                onClick={() => setFiltroEstado(filtroEstado === alerta.tipo ? null : alerta.tipo)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle
                      className={`h-8 w-8 ${
                        alerta.tipo === "VENCIDO"
                          ? "text-red-500"
                          : alerta.tipo === "POR_VENCER"
                          ?  "text-yellow-500"
                          : "text-gray-500"
                      }`}
                    />
                    <div>
                      <p className="text-2xl font-bold">{alerta.cantidad}</p>
                      <p className="text-xs text-muted-foreground">{alerta.mensaje}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filtros y búsqueda */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por trabajador, RUT o tipo de EPP..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {["VIGENTE", "POR_VENCER", "VENCIDO"]. map((estado) => (
                    <Button
                      key={estado}
                      variant={filtroEstado === estado ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFiltroEstado(filtroEstado === estado ? null :  estado)}
                    >
                      {estado. replace("_", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de EPP */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de EPP Asignados</CardTitle>
              <CardDescription>
                {eppFiltrado.length} registros encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eppFiltrado.map((epp) => (
                  <div
                    key={epp.id}
                    className={`flex items-center justify-between rounded-lg border p-4 ${estadoColors[epp.estado]}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                        <HardHat className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{epp.tipo. replace("_", " ")}</p>
                        <p className="text-sm text-muted-foreground">{epp.descripcion}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <User className="h-3 w-3" />
                          <span className="text-xs">
                            {epp.trabajador_nombre} ({epp.trabajador_rut})
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          epp.estado === "VIGENTE"
                            ? "default"
                            : epp.estado === "VENCIDO"
                            ?  "destructive"
                            :  "secondary"
                        }
                      >
                        {epp. estado === "VIGENTE" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {epp.estado === "POR_VENCER" && <Clock className="mr-1 h-3 w-3" />}
                        {epp.estado === "VENCIDO" && <AlertTriangle className="mr-1 h-3 w-3" />}
                        {epp.estado}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Vence: {epp.fecha_vencimiento}
                      </p>
                      {epp.estado !== "VIGENTE" && (
                        <p className="text-xs font-medium mt-1">
                          {epp.dias_restantes > 0
                            ? `${epp.dias_restantes} días restantes`
                            : `Vencido hace ${Math.abs(epp.dias_restantes)} días`}
                        </p>
                      )}
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