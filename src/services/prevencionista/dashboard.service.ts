// src/services/prevencionista/dashboard.service.ts

import type { KpiDashboard, AlertaPrevencionista, EventoAgenda } from "@/types/prevencionista";

// MOCK DATA - Remover cuando backend esté listo
const MOCK_KPIS:  KpiDashboard = {
  dias_sin_accidentes: 45,
  trabajadores_activos: 87,
  riesgos_criticos_activos: 3,
  observaciones_pendientes: 12,
  inducciones_pendientes: 5,
  epp_vencidos: 8,
  inspecciones_programadas_hoy:  2,
  charlas_mes_actual: 18,
};

const MOCK_ALERTAS: AlertaPrevencionista[] = [
  {
    id: 1,
    tipo: "INDUCCION",
    nivel: "CRITICO",
    titulo: "Trabajadores sin inducción",
    descripcion:  "5 trabajadores no han completado la inducción de obra",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    tipo:  "EPP",
    nivel: "ALTO",
    titulo: "EPP por vencer",
    descripcion:  "8 cascos vencen en los próximos 7 días",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    tipo: "IPER",
    nivel: "MEDIO",
    titulo: "IPER requiere actualización",
    descripcion: "La matriz IPER tiene más de 6 meses sin revisión",
    created_at:  new Date().toISOString(),
  },
];

const MOCK_AGENDA: EventoAgenda[] = [
  {
    id: 1,
    tipo: "INSPECCION",
    titulo:  "Inspección andamios Sector A",
    fecha: new Date().toISOString().split("T")[0],
    hora_inicio: "09:00",
    hora_fin: "10:30",
    ubicacion: "Sector A - Pisos 3-5",
    estado: "PROGRAMADO",
  },
  {
    id:  2,
    tipo: "CHARLA",
    titulo: "Charla 5 minutos - Trabajo en altura",
    fecha: new Date().toISOString().split("T")[0],
    hora_inicio: "07:30",
    hora_fin: "07:35",
    estado: "COMPLETADO",
  },
  {
    id: 3,
    tipo: "VISITA_MUTUAL",
    titulo: "Visita técnica ACHS",
    fecha: new Date().toISOString().split("T")[0],
    hora_inicio: "14:00",
    estado: "PROGRAMADO",
  },
];

export const dashboardService = {
  async getKpis(_obraId: number): Promise<KpiDashboard> {
    // TODO: Reemplazar con llamada real
    // return apiGet<KpiDashboard>(`/v1/obras/${obraId}/prevencion/kpis`);
    
    await new Promise((r) => setTimeout(r, 500)); // Simular latencia
    return MOCK_KPIS;
  },

  async getAlertas(_obraId: number): Promise<AlertaPrevencionista[]> {
    // TODO: Reemplazar con llamada real
    // return apiGet<AlertaPrevencionista[]>(`/v1/obras/${obraId}/prevencion/alertas`);
    
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_ALERTAS;
  },

  async getAgendaHoy(_obraId: number): Promise<EventoAgenda[]> {
    // TODO: Reemplazar con llamada real
    // return apiGet<EventoAgenda[]>(`/v1/obras/${obraId}/prevencion/agenda/hoy`);
    
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_AGENDA;
  },
};