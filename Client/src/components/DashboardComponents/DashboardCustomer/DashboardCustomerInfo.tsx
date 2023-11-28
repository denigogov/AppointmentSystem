import customerInfoIcon from "../../../assets/customerInfo.svg";
import { useAuth } from "../../../helpers/Auth";
import "../../../styling/Components/dashboard components/_dashboardCustomerInfo.scss";

const DashboardCustomerInfo = () => {
  return (
    <div className="dashboardCustomer__wrap-info">
      <div className="customerIconName">
        <img src={customerInfoIcon} alt="customer icon" />
        <p>Dejan Gogov</p>
      </div>

      <div className="customerData">
        <p className="navLinkInfo">Email</p>
        <h5>deni.gogov@hotmail.com</h5>

        <p className="navLinkInfo">Number</p>
        <h5>+49 01638843357</h5>

        <p className="navLinkInfo">Register Since</p>
        <h5>22 November 2023</h5>
      </div>
    </div>
  );
};

export default DashboardCustomerInfo;
