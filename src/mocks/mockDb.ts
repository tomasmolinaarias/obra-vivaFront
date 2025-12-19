// src/mocks/mockDb.ts
import type { Me, Project, Document } from "@/types/api";

export type MockMode = "ok" | "empty" | "error";

export const mockConfig = {
  latencyMs: 450,
  mode: (import.meta.env.VITE_MOCK_MODE as MockMode) || "ok",
};

export const mockDb: {
  me: Me;
  projects: Project[];
  documents: Document[];
} = {
  me: {
    id: 1,
    email: "admin@example.com",
    first_name: "Admin",
    last_name: "Obra Viva",
    is_active: true,
    is_staff: true,
  },

  projects: [
    {
      id: 1,
      name: "Obra Puerto Cisnes",
      description: "Proyecto de ejemplo",
      status: "active",
      location: "Aysén, Chile",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],

  documents: [
    {
      id: 1,
      name: "Reglamento Interno",
      description: "Documento base",
      created_at: new Date().toISOString(),
      project: 1,
    },
  ],
};
