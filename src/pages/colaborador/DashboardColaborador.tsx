import { useState } from "react";
import { tokenStorage } from "@/services/tokenStorage";
import type { User } from "@/types/auth";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardColaborador() {
  const [user] = useState<User | null>(() => tokenStorage.getUser());

  const handleLogout = () => {
    tokenStorage.clear();
    window.location.href = "/login";
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Bienvenido, {user.first_name}
            </h1>
            <p className="text-slate-600">
              Panel de Colaborador
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="destructive"
          >
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Nombre</p>
                <p className="font-semibold">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Rol</p>
                <p className="font-semibold text-blue-600">
                  {user.role}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                Ver Documentos Pendientes
              </Button>
              <Button className="w-full" variant="outline">
                Mis Ingresos
              </Button>
              <Button className="w-full" variant="outline">
                Ver Proyectos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
