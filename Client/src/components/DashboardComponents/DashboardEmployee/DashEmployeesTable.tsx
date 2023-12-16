import "../../../styling/Components/dashboard components/DashboardEmployees/_dashEmplyTable.scss";

const DashEmployeesTable = () => {
  return (
    <div className="dashboardEmployees__table--container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Time</th>
            <th>Service</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td data-cell="#">1</td>
            <td data-cell="Customer"> Dejan Gogov</td>
            <td data-cell="Time">15:00</td>
            <td data-cell="Service"> Haircut</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashEmployeesTable;
