//src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { tokenStorage } from "../services/tokenStorage";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = tokenStorage.getAccess();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
