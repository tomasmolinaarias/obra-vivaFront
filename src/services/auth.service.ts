// src/services/auth.service.ts
import { apiPostForm } from "./apiClient";
import { tokenStorage } from "./tokenStorage";
import { runtimeFlags } from "./runtimeFlags";
import { mockLogin } from "@/mocks/mockApi";
import type { LoginResponse } from "@/types/auth";

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(req: LoginRequest): Promise<LoginResponse> {
  const data = runtimeFlags.useMocks
    ? await mockLogin(req.email, req.password)
    : await apiPostForm<LoginResponse>("/v1/auth/login/", {
        email: req.email,
        password: req.password,
      });

  tokenStorage.setTokens(data.access, data.refresh, data.user);
  return data;
}

export function logout() {
  tokenStorage.clear();
}
