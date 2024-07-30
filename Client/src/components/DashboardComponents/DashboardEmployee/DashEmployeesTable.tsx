import { useLocation, useNavigate } from "react-router-dom";
import { convertISOtoLocalZoneFORMATED } from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/DashboardEmployees/_dashEmplyTable.scss";
import "../../../styling/_datePickerStyling.scss";
import { allAppointmentsByDataRangeAndEmployTypes } from "../../../types/tableApiTypes";

const DashEmployeesTable = ({
  filterDataByService,
  appointmentsByDataRange,
  setPopupOpen,
}: {
  filterDataByService: allAppointmentsByDataRangeAndEmployTypes[];
  appointmentsByDataRange?: allAppointmentsByDataRangeAndEmployTypes[];
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const handleDetails = (
    customerData: allAppointmentsByDataRangeAndEmployTypes
  ) => {
    setPopupOpen((x) => !x);

    pathname === "/app" // fetching the current url because in outlet dashboard is INDEX element(after logged in user can see the dashboard without go to the route Dashboard!)
      ? navigator(`dashboard/user-details/${customerData.customerID}`)
      : navigator(`user-details/${customerData.customerID}`);
  };

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
          {appointmentsByDataRange
            ? filterDataByService.map((appointment, index) => {
                return (
                  <tr key={index}>
                    <td data-cell="#">{index + 1}</td>
                    <td
                      data-cell="Customer"
                      onClick={() => handleDetails(appointment)}
                      style={{ cursor: "pointer" }}
                    >
                      {appointment?.firstName ?? "not found"}
                      {appointment?.lastName ?? ""}
                    </td>
                    <td data-cell="Time">
                      {convertISOtoLocalZoneFORMATED(
                        appointment?.scheduled_at ?? ""
                      )}
                    </td>
                    <td data-cell="Service">
                      {appointment?.servicesName ?? "not found"}
                    </td>
                  </tr>
                );
              })
            : ""}

          {filterDataByService.length < 1 ? (
            <tr>
              <td data-cell="Status" colSpan={4}>
                No Appointments found
              </td>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashEmployeesTable;
