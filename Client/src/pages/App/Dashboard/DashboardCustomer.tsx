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
import { calcDaysBetween } from "../../../helpers/Dates";

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
  if (customerDataLoading) return <p>loading...</p>;

  const customerInfoData: CustomerPersonalInfo[] = [
    {
      CustomerFirstName: customerData[0]?.CustomerFirstName,
      CustomerLastName: customerData[0]?.CustomerLastName,
      customerEmail: customerData[0]?.customerEmail,
      customerPhone: customerData[0]?.customerPhone,
      customerRegistration: customerData[0]?.customerRegistration,
      gender: customerData[0]?.gender,
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

  const upcomingEventsData = customerData
    .map((c: CustomersDataTypes) => {
      // Logic for upcoming Appoitmnet !
      const dates: string | null = c?.scheduled_at ?? "";
      const convertingToDate = new Date(dates);
      const startDate = new Date();
      const endDate = convertingToDate;
      const daysBetween = calcDaysBetween(startDate, endDate);
      const nonNegativeDays = daysBetween >= 0 ? daysBetween : null;

      const eventData: CustomerUpcomingEventType = {
        EmployeeFirstName: c?.EmployeeFirstName,
        EmployeeLastName: c?.EmployeeLastName,
        scheduled_at: c?.scheduled_at,
        servicesName: c?.servicesName,
        daysLeft: nonNegativeDays,
      };

      return eventData;
    })
    .filter(
      (event: CustomerUpcomingEventType) =>
        event?.daysLeft !== null &&
        event?.daysLeft !== undefined &&
        event?.daysLeft >= 0
    );

  const cusomerTableDashboardData = customerData.map(
    (c: CustomersDataTypes) => {
      const tableData = {
        EmployeeFirstName: c?.EmployeeFirstName,
        EmployeeLastName: c?.EmployeeLastName,
        servicesName: c?.servicesName,
        created_at: c?.created_at,
        scheduled_at: c?.scheduled_at,
        servicePrice: c.servicePrice,
      };

      return tableData.created_at ? tableData : null;
    }
  );

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
        <DashboardCustomerTableView
          cusomerTableDashboardData={cusomerTableDashboardData}
        />
      </div>
    </div>
  );
};

export default DashboardCustomer;
