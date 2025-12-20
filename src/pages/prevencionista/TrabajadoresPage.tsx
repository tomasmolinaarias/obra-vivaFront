// src/pages/prevencionista/TrabajadoresPage.tsx

import PrevencionistaSidebar from "@/features/prevencionista/layout/PrevencionistaSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function TrabajadoresPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PrevencionistaSidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold">Gestión de Trabajadores</h1>
              <p className="text-muted-foreground">Nómina y estado de seguridad</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>En Desarrollo</CardTitle>
              <CardDescription>
                Esta funcionalidad está siendo implementada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground opacity-30" />
                <p className="mt-4 text-muted-foreground">
                  Próximamente:  listado de trabajadores, validación de estado APTO/NO APTO,
                  historial de seguridad y más. 
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}