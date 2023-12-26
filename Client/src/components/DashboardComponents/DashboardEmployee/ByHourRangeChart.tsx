import ReactDatePicker from "react-datepicker";

interface ByHourRangeChartSettingsProp {
  setStartDataHour: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDataHour: React.Dispatch<React.SetStateAction<Date | null>>;
  startDataHour: Date | null;
  endDataHour: Date | null;
}

const ByHourRangeChartSettings = ({
  setStartDataHour,
  setEndDataHour,
  startDataHour,
  endDataHour,
}: ByHourRangeChartSettingsProp) => {
  const handleDataRange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDataHour(start);
      setEndDataHour(end);
    }
  };

  return (
    <div>
      <ReactDatePicker
        className="form-control form-control-solid w-250px date-picker"
        dateFormat="yyyy/MM/dd"
        selected={startDataHour}
        onChange={handleDataRange}
        startDate={startDataHour}
        endDate={endDataHour}
        selectsRange
        withPortal
      >
        <div style={{ color: "red" }}>Don't forget to check the weather!</div>
      </ReactDatePicker>
    </div>
  );
};

export default ByHourRangeChartSettings;
