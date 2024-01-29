import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";
import TableViewDashboard from "./TableViewDashboard";

interface TopCustTableViewProps {
  // Define props here
}

const TopCustTableView: React.FC<TopCustTableViewProps> = (
  {
    /* destructure props here */
  }
) => {
  return (
    <div className="topCustTableView__container">
      Customer <TableViewDashboard />
    </div>
  );
};

export default TopCustTableView;
