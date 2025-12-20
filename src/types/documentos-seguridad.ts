// src/types/documentos-seguridad.ts

export type TipoDocumentoSeguridad = "PSST" | "IPER" | "MIPER" | "PTS" | "PROCEDIMIENTO" | "INSTRUCTIVO";

export type EstadoDocumentoSeguridad = "BORRADOR" | "VIGENTE" | "REVISION" | "OBSOLETO";

export type DocumentoSeguridad = {
  id:  number;
  tipo: TipoDocumentoSeguridad;
  codigo: string;
  nombre: string;
  descripcion?:  string;
  version: number;
  estado: EstadoDocumentoSeguridad;
  fecha_creacion: string;
  fecha_vigencia?: string;
  fecha_revision?: string;
  autor_id:  number;
  autor_nombre:  string;
  obra_id: number;
  archivo_url?: string;
  historial_versiones:  VersionDocumento[];
};

export type VersionDocumento = {
  version: number;
  fecha:  string;
  autor: string;
  cambios: string;
  archivo_url?: string;
};