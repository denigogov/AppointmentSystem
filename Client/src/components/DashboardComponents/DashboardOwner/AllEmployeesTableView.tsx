import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";
import TableViewDashboard from "./TableViewDashboard";

interface AllEmployeesTableViewProps {
  // Define props here
}

const AllEmployeesTableView: React.FC<AllEmployeesTableViewProps> = (
  {
    /* destructure props here */
  }
) => {
  return (
    <div className="allEmployeesTableView__container">
      Employee <TableViewDashboard />
    </div>
  );
};

export default AllEmployeesTableView;
