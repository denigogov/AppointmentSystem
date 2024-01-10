import { useTimeManagementData } from "./TimeManagement";

const WorkTime = () => {
  const [timeManagement] = useTimeManagementData();

  return <div>work time</div>;
};

export default WorkTime;
