// src/shared/utils/formatDate.ts
export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("es-CL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
