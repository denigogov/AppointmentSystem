import useSWR from "swr";
import { fetchTimeManagment } from "../../../api/tableApi";
import TimeManagementView from "../../../components/Settings/TimeManagement/TimeManagementView";
import { useAuth } from "../../../helpers/Auth";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import CurrentVacationView from "../../../components/Settings/TimeManagement/CurrentVacationView";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_timeManagementPage.scss";
import TimeManagementEmpty from "../../../components/Settings/TimeManagement/TimeManagementEmpty";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { mutate } from "swr";
import AppointmentIntervalView from "../../../components/Settings/TimeManagement/AppointmentIntervalView";
import Swal from "sweetalert2";

const TimeManagement = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const auth = useAuth();
  const token = auth.token;
  const userId = auth.userInfo?.id;

  const {
    data: timeManagement,
    error: timeManagmentError,
    isLoading: timeManagmentLoading,
  } = useSWR<TimeManagmentTypes[]>(["timeManagment", token], () =>
    fetchTimeManagment({ token, userId })
  );

  if (timeManagmentError) {
    return <h6>error happen</h6>;
  }

  if (timeManagmentLoading) {
    return <h6>loading...</h6>;
  }

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/app/settings/time-management");
  };

  // I didn't find the type for e.target.previousSibling.href;
  const handleResetDefaultValues = async (e: any) => {
    const findClickedTarget = e.target.previousSibling.href;

    const appointmentInterval = findClickedTarget.includes("interval");
    const vacation = findClickedTarget.includes("vacation");
    const workHours = findClickedTarget.includes("work");

    const appointmentIntervalQuery = [
      {
        timeInterval: null,
      },
    ];

    const vacationQuery = [
      {
        startDate: null,
        endDate: null,
      },
    ];

    const workTimeQuery = [
      {
        startHour: null,
        endHour: null,
        startMinute: null,
        endMinute: null,
      },
    ];

    const queringData =
      (vacation && vacationQuery) ||
      (appointmentInterval && appointmentIntervalQuery) ||
      (workHours && workTimeQuery);

    try {
      const sendQuery = queringData[0] || null;

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
          title: "Edited!",
          text: "Your Updates has been saved.",
          showConfirmButton: false,
          timer: 1500,
        });
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
  };

  return (
    <div className="timeManagement__main-container">
      <h2 className="timeManagemen-title">Time Management</h2>

      <div className="timeManagement--text-container">
        <p className="timeManagemen-subTitle">
          Take charge of your schedule, set vacation days, and define working
          hours effortlessly. Streamline appointments for a well-balanced
          work-life experience.
        </p>
      </div>

      <div className="timeManagement--wrap-components">
        {/* For Work Day */}
        {timeManagement![0].startHour || timeManagement![0].endHour ? (
          <TimeManagementView
            timeManagement={timeManagement![0]}
            setPopupOpen={setPopupOpen}
            handleResetDefaultValues={handleResetDefaultValues}
          />
        ) : (
          <TimeManagementEmpty
            title={"Optimize Your Availability"}
            subTitle={`Haven't set your work hours yet? No problem! We've applied default working hours 09:00 - 17:00 , Customize them here to better reflect your schedule.`}
            btnName={"Add"}
            setPopupOpen={setPopupOpen}
            linkName={"work-time"}
          />
        )}
        {/* For Vacation */}
        {timeManagement![0].startDate && timeManagement![0].endDate ? (
          <CurrentVacationView
            timeManagement={timeManagement![0]}
            setPopupOpen={setPopupOpen}
            handleResetDefaultValues={handleResetDefaultValues}
          />
        ) : (
          <TimeManagementEmpty
            title={"Customize Your Time Off"}
            subTitle={`Thinking about some time off? Add your vacation days to ensure your schedule is accurate and your clients are well-informed.`}
            btnName={"Add"}
            setPopupOpen={setPopupOpen}
            linkName={"vacation"}
          />
        )}
        {/* FOR Time interval */}
        {timeManagement![0].timeInterval ? (
          <AppointmentIntervalView
            setPopupOpen={setPopupOpen}
            timeManagement={timeManagement![0]}
            handleResetDefaultValues={handleResetDefaultValues}
          />
        ) : (
          <TimeManagementEmpty
            title={"Customize Appointment Timing"}
            subTitle={`Fine-tune your scheduling by editing the appointment time interval. The default interval is set to 30 minutes, but you can click the 'Edit' button below to customize it to your specific needs and enhance the efficiency of your appointments.`}
            btnName={"Add"}
            setPopupOpen={setPopupOpen}
            linkName={"interval"}
          />
        )}
      </div>

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={[timeManagement![0], setPopupOpen]} />
          </main>
        </div>
      )}
    </div>
  );
};

export const useTimeManagementData = () => {
  return useOutletContext<
    [TimeManagmentTypes[], React.Dispatch<React.SetStateAction<boolean>>]
  >();
};

export default TimeManagement;
