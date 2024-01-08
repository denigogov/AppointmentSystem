import { formatWorkHours } from "../../../helpers/Dates";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_timeManagementView.scss";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";

interface TimeManagementViewProps {
  timeManagement: TimeManagmentTypes;
}

const TimeManagementView = ({ timeManagement }: TimeManagementViewProps) => {
  const startTime = formatWorkHours(
    timeManagement?.startHour ?? 7,
    timeManagement?.startMinute ?? 0
  );

  const endTime = formatWorkHours(
    timeManagement?.endHour ?? 14,
    timeManagement?.endMinute ?? 0
  );

  return (
    <div className="timeManagementView--container">
      <p className="timeManagementView--title">Current Work Time Tracker</p>
      <p className="workTime-current">
        current working time
        <strong>
          {startTime} - {endTime}
        </strong>
      </p>

      <span className="timeManagement__currentTime-btn">Edit</span>
    </div>
  );
};
export default TimeManagementView;
