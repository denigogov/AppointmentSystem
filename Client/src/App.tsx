import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import { useAuth } from "./helpers/Auth";
import { useEffect, useState } from "react";
import { fetchTokenValidation } from "./api/loginApi";
import { TokenType, UserInfoType } from "./types/AuthTypes";
import Dashboard from "./pages/App/Dashboard";
import WebPage from "./pages/Home/WebPage";
import SignUp from "./pages/SignUp/SignUp";
import ErrorPage from "./pages/ErrorPage";
import AppRoot from "./pages/AppRoot";
import { RequireAuth } from "./helpers/RequireAuth";

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

            // I'm adding this to prevent nonAuth Users to login when try to add token from localstorage !
          } else {
            auth.logout();
          }

          // Here reject if there is no token almost the same as up I'll have ti check which one and test it !!
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
        <Route index element={<WebPage />} />
        <Route
          path="home/:token"
          element={
            // <RequireAuth>
            <Home />
            // </RequireAuth>
          }
        />

        {auth.token ? null : <Route path="login" element={<Login />} />}

        <Route
          path="app"
          element={
            <RequireAuth>
              <AppRoot />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* IF USER IS ALREADY SIGN IN , Don't show the router (show as error) */}
        {auth.token ? null : <Route path="signUp" element={<SignUp />} />}

        <Route key="notFound" path="*" element={<ErrorPage />}></Route>
      </Route>
    )
  );

  return <div>{loading ? <p></p> : <RouterProvider router={router} />}</div>;
};

export default App;
