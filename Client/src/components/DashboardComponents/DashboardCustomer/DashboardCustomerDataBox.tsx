import "../../../styling/Components/dashboard components/_dashboardCustomerRight.scss";
import { CustomerDataBoxType } from "../../../types/tableApiTypes";

const DashboardCustomerRight = ({
  customerDataBox,
}: {
  customerDataBox: CustomerDataBoxType;
}) => {
  return (
    <div className="dashboardCustomerRight--container">
      <div className="dashboardCustomer__totalRandom">
        <div>
          <p>Total Point</p>
          <p>15/30</p>
        </div>
      </div>
      <div className="dashboardCustomer__totalAmount">
        <div>
          <p>Total Amount</p>
          <p>€ {customerDataBox?.totalAmount ?? 0}</p>
        </div>
      </div>
      <div className="dashboardCustomer__totalAppointments">
        <div>
          <p>Total Appointments</p>
          <p>{customerDataBox?.totalAppointments ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomerRight;
