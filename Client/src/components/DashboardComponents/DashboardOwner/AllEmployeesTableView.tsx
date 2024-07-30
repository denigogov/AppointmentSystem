import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";
import TableViewDashboard from "./TableViewDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { FetchAllEmployeesTypes } from "../../../types/tableApiTypes";
import LoadingRing from "../../loadingRing";

interface AllEmployeesTableViewProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allEmployees?: FetchAllEmployeesTypes[];
  allEmployeesLoading: boolean;
  allEmployeesError: Error;
}

const AllEmployeesTableView: React.FC<AllEmployeesTableViewProps> = ({
  setPopupOpen,
  allEmployees,
  allEmployeesLoading,
  allEmployeesError,
}) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleDetailsEmployees = (user: FetchAllEmployeesTypes) => {
    setPopupOpen((x) => !x);

    pathname === "/app" // fetching the current url because in outlet dashboard is INDEX element(after logged in user can see the dashboard without go to the route Dashboard!)
      ? navigator(`dashboard/employee-details/${user.id}`)
      : navigator(`employee-details/${user.id}`);
  };
  return (
    <div className="allEmployeesTableView__container">
      <p className="dashboard--TableTitle--owner">Employee Overview</p>
      {allEmployeesError && (
        <p className="globalTextError">{allEmployeesError?.message}</p>
      )}
      {allEmployeesLoading ? (
        <LoadingRing />
      ) : (
        <TableViewDashboard
          handleDetails={handleDetailsEmployees}
          apiData={allEmployees}
        />
      )}
    </div>
  );
};

export default AllEmployeesTableView;
