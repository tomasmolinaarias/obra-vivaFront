// src/features/prevencionista/layout/PrevencionistaSidebar. tsx

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FolderOpen,
  HardHat,
  FileText,
  ClipboardCheck,
  FileSignature,
  MessageSquare,
  AlertTriangle,
  Stethoscope,
  Siren,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tokenStorage } from "@/services/tokenStorage";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    href: "/prevencionista",
    icon: LayoutDashboard,
  },
  {
    title: "Ingresos en Vivo",
    href:  "/prevencionista/ingresos",
    icon: UserPlus,
    badge: "LIVE",
  },
  {
    title: "Trabajadores",
    href: "/prevencionista/trabajadores",
    icon: Users,
  },
  {
    title: "Carpeta Histórica",
    href: "/prevencionista/carpeta-historica",
    icon: FolderOpen,
  },
  {
    title: "Gestión EPP",
    href: "/prevencionista/epp",
    icon: HardHat,
  },
  {
    title: "Documentos Seguridad",
    href: "/prevencionista/documentos",
    icon: FileText,
  },
  {
    title: "Inspecciones",
    href: "/prevencionista/inspecciones",
    icon: ClipboardCheck,
  },
  {
    title: "AST / ART",
    href: "/prevencionista/ast",
    icon: FileSignature,
  },
  {
    title:  "Charlas",
    href: "/prevencionista/charlas",
    icon: MessageSquare,
  },
  {
    title:  "Accidentes",
    href: "/prevencionista/accidentes",
    icon: AlertTriangle,
  },
  {
    title: "Protocolos MINSAL",
    href: "/prevencionista/protocolos",
    icon: Stethoscope,
  },
  {
    title: "Plan Emergencia",
    href: "/prevencionista/emergencia",
    icon: Siren,
  },
  {
    title: "Reportes",
    href: "/prevencionista/reportes",
    icon: BarChart3,
  },
];

export default function PrevencionistaSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    tokenStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="hidden w-64 flex-col border-r bg-white md:flex">
      {/* Logo / Header */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
          <HardHat className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-bold text-lg">Obra Viva</h1>
          <p className="text-xs text-muted-foreground">Prevencionista</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/prevencionista"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-green-100 text-green-800 font-medium"
                      :  "text-gray-600 hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="rounded bg-red-500 px-1. 5 py-0.5 text-[10px] font-bold text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="mr-2 h-4 w-4" />
          Configuración
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </aside>
  );
}