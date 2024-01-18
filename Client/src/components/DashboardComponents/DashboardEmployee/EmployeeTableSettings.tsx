import ReactDatePicker from "react-datepicker";
import "../../../styling/Components/dashboard components/DashboardEmployees/_dashEmplyTable.scss";
import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";

interface TableSettingsProp {
  approvedServices: ServiceEmloyeesTypes[];
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  startDate: Date | null;
  endDate: Date | null;
}

const EmployeeTableSettings = ({
  setSelectedService,
  approvedServices,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: TableSettingsProp) => {
  const handleDataRange = (dates: [Date | null, Date | null] | null) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  return (
    <div className="tableSettings--wrap">
      <ReactDatePicker
        className="form-control form-control-solid w-250px date-picker"
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={handleDataRange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        withPortal
      >
        {/* <div style={{ color: "red" }}>Don't forget to check the weather!</div> */}
      </ReactDatePicker>

      <select onChange={(e) => setSelectedService(e.target.value)}>
        <option value="all">select service</option>
        {approvedServices?.map((service, index) => (
          <option key={index} value={service.services_id}>
            {service.servicesName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeTableSettings;
