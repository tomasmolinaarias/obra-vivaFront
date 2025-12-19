// src/services/runtimeFlags.ts
export const runtimeFlags = {
  useMocks: String(import.meta.env.VITE_USE_MOCKS).toLowerCase() === "true",
};
