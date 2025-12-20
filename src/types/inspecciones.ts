// src/types/inspecciones.ts

export type TipoInspeccion =
  | "GENERAL"
  | "ANDAMIOS"
  | "HERRAMIENTAS"
  | "ELECTRICIDAD"
  | "ORDEN_ASEO"
  | "EXCAVACIONES"
  | "TRABAJO_ALTURA"
  | "VEHICULOS";

export type NivelRiesgo = "CRITICO" | "ALTO" | "MEDIO" | "BAJO";

export type EstadoInspeccion = "PROGRAMADA" | "EN_CURSO" | "COMPLETADA" | "CANCELADA";
export type EstadoObservacion = "ABIERTA" | "EN_PROCESO" | "CERRADA";

export type Inspeccion = {
  id:  number;
  tipo: TipoInspeccion;
  titulo: string;
  descripcion?:  string;
  obra_id: number;
  area:  string;
  fecha_programada: string;
  fecha_ejecucion?:  string;
  inspector_id: number;
  inspector_nombre: string;
  estado: EstadoInspeccion;
  checklist:  ItemChecklist[];
  observaciones:  Observacion[];
  fotos_urls:  string[];
  firma_inspector?:  string;
  created_at: string;
};

export type ItemChecklist = {
  id: number;
  pregunta: string;
  cumple: boolean | null;
  observacion?: string;
  criticidad: NivelRiesgo;
};

export type Observacion = {
  id: number;
  descripcion: string;
  nivel_riesgo: NivelRiesgo;
  ubicacion:  string;
  fotos_urls: string[];
  accion_correctiva: string;
  responsable_id?:  number;
  responsable_nombre?: string;
  fecha_limite?: string;
  estado: EstadoObservacion;
  fecha_cierre?: string;
};