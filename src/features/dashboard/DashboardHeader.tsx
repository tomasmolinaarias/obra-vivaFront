// src/features/dashboard/DashboardHeader.tsx
import { logout } from "@/services/auth.service";
import { useApi } from "@/hooks/useApi";
import type { Me } from "@/types/api";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardHeader() {
  const { data: me, isLoading: meLoading } = useApi<Me>("/v1/me/");

  return (
    <>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
            OV
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight leading-none">
              Obra <span className="text-slate-700">Viva</span>
            </h1>
            <p className="text-xs text-slate-500">Prevención activa en terreno</p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {meLoading ? (
                <Skeleton className="h-5 w-56" />
              ) : me ? (
                <>
                  <Badge variant="secondary">Sesión</Badge>
                  <span className="text-sm text-slate-700">
                    <span className="font-medium">{me.email}</span>
                  </span>
                  {me.is_staff ? <Badge>Admin</Badge> : <Badge variant="outline">Usuario</Badge>}
                </>
              ) : (
                <span className="text-sm text-slate-700">Sesión: —</span>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
        >
          Salir
        </Button>
      </div>

      <Separator className="mt-6" />
    </>
  );
}
