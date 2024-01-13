import { Link } from "react-router-dom";
import { formatWorkHours } from "../../../helpers/Dates";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_timeManagementView.scss";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import Swal from "sweetalert2";

interface TimeManagementViewProps {
  timeManagement: TimeManagmentTypes;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetDefaultValues: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}

const TimeManagementView = ({
  timeManagement,
  setPopupOpen,
  handleResetDefaultValues,
}: TimeManagementViewProps) => {
  const handlePopUp = () => {
    setPopupOpen((x) => !x);
  };

  const startTime = formatWorkHours(
    timeManagement?.startHour ?? 9,
    timeManagement?.startMinute ?? 0
  );

  const endTime = formatWorkHours(
    timeManagement?.endHour ?? 17,
    timeManagement?.endMinute ?? 0
  );

  const handleResetDefault = async (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    const sendPrompt = Swal.fire({
      title: "Confirm Reset to Default",
      html: "Resetting to default will set your work hours to the standard configuration from <strong>09:00 - 17:00</strong>. Any personalized work hours entries will be cleared. Continue?",
      icon: "warning",
      iconColor: "#ffda79",
      showCancelButton: true,
      confirmButtonColor: "#ffda79",
      cancelButtonColor: "#b7b7b7",
      confirmButtonText: "Confirm !",
    });
    if ((await sendPrompt).isConfirmed) {
      handleResetDefaultValues(e);
    }
  };

  return (
    <div className="timeManagementView--container">
      <p className="timeManagementView--title">Current Work Time</p>

      <p className="workTime-current">
        Current Work Time
        <strong>
          {startTime} - {endTime}
        </strong>
      </p>

      <span className="resetBtn--wrap">
        <Link
          to="work-time"
          className="timeManagement__currentTime-btn"
          onClick={handlePopUp}
        >
          Edit
        </Link>

        <h6 onClick={handleResetDefault}>Reset to Default</h6>
      </span>
    </div>
  );
};
export default TimeManagementView;
