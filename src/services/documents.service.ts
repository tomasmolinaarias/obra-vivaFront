//src/services/documents.service.ts

import type { Document } from "../types/api";
import { apiGet, apiPostForm } from "./apiClient";

export type CreateDocumentBody = {
  name: string;
  description?: string;
  project: number;
};

export function listDocuments() {
  return apiGet<Document[]>("/v1/documents/");
}

export function createDocument(body: CreateDocumentBody) {
  return apiPostForm<Document>("/v1/documents/", body);
}
