//src/services/me.service.ts
import type { Me } from "../types/api";
import { apiGet } from "./apiClient";

export function getMe() {
  return apiGet<Me>("/v1/me/");
}
