import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";
// import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface OnlyOwnerAccessProps {
  children: ReactNode;
}

export const OnlyOwnerAccess: React.FC<OnlyOwnerAccessProps> = ({
  children,
}): JSX.Element => {
  const auth = useAuth();
  // const location = useLocation();

  if (auth.userInfo?.type !== 3) {
    return <Navigate to="/app" />;
  }

  return <>{children}</>;
};
