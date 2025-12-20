// src/types/epp.ts

export type TipoEpp =
  | "CASCO"
  | "GUANTES"
  | "LENTES"
  | "ARNES"
  | "ZAPATOS_SEGURIDAD"
  | "CHALECO_REFLECTANTE"
  | "PROTECTOR_AUDITIVO"
  | "MASCARILLA"
  | "OVEROL"
  | "OTRO";

export type EstadoEpp = "VIGENTE" | "POR_VENCER" | "VENCIDO" | "NO_ASIGNADO";

export type EppAsignado = {
  id:  number;
  trabajador_id: number;
  trabajador_nombre: string;
  tipo:  TipoEpp;
  descripcion:  string;
  fecha_entrega: string;
  fecha_vencimiento?:  string;
  vida_util_meses?:  number;
  estado: EstadoEpp;
  firma_trabajador:  boolean;
  firma_url?: string;
  observaciones?: string;
};

export type AlertaEpp = {
  id: number;
  tipo: "VENCIDO" | "POR_VENCER" | "NO_ASIGNADO";
  epp_id?:  number;
  trabajador_id:  number;
  trabajador_nombre: string;
  tipo_epp: TipoEpp;
  mensaje: string;
  dias_restantes?:  number;
};