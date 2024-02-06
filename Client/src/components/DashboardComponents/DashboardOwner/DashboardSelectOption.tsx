import { FetchDataByServiceProps } from "../../../types/tableApiTypes";

interface DashboardSelectOptionProps {
  dataByService?: FetchDataByServiceProps[];
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardSelectOption: React.FC<DashboardSelectOptionProps> = ({
  dataByService,
  setSelectedService,
}) => {
  return (
    <div>
      <div className="typeService__owner-dashboard">
        <select onChange={(e) => setSelectedService(e.target.value)}>
          <option>All</option>
          {dataByService?.map((service, i) => (
            <option key={i}>
              {service?.servicesName ?? "no service avaiable"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DashboardSelectOption;
