import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface OnlyEmployeesAccessProps {
  children: ReactNode;
}

export const OnlyEmployeesAccess: React.FC<OnlyEmployeesAccessProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.userInfo?.type !== 2) {
    return <Navigate to="/app" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
