import DashboardCustomerInfo from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerInfo";
import DashboardCustomerDataBox from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerDataBox";
import DashboardUpcomingEvent from "../../../components/DashboardComponents/DashboardCustomer/DashboardUpcomingEvent";
import DashboardCustomerTableView from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerTableView";
import "../../../styling/Dashboard/_dashboardCustomer.scss";

const DashboardCustomer = () => {
  return (
    <div className="dashboardCustomer--container">
      {/* Left Side */}
      <div className="customerInfo__dashboard--container">
        <div className="dashboardCustomer__info--wrap">
          <DashboardCustomerInfo />
        </div>
        <div className="dashboardCustomer__event--wrap">
          <DashboardUpcomingEvent />
        </div>
      </div>

      {/* Right Side */}
      <div className="customerRightInfo--dashboard">
        <DashboardCustomerDataBox />
        <DashboardCustomerTableView />
      </div>
    </div>
  );
};

export default DashboardCustomer;
