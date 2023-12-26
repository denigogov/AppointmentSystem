import {
  convertISOtoLocalZoneFORMATED,
  dataMonthShow,
} from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/_dashboardTable.scss";
import { CustomersDataTypes } from "../../../types/tableApiTypes";
// import editIcon from "../../../assets/editIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import Swal from "sweetalert2";
import { mutate } from "swr";
import { useAuth } from "../../../helpers/Auth";

interface props {
  cusomerTableDashboardData: CustomersDataTypes[];
}

// TODO !! !!
//  1. if is possible to take appointment number 3 component to use for edit and user to be able to create new data
//  2  I send appointmentID and EmployeeID (appID I need for delete request ) and (EmployeeID for if we want to edit date and service !)

const DashboardCustomerTableView = ({ cusomerTableDashboardData }: props) => {
  const { token } = useAuth();

  const sortedData = cusomerTableDashboardData
    .slice()
    .sort(
      (a, b) =>
        new Date(a.created_at as string).getTime() -
        new Date(b.created_at as string).getTime()
    )
    .reverse();

  const handleDeleteAppointment = async (id: number) => {
    try {
      await Swal.fire({
        title: "Cancel Appointment",
        text: "This action will cancel the appointment. Confirm your choice to proceed",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ffda79    ",
        cancelButtonColor: "#b7b7b7",
        confirmButtonText: "Yes, delete it!",
      }).then(async (res) => {
        if (res.isConfirmed) {
          await fetch(`http://localhost:4000/tableRoute/appointment/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted!",
            text: "Your appointment has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

      mutate(["customerData", token]);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

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
              <th>Delete</th>
            </tr>
          </thead>
          {/* checking is the array have this property , I'm doing this because when the array is empty its not 100% empty because with only one query I have the all dashboard Data ! da vnimavam !!*/}
          {sortedData[0].created_at ? (
            <tbody>
              {sortedData.map((cust, i) => (
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
                    {convertISOtoLocalZoneFORMATED(
                      cust?.scheduled_at ?? "not found"
                    )}
                  </td>
                  <td data-cell="Price">{cust?.servicePrice ?? "Not Found"}</td>

                  <td data-cell="Delete">
                    {" "}
                    {cust?.daysLeft && cust?.daysLeft > 1 ? (
                      <img
                        src={deleteIcon}
                        alt="Delete Icon"
                        onClick={() =>
                          handleDeleteAppointment(cust.appointmentId)
                        }
                      />
                    ) : (
                      ""
                    )}
                  </td>
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
