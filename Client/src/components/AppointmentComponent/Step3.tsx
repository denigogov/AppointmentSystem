import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { InitialDataProps } from "../../pages/App/Appointment/Appointment";
import {
  AllAppointmentsTypes,
  TimeManagmentTypes,
} from "../../types/tableApiTypes";
import { convertISOtoLocalZone } from "../../helpers/Dates";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import moment from "moment-timezone";

interface Step3Props {
  allAppointments: AllAppointmentsTypes[];
  timeManagment: TimeManagmentTypes[];
  updateFileds: (fileds: Partial<InitialDataProps>) => void;
  employee_id: string | number;
  scheduled_at: Date | string;
}

const Step3: React.FC<Step3Props> = ({
  updateFileds,
  timeManagment,
  allAppointments,
  employee_id,
  scheduled_at,
}) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [startDate, setStartDate] = useState(
    new Date(new Date().toLocaleString("en", { timeZone: userTimeZone }))
  );

  const filteTimeManagment = timeManagment?.filter(
    (arr: TimeManagmentTypes) => arr.employee_id === +employee_id
  );

  const filterAppointments = allAppointments?.filter(
    (arr: AllAppointmentsTypes) => {
      return arr.employee_id === +employee_id;
    }
  );

  const handleDateChange = (date: Date): void => {
    setStartDate(date);

    // Converting the date to be in correct format !
    updateFileds({
      scheduled_at: moment(date).tz(userTimeZone).format("YYYY-MM-DD HH:mm:ss"),
    });
  };

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const startHour = filteTimeManagment?.[0]?.startHour ?? 9;
    const startMinute = filteTimeManagment?.[0]?.startMinute ?? 0;
    const endHour = filteTimeManagment?.[0]?.endHour ?? 17;
    const endMinute = filteTimeManagment?.[0]?.endMinute ?? 0;

    const isFutureTime = currentDate.getTime() < selectedDate.getTime();
    const selectedMinutes =
      selectedDate.getHours() * 60 + selectedDate.getMinutes();
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;

    if (
      !isFutureTime ||
      selectedMinutes < startTime ||
      selectedMinutes > endTime
    ) {
      // Disable times outside the allowed time range
      return false;
    }

    const selectedTimeISO = convertISOtoLocalZone(selectedDate);
    const isBooked = filterAppointments.some(
      (app) =>
        app.employee_id === +employee_id && app.scheduled_at === selectedTimeISO
    );
    return !isBooked;
  };

  // I can't find what type is it !
  const startDateDefault: Date | string = filteTimeManagment[0]?.endDate
    ? filteTimeManagment[0]?.startDate ?? "2024-01-01T00:00:00.000Z"
    : "2024-01-01T00:00:00.000Z";

  const endDateDefault: Date | string = filteTimeManagment[0]?.endDate
    ? filteTimeManagment[0]?.endDate
    : "2024-01-01T23:59:59.000Z";

  return (
    <div>
      <DatePicker
        showIcon
        minDate={subDays(new Date(), 1)}
        // maxDate={addDays(new Date(), )}
        selected={startDate}
        onChange={handleDateChange}
        showTimeSelect
        filterTime={filterPassedTime}
        timeIntervals={filteTimeManagment[0]?.timeInterval ?? 30}
        excludeDateIntervals={[
          {
            start: subDays(new Date(startDateDefault), 1),
            end: addDays(new Date(endDateDefault), 0),
          },
        ]}
        excludeTimes={[
          // when user want to take off time ! or vacation he wont be avaible for this period
          setHours(
            setMinutes(new Date(), filteTimeManagment[0]?.startMinute ?? 0),
            filteTimeManagment[0]?.startHour ?? 0
          ),
        ]}
        excludeDates={[addDays(new Date(), -1)]} // EXCLUDET DATE YESTERDAY !!
        dateFormat="MMMM d, yyyy hh:mm"
        timeFormat="HH:mm"
        withPortal
        portalId="root-portal"
        //  holidays={filteredHolliday} not recomendet to use because its not sync. with users, I will add this fundtion but i will mention also!
      />
    </div>
  );
};

export default Step3;
