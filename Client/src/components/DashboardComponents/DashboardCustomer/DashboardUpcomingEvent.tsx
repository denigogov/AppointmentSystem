import saloonChairIcon from "../../../assets/hairdressChair.svg";
import { calcDaysBetween } from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/_dashboardUpcomingEvents.scss";
import { CustomerUpcomingEventType } from "../../../types/tableApiTypes";

// import DashboardUpcomingEmpty from "./DashboardUpcomingEmpty";

interface upcomingEventsDataProp {
  upcomingEventsData: CustomerUpcomingEventType[];
}

const DashboardUpcomingEvent = ({
  upcomingEventsData,
}: upcomingEventsDataProp) => {
  // NEED TO FINISH THIS FN TO TELL HOW MANY DAYS LEFT TILL THE NEXT APPOINTMENT
  const RelativeTimeFormat = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  const calcDays = upcomingEventsData.map((c) => {
    const dates: string | null = c?.scheduled_at ?? "";
    const appointmentDate = new Date(dates);

    const startDate = new Date();
    const endDate = appointmentDate;
    const daysBetween = calcDaysBetween(startDate, endDate);
    return daysBetween;
  });

  // const formattedRelativeTime = calcDays.map((days) => {
  //   const unit = days < 0 ? "day" : "day";
  //   return RelativeTimeFormat.format(days, unit);
  // });

  // console.log(formattedRelativeTime);

  return (
    <div className="dashboardUpcomingEvent--container">
      <h4>Upcoming Appointments</h4>

      {upcomingEventsData.map((c, i) => {
        const dates: string | null = c?.scheduled_at ?? "";
        const appointmentDate = new Date(dates).toUTCString().slice(0, 17);

        return (
          <div className="dashboardUpcomingEvent--wrap" key={i}>
            {/* <DashboardUpcomingEmpty />  if there is not upcoming appointments ! */}
            <div className="dashboardCustomer__event">
              <p className="navLinkInfo">Service</p>
              <h5>{c?.servicesName ?? "not found!"}</h5>
              <p className="navLinkInfo">Stylist</p>
              <h5>{`${c?.EmployeeFirstName ?? "not found"} ${
                c?.EmployeeLastName
              }`}</h5>
              <p className="navLinkInfo">Scheduled for</p>
              <h5>{appointmentDate}</h5>

              <p className="navLinkInfo">{calcDays}</p>
            </div>

            <div className="dashboardCustomer__icon">
              <img src={saloonChairIcon} alt="barber chair" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardUpcomingEvent;
