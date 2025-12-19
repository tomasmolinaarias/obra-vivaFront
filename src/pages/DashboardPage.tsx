//src/pages/DashboardPage.tsx

import { logout } from "../services/auth.service";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-slate-600">Cumplimiento general</p>
        </div>

        <button
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Salir
        </button>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="% habilitación" value="—" />
        <Card title="Docs pendientes" value="—" />
        <Card title="ART/Charlas hoy" value="—" />
        <Card title="Reportes abiertos" value="—" />
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <p className="text-sm text-slate-600">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
