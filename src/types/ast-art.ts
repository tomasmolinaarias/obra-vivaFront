// src/types/ast-art.ts

export type EstadoAst = "BORRADOR" | "ACTIVO" | "FIRMADO" | "CERRADO";

export type Ast = {
  id: number;
  codigo: string;
  actividad: string;
  descripcion?:  string;
  obra_id: number;
  area: string;
  fecha:  string;
  hora_inicio: string;
  hora_fin?: string;
  supervisor_id: number;
  supervisor_nombre: string;
  estado: EstadoAst;
  riesgos: RiesgoAst[];
  epp_requeridos: string[];
  trabajadores_firmantes: FirmanteTrabajador[];
  created_at: string;
};

export type RiesgoAst = {
  id: number;
  descripcion: string;
  consecuencia: string;
  medida_control: string;
  responsable: string;
};

export type FirmanteTrabajador = {
  trabajador_id: number;
  trabajador_nombre: string;
  rut: string;
  firma_url?: string;
  fecha_firma?: string;
  firmado:  boolean;
};