import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Obra Viva</h1>
        <p className="mt-1 text-slate-600">Acceso (mock por ahora)</p>

        <div className="mt-6 space-y-3">
          <div>
            <label className="text-sm text-slate-700">Usuario</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="usuario"
            />
          </div>

          <div>
            <label className="text-sm text-slate-700">Contraseña</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50"
            disabled={!username || !password}
            onClick={() => {
              // temporal: luego esto se reemplaza por auth.service.ts
              localStorage.setItem("accessToken", "mock-token");
              window.location.href = "/dashboard";
            }}
          >
            Entrar
          </button>
        </div>
      </section>
    </main>
  );
}
