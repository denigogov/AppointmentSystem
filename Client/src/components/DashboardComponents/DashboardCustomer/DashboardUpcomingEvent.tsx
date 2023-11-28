import saloonChairIcon from "../../../assets/hairdressChair.svg";
import "../../../styling/Components/dashboard components/_dashboardUpcomingEvents.scss";
import DashboardUpcomingEmpty from "./DashboardUpcomingEmpty";

const DashboardUpcomingEvent = () => {
  return (
    <div className="dashboardUpcomingEvent--container">
      <h4>Upcoming Appointments</h4>

      <div className="dashboardUpcomingEvent--wrap">
        {/* <DashboardUpcomingEmpty />  if there is not upcoming appointments ! */}
        <div className="dashboardCustomer__event">
          <p className="navLinkInfo">Service</p>
          <h5>Haircut</h5>
          <p className="navLinkInfo">Stylist</p>
          <h5>Mark Schere</h5>
          <p className="navLinkInfo">Scheduled for</p>
          <h5>01 Dec 2023</h5>

          <p className="navLinkInfo">in 10 days</p>
        </div>

        <div className="dashboardCustomer__icon">
          <img src={saloonChairIcon} alt="barber chair" />
        </div>
      </div>
    </div>
  );
};

export default DashboardUpcomingEvent;
