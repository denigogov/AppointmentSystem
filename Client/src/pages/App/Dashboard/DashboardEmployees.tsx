import { useState } from "react";
import moment from "moment-timezone";
import useSWR from "swr";
import { useAuth } from "../../../helpers/Auth";

import "../../../styling/Dashboard/_dashboardEmployees.scss";
import {
  FetchAppointmentsByDayAndTotalTypes,
  FetchAppointmentsByHourRangeTypes,
  FetchAppointmentsTotalTypes,
  ServiceEmloyeesTypes,
  allAppointmentsByDataRangeAndEmployTypes,
  fetchServiceProcentCurrentMonthTypes,
} from "../../../types/tableApiTypes";

import {
  fetchAllAppointmentsDataRange,
  fetchAllServiceEmployees,
  fetchAppointmentsByDayAndTotal,
  fetchAppointmentsByHourRange,
  fetchAppointmentsTotal,
  fetchServiceProcentCurrentMonth,
} from "../../../api/tableApi";

import DashEmployeesTable from "../../../components/DashboardComponents/DashboardEmployee/DashEmployeesTable";
import EmployeeTableSettings from "../../../components/DashboardComponents/DashboardEmployee/EmployeeTableSettings";
import DashBoxProcentContainer from "../../../components/DashboardComponents/DashboardEmployee/DashBoxProcentContainer";

import ChartByHour from "./ChartByHour";
import ByHourRangeChartSettings from "../../../components/DashboardComponents/DashboardEmployee/ByHourRangeChart";
import ByDayChart from "../../../components/DashboardComponents/DashboardEmployee/ByDayChart";
import DashBoxTotal from "../../../components/DashboardComponents/DashboardEmployee/DashBoxTotal";
import DashInfoBox from "../../../components/DashboardComponents/DashboardEmployee/DashInfoBox";
import DashBoxServices from "../../../components/DashboardComponents/DashboardEmployee/DashBoxServices";

interface DashboardEmployeeProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardEmployees = ({ setPopupOpen }: DashboardEmployeeProps) => {
  const [selectedService, setSelectedService] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [startDataHour, setStartDataHour] = useState<Date | null>(
    moment().startOf("month").hour(0).minute(0).second(0).toDate()
  );
  const [endDataHour, setEndDataHour] = useState<Date | null>(
    moment().toDate()
  );

  const auth = useAuth();
  const token = auth?.token ?? "";
  const id = auth.userInfo?.id;

  const {
    data: servicesEmpolyees,
    error: servicesEmpolyeesError,
    isLoading: servicesEmpolyeesLoading,
  } = useSWR<ServiceEmloyeesTypes[]>(["employeesCurrentServices", token], () =>
    fetchAllServiceEmployees(token, id)
  );

  const approvedServices = servicesEmpolyees?.filter(
    (user) => user.approved === 1
  );

  const startDateSelected = startDate
    ? moment(startDate).format("YYYY-MM-DD")
    : "";
  const endDateSelected = endDate ? moment(endDate).format("YYYY-MM-DD") : "";

  const {
    data: appointmentsByDataRange,
    error: appointmentsByDataRangeError,
    isLoading: appointmentsByDataRangeLoading,
  } = useSWR<allAppointmentsByDataRangeAndEmployTypes[]>(
    ["appointmentsRange", token, startDateSelected, endDateSelected],
    () =>
      fetchAllAppointmentsDataRange({
        id,
        token,
        startDateSelected,
        endDateSelected,
      })
  );

  const {
    data: serviceProcentCalc,
    error: serviceProcentCalcError,
    isLoading: serviceProcentCalcLoading,
  } = useSWR<fetchServiceProcentCurrentMonthTypes[]>(
    ["serviceProcentCalc", token],
    () => fetchServiceProcentCurrentMonth({ token, id })
  );

  const startDateAndHour = moment(startDataHour).format("YYYY-MM-DD HH:mm:ss");
  const endDateAndHour = moment(endDataHour)
    .hour(23)
    .minute(59)
    .second(59)
    .format("YYYY-MM-DD HH:mm:ss"); // add on endDateAndHour time aways to finish on 23:59:59 because by default it was given as 00:00:00  !

  const {
    data: appointmentsByHourRange,
    error: appointmentsByHourRangeError,
    isLoading: appointmentsByHourRangeLoading,
  } = useSWR<FetchAppointmentsByHourRangeTypes[]>(
    ["appointmentByHourRange", token, endDateAndHour],
    () =>
      fetchAppointmentsByHourRange({
        id,
        token,
        startDateAndHour,
        endDateAndHour,
      })
  );
  const filterDataByService = appointmentsByDataRange
    ? appointmentsByDataRange.filter((appointments) => {
        return (
          selectedService === "all" ||
          +selectedService === appointments?.serviceID
        );
      })
    : [];

  const {
    data: allAppointmentsByDay,
    error: allAppointmentsByDayError,
    isLoading: allAppointmentsByDayLoading,
  } = useSWR<FetchAppointmentsByDayAndTotalTypes[]>(
    ["allAppointmentsByDay", token],
    () => fetchAppointmentsByDayAndTotal({ token, id })
  );

  const {
    data: totalAppointments,
    error: totalAppointmentsError,
    isLoading: totalAppointmentsLoading,
  } = useSWR<FetchAppointmentsTotalTypes[]>(["totalAppointments", token], () =>
    fetchAppointmentsTotal({ token, id })
  );

  if (
    appointmentsByDataRangeError ||
    serviceProcentCalcError ||
    appointmentsByHourRangeError ||
    allAppointmentsByDayError ||
    totalAppointmentsError ||
    servicesEmpolyeesError
  )
    return <h6>{"error happen"}</h6>;
  if (
    servicesEmpolyeesLoading ||
    appointmentsByDataRangeLoading ||
    serviceProcentCalcLoading ||
    allAppointmentsByDayLoading ||
    appointmentsByHourRangeLoading ||
    totalAppointmentsLoading
  )
    return <p>loading...</p>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  return (
    <div className="dashboardEmployees__container">
      <div className="dashbaordEmployeeDataLeft">
        <div className="dashboardEmployees--wrap">
          <div className="employees__left--top">
            <div className="dashboardEmployees__chart--year">
              <div className="welcomeMessageEmployee">
                <h3>Welcome, {auth.userInfo?.username ?? "username"}! </h3>
                <p>Your chair, your rules</p>
              </div>
              <ByDayChart allAppointmentsByDay={allAppointmentsByDay} />
            </div>
            <div className="dashboardEmployees__statistic--procent">
              <DashBoxProcentContainer
                serviceProcentCalc={serviceProcentCalc ?? []}
              />
            </div>
          </div>
          <div className="employees__left--bottom">
            <div className="dashboardEmployees__statistic--statisticInfo">
              <div className="dashboardEmployees__container--dashBoxTotal">
                <DashBoxTotal totalAppointments={totalAppointments![0]} />
              </div>
              <div className="dashboardEmployees__container--info-service">
                <DashInfoBox />
                <DashBoxServices approvedServices={approvedServices || []} />
              </div>
            </div>
            <div className="dashboardEmployees__chart--hour">
              <ByHourRangeChartSettings
                startDataHour={startDataHour}
                endDataHour={endDataHour}
                setEndDataHour={setEndDataHour}
                setStartDataHour={setStartDataHour}
              />
              <ChartByHour
                appointmentsByHourRange={appointmentsByHourRange ?? []}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboardEmployee__table">
        <p>upcoming appointments</p>

        <EmployeeTableSettings
          approvedServices={approvedServices || []}
          setSelectedService={setSelectedService}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
        />
        <DashEmployeesTable
          setPopupOpen={setPopupOpen}
          filterDataByService={filterDataByService}
          appointmentsByDataRange={appointmentsByDataRange}
        />
      </div>
    </div>
  );
};

export default DashboardEmployees;
