// src/services/prevencionista/trabajadores.service.ts

import type { Trabajador, CarpetaHistorica, EstadoTrabajador } from "@/types/trabajador";

const MOCK_TRABAJADORES:  Trabajador[] = [
  {
    id: 101,
    rut: "12.345.678-9",
    nombres: "Juan Carlos",
    apellidos: "Pérez González",
    email: "juan.perez@email.com",
    telefono: "+56912345678",
    empresa_contratista: "Constructora ABC",
    cargo: "Maestro Albañil",
    fecha_ingreso_obra: "2025-01-15",
    estado: "APTO",
    created_at:  "2025-01-15T08:00:00Z",
    updated_at: "2025-01-15T10:30:00Z",
  },
  {
    id:  102,
    rut:  "11.222.333-4",
    nombres: "María Elena",
    apellidos: "Soto Muñoz",
    email: "maria.soto@email.com",
    telefono: "+56987654321",
    empresa_contratista:  "Eléctricos DEF",
    cargo: "Electricista",
    fecha_ingreso_obra: "2025-02-01",
    estado: "APTO",
    created_at: "2025-02-01T08:00:00Z",
    updated_at: "2025-02-01T09:45:00Z",
  },
  {
    id: 103,
    rut: "15.666.777-8",
    nombres: "Pedro Antonio",
    apellidos: "Rojas Silva",
    email: "pedro.rojas@email.com",
    telefono: "+56955555555",
    empresa_contratista: "Constructora ABC",
    cargo: "Jornal",
    fecha_ingreso_obra: "2025-03-10",
    estado: "NO_APTO",
    created_at: "2025-03-10T08:00:00Z",
    updated_at:  "2025-03-10T08:30:00Z",
  },
];

export const trabajadoresService = {
  async listarTrabajadores(_obraId: number): Promise<Trabajador[]> {
    // TODO: Reemplazar con llamada real
    // return apiGet<Trabajador[]>(`/v1/obras/${obraId}/trabajadores`);
    
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_TRABAJADORES;
  },

  async getTrabajador(_trabajadorId:  number): Promise<Trabajador> {
    // TODO: Reemplazar con llamada real
    // return apiGet<Trabajador>(`/v1/trabajadores/${trabajadorId}`);
    
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_TRABAJADORES[0];
  },

  async getCarpetaHistorica(_trabajadorId: number): Promise<CarpetaHistorica> {
    // TODO: Reemplazar con llamada real
    // return apiGet<CarpetaHistorica>(`/v1/trabajadores/${trabajadorId}/carpeta-historica`);
    
    await new Promise((r) => setTimeout(r, 300));
    return {
      id: 1,
      trabajador_id: 101,
      obra_id: 1,
      documentos_ingreso: [],
      charlas:  [1, 2, 3, 5, 8],
      ast_firmados: [1, 2, 4],
      capacitaciones: [1],
      incidentes: [],
      accidentes: [],
      epp_asignados: [1, 2, 3],
      fecha_creacion: "2025-01-15T08:00:00Z",
      ultima_actualizacion: new Date().toISOString(),
    };
  },

  async cambiarEstado(_trabajadorId: number, _estado: EstadoTrabajador, _motivo?: string): Promise<Trabajador> {
    // TODO: Reemplazar con llamada real
    // return apiPostJson<Trabajador, {estado:  EstadoTrabajador, motivo?:  string}>(`/v1/trabajadores/${trabajadorId}/estado`, { estado, motivo });
    
    throw new Error("NOT_IMPLEMENTED");
  },

  async buscarPorRut(_rut: string): Promise<Trabajador | null> {
    // TODO:  Reemplazar con llamada real
    // return apiGet<Trabajador | null>(`/v1/trabajadores/buscar?rut=${rut}`);
    
    await new Promise((r) => setTimeout(r, 200));
    const found = MOCK_TRABAJADORES. find((t) => t.rut === _rut);
    return found || null;
  },

  // Helpers
  getEstadoBadgeVariant(estado: EstadoTrabajador): "default" | "destructive" | "secondary" {
    switch (estado) {
      case "APTO":
        return "default";
      case "NO_APTO":
        return "destructive";
      case "PENDIENTE":
        return "secondary";
    }
  },
};