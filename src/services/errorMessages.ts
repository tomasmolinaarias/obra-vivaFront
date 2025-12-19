export function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  if (
    normalized.includes("no active account") ||
    normalized.includes("invalid credentials") ||
    normalized.includes("credentials")
  ) {
    return "Credenciales inválidas.";
  }

  if (normalized.includes("network")) {
    return "No se pudo conectar con el servidor.";
  }

  return "No fue posible iniciar sesión. Intenta nuevamente.";
}
