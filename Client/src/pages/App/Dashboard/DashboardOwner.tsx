import useSWR from "swr";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import {
  fetchAllEmployees,
  fetchAppointmentsByDayAndTotal,
  fetchTop5Customers,
} from "../../../api/tableApi";
import {
  FetchAllEmployeesTypes,
  FetchAppointmentsByDayAndTotalTypes,
  FetchTop5CustomersTypes,
} from "../../../types/tableApiTypes";
import AllEmployeesTableView from "../../../components/DashboardComponents/DashboardOwner/AllEmployeesTableView";
import TopCustTableView from "../../../components/DashboardComponents/DashboardOwner/TopCustTableView";
import { useAuth } from "../../../helpers/Auth";
import DashboardCardTop from "../../../components/DashboardComponents/DashboardOwner/DashboardCardTop";
import DashLineChart from "../../../components/DashboardComponents/DashboardOwner/DashLineChart";

import "../../../styling/Dashboard/_dashboardOwner.scss";

import moneyRevenue from "../../../assets/moneyRevenue.svg";
import topServiceRocketIcon from "../../../assets/topServiceRocketIcon.svg";
import totalAppDashIcon from "../../../assets/totalAppDashIcon.svg";
import totalAppDashIcon1 from "../../../assets/totalAppDashIcon1.svg";
import bestEmployee from "../../../assets/bestEmployee.svg";
import daylyCountAppIcon from "../../../assets/daylyCountAppIcon.svg";

interface DashboardOwnerProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardOwner: React.FC<DashboardOwnerProps> = ({ setPopupOpen }) => {
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<any>(null);

  const auth = useAuth();
  const token = auth.token ?? "";
  const userInfo = auth.userInfo;

  // data for table
  const {
    data: top5Customers,
    error: top5CustomersError,
    isLoading: top5CustomersLoading,
  } = useSWR<FetchTop5CustomersTypes[]>(["top5Customers", token], () =>
    fetchTop5Customers(token ?? "")
  );
  // data for table
  const {
    data: allEmployees,
    error: allEmployeesError,
    isLoading: allEmployeesLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(["allCustomers", token], () =>
    fetchAllEmployees(token ?? "")
  );

  // chart Data data for every day of the week ... monday,thuesday ... by year and month
  const {
    data: allAppointmentsByDay,
    error: allAppointmentsByDayError,
    isLoading: allAppointmentsByDayLoading,
  } = useSWR<FetchAppointmentsByDayAndTotalTypes[]>(
    ["allAppointmentsByDay", token],
    () => fetchAppointmentsByDayAndTotal({ token })
  );

  if (top5CustomersError || allEmployeesError || allAppointmentsByDayError)
    return (
      <h6>
        {top5CustomersError?.message ||
          allEmployeesError?.message ||
          allAppointmentsByDayError?.message}
      </h6>
    );
  if (
    top5CustomersLoading ||
    allEmployeesLoading ||
    allAppointmentsByDayLoading
  )
    return <p>loading...</p>;

  const handleDataRange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="dashboard__container--main">
      <div className="dashboard__left--owner-container">
        {/* Top of the Dashbaord */}
        <div className="dashboardTop--wrap">
          <div className="dashboardleft__owner--WelcomeText">
            {/* */}
            {/* Username Title */}
            <h3>Welcome {userInfo?.username ?? "username"}</h3>
            <p>Lorem, ipsum dolor. lorem</p>
          </div>
          <div className="ownerDashobar--datepicker">
            <ReactDatePicker
              className="form-control form-control-solid w-250px date-picker"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={handleDataRange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              withPortal
            ></ReactDatePicker>
          </div>
        </div>

        {/* CardsTop */}
        <div className="dashboardLeft__cards--top">
          <DashboardCardTop
            title="Total Revenue"
            value="€750.90"
            footer="Financial Overview"
            hexColor="#e91e63"
            svgIcon={moneyRevenue}
            cardFlexSize="0.3 20%"
          />
          <DashboardCardTop
            title="Top Performing Service"
            value="Haircut"
            footer="Service Analytics"
            hexColor="#e67e22"
            svgIcon={topServiceRocketIcon}
            cardFlexSize="0.3 20%"
          />
          <DashboardCardTop
            title="Total Appointments"
            value={30}
            footer="Period History"
            hexColor="#2ecc71"
            cardFlexSize="0.3 20%"
            svgIcon={totalAppDashIcon}
          />
        </div>

        {/* Middle Section of the Dashboard */}
        <div className="dashboardOwner__chart-card--container">
          <div className="dashOwner__lineChart">
            <DashLineChart allAppointmentsByDay={allAppointmentsByDay} />
          </div>
          <div className="dashOwner__infoCard">
            <DashboardCardTop
              title="Total Revenue"
              value="€750.90"
              footer="Total Appointments"
              hexColor="#80b3ff"
              cardFlexSize="0.3 20%"
              svgIcon={topServiceRocketIcon}
            />
            <DashboardCardTop
              title="Total Appointments"
              value={30}
              // footer="Today's Schedule"
              footer="From beggining default All service"
              hexColor="#f1c40f"
              cardFlexSize="0.3 20%"
              svgIcon={daylyCountAppIcon}
            />
            <DashboardCardTop
              title="Top Performers"
              value={"Dejan"}
              footer="Top Achievers default All service"
              hexColor="#e74c3c"
              cardFlexSize="0.3 20%"
              svgIcon={bestEmployee}
            />{" "}
            <DashboardCardTop
              title="Daily Appointments"
              value={30}
              footer="Today's Schedule"
              hexColor="#1abc9c"
              cardFlexSize="0.3 20%"
              svgIcon={totalAppDashIcon1}
            />
          </div>
        </div>

        {/*  */}
      </div>
      <div className="dashboard__table--owner">
        <TopCustTableView
          setPopupOpen={setPopupOpen}
          top5Customers={top5Customers}
        />
        <AllEmployeesTableView
          setPopupOpen={setPopupOpen}
          allEmployees={allEmployees}
        />
      </div>
    </div>
  );
};

export default DashboardOwner;
