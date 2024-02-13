import {
  convertISOtoLocalZoneFORMATED,
  dataMonthShow,
} from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/_dashboardTable.scss";
import { CustomersDataTypes } from "../../../types/tableApiTypes";
// import editIcon from "../../../assets/editIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { mutate } from "swr";
import { useAuth } from "../../../helpers/Auth";
import {
  confirmDeletePrompt,
  deleteActionPrompt,
} from "../../ErrorSuccesMessage";
import { apiGeneralErrorHandle } from "../../../helpers/api";
const API_URL = import.meta.env.VITE_API_URL as string;

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
      const deletePrompt = await confirmDeletePrompt(
        "Cancel Appointment",
        "This action will cancel the appointment. Confirm your choice to proceed"
      );
      if (deletePrompt.isConfirmed) {
        const res = await fetch(`${API_URL}/tableRoute/appointment/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          mutate(["customerData", token]);
          // popUp after user click delete
          deleteActionPrompt();
        }
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
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
