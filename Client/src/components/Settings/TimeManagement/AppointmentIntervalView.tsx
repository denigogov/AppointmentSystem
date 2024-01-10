import { Link } from "react-router-dom";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_appointmentIntervalView.scss";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import Swal from "sweetalert2";

interface AppointmentIntervalViewProps {
  timeManagement: TimeManagmentTypes;
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetDefaultValues: (e: React.MouseEvent<HTMLHeadingElement>) => void;
}

const AppointmentIntervalView = ({
  setPopupOpen,
  timeManagement,
  handleResetDefaultValues,
}: AppointmentIntervalViewProps) => {
  const handlePopUp = () => {
    setPopupOpen((x) => !x);
  };

  const handleResetDefault = async (
    e: React.MouseEvent<HTMLHeadingElement>
  ) => {
    // http://localhost:4000/tableRoute/timeManagement/50
    const sendPrompt = Swal.fire({
      title: "Confirm Reset to Default",
      html: "Are you sure you want to reset the appointment interval to the default setting? Confirming will revert the interval to the standard duration of <strong>30 minutes</strong>",
      icon: "warning",
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
    <div className="appointmentIntervalView__container">
      <div className="intervalView__container--title">
        <p>Current Appointment Interval</p>
      </div>

      <div className="interval--current">
        <p>
          Current Duration for Each Appointment
          <span>
            <strong>{timeManagement?.timeInterval ?? "30"} minutes</strong>
          </span>
        </p>
      </div>

      <span>
        <Link
          to="interval"
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

export default AppointmentIntervalView;
