import { NavLink } from "react-router-dom";
import editIcon from "../../assets/editUserIcon1.svg";
import "../../styling/Components/SettingsComponents/_settingsRootNav.scss";

const SettingsRootNav = () => {
  return (
    <div className="settingsRootContainer">
      <nav>
        <ul>
          <li>
            <NavLink to="edit-profile">
              <img src={editIcon} alt="" /> Personal Info
            </NavLink>
          </li>

          <li>
            <NavLink to="edit-profile1">
              <img src={editIcon} alt="" /> Personal Info{" "}
            </NavLink>
          </li>

          <li>
            <NavLink to="edit-profile1">
              <img src={editIcon} alt="" /> Personal Info{" "}
            </NavLink>
          </li>

          <li>
            <NavLink to="edit-profil1e">
              <img src={editIcon} alt="" /> Personal Info{" "}
            </NavLink>
          </li>

          <li>
            <NavLink to="edit-profile1">
              <img src={editIcon} alt="" /> Personal Info{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SettingsRootNav;
