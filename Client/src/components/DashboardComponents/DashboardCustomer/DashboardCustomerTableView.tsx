import "../../../styling/Components/dashboard components/_dashboardTable.scss";

const DashboardCustomerTableView = () => {
  return (
    <div>
      <div className="table-customersAppointments">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Employee</th>
              <th>Created At</th>
              <th>Scheduled At</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <td>Haircut</td>
            <td>Mark Tween</td>
            <td>01.11.2023</td>
            <td>05.11.2023</td>
            <td>$ 20</td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCustomerTableView;
