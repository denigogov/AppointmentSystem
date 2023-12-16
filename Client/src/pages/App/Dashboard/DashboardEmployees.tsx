import DashEmployeesTable from "../../../components/DashboardComponents/DashboardEmployee/DashEmployeesTable";
import EmployeeTableSettings from "../../../components/DashboardComponents/DashboardEmployee/EmployeeTableSettings";
import "../../../styling/Dashboard/_dashboardEmployees.scss";
import ChartTest from "./ChartTest";

const DashboardEmployees = () => {
  return (
    <div className="dashboardEmployees__container">
      <div className="dashbaordEmployeeDataLeft">
        <div className="dashboardEmployees--wrap">
          <div className="employees__left--top">
            <div className="dashboardEmployees__chart--year">chart</div>
            <div className="dashboardEmployees__statistic--procent">box %</div>
          </div>
          <div className="employees__left--bottom">
            <div className="dashboardEmployees__statistic--statisticInfo">
              info statistc
            </div>

            <div className="dashboardEmployees__chart--hour">chart hours</div>
          </div>
        </div>
      </div>

      <div className="dashboardEmployee__table">
        <p>upcoming appointments</p>
        <EmployeeTableSettings />
        <DashEmployeesTable />
      </div>
    </div>
  );
};

export default DashboardEmployees;
