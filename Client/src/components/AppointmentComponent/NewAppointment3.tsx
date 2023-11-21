import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays, addDays, setHours, setMinutes } from "date-fns";
import { useState } from "react";

const NewAppointment3 = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().toLocaleString("en", { timeZone: "Europe/Berlin" }))
  );

  const [datas, setData] = useState([]);

  console.log(datas);

  return (
    <div>
      <DatePicker
        showIcon
        // icon="fa fa-calendar"
        minDate={subDays(new Date(), 1)}
        // maxDate={addDays(new Date(), )}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        showTimeSelect
        // filterTime={filterPassedTime}
        // timeIntervals={dataSplit[0].timeInterval}
        // excludeDateIntervals={[
        //   {
        //     start: subDays(new Date(dataSplit[0].startDate), 0),
        //     end: addDays(new Date(dataSplit[0].endDate), 0),
        //   },
        // ]}
        // excludeTimes={[
        //   setHours(
        //     setMinutes(new Date(), dataSplit[0].startMinute),
        //     dataSplit[0].startHours
        //   ),
        // ]}
        excludeDates={[new Date()]}
        dateFormat="MMMM d, yyyy h:mm aa"
        //  holidays={filteredHolliday} not recomendet to use because its not sync. with users, I will add this fundtion but i will mention also!
      />
    </div>
  );
};

export default NewAppointment3;
