import "../../../styling/Components/dashboard components/_dashboardUpcomingEvents.scss";
import { NavLink } from "react-router-dom";

const DashboardUpcomingEmpty = () => {
  return (
    <div className="dashboardUpcoming--Empty">
      <p>No Upcoming Appointments</p>
      <p>
        <NavLink className="navLinkInfo__link" to="/app/appointments">
          create one
        </NavLink>
      </p>
    </div>
  );
};

export default DashboardUpcomingEmpty;
