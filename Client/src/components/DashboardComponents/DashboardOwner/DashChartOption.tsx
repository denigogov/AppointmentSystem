import {
  AllServicesTypes,
  FetchServiceByMonthProps,
} from "../../../types/tableApiTypes";

interface DashChartOptionProps {
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedServiceChart: React.Dispatch<React.SetStateAction<string>>;
  allServices?: AllServicesTypes[];
  serviceByMonth?: FetchServiceByMonthProps[];
}

const DashChartOption: React.FC<DashChartOptionProps> = ({
  setSelectedYear,
  setSelectedServiceChart,
  allServices,
  serviceByMonth,
}) => {
  // Removing the duplicate from the array !
  const singleYear = Array.from(
    new Set(serviceByMonth?.map((arr) => arr.year))
  ).sort((a, b) => b - a);

  return (
    <div className="dashChartOption--wrap">
      <select onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
        {singleYear.map((arr, i) => (
          <option key={i}>{arr}</option>
        ))}
      </select>

      {/* show all services! */}
      <select onChange={(e) => setSelectedServiceChart(e.target.value)}>
        <option value="">All</option>
        {allServices?.map((service, i) => (
          <option value={service.servicesName} key={i}>
            {service.servicesName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashChartOption;
