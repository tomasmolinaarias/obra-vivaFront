//src/hooks/useApi.ts

import useSWR from "swr";
import { fetcher } from "../services/fetcher";

export function useApi<T>(path: string | null) {
  return useSWR<T>(path, (p: string) => fetcher<T>(p));
}
