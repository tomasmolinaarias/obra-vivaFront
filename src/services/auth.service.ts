// src/services/auth.service.ts
import { apiPostForm, apiPostJson } from "./apiClient";
import { tokenStorage } from "./tokenStorage";
import { runtimeFlags } from "./runtimeFlags";
import { mockLogin } from "@/mocks/mockApi";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const data = runtimeFlags.useMocks
    ? await mockLogin(req.email, req.password)
    : await apiPostJson<LoginResponse, LoginRequest>("/v1/auth/login/", req);

  tokenStorage.setTokens(data.access, data.refresh);
  return data;
}

export function logout() {
  tokenStorage.clear();
}
