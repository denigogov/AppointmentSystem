import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./helpers/Auth";
import { useEffect, useState } from "react";
import { fetchTokenValidation } from "./api/loginApi";
import { RequireAuth } from "./helpers/RequireAuth";
import { TokenType, UserInfoType } from "./types/AuthTypes";

const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (typeof auth.token === "string" && auth.token.length) {
          const userData = await fetchTokenValidation(auth.token as TokenType);
          if (userData) {
            auth.info(userData.payload as UserInfoType);
          }
        } else {
          auth.logout();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [auth.token]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          path="home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        {auth.token ? null : (
          <Route key="login" path="login" element={<Login />} />
        )}

        <Route
          key="notFound"
          path="*"
          element={<h1>Page not Found</h1>}
        ></Route>
      </Route>
    )
  );

  return (
    <div>
      {loading ? <p>Loading...</p> : <RouterProvider router={router} />}
    </div>
  );
};

export default App;
