import { useLocation, useNavigate } from "react-router-dom";
import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";
import TableViewDashboard from "./TableViewDashboard";
import { FetchTop5CustomersTypes } from "../../../types/tableApiTypes";
import LoadingRing from "../../loadingRing";

interface TopCustTableViewProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  top5Customers?: FetchTop5CustomersTypes[];
  top5CustomersLoading: Boolean;
  top5CustomersError: Error;
}

const TopCustTableView: React.FC<TopCustTableViewProps> = ({
  setPopupOpen,
  top5Customers,
  top5CustomersLoading,
  top5CustomersError,
}) => {
  const navigator = useNavigate();
  let { pathname } = useLocation();

  const handleDetailsCustomer = (user: FetchTop5CustomersTypes) => {
    setPopupOpen((x) => !x);

    pathname === "/app" // fetching the current url because in outlet dashboard is INDEX element(after logged in user can see the dashboard without go to the route Dashboard!)
      ? navigator(`dashboard/user-details/${user.customer_id}`)
      : navigator(`user-details/${user.customer_id}`);
  };

  return (
    <div className="topCustTableView__container">
      <p className="dashboard--TableTitle--owner">Top 5 Customers</p>
      {top5CustomersError && (
        <p className="globalTextError">{top5CustomersError?.message}</p>
      )}

      {top5CustomersLoading ? (
        <LoadingRing />
      ) : (
        <TableViewDashboard
          handleDetails={handleDetailsCustomer}
          apiData={top5Customers}
        />
      )}
    </div>
  );
};

export default TopCustTableView;
