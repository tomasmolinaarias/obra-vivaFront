// src/features/documents/useDocuments.ts
import { useApi } from "@/hooks/useApi";
import type { Document } from "@/types/api";

export function useDocuments() {
  const swr = useApi<Document[]>("/v1/documents/");

  return {
    documents: swr.data ?? [],
    isLoading: swr.isLoading,
    error: swr.error,
    refreshKey: "/v1/documents/" as const,
  };
}
