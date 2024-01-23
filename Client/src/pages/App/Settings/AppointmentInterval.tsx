import { useState } from "react";
import { useTimeManagementData } from "./TimeManagement";
import Swal from "sweetalert2";
import { mutate } from "swr";
import { useAuth } from "../../../helpers/Auth";
import { useNavigate } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../../helpers/api";
const API_URL = import.meta.env.VITE_API_URL as string;

const AppointmentInterval = () => {
  const [timeManagement, setPopupOpen] = useTimeManagementData();
  const [timeInterval, setTimeInterval] = useState<number | string>(
    timeManagement?.timeInterval ?? 30
  );

  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth.token;
  const userId = auth.userInfo?.id;

  const handleUpdateInterval = async () => {
    const sendQuery = {
      timeInterval: timeInterval ?? 30,
    };

    const sendPrompt = Swal.fire({
      title: "Finalize Your Schedule: Confirm Interval Changes!",
      text: "Seize the moment and optimize your appointments with adjusted intervals.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffda79",
      cancelButtonColor: "#b7b7b7",
      confirmButtonText: "Confirm !",
    });

    if ((await sendPrompt).isConfirmed) {
      try {
        const res = await fetch(
          `${API_URL}/tableRoute/timeManagement/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(sendQuery),
          }
        );

        if (res.ok) {
          mutate(["timeManagment", token]);

          Swal.fire({
            position: "center",
            icon: "success",
            iconColor: "#ffda79",
            title: "Great!",
            text: "Appointment Interval updated successfully. Your schedule is now customized!",
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/app/settings/time-management");
          setPopupOpen(false);
        } else throw new Error(`${res.statusText}`);
      } catch (err) {
        apiGeneralErrorHandle(err);
      }
    }
  };

  return (
    <div className="appointmentInterval--container">
      <div className="appointmentInterval__text">
        <p>Customize Your Appointment Interval</p>
        <p>
          Configure the timing details by adding or editing appointment
          intervals
        </p>
      </div>

      <div className="appointmentInterval__input">
        <p>
          Current Duration for Each Appointment
          <br />
          <strong> {timeInterval} minutes</strong>
        </p>
        <input
          onChange={(e) => setTimeInterval(e.target.value)}
          className="appIntervalRange-btn"
          type="range"
          min="0"
          max="100"
          defaultValue={timeManagement?.timeInterval ?? 30}
        />
      </div>

      <button onClick={handleUpdateInterval} className="edit--save--btn">
        <span>Submit</span>
      </button>
    </div>
  );
};

export default AppointmentInterval;
