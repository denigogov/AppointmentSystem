import useSWR from "swr";
import { fetchTimeManagment } from "../../../api/tableApi";
import TimeManagementView from "../../../components/Settings/TimeManagement/TimeManagementView";
import { useAuth } from "../../../helpers/Auth";
import { TimeManagmentTypes } from "../../../types/tableApiTypes";
import CurrentVacationView from "../../../components/Settings/TimeManagement/CurrentVacationView";
import "../../../styling/Components/SettingsComponents/TimeManagementComponent/_timeManagementPage.scss";

const TimeManagement = () => {
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
    return <h6>{"error happen"}</h6>;
  }

  if (timeManagmentLoading) {
    return <h6>loading...</h6>;
  }

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
        <TimeManagementView timeManagement={timeManagement![0]} />

        {timeManagement![0].startDate && (
          <CurrentVacationView timeManagement={timeManagement![0]} />
        )}
      </div>
    </div>
  );
};

export default TimeManagement;
