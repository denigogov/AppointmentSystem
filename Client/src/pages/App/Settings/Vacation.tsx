import { useState } from "react";
import { useTimeManagementData } from "./TimeManagement";
import ReactDatePicker from "react-datepicker";
import { useAuth } from "../../../helpers/Auth";
import { mutate } from "swr";
import Swal from "sweetalert2";
import { convertISOtoLocalZone } from "../../../helpers/Dates";
import { useNavigate } from "react-router-dom";

const Vacation = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [timeManagement, setPopupOpen] = useTimeManagementData();
  const auth = useAuth();
  const navigate = useNavigate();

  const token = auth.token;
  const userId = auth.userInfo?.id;

  const formatStartDate = startDate ? convertISOtoLocalZone(startDate) : null;
  const formatEndDate = endDate ? convertISOtoLocalZone(endDate) : null;

  const setDateRange = (date: [Date | null, Date | null]): void => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
  };

  const handleUpdateVacation = async () => {
    const sendQuery = {
      startDate: formatStartDate || null,
      endDate: formatEndDate || null,
    };

    const sendPrompt = Swal.fire({
      title: "Finalize Your Adventure: Confirm Your Booking!",
      text: "Seize the moment and embark on the vacation you've always imagined",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffda79",
      cancelButtonColor: "#b7b7b7",
      confirmButtonText: "Confirm !",
    });

    if ((await sendPrompt).isConfirmed && sendQuery.endDate) {
      try {
        const res = await fetch(
          `http://localhost:4000/tableRoute/timeManagement/${userId}`,
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
            title: "Edited!",
            text: "Vacation booked successfully. Enjoy your time off!",
            showConfirmButton: false,
            timer: 2000,
          });

          navigate("/app/settings/time-management");

          setPopupOpen(false);
        } else throw new Error(`${res.statusText}`);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#ffda79",
          text: `${(err as Error).message}, please try again  ${
            (err as Error).message
          }!!`,
        });
      }
    } else if (!sendQuery.endDate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonColor: "#ffda79",
        text: "It looks like we're missing your end date for the vacation",
      });
    }
  };

  return (
    <div className="vacation__page--container">
      <div className="vacation__page--text">
        <p>Customize Your Time Off</p>
        <p>Personalize your break by adding or editing vacation details.</p>
      </div>

      <div className="datePicker-vacation">
        <ReactDatePicker
          selected={startDate}
          onChange={setDateRange}
          minDate={new Date()}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>

      <button onClick={handleUpdateVacation} className="edit--save--btn">
        <span>Submit</span>
      </button>
    </div>
  );
};

export default Vacation;
