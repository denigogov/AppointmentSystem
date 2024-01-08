import { calcDaysBetween, dataMonthShow } from "../../../helpers/Dates";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_currentVacationView.scss";

interface CurrentVacationViewProps {
  timeManagement: TimeManagmentTypes;
}

const CurrentVacationView = ({ timeManagement }: CurrentVacationViewProps) => {
  const startDate: Date = new Date(timeManagement?.startDate ?? "");
  const endDate: Date = new Date(timeManagement?.endDate ?? "");
  const totalVacationDays = calcDaysBetween(startDate, endDate);

  const startDateFormated = dataMonthShow(timeManagement?.startDate ?? "");
  const endDateFormated = dataMonthShow(timeManagement?.endDate ?? "");

  return (
    <div className="currentVacationView--container">
      <p className="currentVacationView--title">Vacation Tracker</p>
      <div className="currentVacationView--wrap">
        <div className="currentVacationView--dates">
          <p>
            Vacation Start Date: <strong>{startDateFormated}</strong>
          </p>
          <p>
            Vacation End Date: <strong>{endDateFormated}</strong>
          </p>
          <p>
            Total Vacation Days
            <strong>
              {totalVacationDays} {totalVacationDays <= 1 ? "day" : "days"}
            </strong>
          </p>
        </div>
        <span className="currentVacationView__currentTime-btn">Edit</span>
      </div>
    </div>
  );
};

export default CurrentVacationView;
