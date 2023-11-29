import "../../../styling/Components/dashboard components/_dashboardCustomerRight.scss";

const DashboardCustomerRight = () => {
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
          <p>€ 81</p>
        </div>
      </div>
      <div className="dashboardCustomer__totalAppointments">
        <div>
          <p>Total Appointments</p>
          <p>4</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomerRight;
