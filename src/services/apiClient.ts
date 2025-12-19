//src/services/apiClient.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type ApiError = {
  message: string;
  status?: number;
  payload?: unknown;
};

async function safeJson(res: Response): Promise<any | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function extractErrorMessage(payload: any, fallback: string) {
  // Maneja formatos comunes (DRF / validaciones / detail)
  if (!payload) return fallback;

  if (typeof payload === "string") return payload;
  if (payload.detail && typeof payload.detail === "string") return payload.detail;

  // Soporta payload tipo { email: { errors:[...] } } o { field: ["..."] }
  const candidates: string[] = [];

  for (const key of Object.keys(payload)) {
    const v = payload[key];

    if (Array.isArray(v)) {
      for (const item of v) if (typeof item === "string") candidates.push(`${key}: ${item}`);
    } else if (v && typeof v === "object") {
      if (Array.isArray(v.errors)) {
        for (const item of v.errors) if (typeof item === "string") candidates.push(`${key}: ${item}`);
      } else if (typeof v.value === "string" && Array.isArray(v.errors) && v.errors.length) {
        for (const item of v.errors) candidates.push(`${key}: ${item}`);
      }
    }
  }

  return candidates.length ? candidates.join(" · ") : fallback;
}

export async function apiPost<TResponse>(
  path: string,
  body: unknown,
  init?: RequestInit
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  if (!res.ok) {
    const payload = await safeJson(res);
    const message = extractErrorMessage(
      payload,
      res.status === 401 ? "Credenciales inválidas." : `Error ${res.status}.`
    );

    const err: ApiError = { message, status: res.status, payload };
    throw err;
  }

  const data = (await safeJson(res)) as TResponse;
  return data;
}
