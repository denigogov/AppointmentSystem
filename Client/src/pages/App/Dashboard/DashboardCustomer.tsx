import DashboardCustomerInfo from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerInfo";
import DashboardCustomerDataBox from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerDataBox";
import DashboardUpcomingEvent from "../../../components/DashboardComponents/DashboardCustomer/DashboardUpcomingEvent";
import DashboardCustomerTableView from "../../../components/DashboardComponents/DashboardCustomer/DashboardCustomerTableView";
import "../../../styling/Dashboard/_dashboardCustomer.scss";
import { useAuth } from "../../../helpers/Auth";
import useSWR from "swr";
import {
  CustomerPersonalInfo,
  CustomerDataBoxType,
  CustomersDataTypes,
  CustomerUpcomingEventType,
} from "../../../types/tableApiTypes";
import { fetchCustomerData } from "../../../api/tableApi";

const DashboardCustomer = () => {
  const auth = useAuth();

  const token = auth?.token;
  const { id, type } = auth.userInfo ?? {};

  const {
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
  } = useSWR<CustomersDataTypes[] | any>(["customerData", auth?.token], () =>
    fetchCustomerData({ id, type, token })
  );

  if (customerDataError) return <h6>{customerDataError.message}</h6>;
  if (customerDataLoading) return <></>;

  const customerInfoData: CustomerPersonalInfo[] = [
    {
      CustomerFirstName: customerData[0]?.CustomerFirstName,
      CustomerLastName: customerData[0]?.CustomerLastName,
      customerEmail: customerData[0]?.customerEmail,
      customerPhone: customerData[0]?.customerPhone,
      customerRegistration: customerData[0]?.customerRegistration,
    },
  ];

  const totalPrice = customerData.reduce(
    (total: number, customer: CustomersDataTypes) =>
      +total + (customer?.servicePrice ? +customer.servicePrice : 0),
    0
  );

  const countAppointments: CustomersDataTypes[] = customerData.some(
    (customer: CustomersDataTypes) => customer.scheduled_at?.length
  );

  const customerDataBox: CustomerDataBoxType = {
    totalAppointments: !countAppointments ? 0 : customerData.length,
    totalAmount: totalPrice ?? 0,
  };

  // const upcomingEventsData: CustomerUpcomingEventType[] = [
  //   {
  //     EmployeeFirstName: customerData[0]?.EmployeeFirstName,
  //     EmployeeLastName: customerData[0]?.EmployeeLastName,
  //     scheduled_at: customerData[0]?.scheduled_at,
  //     servicesName: customerData[0]?.servicesName,
  //   },
  // ];

  const upcomingEventsData = customerData.map((c: CustomersDataTypes) => {
    const eventData: CustomerUpcomingEventType = {
      EmployeeFirstName: c?.EmployeeFirstName,
      EmployeeLastName: c?.EmployeeLastName,
      scheduled_at: c?.scheduled_at,
      servicesName: c?.servicesName,
    };

    return eventData;
  });

  return (
    <div className="dashboardCustomer--container">
      {/* Left Side */}
      <div className="customerInfo__dashboard--container">
        <div className="dashboardCustomer__info--wrap">
          <DashboardCustomerInfo customerInfoData={customerInfoData} />
          {/* <DashboardCustomerInfo /> when I want to test without real data !  */}
        </div>
        <div className="dashboardCustomer__event--wrap">
          <DashboardUpcomingEvent upcomingEventsData={upcomingEventsData} />
        </div>
      </div>

      {/* Right Side */}
      <div className="customerRightInfo--dashboard">
        <DashboardCustomerDataBox customerDataBox={customerDataBox} />
        <DashboardCustomerTableView />
      </div>
    </div>
  );
};

export default DashboardCustomer;
