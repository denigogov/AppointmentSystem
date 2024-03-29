import {
  fetchAllEmployees,
  fetchAllServices,
  fetchAppointmentsByDayAndTotal,
  fetchDataByService,
  fetchServiceByMonth,
  fetchTop5Customers,
  fetchTotalMoneyAppService,
} from "../../../api/tableApi";
import {
  AllServicesTypes,
  FetchAllEmployeesTypes,
  FetchAppointmentsByDayAndTotalTypes,
  FetchDataByServiceProps,
  FetchServiceByMonthProps,
  FetchTop5CustomersTypes,
  FetchTotalMoneyAppServiceProps,
} from "../../../types/tableApiTypes";

import useSWR from "swr";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import moment from "moment-timezone";
import { useAuth } from "../../../helpers/Auth";

import AllEmployeesTableView from "../../../components/DashboardComponents/DashboardOwner/AllEmployeesTableView";
import TopCustTableView from "../../../components/DashboardComponents/DashboardOwner/TopCustTableView";

import DashLineChart from "../../../components/DashboardComponents/DashboardOwner/DashLineChart";
import DashboardCardWrapTop from "../../../components/DashboardComponents/DashboardOwner/DashboardCardWrapTop";
import DashboardCardWrapMiddle from "../../../components/DashboardComponents/DashboardOwner/DashboardCardWrapMiddle";
import DashboardSelectOption from "../../../components/DashboardComponents/DashboardOwner/DashboardSelectOption";
import DashChartOption from "../../../components/DashboardComponents/DashboardOwner/DashChartOption";

import "../../../styling/Dashboard/_dashboardOwner.scss";
import DashChartMonth from "../../../components/DashboardComponents/DashboardOwner/DashChartMonth";

interface DashboardOwnerProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardOwner: React.FC<DashboardOwnerProps> = ({ setPopupOpen }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>("All");
  const [selectedServiceChart, setSelectedServiceChart] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const auth = useAuth();
  const token = auth.token ?? "";
  const userInfo = auth.userInfo;

  const formatStartDate = startDate
    ? moment(startDate).format("YYYY-MM-DD HH:mm:ss")
    : "";
  const formatEndDate = endDate
    ? moment(endDate).format("YYYY-MM-DD HH:mm:ss")
    : "";

  // Data for Top Cards ..Total Revenue, Top Performing Service, Total Appointmnets
  const {
    data: totalMoneyAppService,
    error: totalMoneyAppServiceError,
    isLoading: totalMoneyAppServiceLoading,
  } = useSWR<FetchTotalMoneyAppServiceProps[]>(
    ["totalMoneyAppService", token, formatStartDate, formatEndDate],
    () => fetchTotalMoneyAppService({ token, formatStartDate, formatEndDate })
  );

  // data for table (top 5 customers)
  const {
    data: top5Customers,
    error: top5CustomersError,
    isLoading: top5CustomersLoading,
  } = useSWR<FetchTop5CustomersTypes[]>(["top5Customers", token], () =>
    fetchTop5Customers(token ?? "")
  );

  // data for table (Employee Overview)
  const {
    data: allEmployees,
    error: allEmployeesError,
    isLoading: allEmployeesLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(["allEmployees", token], () =>
    fetchAllEmployees(token ?? "")
  );

  // * @returns  Total Money ,Best Employer Total Appointment by service
  const {
    data: dataByService,
    error: dataByServiceError,
    isLoading: dataByServiceLoading,
  } = useSWR<FetchDataByServiceProps[]>(["dataByService", token], () =>
    fetchDataByService(token ?? "")
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

  const {
    data: serviceByMonth,
    error: serviceByMonthError,
    isLoading: serviceByMonthLoading,
  } = useSWR<FetchServiceByMonthProps[]>(
    ["serviceByMonth", token, selectedServiceChart ?? ""],
    () => fetchServiceByMonth({ token, selectedServiceChart })
  );

  const {
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[]>(["allServices", token], () =>
    fetchAllServices(token ?? "")
  );

  const handleDataRange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  const filteredDataByService = dataByService?.filter(
    (service) => service.servicesName === selectedService
  );

  // when user click in select option (ALL)
  const calcTotalMoneyAndApp = dataByService
    ?.filter((e) => e.totalAppointments && e.totalMoney)
    .map((e) => ({
      totalAppointments: e.totalAppointments,
      totalMoney: e.totalMoney,
    }))
    .reduce(
      (acc, mov) => ({
        totalAppointments: acc?.totalAppointments + mov?.totalAppointments,
        totalMoney: +acc?.totalMoney + +mov?.totalMoney,
      }),
      { totalAppointments: 0, totalMoney: 0 }
    );

  const filterDataByYear = serviceByMonth?.filter(
    (arr) => arr.year === selectedYear
  );

  return (
    <div className="dashboard__container--main">
      <div className="dashboard__left--owner-container">
        {/* Top of the Dashbaord */}
        <div className="dashboardTop--wrap">
          <div className="dashboardleft__owner--WelcomeText">
            {/* Username Title */}
            <h3>Welcome {userInfo?.username ?? "username"}</h3>
            <p>Your Studio's Command Center</p>
          </div>
          <div className="ownerDashobar--datepicker">
            <ReactDatePicker
              className="form-control form-control-solid w-250px date-picker"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              placeholderText="Default Current Month"
              onChange={handleDataRange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              withPortal
            />
          </div>
        </div>

        {/* CardsTop */}
        <div className="dashboardLeft__cards--top">
          <DashboardCardWrapTop
            totalMoneyAppService={totalMoneyAppService}
            totalMoneyAppServiceError={totalMoneyAppServiceError}
            totalMoneyAppServiceLoading={totalMoneyAppServiceLoading}
          />
        </div>

        {/* Middle Section of the Dashboard */}
        <div className="dashboardOwner__chart-card--container">
          <div className="dashOwner__lineChart">
            <DashLineChart
              allAppointmentsByDay={allAppointmentsByDay}
              allAppointmentsByDayError={allAppointmentsByDayError}
              allAppointmentsByDayLoading={allAppointmentsByDayLoading}
            />
          </div>
          <div className="dashOwner__infoCard">
            <DashboardSelectOption
              dataByService={dataByService}
              setSelectedService={setSelectedService}
              dataByServiceError={dataByServiceError}
              dataByServiceLoading={dataByServiceLoading}
            />
            <DashboardCardWrapMiddle
              filteredDataByService={filteredDataByService}
              calcTotalMoneyAndApp={calcTotalMoneyAndApp}
              selectedService={selectedService}
              dataByServiceError={dataByServiceError}
              dataByServiceLoading={dataByServiceLoading}
            />
          </div>
        </div>

        {/* Middle 2row */}
        <div className="dashboard__middle_secoundRow">
          <DashChartOption
            setSelectedYear={setSelectedYear}
            setSelectedServiceChart={setSelectedServiceChart}
            allServices={allServices}
            allServicesError={allServicesError}
            allServicesLoading={allServicesLoading}
            serviceByMonth={serviceByMonth}
            serviceByMonthError={serviceByMonthError}
            serviceByMonthLoading={serviceByMonthLoading}
          />
          <DashChartMonth
            filterDataByYear={filterDataByYear}
            serviceByMonthError={serviceByMonthError}
            serviceByMonthLoading={serviceByMonthLoading}
          />
        </div>

        {/*  */}
      </div>
      <div className="dashboard__table--owner">
        <TopCustTableView
          setPopupOpen={setPopupOpen}
          top5Customers={top5Customers}
          top5CustomersError={top5CustomersError}
          top5CustomersLoading={top5CustomersLoading}
        />
        <AllEmployeesTableView
          setPopupOpen={setPopupOpen}
          allEmployees={allEmployees}
          allEmployeesError={allEmployeesError}
          allEmployeesLoading={allEmployeesLoading}
        />
      </div>
    </div>
  );
};

export default DashboardOwner;
