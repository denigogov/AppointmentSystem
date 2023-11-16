import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/Login";
// import Home from "./pages/Home/Home";
import { useAuth } from "./helpers/Auth";
import { useEffect, useState } from "react";
import { fetchTokenValidation } from "./api/loginApi";
import { RequireAuth } from "./helpers/RequireAuth";
import { TokenType, UserInfoType } from "./types/AuthTypes";
import Dashboard from "./pages/App/Dashboard";
import WebPage from "./pages/Home/WebPage";
import SignUp from "./pages/SignUp/SignUp";
import ErrorPage from "./pages/ErrorPage";

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
        <Route index element={<WebPage />} />
        {/* <Route
          path="home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        /> */}

        {auth.token ? null : (
          <Route key="login" path="login" element={<Login />} />
        )}

        <Route
          path="app"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route path="signUp" element={<SignUp />} />

        <Route key="notFound" path="*" element={<ErrorPage />}></Route>
      </Route>
    )
  );

  return <div>{loading ? <p></p> : <RouterProvider router={router} />}</div>;
};

export default App;
