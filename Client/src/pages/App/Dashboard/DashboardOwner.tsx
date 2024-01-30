import useSWR from "swr";
import { fetchAllEmployees, fetchTop5Customers } from "../../../api/tableApi";
import AllEmployeesTableView from "../../../components/DashboardComponents/DashboardOwner/AllEmployeesTableView";
import TopCustTableView from "../../../components/DashboardComponents/DashboardOwner/TopCustTableView";
import "../../../styling/Dashboard/_dashboardOwner.scss";
import {
  FetchAllEmployeesTypes,
  FetchTop5CustomersTypes,
} from "../../../types/tableApiTypes";
import { useAuth } from "../../../helpers/Auth";

interface DashboardOwnerProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardOwner: React.FC<DashboardOwnerProps> = ({ setPopupOpen }) => {
  const { token } = useAuth();

  const {
    data: top5Customers,
    error: top5CustomersError,
    isLoading: top5CustomersLoading,
  } = useSWR<FetchTop5CustomersTypes[]>(["top5Customers", token], () =>
    fetchTop5Customers(token ?? "")
  );
  const {
    data: allEmployees,
    error: allEmployeesError,
    isLoading: allEmployeesLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(["allCustomers", token], () =>
    fetchAllEmployees(token ?? "")
  );

  if (top5CustomersError || allEmployeesError)
    return <h6>{top5CustomersError.message}</h6>;
  if (top5CustomersLoading || allEmployeesLoading) return <p>loading...</p>;

  return (
    <div className="dashboard__container--main">
      <div className="dashboard__left--owner">Left Side Charter ....</div>
      <div className="dashboard__table--owner">
        <TopCustTableView
          setPopupOpen={setPopupOpen}
          top5Customers={top5Customers}
        />
        <AllEmployeesTableView
          setPopupOpen={setPopupOpen}
          allEmployees={allEmployees}
        />
      </div>
    </div>
  );
};

export default DashboardOwner;
