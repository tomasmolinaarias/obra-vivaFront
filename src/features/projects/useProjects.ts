// src/features/projects/useProjects.ts
import { useApi } from "@/hooks/useApi";
import type { Project } from "@/types/api";

export function useProjects() {
  const swr = useApi<Project[]>("/v1/projects/");

  return {
    projects: swr.data ?? [],
    isLoading: swr.isLoading,
    error: swr.error,
    refreshKey: "/v1/projects/" as const,
  };
}
