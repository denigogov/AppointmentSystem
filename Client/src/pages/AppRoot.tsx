import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../styling/_appRoot.scss";

const AppRoot = () => {
  return (
    <div className="appRoot-container">
      <nav className="appRoot-navigation">
        <NavLink to="dashboard">Dashboard</NavLink>
        <NavLink to="dashboard">Appointments</NavLink>
        <NavLink to="dashboard">Settings</NavLink>
        <NavLink to="dashboard">Help</NavLink>
      </nav>
      <main className="appRoot-outlet">
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
