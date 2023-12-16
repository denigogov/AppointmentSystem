import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

export const OnlyEmployeesAccess: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.userInfo?.type === 1) {
    return <Navigate to="/app" state={{ path: location.pathname }} />;
  }

  return children;
};
