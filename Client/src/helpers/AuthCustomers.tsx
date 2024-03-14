import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
// import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface OnlyCustomersAceesProps {
  children: ReactNode;
}

export const OnlyCustomersAccess: React.FC<OnlyCustomersAceesProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  // const location = useLocation();

  if (auth.userInfo?.type !== 1) {
    return <Navigate to="/app" />;
    // return <Navigate to="/app" state={{ path: location.pathname }} />;
  }

  return <>{children}</>;
};
