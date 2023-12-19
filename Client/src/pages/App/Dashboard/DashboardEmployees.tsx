import { useState } from "react";
import DashEmployeesTable from "../../../components/DashboardComponents/DashboardEmployee/DashEmployeesTable";
import EmployeeTableSettings from "../../../components/DashboardComponents/DashboardEmployee/EmployeeTableSettings";
import "../../../styling/Dashboard/_dashboardEmployees.scss";
import { useAuth } from "../../../helpers/Auth";
import useSWR from "swr";
import {
  AllServicesTypes,
  allAppointmentsByDataRangeAndEmployTypes,
} from "../../../types/tableApiTypes";
import {
  fetchAllAppointmentsDataRange,
  fetchAllServices,
} from "../../../api/tableApi";
import moment from "moment-timezone";

// import ChartTest from "./ChartTest";

interface DashboardEmployeeProps {
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardEmployees = ({ setPopupOpen }: DashboardEmployeeProps) => {
  const [selectedService, setSelectedService] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

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

  const filterDataByService = appointmentsByDataRange
    ? appointmentsByDataRange.filter((appointments) => {
        return (
          selectedService === "all" ||
          +selectedService === appointments?.serviceID
        );
      })
    : [];

  if (allServicesError || appointmentsByDataRangeError)
    return <h6>{"error happen"}</h6>;
  if (allServicesLoading || appointmentsByDataRangeLoading)
    return <p>loading...</p>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  return (
    <div className="dashboardEmployees__container">
      <div className="dashbaordEmployeeDataLeft">
        <div className="dashboardEmployees--wrap">
          <div className="employees__left--top">
            <div className="dashboardEmployees__chart--year">chart</div>
            <div className="dashboardEmployees__statistic--procent">box %</div>
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
