import useSWR from "swr";
import "../../../styling/Dashboard/_dashboardOwner.scss";
import { fetchAllEmployees, fetchTop5Customers } from "../../../api/tableApi";
import {
  FetchAllEmployeesTypes,
  FetchTop5CustomersTypes,
} from "../../../types/tableApiTypes";
import AllEmployeesTableView from "../../../components/DashboardComponents/DashboardOwner/AllEmployeesTableView";
import TopCustTableView from "../../../components/DashboardComponents/DashboardOwner/TopCustTableView";
import { useAuth } from "../../../helpers/Auth";
import DashboardCardTop from "../../../components/DashboardComponents/DashboardOwner/DashboardCardTop";

interface DashboardOwnerProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardOwner: React.FC<DashboardOwnerProps> = ({ setPopupOpen }) => {
  const { token, userInfo } = useAuth();

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
      <div className="dashboard__left--owner">
        {/* Username Title */}
        <div className="dashboardleft__owner--WelcomeText">
          <h3>Welcome {userInfo?.username ?? "username"}</h3>
          <p>Lorem, ipsum dolor. lorem</p>
        </div>

        <div className="dashboardLeft__cards--top">
          <DashboardCardTop
            title="Budget"
            value="€750.90"
            footer="Total Revenue"
            hexColor="#e5d4ef"
          />
          <DashboardCardTop
            title="Clients"
            value={60}
            footer="Clients total"
            hexColor="#80b3ff"
          />
        </div>
      </div>
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
