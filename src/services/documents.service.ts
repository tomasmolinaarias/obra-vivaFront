// src/services/documents.service.ts
import type { Document } from "@/types/api";
import { apiGet, apiPostForm } from "./apiClient";
import { runtimeFlags } from "./runtimeFlags";
import { mockCreateDocument } from "@/mocks/mockApi";

export type CreateDocumentBody = {
  name: string;
  description?: string;
  project: number;
};

export function listDocuments() {
  return apiGet<Document[]>("/v1/documents/");
}

export function createDocument(body: CreateDocumentBody) {
  if (runtimeFlags.useMocks) {
    return mockCreateDocument(body);
  }

  return apiPostForm<Document>("/v1/documents/", body);
}
