import { useTimeManagementData } from "./TimeManagement";

const Vacation = () => {
  // const [timeManagement] = useOutletContext();
  const [timeManagement] = useTimeManagementData();

  console.log(timeManagement);

  return <div>vacation days</div>;
};

export default Vacation;
