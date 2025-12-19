//src/hooks/useApi.ts

import useSWR from "swr";
import { apiGet } from "../services/apiClient";

export function useApi<T>(path: string | null) {
  return useSWR<T>(path, (p: string) => apiGet<T>(p));
}