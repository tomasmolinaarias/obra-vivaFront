// src/types/trabajador.ts

export type EstadoTrabajador = "APTO" | "NO_APTO" | "PENDIENTE";
export type EstadoDocumento = "PENDIENTE" | "FIRMANDO" | "FIRMADO" | "OBSERVADO" | "RECHAZADO" | "VENCIDO";

export type Trabajador = {
  id:  number;
  rut: string;
  nombres: string;
  apellidos: string;
  email:  string;
  telefono: string;
  empresa_contratista: string;
  cargo: string;
  fecha_ingreso_obra: string;
  estado:  EstadoTrabajador;
  foto_url?: string;
  created_at: string;
  updated_at: string;
};

export type DocumentoIngreso = {
  id: number;
  tipo:  TipoDocumentoIngreso;
  nombre: string;
  estado: EstadoDocumento;
  es_critico: boolean;
  fecha_firma?:  string;
  firmante?: string;
  pdf_url?: string;
  observaciones?: string;
};

export type TipoDocumentoIngreso =
  | "CONTRATO"
  | "INDUCCION"
  | "REGLAMENTO_INTERNO"
  | "ENTREGA_EPP"
  | "DECLARACION_RIESGOS"
  | "EXAMEN_ALTURA"
  | "EXAMEN_PREOCUPACIONAL"
  | "CAPACITACION_ESPECIFICA"
  | "LICENCIA_CONDUCIR"
  | "CERTIFICACION_ELECTRICA";

export type CarpetaHistorica = {
  id: number;
  trabajador_id: number;
  obra_id: number;
  documentos_ingreso: DocumentoIngreso[];
  charlas:  number[];        // IDs de charlas asistidas
  ast_firmados: number[];   // IDs de AST firmados
  capacitaciones: number[];
  incidentes: number[];
  accidentes: number[];
  epp_asignados: number[];
  fecha_creacion: string;
  ultima_actualizacion: string;
};

export type IngresoObra = {
  id: number;
  trabajador:  Trabajador;
  obra_id: number;
  estado:  "EN_PROCESO" | "COMPLETADO" | "BLOQUEADO";
  progreso: {
    total: number;
    firmados: number;
    pendientes:  number;
    criticos_faltantes: number;
  };
  documentos:  DocumentoIngreso[];
  hora_inicio: string;
  hora_fin?:  string;
};

export type NotificacionIngreso = {
  id: number;
  tipo: "DOCUMENTO_FIRMADO" | "INGRESO_COMPLETADO" | "DOCUMENTO_RECHAZADO";
  trabajador_id: number;
  trabajador_nombre: string;
  mensaje: string;
  timestamp: string;
  leida: boolean;
};