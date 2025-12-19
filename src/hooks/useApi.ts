// src/hooks/useApi.ts
import useSWR from "swr";
import { apiGet } from "@/services/apiClient";
import { runtimeFlags } from "@/services/runtimeFlags";
import { mockGet } from "@/mocks/mockApi";

export function useApi<T>(path: string | null) {
  return useSWR<T>(path, (p: string) => {
    if (runtimeFlags.useMocks) return mockGet<T>(p);
    return apiGet<T>(p);
  });
}
