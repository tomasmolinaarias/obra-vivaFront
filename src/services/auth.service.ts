//src/services/auth.service.ts

import type { LoginRequest, LoginResponse } from "../types/auth";
import { apiPost } from "./apiClient";
import { tokenStorage } from "./tokenStorage";

export async function login(req: LoginRequest): Promise<LoginResponse> {
  // Endpoint según tu doc: /api/v1/auth/login/
  const data = await apiPost<LoginResponse>("/v1/auth/login/", req);

  tokenStorage.setTokens(data.access, data.refresh);
  return data;
}

export function logout() {
  tokenStorage.clear();
}
