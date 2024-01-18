import { NavLink } from "react-router-dom";
import editIcon from "../../assets/userInfoPink.svg";
import timeManagementIcon from "../../assets/time-management-clock-svgrepo-com (1).svg";
import serviceRequestIcon from "../../assets/serviceRequest.svg";
import "../../styling/Components/SettingsComponents/_settingsRootNav.scss";
import { useAuth } from "../../helpers/Auth";

const SettingsRootNav = () => {
  const auth = useAuth();

  return (
    <div className="settingsRootContainer">
      <nav>
        <ul>
          <li>
            <NavLink to="edit-profile">
              <img src={editIcon} alt="editProfile icon" /> Personal Info
            </NavLink>
          </li>

          {auth.userInfo?.type === 2 && (
            <>
              <li>
                <NavLink to="time-management">
                  <img src={timeManagementIcon} alt="time management icon" />
                  Time Management
                </NavLink>
              </li>
              <li>
                <NavLink to="service-requests">
                  <img src={serviceRequestIcon} alt="service request icon" />
                  Service Requests
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SettingsRootNav;
