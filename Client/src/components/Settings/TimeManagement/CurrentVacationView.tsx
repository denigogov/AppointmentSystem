import { calcDaysBetween, dataMonthShow } from "../../../helpers/Dates";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_currentVacationView.scss";

interface CurrentVacationViewProps {
  timeManagment: TimeManagmentTypes;
}

const CurrentVacationView = ({ timeManagment }: CurrentVacationViewProps) => {
  const startDate: Date = new Date(timeManagment?.startDate ?? "");
  const endDate: Date = new Date(timeManagment?.endDate ?? "");
  const totalVacationDays = calcDaysBetween(startDate, endDate);

  const startDateFormated = dataMonthShow(timeManagment?.startDate ?? "");
  const endDateFormated = dataMonthShow(timeManagment?.endDate ?? "");

  return (
    <div className="currentVacationView--container">
      <p>Vacation Tracker</p>
      <p>
        Vacation Start Date: <strong> {startDateFormated}</strong>
      </p>
      <p>
        Vacation End Date: <strong>{endDateFormated}</strong>
      </p>
      <p>
        Total Vacation Days:{" "}
        <strong>
          {totalVacationDays} {totalVacationDays <= 1 ? "day" : "days"}
        </strong>
      </p>
    </div>
  );
};

export default CurrentVacationView;
