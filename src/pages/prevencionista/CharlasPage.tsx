// src/pages/prevencionista/CharlasPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Plus, 
  Calendar,
  Users,
  Clock,
  CheckCircle2
} from "lucide-react";

const MOCK_CHARLAS = [
  {
    id: 1,
    tipo: "5_MINUTOS",
    tema: "Trabajo en altura - Uso correcto del arnés",
    fecha: "2025-03-20",
    hora: "07:30",
    expositor: "Juan Prevencionista",
    asistentes: 15,
    total_esperado: 18,
    duracion: 5,
  },
  {
    id:  2,
    tipo: "5_MINUTOS",
    tema: "Orden y aseo en el área de trabajo",
    fecha: "2025-03-19",
    hora: "07:30",
    expositor: "Juan Prevencionista",
    asistentes: 22,
    total_esperado:  22,
    duracion: 5,
  },
  {
    id: 3,
    tipo: "CAPACITACION",
    tema: "Primeros auxilios básicos",
    fecha: "2025-03-18",
    hora: "14:00",
    expositor:  "Mutual ACHS",
    asistentes:  35,
    total_esperado:  40,
    duracion: 60,
  },
];

const TEMAS_SUGERIDOS = [
  "Uso correcto de EPP",
  "Prevención de caídas",
  "Manejo manual de cargas",
  "Riesgos eléctricos",
  "Orden y limpieza",
  "Señalización de seguridad",
];

export default function CharlasPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-teal-600" />
              <div>
                <h1 className="text-2xl font-bold">Charlas de Seguridad</h1>
                <p className="text-muted-foreground">Charlas 5 minutos y capacitaciones</p>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Registrar Charla
            </Button>
          </div>

          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-teal-600">18</p>
                <p className="text-sm text-muted-foreground">Charlas este mes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-600">94%</p>
                <p className="text-sm text-muted-foreground">Asistencia promedio</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">320</p>
                <p className="text-sm text-muted-foreground">Asistencias registradas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">12</p>
                <p className="text-sm text-muted-foreground">Temas diferentes</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Lista de charlas */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Charlas Recientes</CardTitle>
                  <CardDescription>Últimas charlas registradas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_CHARLAS.map((charla) => (
                      <div
                        key={charla.id}
                        className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                            charla.tipo === "5_MINUTOS" ?  "bg-teal-100" : "bg-purple-100"
                          }`}>
                            <MessageSquare className={`h-6 w-6 ${
                              charla.tipo === "5_MINUTOS" ? "text-teal-600" :  "text-purple-600"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant={charla.tipo === "5_MINUTOS" ? "secondary" : "default"}>
                                {charla.tipo === "5_MINUTOS" ?  "5 Minutos" : "Capacitación"}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                <Clock className="inline h-3 w-3 mr-1" />
                                {charla.duracion} min
                              </span>
                            </div>
                            <p className="font-medium mt-1">{charla.tema}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {charla.fecha} {charla.hora}
                              </span>
                              <span>Expositor: {charla.expositor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {charla.asistentes}/{charla.total_esperado}
                            </span>
                            {charla.asistentes === charla.total_esperado && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round((charla.asistentes / charla.total_esperado) * 100)}% asistencia
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Ver Detalle
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Temas sugeridos */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Temas Sugeridos</CardTitle>
                  <CardDescription>Ideas para charlas 5 minutos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {TEMAS_SUGERIDOS.map((tema, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-start text-left h-auto py-2"
                      >
                        <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{tema}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}