import { useTimeManagementData } from "./TimeManagement";

const WorkTime = () => {
  const [timeManagement] = useTimeManagementData();

  return (
    <div>
      work time
      <button className="edit--save--btn">
        <span>Save</span>
      </button>
    </div>
  );
};

export default WorkTime;
