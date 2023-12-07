import HaircutIcon from "../../../assets/haircutIcon.svg";
import ColoringIcon from "../../../assets/ColoringIcon.svg";
import ShaveIcon from "../../../assets/shave.svg";
import defaultIcon from "../../../assets/defaultUpcomingEventIcon.svg";

import "../../../styling/Components/dashboard components/_dashboardUpcomingEvents.scss";
import { CustomerUpcomingEventType } from "../../../types/tableApiTypes";
import DashboardUpcomingEmpty from "./DashboardUpcomingEmpty";
import { convertISOtoLocalZoneFORMATED } from "../../../helpers/Dates";

// import DashboardUpcomingEmpty from "./DashboardUpcomingEmpty";

interface upcomingEventsDataProp {
  upcomingEventsData: CustomerUpcomingEventType[];
}

const DashboardUpcomingEvent = ({
  upcomingEventsData,
}: upcomingEventsDataProp) => {
  interface ServiceIconsTypes {
    Haircut?: string;
    Coloring?: string;
    Shave?: string;
  }

  const serviceIcons: ServiceIconsTypes = {
    Haircut: HaircutIcon,
    Coloring: ColoringIcon,
    Shave: ShaveIcon,
  };

  return (
    <div
      className="dashboardUpcomingEvent--container"
      style={
        upcomingEventsData.length
          ? { justifyContent: "" }
          : { justifyContent: "space-around" }
      }
    >
      <h4>Upcoming Appointments</h4>

      {upcomingEventsData.map((c, i) => {
        const dates: string | null = c?.scheduled_at ?? "";
        // const appointmentDate = new Date(dates).toUTCString().slice(0, 22);
        const appointmentDate = convertISOtoLocalZoneFORMATED(dates).slice(
          0,
          26
        );

        // For Icons! ...every service has his own icon!
        const serviceIconKey = c?.servicesName as keyof ServiceIconsTypes;
        const serviceIcon =
          (serviceIconKey && serviceIcons[serviceIconKey]) || defaultIcon;

        return (
          <div className="dashboardUpcomingEvent--wrap" key={i}>
            <div className="dashboardCustomer__event">
              <p className="navLinkInfo">Service</p>
              <h5>{c?.servicesName ?? "not found!"}</h5>
              <p className="navLinkInfo">Stylist</p>
              <h5>{`${c?.EmployeeFirstName ?? "not found"} ${
                c?.EmployeeLastName
              }`}</h5>
              <p className="navLinkInfo">Scheduled for</p>
              <h5>{appointmentDate}</h5>

              <p className="navLinkInfo">
                {c?.daysLeft === 0
                  ? `Today`
                  : c.daysLeft === 1
                  ? `Tommorow`
                  : `In ${c.daysLeft} Days`}
              </p>
            </div>

            <div className="dashboardCustomer__icon">
              <img src={serviceIcon} alt="service icon" />
            </div>
          </div>
        );
      })}

      {upcomingEventsData.length > 0 || <DashboardUpcomingEmpty />}
    </div>
  );
};

export default DashboardUpcomingEvent;
