import "../../../styling/Components/dashboard components/_dashboardCustomerInfo.scss";
// import customerInfoIcon from "../../../assets/customerInfo.svg";
import malePersonalIcon from "../../../assets/customerInfo1.svg";
import femaleIcon from "../../../assets/femaleIcon.svg";
import otherIcon from "../../../assets/genderOtherIcon.svg";
import { CustomerPersonalInfo } from "../../../types/tableApiTypes";

interface DashboardCustomerInfoProps {
  customerInfoData: CustomerPersonalInfo[];
}

const DashboardCustomerInfo = ({
  customerInfoData,
}: DashboardCustomerInfoProps) => {
  const registrationDate = new Date(customerInfoData[0]?.customerRegistration)
    .toUTCString()
    .slice(0, 17);

  return (
    <div className="dashboardCustomer__wrap-info">
      <div className="customerIconName">
        <img
          src={
            customerInfoData[0]?.gender === "Male"
              ? malePersonalIcon
              : customerInfoData[0]?.gender === "Female"
              ? femaleIcon
              : otherIcon
          }
          alt="customer icon"
        />
        <p>
          {customerInfoData[0]?.CustomerFirstName ?? "unknow"}{" "}
          {customerInfoData[0]?.CustomerLastName ?? "unknow"}
        </p>
      </div>
      <div className="customerData">
        <p className="navLinkInfo">Email</p>
        <h5>{customerInfoData[0]?.customerEmail ?? "not added"}</h5>

        <p className="navLinkInfo">Number</p>
        <h5>{customerInfoData[0]?.customerPhone ?? "not found"}</h5>

        <p className="navLinkInfo">Register Since</p>
        <h5>{registrationDate ?? "no data"}</h5>
      </div>
    </div>
  );
};

export default DashboardCustomerInfo;
