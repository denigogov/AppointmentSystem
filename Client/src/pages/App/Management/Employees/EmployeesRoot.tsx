import "../../../../styling/Management/_employeesRoot.scss";
import EmpTableView from "../../../../components/ManagementComponent/Employees/EmpTableView";
import { fetchAllEmployees, fetchUserData } from "../../../../api/tableApi";
import { useAuth } from "../../../../helpers/Auth";
import useSWR from "swr";
import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";

const EmployeesRoot = ({}) => {
  const { token } = useAuth();

  const {
    data: allEmployees,
    error: allEmployeesError,
    isLoading: allEmployeesLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(["allCustomers", token], () =>
    fetchAllEmployees(token ?? "")
  );

  if (allEmployeesError) allEmployeesError.message;

  if (allEmployeesLoading) return <p>loading...</p>;

  return (
    <div className="employeesRoot--container">
      <EmpTableView allEmployees={allEmployees} />
    </div>
  );
};

export default EmployeesRoot;
