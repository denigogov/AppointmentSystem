import { convertISOtoLocalZoneFORMATED } from "../../../helpers/Dates";
import "../../../styling/Components/dashboard components/DashboardEmployees/_dashEmplyTable.scss";
import "../../../styling/_datePickerStyling.scss";
import { allAppointmentsByDataRangeAndEmployTypes } from "../../../types/tableApiTypes";

const DashEmployeesTable = ({
  filterDataByService,
  appointmentsByDataRange,
}: {
  filterDataByService: allAppointmentsByDataRangeAndEmployTypes[];
  appointmentsByDataRange?: allAppointmentsByDataRangeAndEmployTypes[];
}) => {
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
                    <td data-cell="Customer">
                      {appointment?.firstName ?? "not found"}{" "}
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
              <td colSpan={4}>No Appointments found</td>
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
