import { useState } from "react";
import moment from "moment-timezone";
import useSWR from "swr";
import { useAuth } from "../../../helpers/Auth";

import "../../../styling/Dashboard/_dashboardEmployees.scss";
import {
  AllServicesTypes,
  FetchAppointmentsByHourRangeTypes,
  allAppointmentsByDataRangeAndEmployTypes,
  fetchServiceProcentCurrentMonthTypes,
} from "../../../types/tableApiTypes";

import {
  fetchAllAppointmentsDataRange,
  fetchAllServices,
  fetchAppointmentsByHourRange,
  fetchServiceProcentCurrentMonth,
} from "../../../api/tableApi";

import DashEmployeesTable from "../../../components/DashboardComponents/DashboardEmployee/DashEmployeesTable";
import EmployeeTableSettings from "../../../components/DashboardComponents/DashboardEmployee/EmployeeTableSettings";
import DashBoxProcentContainer from "../../../components/DashboardComponents/DashboardEmployee/DashBoxProcentContainer";

import ChartByHour from "./ChartByHour";
import ByHourRangeChartSettings from "../../../components/DashboardComponents/DashboardEmployee/ByHourRangeChart";

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
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[]>(["allServices", token], () =>
    fetchAllServices(token)
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
    ["appointmentByHourRange", token, startDateAndHour, endDateAndHour],
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

  if (
    allServicesError ||
    appointmentsByDataRangeError ||
    serviceProcentCalcError ||
    appointmentsByHourRangeError
  )
    return <h6>{"error happen"}</h6>;
  if (
    allServicesLoading ||
    appointmentsByDataRangeLoading ||
    serviceProcentCalcLoading ||
    appointmentsByHourRangeLoading
  )
    return <p>loading...</p>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  return (
    <div className="dashboardEmployees__container">
      <div className="dashbaordEmployeeDataLeft">
        <div className="dashboardEmployees--wrap">
          <div className="employees__left--top">
            <div className="dashboardEmployees__chart--year">
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
            <div className="dashboardEmployees__statistic--procent">
              <DashBoxProcentContainer
                serviceProcentCalc={serviceProcentCalc ?? []}
              />
            </div>
          </div>
          <div className="employees__left--bottom">
            <div className="dashboardEmployees__statistic--statisticInfo">
              info statistc
            </div>

            <div className="dashboardEmployees__chart--hour">chart hours</div>
          </div>
        </div>
      </div>

      <div className="dashboardEmployee__table">
        <p>upcoming appointments</p>

        <EmployeeTableSettings
          allServices={allServices || []}
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
