// src/types/prevencionista. ts

export type KpiDashboard = {
  dias_sin_accidentes: number;
  trabajadores_activos: number;
  riesgos_criticos_activos: number;
  observaciones_pendientes: number;
  inducciones_pendientes: number;
  epp_vencidos: number;
  inspecciones_programadas_hoy: number;
  charlas_mes_actual: number;
};

export type AlertaPrevencionista = {
  id: number;
  tipo: "INDUCCION" | "EPP" | "IPER" | "PROTOCOLO" | "CAPACITACION" | "EXAMEN";
  nivel: "CRITICO" | "ALTO" | "MEDIO" | "BAJO";
  titulo: string;
  descripcion: string;
  trabajador_id?:  number;
  trabajador_nombre?: string;
  fecha_limite?: string;
  created_at:  string;
};

export type EventoAgenda = {
  id: number;
  tipo: "INSPECCION" | "CAPACITACION" | "VISITA_MUTUAL" | "SIMULACRO" | "CHARLA";
  titulo: string;
  descripcion?:  string;
  fecha: string;
  hora_inicio:  string;
  hora_fin?:  string;
  ubicacion?: string;
  responsable?: string;
  estado: "PROGRAMADO" | "EN_CURSO" | "COMPLETADO" | "CANCELADO";
};