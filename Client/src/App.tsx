import { useAuth } from "./helpers/Auth";
import { useEffect, useState } from "react";
import { fetchTokenValidation } from "./api/loginApi";
import { TokenType, UserInfoType } from "./types/AuthTypes";
import RootRouter from "./RootRouter";

const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async (retryCount: number = 0) => {
      try {
        if (typeof auth.token === "string" && auth.token?.length) {
          const userData = await fetchTokenValidation(auth.token as TokenType);

          if (userData) {
            auth.info(userData.payload as UserInfoType);
          } else {
            auth.logout();
          }
        } else {
          auth.logout();
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (retryCount < 3) {
          setTimeout(() => {
            validateToken(retryCount + 1);
          }, 1000);
        } else {
          setLoading(false);
        }
      }
    };
    validateToken();
  }, [auth.token]);

  return <div>{loading ? <p></p> : <RootRouter />}</div>;
};

export default App;
