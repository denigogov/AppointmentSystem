import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
