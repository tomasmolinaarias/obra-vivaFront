// src/types/emergencia.ts

export type TipoEmergencia = "INCENDIO" | "SISMO" | "EVACUACION" | "DERRAME" | "ELECTRICA" | "MEDICA";

export type PlanEmergencia = {
  id:  number;
  obra_id: number;
  nombre: string;
  version: number;
  fecha_vigencia: string;
  croquis_url?: string;
  vias_evacuacion: ViaEvacuacion[];
  puntos_encuentro: PuntoEncuentro[];
  brigadistas:  Brigadista[];
  telefonos_emergencia: TelefonoEmergencia[];
  simulacros:  Simulacro[];
  created_at: string;
  updated_at: string;
};

export type ViaEvacuacion = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen_url?: string;
};

export type PuntoEncuentro = {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  imagen_url?: string;
};

export type Brigadista = {
  id: number;
  trabajador_id: number;
  trabajador_nombre: string;
  rol: "JEFE_BRIGADA" | "PRIMEROS_AUXILIOS" | "EVACUACION" | "INCENDIO" | "COMUNICACIONES";
  telefono: string;
  capacitado: boolean;
  fecha_capacitacion?: string;
};

export type TelefonoEmergencia = {
  nombre: string;
  telefono:  string;
  tipo: "BOMBEROS" | "AMBULANCIA" | "CARABINEROS" | "MUTUAL" | "HOSPITAL" | "INTERNO";
};

export type Simulacro = {
  id: number;
  tipo: TipoEmergencia;
  fecha: string;
  hora: string;
  duracion_minutos: number;
  participantes: number;
  observaciones: string;
  resultado:  "EXITOSO" | "CON_OBSERVACIONES" | "FALLIDO";
  mejoras_propuestas: string[];
};