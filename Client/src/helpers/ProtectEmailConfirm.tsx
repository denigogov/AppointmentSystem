import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "./Auth";

export const ProtectEmailConfirm: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();
  const location = useLocation();
  const tokens = location.search.substring(7);

  // checking if the length of the token is lower that 150 and greather than 190 -- this is one simple security layout to protect the route...inside of the route is other protecting layout if the user manage to go to this route I need to make better way
  const checkLength = tokens.length < 180 && tokens.length > 150 ? false : true;

  if (checkLength || auth.token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return children;
};
