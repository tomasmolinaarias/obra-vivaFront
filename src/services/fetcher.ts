const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function fetcher<T>(path: string): Promise<T> {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} - ${path}`);
  return res.json() as Promise<T>;
}
