// src/features/prevencionista/dashboard/DashboardPrevencionista.tsx

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RiskHeatmap } from "@/components/prevencionista/RiskHeatmap";
import { RiskMeter } from "@/components/prevencionista/RiskMeter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { dashboardService } from "@/services/prevencionista/dashboard.service";
import { tokenStorage } from "@/services/tokenStorage";
import type { KpiDashboard, AlertaPrevencionista, EventoAgenda } from "@/types/prevencionista";
import type { User as AuthUser } from "@/types/auth";
import {
  ShieldCheck,
  Users,
  AlertTriangle,
  ClipboardList,
  Calendar,
  HardHat,
  Clock,
  CheckCircle2,
  User,
  Briefcase,
  LogOut,
  PencilLine,
  Search
} from "lucide-react";

import { useNavigate } from "react-router-dom";

type LoadingState = "loading" | "success" | "error";

export default function DashboardPrevencionista() {
  const [kpis, setKpis] = useState<KpiDashboard | null>(null);
  const [alertas, setAlertas] = useState<AlertaPrevencionista[]>([]);
  const [agenda, setAgenda] = useState<EventoAgenda[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [authUser] = useState<AuthUser | null>(() => tokenStorage.getUser());



  const [searchRut, setSearchRut] = useState("");
  const [showRiskMap, setShowRiskMap] = useState(false);
  const [showRiskMeter, setShowRiskMeter] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchRut.trim()) {
      navigate(`/prevencionista/trabajador/${searchRut.trim()}`);
    }
  };

  const profile = useMemo(() => {
    const defaultInitials = "PR";
    const initialsFromUser = authUser
      ? `${authUser.first_name?.charAt(0) ?? ""}${authUser.last_name?.charAt(0) ?? ""}`.trim()
      : "";

    const safeInitials = initialsFromUser
      ? initialsFromUser.toUpperCase()
      : authUser?.email?.charAt(0).toUpperCase() ?? defaultInitials;

    const fullName = authUser
      ? `${authUser.first_name ?? ""} ${authUser.last_name ?? ""}`.trim() || authUser.email
      : "Prevencionista Obra Viva";

    const roleLabel = authUser?.role === "PREVENCIONISTA"
      ? "Prevencionista"
      : authUser?.role ?? "Supervisor";

    const functionLabel = authUser?.role === "PREVENCIONISTA"
      ? "Prevencionista HSE"
      : "Coordinador de Seguridad";

    return {
      name: fullName,
      initials: safeInitials,
      role: roleLabel,
      functionName: functionLabel,
      status: authUser ? "Activo" : "Invitado",
    };
  }, [authUser]);

  const handleLogout = () => {
    tokenStorage.clear();
    navigate("/login");
  };

  const obraId = 1; // TODO: Obtener de contexto/ruta

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingState("loading");
        const [kpisData, alertasData, agendaData] = await Promise.all([
          dashboardService.getKpis(obraId),
          dashboardService.getAlertas(obraId),
          dashboardService.getAgendaHoy(obraId),
        ]);
        setKpis(kpisData);
        setAlertas(alertasData);
        setAgenda(agendaData);
        setLoadingState("success");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar datos");
        setLoadingState("error");
      }
    }
    fetchData();
  }, [obraId]);

  if (loadingState === "loading") {
    return <DashboardSkeleton />;
  }

  if (loadingState === "error") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-slate-600 shadow-sm">
            {profile.initials ? (
              <span className="text-xl font-semibold">{profile.initials}</span>
            ) : (
              <User className="h-6 w-6" />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{profile.name}</h1>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <HardHat className="h-4 w-4" /> {profile.role}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {profile.functionName}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-600" /> {profile.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button
            onClick={() => setShowRiskMeter(true)}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg shadow-orange-500/30 border-none animate-in fade-in zoom-in duration-300"
          >
            ⚠️ Riesgómetro en Vivo
          </Button>
          <Button
            onClick={() => setShowRiskMap(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-amber-500/30 border-none"
          >
            🔥 Ver Mapa de Riesgos
          </Button>
          <Badge variant="secondary" className="px-3 py-1 bg-green-50 text-green-700 border-green-200">
            Activo en obra
          </Badge>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center gap-2 border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" /> Cerrar Sesión
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow hover:from-emerald-600 hover:to-green-700">
            <PencilLine className="h-4 w-4" /> Editar Perfil
          </Button>
        </div>
      </div>

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold">Dashboard Prevencionista</h1>
            <p className="text-muted-foreground">Resumen de seguridad de la obra</p>
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar trabajador por RUT..."
            className="pl-8"
            value={searchRut}
            onChange={(e) => setSearchRut(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* KPIs Grid */}
      {kpis && <KpisGrid kpis={kpis} />}

      {/* Alertas y Agenda */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AlertasCard alertas={alertas} />
        <AgendaCard agenda={agenda} />
      </div>

      <Dialog open={showRiskMap} onOpenChange={setShowRiskMap}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Mapa de Calor de Riesgos - Obra Las Peñas</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <RiskHeatmap />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRiskMeter} onOpenChange={setShowRiskMeter}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Monitor de Riesgo en Tiempo Real</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <RiskMeter />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function KpisGrid({ kpis }: { kpis: KpiDashboard }) {
  const kpiItems = [
    {
      label: "Días sin accidentes",
      value: kpis.dias_sin_accidentes,
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      highlight: kpis.dias_sin_accidentes > 30,
    },
    {
      label: "Trabajadores activos",
      value: kpis.trabajadores_activos,
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "Riesgos críticos",
      value: kpis.riesgos_criticos_activos,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      alert: kpis.riesgos_criticos_activos > 0,
    },
    {
      label: "Observaciones pendientes",
      value: kpis.observaciones_pendientes,
      icon: <ClipboardList className="h-5 w-5 text-orange-600" />,
      alert: kpis.observaciones_pendientes > 10,
    },
    {
      label: "EPP vencidos",
      value: kpis.epp_vencidos,
      icon: <HardHat className="h-5 w-5 text-yellow-600" />,
      alert: kpis.epp_vencidos > 0,
    },
    {
      label: "Charlas este mes",
      value: kpis.charlas_mes_actual,
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpiItems.map((item, idx) => (
        <Card key={idx} className={item.alert ? "border-red-300 bg-red-50" : item.highlight ? "border-green-300 bg-green-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {item.icon}
              <span className={`text-2xl font-bold ${item.alert ? "text-red-600" : ""}`}>
                {item.value}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{item.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AlertasCard({ alertas }: { alertas: AlertaPrevencionista[] }) {
  const nivelVariant: Record<string, "destructive" | "default" | "secondary"> = {
    CRITICO: "destructive",
    ALTO: "destructive",
    MEDIO: "default",
    BAJO: "secondary",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Alertas Activas
        </CardTitle>
        <CardDescription>Situaciones que requieren atención</CardDescription>
      </CardHeader>
      <CardContent>
        {alertas.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay alertas activas 🎉</p>
        ) : (
          <div className="space-y-3">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="flex items-start gap-3 rounded-lg border p-3">
                <Badge variant={nivelVariant[alerta.nivel]}>{alerta.nivel}</Badge>
                <div className="flex-1">
                  <p className="font-medium">{alerta.titulo}</p>
                  <p className="text-sm text-muted-foreground">{alerta.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AgendaCard({ agenda }: { agenda: EventoAgenda[] }) {
  const estadoColors: Record<string, string> = {
    PROGRAMADO: "bg-blue-100 text-blue-800",
    EN_CURSO: "bg-yellow-100 text-yellow-800",
    COMPLETADO: "bg-green-100 text-green-800",
    CANCELADO: "bg-gray-100 text-gray-800",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Agenda de Hoy
        </CardTitle>
        <CardDescription>Actividades programadas</CardDescription>
      </CardHeader>
      <CardContent>
        {agenda.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay actividades programadas</p>
        ) : (
          <div className="space-y-3">
            {agenda.map((evento) => (
              <div key={evento.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex flex-col items-center">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">{evento.hora_inicio}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{evento.titulo}</p>
                  {evento.ubicacion && (
                    <p className="text-xs text-muted-foreground">{evento.ubicacion}</p>
                  )}
                </div>
                <Badge className={estadoColors[evento.estado]}>{evento.estado}</Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded" />
        <div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-1 h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="mt-2 h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}