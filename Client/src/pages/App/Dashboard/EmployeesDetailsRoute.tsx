import useSWR from "swr";
import { useAuth } from "../../../helpers/Auth";
import { useParams } from "react-router-dom";

interface EmployeesDetailsRouteProps {
  // Define props here
}

const EmployeesDetailsRoute: React.FC<EmployeesDetailsRouteProps> = ({}) => {
  const { id } = useParams();
  const { token } = useAuth();

  // I need to create employees API , I need to decide what info will show !

  return <div>EmployeesDetails route </div>;
};

export default EmployeesDetailsRoute;
