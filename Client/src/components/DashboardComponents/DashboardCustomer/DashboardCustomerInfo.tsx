import customerInfoIcon from "../../../assets/customerInfo.svg";
import "../../../styling/Components/dashboard components/_dashboardCustomerInfo.scss";
import { CustomerPersonalInfo } from "../../../types/tableApiTypes";

interface DashboardCustomerInfoProps {
  customerInfoData: CustomerPersonalInfo[];
}

const DashboardCustomerInfo = ({
  customerInfoData,
}: DashboardCustomerInfoProps) => {
  // SMALL BUG NEED TO FIX class className="dashboardCustomer__wrap-info" don't need to be inside of the map I added because there is UI error in my design !
  return (
    <div className="dashboardCustomer__wrap-info">
      {customerInfoData.map((custo, i) => {
        const registrationDate = new Date(custo?.customerRegistration)
          .toUTCString()
          .slice(0, 17);
        return (
          <div className="dashboardCustomer__wrap-info" key={i}>
            <div className="customerIconName">
              <img src={customerInfoIcon} alt="customer icon" />
              <p>
                {custo?.CustomerFirstName ?? "unknow"}{" "}
                {custo?.CustomerLastName ?? "unknow"}
              </p>
            </div>
            <div className="customerData">
              <p className="navLinkInfo">Email</p>
              <h5>{custo?.customerEmail ?? "not added"}</h5>

              <p className="navLinkInfo">Number</p>
              <h5>{custo?.customerPhone ?? "not found"}</h5>

              <p className="navLinkInfo">Register Since</p>
              <h5>{registrationDate}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCustomerInfo;
