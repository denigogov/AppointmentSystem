import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

export const RequireAuth: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }

  return children;
};
