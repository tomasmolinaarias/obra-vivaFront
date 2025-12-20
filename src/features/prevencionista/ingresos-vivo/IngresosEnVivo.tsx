// src/features/prevencionista/ingresos-vivo/IngresosEnVivo.tsx

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ingresosService } from "@/services/prevencionista/ingresos.service";
import type { IngresoObra, DocumentoIngreso, NotificacionIngreso } from "@/types/trabajador";
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileText,
  Eye,
  Send,
  User,
  Building
} from "lucide-react";

const POLL_INTERVAL = 5000; // 5 segundos

export default function IngresosEnVivo() {
  const [ingresosEnProceso, setIngresosEnProceso] = useState<IngresoObra[]>([]);
  const [ingresosCompletados, setIngresosCompletados] = useState<IngresoObra[]>([]);
  const [notificaciones, setNotificaciones] = useState<NotificacionIngreso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIngreso, setSelectedIngreso] = useState<IngresoObra | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date().toISOString());

  const obraId = 1; // TODO: Obtener de contexto/ruta

  const fetchData = useCallback(async () => {
    try {
      const [enProceso, completados] = await Promise.all([
        ingresosService.getIngresosEnProceso(obraId),
        ingresosService.getIngresosCompletadosHoy(obraId),
      ]);
      setIngresosEnProceso(enProceso);
      setIngresosCompletados(completados);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, [obraId]);

  // Polling para actualizaciones
  useEffect(() => {
    fetchData();

    const pollInterval = setInterval(async () => {
      try {
        const updates = await ingresosService.pollActualizaciones(obraId, lastUpdate);
        if (updates.length > 0) {
          setNotificaciones((prev) => [...updates, ...prev].slice(0, 10));
          setLastUpdate(new Date().toISOString());
          // Refrescar datos
          fetchData();
        }
      } catch {
        // Silenciar errores de polling
      }
    }, POLL_INTERVAL);

    return () => clearInterval(pollInterval);
  }, [obraId, lastUpdate, fetchData]);

  if (loading) {
    return <IngresosSkeleton />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Ingresos en Vivo</h1>
            <p className="text-muted-foreground">Control de ingreso de trabajadores</p>
          </div>
        </div>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualizar
        </Button>
      </div>

      {/* Notificaciones recientes */}
      {notificaciones.length > 0 && (
        <NotificacionesBanner notificaciones={notificaciones} />
      )}

      {/* Grid principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tabla de ingresos en proceso */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Ingresos en Proceso
                <Badge variant="secondary">{ingresosEnProceso.length}</Badge>
              </CardTitle>
              <CardDescription>Trabajadores completando documentación</CardDescription>
            </CardHeader>
            <CardContent>
              {ingresosEnProceso.length === 0 ? (
                <EmptyState message="No hay ingresos en proceso" />
              ) : (
                <div className="space-y-3">
                  {ingresosEnProceso.map((ingreso) => (
                    <IngresoCard
                      key={ingreso.id}
                      ingreso={ingreso}
                      onSelect={() => setSelectedIngreso(ingreso)}
                      isSelected={selectedIngreso?.id === ingreso.id}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ingresos completados hoy */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Completados Hoy
                <Badge variant="default">{ingresosCompletados.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ingresosCompletados.length === 0 ? (
                <EmptyState message="Aún no hay ingresos completados hoy" />
              ) : (
                <div className="space-y-2">
                  {ingresosCompletados.map((ingreso) => (
                    <IngresoCompletadoRow key={ingreso.id} ingreso={ingreso} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel de detalle */}
        <div>
          <DetalleIngresoPanel ingreso={selectedIngreso} />
        </div>
      </div>
    </div>
  );
}

function IngresoCard({
  ingreso,
  onSelect,
  isSelected,
}: {
  ingreso: IngresoObra;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const porcentaje = Math.round((ingreso.progreso.firmados / ingreso.progreso.total) * 100);

  const estadoColor = {
    EN_PROCESO: "bg-yellow-100 border-yellow-300",
    COMPLETADO: "bg-green-100 border-green-300",
    BLOQUEADO: "bg-red-100 border-red-300",
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg border p-4 transition-all ${isSelected ? "ring-2 ring-blue-500" : ""
        } ${estadoColor[ingreso.estado]}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold">
              {ingreso.trabajador.nombres} {ingreso.trabajador.apellidos}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-3 w-3" />
              {ingreso.trabajador.empresa_contratista}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">
            {ingreso.progreso.firmados}/{ingreso.progreso.total}
          </div>
          <div className="text-xs text-muted-foreground">{porcentaje}%</div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full transition-all ${ingreso.progreso.criticos_faltantes > 0 ? "bg-orange-500" : "bg-green-500"
            }`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {ingreso.progreso.criticos_faltantes > 0 && (
        <p className="mt-2 flex items-center gap-1 text-xs text-orange-600">
          <AlertCircle className="h-3 w-3" />
          {ingreso.progreso.criticos_faltantes} documento(s) crítico(s) pendiente(s)
        </p>
      )}
    </div>
  );
}

function IngresoCompletadoRow({ ingreso }: { ingreso: IngresoObra }) {
  const horaFin = ingreso.hora_fin ? new Date(ingreso.hora_fin).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }) : "-";

  return (
    <div className="flex items-center justify-between rounded border bg-green-50 p-3">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-medium">
            {ingreso.trabajador.nombres} {ingreso.trabajador.apellidos}
          </p>
          <p className="text-xs text-muted-foreground">
            {ingreso.trabajador.empresa_contratista} • {ingreso.trabajador.cargo}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default">APTO</Badge>
        <span className="text-sm text-muted-foreground">{horaFin}</span>
      </div>
    </div>
  );
}

// src/features/prevencionista/ingresos-vivo/IngresosEnVivo.tsx
// CONTINUACIÓN - Agregar después de donde quedó cortado

function DetalleIngresoPanel({ ingreso }: { ingreso: IngresoObra | null }) {
  if (!ingreso) {
    return (
      <Card className="h-full">
        <CardContent className="flex h-full min-h-[400px] items-center justify-center p-6">
          <div className="text-center text-muted-foreground">
            <Eye className="mx-auto h-12 w-12 opacity-50" />
            <p className="mt-2">Selecciona un trabajador para ver el detalle</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalle de Ingreso</CardTitle>
        <CardDescription>
          {ingreso.trabajador.nombres} {ingreso.trabajador.apellidos}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Info del trabajador */}
        <div className="mb-4 space-y-2 rounded-lg bg-gray-50 p-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">RUT:</span>
            <span className="font-medium">{ingreso.trabajador.rut}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cargo:</span>
            <span className="font-medium">{ingreso.trabajador.cargo}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Empresa:</span>
            <span className="font-medium">{ingreso.trabajador.empresa_contratista}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Inicio:</span>
            <span className="font-medium">
              {new Date(ingreso.hora_inicio).toLocaleTimeString("es-CL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Checklist de documentos */}
        <h4 className="mb-3 font-semibold">Documentos de Ingreso</h4>
        <div className="space-y-2">
          {ingreso.documentos.map((doc) => (
            <DocumentoRow key={doc.id} documento={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentoRow({ documento }: { documento: DocumentoIngreso }) {
  const semaforo = ingresosService.getEstadoSemaforo(documento.estado);

  const semaforoStyles = {
    verde: "bg-green-500",
    amarillo: "bg-yellow-500",
    rojo: "bg-red-500",
  };

  const estadoBadgeVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    FIRMADO: "default",
    PENDIENTE: "secondary",
    FIRMANDO: "outline",
    OBSERVADO: "destructive",
    RECHAZADO: "destructive",
    VENCIDO: "destructive",
  };

  return (
    <div className="flex items-center gap-3 rounded border p-2">
      {/* Semáforo */}
      <div className={`h-3 w-3 rounded-full ${semaforoStyles[semaforo as keyof typeof semaforoStyles]}`} />

      {/* Info del documento */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-sm font-medium truncate">{documento.nombre}</span>
          {documento.es_critico && (
            <Badge variant="outline" className="text-xs flex-shrink-0">
              Crítico
            </Badge>
          )}
        </div>
        {documento.fecha_firma && (
          <p className="text-xs text-muted-foreground mt-1">
            Firmado:  {new Date(documento.fecha_firma).toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>

      {/* Estado */}
      <Badge variant={estadoBadgeVariant[documento.estado]} className="flex-shrink-0">
        {documento.estado}
      </Badge>

      {/* Acciones */}
      {documento.estado === "PENDIENTE" && (
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          title="Reenviar"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implementar reenvío
            console.log("Reenviar documento:", documento.id);
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

function NotificacionesBanner({ notificaciones }: { notificaciones: NotificacionIngreso[] }) {
  const ultimaNotificacion = notificaciones[0];

  if (!ultimaNotificacion) return null;

  const tipoStyles = {
    DOCUMENTO_FIRMADO: "bg-blue-50 border-blue-200 text-blue-800",
    INGRESO_COMPLETADO: "bg-green-50 border-green-200 text-green-800",
    DOCUMENTO_RECHAZADO: "bg-red-50 border-red-200 text-red-800",
  };

  const tipoIcons = {
    DOCUMENTO_FIRMADO: <FileText className="h-4 w-4" />,
    INGRESO_COMPLETADO: <CheckCircle2 className="h-4 w-4" />,
    DOCUMENTO_RECHAZADO: <AlertCircle className="h-4 w-4" />,
  };

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border p-3 ${tipoStyles[ultimaNotificacion.tipo]
        }`}
    >
      {tipoIcons[ultimaNotificacion.tipo]}
      <div className="flex-1">
        <p className="text-sm font-medium">{ultimaNotificacion.trabajador_nombre}</p>
        <p className="text-xs">{ultimaNotificacion.mensaje}</p>
      </div>
      <span className="text-xs opacity-70">
        {new Date(ultimaNotificacion.timestamp).toLocaleTimeString("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      {notificaciones.length > 1 && (
        <Badge variant="secondary">+{notificaciones.length - 1}</Badge>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Users className="h-12 w-12 text-muted-foreground opacity-50" />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function IngresosSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8" />
        <div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-1 h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}