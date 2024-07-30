import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";
import searchIcon from "../../../assets/searchIcon.svg";
import {
  FetchAllEmployeesTypes,
  FetchTop5CustomersTypes,
} from "../../../types/tableApiTypes";

interface TableViewDashboardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDetails: (user: any) => void;
  apiData?: (FetchTop5CustomersTypes | FetchAllEmployeesTypes)[];
}

const TableViewDashboard: React.FC<TableViewDashboardProps> = ({
  handleDetails,
  apiData,
}) => {
  // Type Guard

  const isFetchTop5Customers = (
    user: FetchTop5CustomersTypes | FetchAllEmployeesTypes
  ): user is FetchTop5CustomersTypes => {
    return (user as FetchTop5CustomersTypes).customerName !== undefined;
  };

  const isFetchAllEmployees = (
    user: FetchTop5CustomersTypes | FetchAllEmployeesTypes
  ): user is FetchAllEmployeesTypes => {
    return (user as FetchAllEmployeesTypes).firstName !== undefined;
  };
  return (
    <div className="dashboard__tableView_wrap">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {apiData?.length ? (
            apiData?.map((user, i) => (
              <tr key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="Name">
                  {isFetchTop5Customers(user)
                    ? user.customerName ?? "account deleted"
                    : isFetchAllEmployees(user)
                    ? `${user.firstName} ${user.lastName}`
                    : "account deleted"}
                </td>
                <td data-cell="Details">
                  <img
                    src={searchIcon}
                    alt="more detailsIcon"
                    onClick={() => handleDetails(user)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td data-cell="Status" colSpan={3}>
                no available data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableViewDashboard;
