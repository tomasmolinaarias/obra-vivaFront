//src/services/apiClient.ts

import { tokenStorage } from "./tokenStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

async function refreshAccessToken(): Promise<string> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) throw new Error("NO_REFRESH_TOKEN");

  const body = new URLSearchParams();
  body.set("refresh", refresh);

  const res = await fetch(`${API_BASE_URL}/v1/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    tokenStorage.clear();
    throw new Error("REFRESH_FAILED");
  }

  const data = (await safeJson(res)) as { access: string } | null;
  if (!data?.access) throw new Error("REFRESH_INVALID_RESPONSE");

  tokenStorage.setAccess(data.access);
  return data.access;
}

export async function apiGet<T>(path: string): Promise<T> {
  const access = tokenStorage.getAccess();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
  });

  if (res.status === 401) {
    // intenta refresh y reintenta una vez
    const newAccess = await refreshAccessToken();

    const retry = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${newAccess}` },
    });

    if (!retry.ok) {
      const payload = await safeJson(retry);
      throw new Error(payload?.detail || `Error ${retry.status}`);
    }

    return (await safeJson(retry)) as T;
  }

  if (!res.ok) {
    const payload = await safeJson(res);
    throw new Error(payload?.detail || `Error ${res.status}`);
  }

  return (await safeJson(res)) as T;
}

export async function apiPostJson<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const access = tokenStorage.getAccess();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
    body: JSON.stringify(body),
  });

  if (res.status === 401) {
    const newAccess = await refreshAccessToken();

    const retry = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccess}`,
      },
      body: JSON.stringify(body),
    });

    if (!retry.ok) {
      const payload = await safeJson(retry);
      throw new Error(payload?.detail || `Error ${retry.status}`);
    }

    return (await safeJson(retry)) as TResponse;
  }

  if (!res.ok) {
    const payload = await safeJson(res);
    throw new Error(payload?.detail || `Error ${res.status}`);
  }

  return (await safeJson(res)) as TResponse;
}
export async function apiPostForm<TResponse>(
  path: string,
  body: Record<string, string | number | undefined | null>
): Promise<TResponse> {
  const access = tokenStorage.getAccess();

  const form = new URLSearchParams();
  for (const [k, v] of Object.entries(body)) {
    if (v !== undefined && v !== null) form.set(k, String(v));
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
    body: form,
  });

  if (res.status === 401) {
    const newAccess = await refreshAccessToken();

    const retry = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${newAccess}`,
      },
      body: form,
    });

    if (!retry.ok) {
      const payload = await safeJson(retry);
      throw new Error(payload?.detail || `Error ${retry.status}`);
    }

    return (await safeJson(retry)) as TResponse;
  }

  if (!res.ok) {
    const payload = await safeJson(res);
    throw new Error(payload?.detail || `Error ${res.status}`);
  }

  return (await safeJson(res)) as TResponse;
}

