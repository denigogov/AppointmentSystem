import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "./helpers/Auth";
import { useEffect, useState } from "react";
import { fetchTokenValidation } from "./api/loginApi";
import { TokenType, UserInfoType } from "./types/AuthTypes";

import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import AppRoot from "./pages/AppRoot";
import Dashboard from "./pages/App/Dashboard/Dashboard";
import WebPage from "./pages/Home/WebPage";
import SignUp from "./pages/SignUp/SignUp";
import { RequireAuth } from "./helpers/RequireAuth";
import Appointment from "./pages/App/Appointment/Appointment";

// Settings Routes!
import SettingsRoot from "./pages/App/Settings/SettingsRoot";
import EditProfile from "./pages/App/Settings/EditProfile";
import TimeManagement from "./pages/App/Settings/TimeManagement";

import { OnlyEmployeesAccess } from "./helpers/AuthEmployee";
import { OnlyCustomersAccess } from "./helpers/AuthCustomers";
import UserDetailsRoute from "./pages/App/Dashboard/UserDetailsRoute";
import Vacation from "./pages/App/Settings/Vacation";
import WorkTime from "./pages/App/Settings/WorkTime";
import AppointmentInterval from "./pages/App/Settings/AppointmentInterval";
import ServiceRequest from "./pages/App/Settings/ServiceRequest";
import EmployeesDetailsRoute from "./pages/App/Dashboard/EmployeesDetailsRoute";
import ManagementRoot from "./pages/App/Management/ManagementRoot";
import { OnlyOwnerAccess } from "./helpers/AuthOwner";

// Owner Management Components
import CustomersRoot from "./pages/App/Management/Customers/CustomersRoot";
import EmployeesRoot from "./pages/App/Management/Employees/EmployeesRoot";
import ServicesRoot from "./pages/App/Management/Services/ServicesRoot";
import Approvals from "./pages/App/Management/Approvals/Approvals";

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
          } else {
            auth.logout();
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
          <Route path="dashboard" element={<Dashboard />}>
            <Route
              path="user-details/:id"
              element={
                //route only avaible to employers!
                // <OnlyEmployeesAccess>
                <UserDetailsRoute />
                // </OnlyEmployeesAccess>
              }
            />

            <Route
              path="employee-details/:id"
              element={<EmployeesDetailsRoute />}
            />
          </Route>

          {auth.userInfo?.type === 1 && (
            <Route
              path="appointments"
              element={
                // <OnlyCustomersAccess>  // If I add only auth it will redirect to the app but with current one when someone search for this route will give him error which is what I want !
                <Appointment />
                // </OnlyCustomersAccess>
              }
            />
          )}
          {/* Nested Routes for settings !  */}
          <Route path="settings" element={<SettingsRoot />}>
            <Route index element={<EditProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route
              path="time-management"
              element={
                <OnlyEmployeesAccess>
                  <TimeManagement />
                </OnlyEmployeesAccess>
              }
            >
              <Route path="vacation" element={<Vacation />} />
              <Route path="work-time" element={<WorkTime />} />
              <Route path="interval" element={<AppointmentInterval />} />
            </Route>

            <Route
              path="service-requests"
              element={
                <OnlyEmployeesAccess>
                  <ServiceRequest />
                </OnlyEmployeesAccess>
              }
            />
          </Route>

          {/* I'm adding the loggic with user type also just to show on other   */}
          {auth.userInfo?.type === 3 && (
            <Route
              path="management"
              element={
                <OnlyOwnerAccess>
                  <ManagementRoot />
                </OnlyOwnerAccess>
              }
            >
              <Route path="customers" element={<CustomersRoot />} />
              <Route path="employees" element={<EmployeesRoot />} />
              <Route path="service" element={<ServicesRoot />} />
              <Route path="approvals" element={<Approvals />} />
            </Route>
          )}
        </Route>

        {/* IF USER IS ALREADY SIGN IN , Don't show the router (show as error) */}
        {auth.token ? null : <Route path="signUp" element={<SignUp />} />}

        <Route
          key="notFound"
          path="*"
          element={
            <ErrorPage
              errorMessage="Page Not Found"
              navigateTo1="/app/dashboard"
            />
          }
        ></Route>
      </Route>
    )
  );

  return (
    <div>
      {loading ? <p>loading...</p> : <RouterProvider router={router} />}
    </div>
  );
};

export default App;
