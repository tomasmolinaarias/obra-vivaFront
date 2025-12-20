// src/pages/prevencionista/EmergenciaPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Siren, 
  Plus,
  Map,
  Users,
  Phone,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Download
} from "lucide-react";

const BRIGADISTAS = [
  { id: 1, nombre: "Carlos Martínez", rol: "JEFE_BRIGADA", telefono: "+56912345678", capacitado: true },
  { id:  2, nombre: "Ana López", rol: "PRIMEROS_AUXILIOS", telefono:  "+56987654321", capacitado: true },
  { id: 3, nombre: "Pedro Soto", rol: "EVACUACION", telefono: "+56911223344", capacitado: true },
  { id: 4, nombre: "María González", rol: "INCENDIO", telefono: "+56955667788", capacitado: false },
];

const TELEFONOS_EMERGENCIA = [
  { nombre: "Bomberos", telefono: "132", tipo: "BOMBEROS" },
  { nombre:  "Ambulancia SAMU", telefono: "131", tipo: "AMBULANCIA" },
  { nombre: "Carabineros", telefono: "133", tipo: "CARABINEROS" },
  { nombre: "Mutual ACHS", telefono: "1404", tipo: "MUTUAL" },
  { nombre: "Jefe de Obra", telefono: "+56912345678", tipo: "INTERNO" },
];

const SIMULACROS = [
  { id: 1, tipo: "SISMO", fecha: "2025-03-15", participantes: 87, resultado: "EXITOSO" },
  { id:  2, tipo: "INCENDIO", fecha: "2025-02-20", participantes: 82, resultado: "CON_OBSERVACIONES" },
  { id:  3, tipo: "EVACUACION", fecha: "2025-01-15", participantes: 75, resultado: "EXITOSO" },
];

export default function EmergenciaPage() {
  const brigadistasCapacitados = BRIGADISTAS. filter(b => b.capacitado).length;

  const rolLabels:  Record<string, string> = {
    JEFE_BRIGADA: "Jefe de Brigada",
    PRIMEROS_AUXILIOS: "Primeros Auxilios",
    EVACUACION: "Evacuación",
    INCENDIO: "Control de Incendio",
    COMUNICACIONES: "Comunicaciones",
  };

  const resultadoConfig = {
    EXITOSO:  { color: "bg-green-100 text-green-800", icon:  CheckCircle2 },
    CON_OBSERVACIONES: { color: "bg-yellow-100 text-yellow-800", icon:  AlertTriangle },
    FALLIDO: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Siren className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold">Plan de Emergencia</h1>
                <p className="text-muted-foreground">Brigadas, simulacros y procedimientos</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar Plan
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Programar Simulacro
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{BRIGADISTAS.length}</p>
                <p className="text-sm text-muted-foreground">Brigadistas</p>
              </CardContent>
            </Card>
            <Card className={brigadistasCapacitados === BRIGADISTAS.length ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{brigadistasCapacitados}/{BRIGADISTAS.length}</p>
                <p className="text-sm text-muted-foreground">Capacitados</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{SIMULACROS.length}</p>
                <p className="text-sm text-muted-foreground">Simulacros (año)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">2</p>
                <p className="text-sm text-muted-foreground">Puntos de encuentro</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Brigadistas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Brigada de Emergencia
                </CardTitle>
                <CardDescription>Personal designado para emergencias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {BRIGADISTAS.map((brigadista) => (
                    <div
                      key={brigadista.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          brigadista.capacitado ? "bg-green-100" : "bg-yellow-100"
                        }`}>
                          <Users className={`h-5 w-5 ${
                            brigadista.capacitado ? "text-green-600" : "text-yellow-600"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{brigadista.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            {rolLabels[brigadista.rol]}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={brigadista.capacitado ? "default" : "secondary"}>
                          {brigadista. capacitado ? "Capacitado" : "Pendiente"}
                        </Badge>
                        <a href={`tel:${brigadista.telefono}`} className="p-2 hover:bg-gray-100 rounded">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Teléfonos de emergencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Teléfonos de Emergencia
                </CardTitle>
                <CardDescription>Contactos importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {TELEFONOS_EMERGENCIA.map((tel, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
                    >
                      <div>
                        <p className="font-medium">{tel. nombre}</p>
                        <p className="text-sm text-muted-foreground">{tel.tipo}</p>
                      </div>
                      <a
                        href={`tel:${tel.telefono}`}
                        className="flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-green-800 font-bold hover:bg-green-200 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        {tel.telefono}
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Simulacros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historial de Simulacros
              </CardTitle>
              <CardDescription>Simulacros realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {SIMULACROS. map((simulacro) => {
                  const resultado = resultadoConfig[simulacro.resultado as keyof typeof resultadoConfig];
                  const IconResultado = resultado.icon;

                  return (
                    <div
                      key={simulacro.id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                          <Siren className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">Simulacro de {simulacro.tipo}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {simulacro.fecha}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {simulacro. participantes} participantes
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={resultado.color}>
                        <IconResultado className="mr-1 h-3 w-3" />
                        {simulacro.resultado. replace("_", " ")}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mapa / Croquis placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Croquis de Evacuación
              </CardTitle>
              <CardDescription>Vías de evacuación y puntos de encuentro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 rounded-lg border-2 border-dashed bg-gray-50">
                <Map className="h-16 w-16 text-muted-foreground opacity-30" />
                <p className="mt-4 text-muted-foreground">Croquis de evacuación</p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Subir Croquis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}