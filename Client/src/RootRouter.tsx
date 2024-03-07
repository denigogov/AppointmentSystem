import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useAuth } from "./helpers/Auth";
import { RequireAuth } from "./helpers/RequireAuth";

import AppRoot from "./pages/AppRoot";
import Dashboard from "./pages/App/Dashboard/Dashboard";
import ErrorPage1 from "./pages/ErrorPage";
import UserDetailsRoute from "./pages/App/Dashboard/UserDetailsRoute";
import EmployeesDetailsRoute from "./pages/App/Dashboard/EmployeesDetailsRoute";
import Appointment from "./pages/App/Appointment/Appointment";
import SettingsRoot from "./pages/App/Settings/SettingsRoot";
import EditProfile from "./pages/App/Settings/EditProfile";
import { OnlyEmployeesAccess } from "./helpers/AuthEmployee";
import TimeManagement from "./pages/App/Settings/TimeManagement";
import Vacation from "./pages/App/Settings/Vacation";
import WorkTime from "./pages/App/Settings/WorkTime";
import AppointmentInterval from "./pages/App/Settings/AppointmentInterval";
import ServiceRequest from "./pages/App/Settings/ServiceRequest";
import { OnlyOwnerAccess } from "./helpers/AuthOwner";
import ManagementRoot from "./pages/App/Management/ManagementRoot";
import CustomersRoot from "./pages/App/Management/Customers/CustomersRoot";
import CustomerDetails from "./pages/App/Management/Customers/CustomerDetails";
import EmployeesRoot from "./pages/App/Management/Employees/EmployeesRoot";
import EmployeesEdit from "./pages/App/Management/Employees/EmployeesEdit";
import EmployeesCreate from "./pages/App/Management/Employees/EmployeesCreate";
import ServicesRoot from "./pages/App/Management/Services/ServicesRoot";
import ServiceCreate from "./pages/App/Management/Services/ServiceCreate";
import Approvals from "./pages/App/Management/Approvals/Approvals";
import SignUp from "./pages/SignUp/SignUp";
import Root from "./pages/Root";
import WebPage from "./pages/Home/WebPage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";

const RootRouter: React.FC = ({}) => {
  const auth = useAuth();

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
          <Route
            path="dashboard"
            element={<Dashboard />}
            errorElement={
              <ErrorPage1
                errorMessage="Something Went Very Wrong"
                navigateTo1="/app/dashboard"
              />
            }
          >
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
              errorElement={<ErrorPage1 navigateTo1="/app/dashboard" />}
            >
              <Route index element={<EmployeesRoot />} />
              <Route path="customers" element={<CustomersRoot />}>
                <Route path="details/:id" element={<CustomerDetails />} />
              </Route>

              <Route path="employees" element={<EmployeesRoot />}>
                <Route path="details/:id" element={<EmployeesDetailsRoute />} />
                <Route path="edit/:id" element={<EmployeesEdit />} />
                <Route path="create" element={<EmployeesCreate />} />
              </Route>
              <Route path="service" element={<ServicesRoot />}>
                <Route path="create" element={<ServiceCreate />} />
              </Route>
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
            <ErrorPage1
              errorMessage="Page Not Found"
              navigateTo1="/app/dashboard"
            />
          }
          errorElement={
            <ErrorPage1
              errorMessage="Something Went Very Wrong"
              navigateTo1="/app/dashboard"
            />
          }
        ></Route>
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RootRouter;
