import {
  fetchAllEmployees,
  fetchAppointmentsByDayAndTotal,
  fetchDataByService,
  fetchTop5Customers,
  fetchTotalMoneyAppService,
} from "../../../api/tableApi";
import {
  FetchAllEmployeesTypes,
  FetchAppointmentsByDayAndTotalTypes,
  FetchDataByServiceProps,
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

import "../../../styling/Dashboard/_dashboardOwner.scss";
import DashboardSelectOption from "../../../components/DashboardComponents/DashboardOwner/DashboardSelectOption";

interface DashboardOwnerProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardOwner: React.FC<DashboardOwnerProps> = ({ setPopupOpen }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedService, setSelectedService] = useState<string>("All");

  console.log(selectedService);

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
  } = useSWR<FetchAllEmployeesTypes[]>(["allCustomers", token], () =>
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

  if (top5CustomersError || allEmployeesError || allAppointmentsByDayError)
    return (
      <h6>
        {top5CustomersError?.message ||
          allEmployeesError?.message ||
          totalMoneyAppServiceError ||
          dataByServiceError.message ||
          allAppointmentsByDayError?.message}
      </h6>
    );
  if (
    top5CustomersLoading ||
    allEmployeesLoading ||
    totalMoneyAppServiceLoading ||
    dataByServiceLoading ||
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
          <DashboardCardWrapTop totalMoneyAppService={totalMoneyAppService} />
        </div>

        {/* Middle Section of the Dashboard */}
        <div className="dashboardOwner__chart-card--container">
          <div className="dashOwner__lineChart">
            <DashLineChart allAppointmentsByDay={allAppointmentsByDay} />
          </div>
          <div className="dashOwner__infoCard">
            <DashboardSelectOption
              dataByService={dataByService}
              setSelectedService={setSelectedService}
            />
            <DashboardCardWrapMiddle
              filteredDataByService={filteredDataByService}
              calcTotalMoneyAndApp={calcTotalMoneyAndApp}
              selectedService={selectedService}
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
