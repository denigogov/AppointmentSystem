import "../../styling/Components/management components/_managementRootNav.scss";

import { NavLink } from "react-router-dom";
import contactsIcon from "../../assets/contactsIcon.svg";
import employeesIcon from "../../assets/employees.svg";
import servicesManagementIcon from "../../assets/servicesManagement.svg";
import approveIcon from "../../assets/approveIcon.svg";

const ManagementRootNav = () => {
  return (
    <div className="managementNav__root">
      <nav>
        <ul>
          <li>
            <NavLink to="customers">
              <img src={contactsIcon} alt="contactsIcon" /> Customers
            </NavLink>
          </li>

          <li>
            <NavLink to="employees">
              <img src={employeesIcon} alt="contactsIcon" /> Employees
            </NavLink>
          </li>

          <li>
            <NavLink to="service">
              <img src={servicesManagementIcon} alt="servicesManagementIcon" />
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="approvals">
              <img src={approveIcon} alt="approveIcon" />
              Approvals
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ManagementRootNav;
