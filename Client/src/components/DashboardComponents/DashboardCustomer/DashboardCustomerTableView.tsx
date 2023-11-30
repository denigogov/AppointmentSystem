import "../../../styling/Components/dashboard components/_dashboardTable.scss";

const DashboardCustomerTableView = () => {
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
              <th>Scheduled At</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-cell="Service">Haircut</td>
              <td data-cell="Employee">Mark Tween</td>
              <td data-cell="Created At">01.11.2023</td>
              <td data-cell="Scheduled At">05.11.2023</td>
              <td data-cell="Price">20 €</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardCustomerTableView;
