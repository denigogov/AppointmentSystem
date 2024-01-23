import { useRef } from "react";
import { useTimeManagementData } from "./TimeManagement";
import Swal from "sweetalert2";
import { useAuth } from "../../../helpers/Auth";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { apiGeneralErrorHandle } from "../../../helpers/api";
const API_URL = import.meta.env.VITE_API_URL as string;

const WorkTime = () => {
  const [timeManagement, setPopupOpen] = useTimeManagementData();
  const auth = useAuth();
  const navigate = useNavigate();

  const token = auth.token;
  const userId = auth.userInfo?.id;

  const startHourRef = useRef<HTMLInputElement>(null);
  const endHourRef = useRef<HTMLInputElement>(null);
  const startMinuteRef = useRef<HTMLInputElement>(null);
  const endMinuteRef = useRef<HTMLInputElement>(null);

  const handleUpdateWorkTime = async () => {
    const queryDate = {
      startHour: startHourRef.current?.value
        ? +startHourRef.current.value
        : null,
      endHour: endHourRef.current?.value ? +endHourRef.current.value : null,
      startMinute: startMinuteRef.current?.value
        ? +startMinuteRef.current.value
        : null,
      endMinute: endMinuteRef.current?.value
        ? +endMinuteRef.current.value
        : null,
    };

    // I need to Fix THIS ! !!!
    const isValid =
      typeof startHourRef.current?.value === "string" &&
      /^(0|[1-5]?\d|24)$/.test(startHourRef.current?.value) &&
      typeof endHourRef.current?.value === "string" &&
      /^(0|[1-5]?\d|24)$/.test(endHourRef.current?.value) &&
      typeof startMinuteRef.current?.value === "string" &&
      /^(?:[0-5]?[0-9]|60)$/.test(startMinuteRef.current?.value) &&
      typeof endMinuteRef.current?.value === "string" &&
      /^(?:[0-5]?[0-9]|60)$/.test(endMinuteRef.current?.value);

    if (!isValid) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter valid numeric values for hours and minutes.",
        confirmButtonColor: "#ffda79",
      });
      return;
    }

    const sendPrompt = Swal.fire({
      title: "Confirm Your Customized Work Schedule",
      text: "Before you proceed,  confirm your customized work schedule. Ensure it fits your preferences and needs.",
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
            body: JSON.stringify(queryDate),
          }
        );

        if (res.ok) {
          mutate(["timeManagment", token]);

          Swal.fire({
            position: "center",
            icon: "success",
            iconColor: "#ffda79",
            title: "Edited!",
            text: "Schedule Updated Successfully!",
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
    <div className="workTimeEdit--container ">
      <div className="workTime__text">
        <p>Customize Your Working Time</p>
        <p>Update or add details below to customize your work schedule</p>
      </div>

      <div className="workTime__inputs">
        <span>
          <input
            defaultValue={
              timeManagement?.startHour !== null
                ? timeManagement?.startHour.toString()
                : ""
            }
            ref={startHourRef}
            className="swing"
            type="number"
            placeholder="Start hour (e.g., 9)"
            min="1"
            max="24"
          />
          <label>Start Hour</label>
        </span>
        <span>
          <input
            defaultValue={
              timeManagement?.endHour !== null
                ? timeManagement?.endHour.toString()
                : ""
            }
            ref={endHourRef}
            className="swing"
            type="number"
            placeholder="End hour (e.g, 17)"
            min="1"
            max="24"
          />
          <label>End Hour</label>
        </span>
        <span>
          <input
            defaultValue={
              timeManagement?.startMinute !== null
                ? timeManagement?.startMinute.toString()
                : ""
            }
            ref={startMinuteRef}
            className="swing"
            type="number"
            placeholder="Start minute (e.g., 00)"
            min="0"
            max="60"
          />
          <label>Start Minute</label>
        </span>

        <span>
          <input
            defaultValue={
              timeManagement?.endMinute !== null
                ? timeManagement?.endMinute.toString()
                : ""
            }
            ref={endMinuteRef}
            className="swing"
            type="number"
            min="0"
            max="60"
            placeholder="End minute (e.g., 30)"
          />
          <label>End Minute</label>
        </span>
      </div>

      <button onClick={handleUpdateWorkTime} className="edit--save--btn">
        <span>Submit</span>
      </button>
    </div>
  );
};

export default WorkTime;
