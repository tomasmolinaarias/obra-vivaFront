// src/services/prevencionista/ingresos.service. ts

import type { IngresoObra, NotificacionIngreso, EstadoDocumento } from "@/types/trabajador";

// MOCK DATA
const MOCK_INGRESOS_EN_PROCESO: IngresoObra[] = [
  {
    id: 1,
    trabajador:  {
      id: 101,
      rut: "12. 345.678-9",
      nombres: "Juan Carlos",
      apellidos: "Pérez González",
      email: "juan.perez@email.com",
      telefono: "+56912345678",
      empresa_contratista: "Constructora ABC",
      cargo: "Maestro Albañil",
      fecha_ingreso_obra: new Date().toISOString(),
      estado:  "PENDIENTE",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    obra_id: 1,
    estado:  "EN_PROCESO",
    progreso: { total: 6, firmados: 4, pendientes: 2, criticos_faltantes: 1 },
    documentos: [
      { id: 1, tipo: "CONTRATO", nombre: "Contrato de trabajo", estado: "FIRMADO", es_critico: true, fecha_firma: new Date().toISOString() },
      { id: 2, tipo: "INDUCCION", nombre: "Inducción de obra", estado: "FIRMADO", es_critico: true, fecha_firma: new Date().toISOString() },
      { id: 3, tipo:  "REGLAMENTO_INTERNO", nombre: "Reglamento interno", estado: "FIRMADO", es_critico:  true },
      { id: 4, tipo:  "ENTREGA_EPP", nombre: "Entrega de EPP", estado: "FIRMANDO", es_critico: true },
      { id: 5, tipo:  "DECLARACION_RIESGOS", nombre: "Declaración de riesgos", estado: "PENDIENTE", es_critico: false },
      { id: 6, tipo:  "EXAMEN_PREOCUPACIONAL", nombre: "Examen preocupacional", estado: "FIRMADO", es_critico: true },
    ],
    hora_inicio: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id:  2,
    trabajador:  {
      id: 102,
      rut: "11.222.333-4",
      nombres: "María Elena",
      apellidos: "Soto Muñoz",
      email: "maria.soto@email.com",
      telefono: "+56987654321",
      empresa_contratista: "Eléctricos DEF",
      cargo: "Electricista",
      fecha_ingreso_obra: new Date().toISOString(),
      estado: "PENDIENTE",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    obra_id: 1,
    estado: "EN_PROCESO",
    progreso:  { total: 7, firmados: 2, pendientes: 5, criticos_faltantes: 3 },
    documentos: [
      { id: 7, tipo: "CONTRATO", nombre: "Contrato de trabajo", estado: "FIRMADO", es_critico: true },
      { id: 8, tipo: "INDUCCION", nombre: "Inducción de obra", estado: "FIRMADO", es_critico: true },
      { id: 9, tipo: "REGLAMENTO_INTERNO", nombre: "Reglamento interno", estado: "PENDIENTE", es_critico: true },
      { id: 10, tipo: "ENTREGA_EPP", nombre: "Entrega de EPP", estado: "PENDIENTE", es_critico: true },
      { id: 11, tipo: "DECLARACION_RIESGOS", nombre:  "Declaración de riesgos", estado: "PENDIENTE", es_critico: false },
      { id: 12, tipo: "CERTIFICACION_ELECTRICA", nombre: "Certificación SEC", estado: "PENDIENTE", es_critico: true },
      { id: 13, tipo:  "EXAMEN_PREOCUPACIONAL", nombre: "Examen preocupacional", estado:  "PENDIENTE", es_critico: true },
    ],
    hora_inicio: new Date(Date.now() - 10 * 60000).toISOString(),
  },
];

const MOCK_INGRESOS_COMPLETADOS: IngresoObra[] = [
  {
    id: 3,
    trabajador: {
      id: 103,
      rut: "15.666.777-8",
      nombres: "Pedro Antonio",
      apellidos: "Rojas Silva",
      email: "pedro. rojas@email.com",
      telefono: "+56955555555",
      empresa_contratista: "Constructora ABC",
      cargo: "Jornal",
      fecha_ingreso_obra: new Date().toISOString(),
      estado: "APTO",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    obra_id: 1,
    estado: "COMPLETADO",
    progreso: { total: 6, firmados: 6, pendientes: 0, criticos_faltantes: 0 },
    documentos: [],
    hora_inicio: new Date(Date.now() - 60 * 60000).toISOString(),
    hora_fin: new Date(Date.now() - 15 * 60000).toISOString(),
  },
];

export const ingresosService = {
  async getIngresosEnProceso(_obraId: number): Promise<IngresoObra[]> {
    // TODO: Reemplazar con llamada real o WebSocket
    // return apiGet<IngresoObra[]>(`/v1/obras/${obraId}/ingresos/en-proceso`);
    
    await new Promise((r) => setTimeout(r, 400));
    return MOCK_INGRESOS_EN_PROCESO;
  },

  async getIngresosCompletadosHoy(_obraId: number): Promise<IngresoObra[]> {
    // TODO:  Reemplazar con llamada real
    // return apiGet<IngresoObra[]>(`/v1/obras/${obraId}/ingresos/completados/hoy`);
    
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_INGRESOS_COMPLETADOS;
  },

  async getDetalleIngreso(_ingresoId:  number): Promise<IngresoObra> {
    // TODO:  Reemplazar con llamada real
    // return apiGet<IngresoObra>(`/v1/ingresos/${ingresoId}`);
    
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_INGRESOS_EN_PROCESO[0];
  },

  async crearIngreso(_obraId: number, _trabajadorId: number): Promise<IngresoObra> {
    // TODO: Reemplazar con llamada real
    // return apiPostJson<IngresoObra, {trabajador_id: number}>(`/v1/obras/${obraId}/ingresos`, { trabajador_id: trabajadorId });
    
    throw new Error("NOT_IMPLEMENTED");
  },

  async reenviarDocumento(_documentoId: number): Promise<void> {
    // TODO:  Reemplazar con llamada real
    // return apiPostJson(`/v1/documentos-ingreso/${documentoId}/reenviar`, {});
    
    throw new Error("NOT_IMPLEMENTED");
  },

  // Polling para actualizaciones en tiempo real (simula WebSocket)
  async pollActualizaciones(_obraId: number, _lastUpdate: string): Promise<NotificacionIngreso[]> {
    // TODO: Reemplazar con WebSocket o SSE
    // return apiGet<NotificacionIngreso[]>(`/v1/obras/${obraId}/ingresos/updates? since=${lastUpdate}`);
    
    await new Promise((r) => setTimeout(r, 500));
    
    // Simular actualizaciones aleatorias
    if (Math.random() > 0.7) {
      return [
        {
          id: Date.now(),
          tipo: "DOCUMENTO_FIRMADO",
          trabajador_id: 101,
          trabajador_nombre: "Juan Carlos Pérez",
          mensaje: "Firmó:  Entrega de EPP",
          timestamp: new Date().toISOString(),
          leida: false,
        },
      ];
    }
    return [];
  },

  // Helper para calcular estado visual
  getEstadoSemaforo(estado: EstadoDocumento): "verde" | "amarillo" | "rojo" {
    switch (estado) {
      case "FIRMADO":
        return "verde";
      case "PENDIENTE": 
      case "FIRMANDO":
        return "amarillo";
      case "OBSERVADO":
      case "RECHAZADO":
      case "VENCIDO":
        return "rojo";
      default:
        return "amarillo";
    }
  },
};