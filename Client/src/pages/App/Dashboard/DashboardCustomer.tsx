import DashboardCustomerInfo from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerInfo";
import DashboardCustomerDataBox from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerDataBox";
import DashboardUpcomingEvent from "../../../components/DashboardComponents/DashboardCustomer/DashboardUpcomingEvent";
import DashboardCustomerTableView from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerTableView";
import "../../../styling/Dashboard/_dashboardCustomer.scss";
import { useAuth } from "../../../helpers/Auth";
import useSWR from "swr";
import {
  CustomerPersonalInfo,
  CustomersDataTypes,
} from "../../../types/tableApiTypes";
import { fetchCustomerData } from "../../../api/tableApi";

const DashboardCustomer = () => {
  const auth = useAuth();

  const id = auth.userInfo?.id;
  const type = auth.userInfo?.type;
  const token = auth?.token;

  const {
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
  } = useSWR<CustomersDataTypes[] | any>(["customerData", token], () =>
    fetchCustomerData({ id, type, token })
  );

  if (customerDataError) return <h6>{customerDataError.message}</h6>;
  if (customerDataLoading) return <></>;

  console.log(customerData);

  const customerInfoData: CustomerPersonalInfo[] = [
    {
      CustomerFirstName: customerData[0]?.CustomerFirstName,
      CustomerLastName: customerData[0]?.CustomerLastName,
      customerEmail: customerData[0]?.customerEmail,
      customerPhone: customerData[0]?.customerPhone,
      customerRegistration: customerData[0]?.customerRegistration,
    },
  ];

  return (
    <div className="dashboardCustomer--container">
      {/* Left Side */}
      <div className="customerInfo__dashboard--container">
        <div className="dashboardCustomer__info--wrap">
          <DashboardCustomerInfo customerInfoData={customerInfoData} />
        </div>
        <div className="dashboardCustomer__event--wrap">
          <DashboardUpcomingEvent />
        </div>
      </div>

      {/* Right Side */}
      <div className="customerRightInfo--dashboard">
        <DashboardCustomerDataBox />
        <DashboardCustomerTableView />
      </div>
    </div>
  );
};

export default DashboardCustomer;
