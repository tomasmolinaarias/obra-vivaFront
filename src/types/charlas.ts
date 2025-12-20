// src/types/charlas.ts

export type TipoCharla = "5_MINUTOS" | "INDUCCION" | "CAPACITACION" | "ESPECIFICA";

export type Charla = {
  id:  number;
  tipo: TipoCharla;
  tema: string;
  descripcion?:  string;
  obra_id: number;
  fecha: string;
  hora:  string;
  duracion_minutos: number;
  expositor_id: number;
  expositor_nombre: string;
  material_url?: string;
  asistentes: AsistenteCharla[];
  fotos_urls: string[];
  created_at: string;
};

export type AsistenteCharla = {
  trabajador_id: number;
  trabajador_nombre: string;
  rut: string;
  firma_url?: string;
  presente: boolean;
};

export type EstadisticasCharlas = {
  total_mes: number;
  promedio_asistencia: number;
  temas_frecuentes: { tema: string; cantidad: number }[];
  cumplimiento_semanal: number;
};