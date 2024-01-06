import useSWR from "swr";
import { fetchTimeManagment } from "../../../api/tableApi";
import TimeManagementView from "../../../components/Settings/TimeManagement/TimeManagementView";
import { useAuth } from "../../../helpers/Auth";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import CurrentVacationView from "../../../components/Settings/TimeManagement/CurrentVacationView";

const TimeManagement = () => {
  const auth = useAuth();
  const token = auth.token;
  const userId = auth.userInfo?.id;

  const {
    data: timeManagment,
    error: timeManagmentError,
    isLoading: timeManagmentLoading,
  } = useSWR<TimeManagmentTypes[]>(["timeManagment", token], () =>
    fetchTimeManagment({ token, userId })
  );

  if (timeManagmentError) {
    return <h6>{"error happen"}</h6>;
  }

  if (timeManagmentLoading) {
    return <h6>loading...</h6>;
  }

  return (
    <div
      style={{ border: "1px solid #e0e0e0", minHeight: "calc(100vh - 220px)" }}
    >
      <h2 className="timeManagemen-title">Time Management</h2>

      <div className="timeManagement--text-container">
        <p className="timeManagemen-subTitle">
          Take charge of your schedule, set vacation days, and define working
          hours effortlessly. Streamline appointments for a well-balanced
          work-life experience.
        </p>
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        {timeManagment![0].startDate && (
          <CurrentVacationView timeManagment={timeManagment![0]} />
        )}
        <TimeManagementView timeManagment={timeManagment![0]} />
      </div>
    </div>
  );
};

export default TimeManagement;
