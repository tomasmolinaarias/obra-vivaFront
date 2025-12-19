// src/mocks/mockApi.ts
import type { Document, Project } from "@/types/api";
import { mockConfig, mockDb } from "./mockDb";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function maybeThrow() {
  if (mockConfig.mode === "error") {
    throw new Error("MOCK_ERROR");
  }
}

export async function mockGet<T>(path: string): Promise<T> {
  await sleep(mockConfig.latencyMs);
  maybeThrow();

  if (mockConfig.mode === "empty") {
    // respuestas vacías para listas
    if (path === "/v1/projects/") return [] as unknown as T;
    if (path === "/v1/documents/") return [] as unknown as T;
  }

  if (path === "/v1/me/") return mockDb.me as unknown as T;
  if (path === "/v1/projects/") return mockDb.projects as unknown as T;
  if (path === "/v1/documents/") return mockDb.documents as unknown as T;

  throw new Error(`MOCK_NOT_IMPLEMENTED: ${path}`);
}

export type CreateProjectBody = {
  name: string;
  description?: string;
  status?: Project["status"];
  location?: string;
};

export type CreateDocumentBody = {
  name: string;
  description?: string;
  project: number;
};

export async function mockCreateProject(body: CreateProjectBody): Promise<Project> {
  await sleep(mockConfig.latencyMs);
  maybeThrow();

  const newItem: Project = {
    id: Math.max(0, ...mockDb.projects.map((p) => p.id)) + 1,
    name: body.name,
    description: body.description ?? "",
    status: body.status ?? "draft",
    location: body.location ?? "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockDb.projects.unshift(newItem);
  return newItem;
}

export async function mockCreateDocument(body: CreateDocumentBody): Promise<Document> {
  await sleep(mockConfig.latencyMs);
  maybeThrow();

  const newItem: Document = {
    id: Math.max(0, ...mockDb.documents.map((d) => d.id)) + 1,
    name: body.name,
    description: body.description ?? "",
    created_at: new Date().toISOString(),
    project: body.project,
  };

  mockDb.documents.unshift(newItem);
  return newItem;
}

export async function mockLogin(_email: string, _password: string) {
  await sleep(mockConfig.latencyMs);
  maybeThrow();

  // tokens fake
  return {
    access: "mock-access-token",
    refresh: "mock-refresh-token",
  };
}
