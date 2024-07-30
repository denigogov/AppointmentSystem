// Icons
import SigninIcon from "../assets/signinIcon.svg";
import DashboardAppRootIcon from "../assets/DashboardAppRootIcon.svg";
import CalendarNavigation from "../assets/calendarNavigation.svg";
import SettingsNavIcon from "../assets/settingsNavIcon.svg";
import HelpNavIcon from "../assets/helpNavIcon.svg";
import UserNavMenu from "../assets/UserNavMenu.svg";
import ManagementNavIcon from "../assets/managementIcon.svg";

import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../styling/_appRoot.scss";

import { useState } from "react";
import { useAuth } from "../helpers/Auth";

const AppRoot = () => {
  const [openNavUser, setOpenNavUser] = useState<boolean>(false);
  const [, setClickedNavItem] = useState<boolean>(false);
  const auth = useAuth();

  const handleMobileMenu = () => {
    setOpenNavUser(!openNavUser);
    window.scrollTo(0, 0);
  };

  const handleClickedNavItem = () => {
    setClickedNavItem((e) => !e);
    setOpenNavUser(false);
  };

  return (
    <div className="appRoot-container">
      <nav
        onClick={handleClickedNavItem}
        className={
          openNavUser
            ? "appRoot-navigation"
            : "appRoot-navigation activeMobNavigation"
        }
      >
        <ul>
          <NavLink to="dashboard">
            <li>
              Dashboard
              <img src={DashboardAppRootIcon} alt="Dashboard Icon" />
            </li>
          </NavLink>

          {/* THIS ROUTE ONLY RESERVE FOR NOW ONLY FOR CUSTOMER !! */}
          {auth.userInfo?.type === 1 && (
            <NavLink to="appointments">
              <li>
                Appointments
                <img src={CalendarNavigation} alt="Calendar Icon" />
              </li>
            </NavLink>
          )}
          {auth.userInfo?.type === 3 && (
            <NavLink to="management">
              <li>
                Management
                <img src={ManagementNavIcon} alt="Settings Icon" />
              </li>
            </NavLink>
          )}

          <NavLink to="settings">
            <li>
              Settings
              <img src={SettingsNavIcon} alt="Settings Icon" />
            </li>
          </NavLink>

          <NavLink to="help">
            <li>
              Help
              <img src={HelpNavIcon} alt="Help icon" />
            </li>
          </NavLink>
        </ul>
        <div className="appRoot-nav_footer" onClick={() => auth.logout()}>
          <img src={SigninIcon} alt="signOut icon" />
          <p className="navLinkInfo">Sign out</p>
        </div>
      </nav>
      <div className="appNavMenu--icon" onClick={handleMobileMenu}>
        <img src={UserNavMenu} alt="app nav menu" />
        <p className="navLinkInfo">{auth.userInfo?.username ?? ""}</p>
      </div>
      <main className="appRoot-outlet test">
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;
