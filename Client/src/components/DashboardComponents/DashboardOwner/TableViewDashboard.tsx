import "../../../styling/Components/dashboard components/DashboardOwner/_dashboardTableView.scss";

interface TableViewDashboardProps {
  // Define props here
}

const TableViewDashboard: React.FC<TableViewDashboardProps> = (
  {
    /* destructure props here */
  }
) => {
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
          <td data-cell="#">1</td>
          <td data-cell="First Name">Dejan Gogov</td>
          <td data-cell="Details">Icon</td>
        </tbody>{" "}
        <tbody>
          <td data-cell="#">2</td>
          <td data-cell="First Name">Dejan Gogov</td>
          <td data-cell="Details">Icon</td>
        </tbody>{" "}
        <tbody>
          <td data-cell="#">3</td>
          <td data-cell="First Name">Dejan Gogov</td>
          <td data-cell="Details">Icon</td>
        </tbody>{" "}
        <tbody>
          <td data-cell="#">4</td>
          <td data-cell="First Name">Dejan Gogov</td>
          <td data-cell="Details">Icon</td>
        </tbody>{" "}
        <tbody>
          <td data-cell="#">5</td>
          <td data-cell="First Name">Dejan Gogov</td>
          <td data-cell="Details">Icon</td>
        </tbody>{" "}
        {/* // <tbody>
            //   <tr>
            //     <td colSpan={parseInt("11")}>No Appointments found</td>
            //   </tr>
            // </tbody> */}
      </table>
    </div>
  );
};

export default TableViewDashboard;
