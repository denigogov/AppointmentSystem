import customerInfoIcon from "../../../assets/customerInfo.svg";
import "../../../styling/Components/dashboard components/_dashboardCustomerInfo.scss";
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
        <img src={customerInfoIcon} alt="customer icon" />
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

// import customerInfoIcon from "../../../assets/customerInfo.svg";
// import "../../../styling/Components/dashboard components/_dashboardCustomerInfo.scss";

// const DashboardCustomerInfo = () => {

//   return (
//     <div className="dashboardCustomer__wrap-info">
//       <div className="customerIconName">
//         <img src={customerInfoIcon} alt="customer icon" />
//         <p>dejan gogov</p>
//       </div>
//       <div className="customerData">
//         <p className="navLinkInfo">Email</p>
//         <h5>deni.gogov@hotmail.com</h5>

//         <p className="navLinkInfo">Number</p>
//         <h5>31231231231312</h5>

//         <p className="navLinkInfo">Register Since</p>
//         <h5>22 nov 2025</h5>
//       </div>
//     </div>
//   );
// };

// export default DashboardCustomerInfo;
