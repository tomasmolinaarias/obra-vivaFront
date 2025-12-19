//src/services/auth.service.ts
import { apiPostJson } from "./apiClient";
import { tokenStorage } from "./tokenStorage";

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { access: string; refresh: string };

export async function login(req: LoginRequest): Promise<LoginResponse> {
  // POST /api/v1/auth/login/
  const data = await apiPostJson<LoginResponse, LoginRequest>("/v1/auth/login/", req);
  tokenStorage.setTokens(data.access, data.refresh);
  return data;
}

export function logout() {
  tokenStorage.clear();
}
