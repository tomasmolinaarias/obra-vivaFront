// src/types/accidentes.ts

export type TipoEvento = "ACCIDENTE" | "INCIDENTE" | "CUASI_ACCIDENTE";
export type GravedadEvento = "LEVE" | "MODERADO" | "GRAVE" | "FATAL";
export type EstadoInvestigacion = "PENDIENTE" | "EN_CURSO" | "COMPLETADA" | "CERRADA";

export type AccidenteIncidente = {
  id: number;
  tipo: TipoEvento;
  gravedad: GravedadEvento;
  obra_id: number;
  fecha:  string;
  hora: string;
  lugar: string;
  descripcion:  string;
  trabajador_afectado_id?:  number;
  trabajador_afectado_nombre?: string;
  testigos: string[];
  fotos_urls: string[];
  
  // DIAT
  diat_generada:  boolean;
  diat_numero?:  string;
  diat_fecha?: string;
  diat_url?: string;
  
  // Investigación
  investigacion:  InvestigacionAccidente | null;
  
  created_at: string;
  updated_at: string;
};

export type InvestigacionAccidente = {
  id: number;
  estado: EstadoInvestigacion;
  investigador_id: number;
  investigador_nombre: string;
  fecha_inicio: string;
  fecha_cierre?: string;
  causas_inmediatas: string[];
  causas_basicas: string[];
  acciones_correctivas: AccionCorrectiva[];
  conclusion?:  string;
};

export type AccionCorrectiva = {
  id: number;
  descripcion: string;
  responsable_id:  number;
  responsable_nombre: string;
  fecha_limite:  string;
  estado: "PENDIENTE" | "EN_PROCESO" | "COMPLETADA";
  fecha_cierre?: string;
  evidencia_url?: string;
};