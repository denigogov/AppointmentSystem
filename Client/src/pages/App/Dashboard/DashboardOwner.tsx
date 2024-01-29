import AllEmployeesTableView from "../../../components/DashboardComponents/DashboardOwner/AllEmployeesTableView";
import TopCustTableView from "../../../components/DashboardComponents/DashboardOwner/TopCustTableView";
import "../../../styling/Dashboard/_dashboardOwner.scss";

const DashboardOwner = () => {
  return (
    <div className="dashboard__container--main">
      <div className="dashboard__left--owner">Left Side Charter ....</div>
      <div className="dashboard__table--owner">
        <TopCustTableView />
        <AllEmployeesTableView />
      </div>
    </div>
  );
};

export default DashboardOwner;
