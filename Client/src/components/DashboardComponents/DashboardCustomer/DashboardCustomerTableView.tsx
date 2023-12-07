import { dataMonthShow } from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/_dashboardTable.scss";
import { CustomersDataTypes } from "../../../types/tableApiTypes";

interface props {
  cusomerTableDashboardData: CustomersDataTypes[];
}

const DashboardCustomerTableView = ({ cusomerTableDashboardData }: props) => {
  return (
    <div className="customerApp--wrap">
      <h4>All Appointments</h4>
      <div className="table-customersAppointments">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Employee</th>
              <th>Created At</th>
              <th>Scheduled Date</th>
              <th>Price</th>
            </tr>
          </thead>
          {cusomerTableDashboardData[0] !== null ? (
            <tbody>
              {cusomerTableDashboardData.map((cust, i) => (
                <tr key={i}>
                  <td data-cell="Service">
                    {cust?.servicesName ?? "not found"}
                  </td>
                  <td data-cell="Employee">
                    {cust?.EmployeeFirstName}{" "}
                    {cust?.EmployeeLastName ?? "not found"}
                  </td>
                  <td data-cell="Created At">
                    {" "}
                    {dataMonthShow(cust?.created_at ?? "not found")}
                  </td>
                  <td data-cell="Scheduled Date">
                    {dataMonthShow(cust?.scheduled_at ?? "not found")}
                  </td>
                  <td data-cell="Price">{cust?.servicePrice ?? "Not Found"}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={parseInt("11")}>No Appointments found</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default DashboardCustomerTableView;
