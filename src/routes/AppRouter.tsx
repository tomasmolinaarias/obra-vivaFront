// src/routes/AppRouter.tsx

import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardPrevencionista from "@/features/prevencionista/dashboard/DashboardPrevencionista";
import TrabajadoresPage from "@/pages/prevencionista/TrabajadoresPage";
import CarpetaHistoricaPage from "@/pages/prevencionista/CarpetaHistoricaPage";
import EppPage from "@/pages/prevencionista/EppPage";
import DocumentosSeguridadPage from "@/pages/prevencionista/DocumentosSeguridadPage";
import InspeccionesPage from "@/pages/prevencionista/InspeccionesPage";
import AstPage from "@/pages/prevencionista/AstPage";
import CharlasPage from "@/pages/prevencionista/CharlasPage";
import AccidentesPage from "@/pages/prevencionista/AccidentesPage";
import ProtocolosPage from "@/pages/prevencionista/ProtocolosPage";
import EmergenciaPage from "@/pages/prevencionista/EmergenciaPage";
import ReportesPage from "@/pages/prevencionista/ReportesPage";
import IngresosEnVivo from "@/pages/prevencionista/IngresosVivoPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard general (legacy) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* ============================================ */}
      {/* RUTAS DEL PREVENCIONISTA DE RIESGOS         */}
      {/* ============================================ */}
      <Route
        path="/prevencionista"
        element={
          <ProtectedRoute>
            <DashboardPrevencionista />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/ingresos"
        element={
          <ProtectedRoute>
            <IngresosEnVivo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/trabajadores"
        element={
          <ProtectedRoute>
            <TrabajadoresPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/carpeta-historica"
        element={
          <ProtectedRoute>
            <CarpetaHistoricaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/carpeta-historica/: trabajadorId"
        element={
          <ProtectedRoute>
            <CarpetaHistoricaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/epp"
        element={
          <ProtectedRoute>
            <EppPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/documentos"
        element={
          <ProtectedRoute>
            <DocumentosSeguridadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/inspecciones"
        element={
          <ProtectedRoute>
            <InspeccionesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/ast"
        element={
          <ProtectedRoute>
            <AstPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/charlas"
        element={
          <ProtectedRoute>
            <CharlasPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/accidentes"
        element={
          <ProtectedRoute>
            <AccidentesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/protocolos"
        element={
          <ProtectedRoute>
            <ProtocolosPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/emergencia"
        element={
          <ProtectedRoute>
            <EmergenciaPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prevencionista/reportes"
        element={
          <ProtectedRoute>
            <ReportesPage />
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}