import { calcDaysBetween, dataMonthShow } from "../../../helpers/Dates";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_currentVacationView.scss";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface CurrentVacationViewProps {
  timeManagement: TimeManagmentTypes;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetDefaultValues: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}

const CurrentVacationView = ({
  timeManagement,
  setPopupOpen,
  handleResetDefaultValues,
}: CurrentVacationViewProps) => {
  const startDate: Date = new Date(timeManagement?.startDate ?? "");
  const endDate: Date = new Date(timeManagement?.endDate ?? "");
  const totalVacationDays = calcDaysBetween(startDate, endDate) + 1;

  const startDateFormated = dataMonthShow(timeManagement?.startDate ?? "");
  const endDateFormated = dataMonthShow(timeManagement?.endDate ?? "");

  const handlePopUp = () => {
    setPopupOpen((x) => !x);
  };

  const handleResetDefault = async (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    const sendPrompt = Swal.fire({
      title: "Confirm Reset to Default",
      text: "Are you sure you want to reset the vacation tracker to its default settings? This action will revert your customized settings to the standard configuration. Any personalized vacation days entries will be cleared.",
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
    <div className="currentVacationView--container">
      <p className="currentVacationView--title">Vacation Tracker</p>
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
      <span className="resetBtn--wrap">
        <Link
          to="vacation"
          className="currentVacationView__currentTime-btn"
          onClick={handlePopUp}
        >
          Edit
        </Link>

        <h6 onClick={handleResetDefault}>Reset to Default</h6>
      </span>
    </div>
  );
};

export default CurrentVacationView;
