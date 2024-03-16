import { FetchDataByServiceProps } from "../../../types/tableApiTypes";
import LoadingRing from "../../loadingRing";

interface DashboardSelectOptionProps {
  dataByService?: FetchDataByServiceProps[];
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  dataByServiceLoading: Boolean;
  dataByServiceError: Error;
}

const DashboardSelectOption: React.FC<DashboardSelectOptionProps> = ({
  dataByService,
  setSelectedService,
  dataByServiceLoading,
  dataByServiceError,
}) => {
  return (
    <div>
      <div className="typeService__owner-dashboard">
        {dataByServiceError && (
          <p className="globalTextError">{dataByServiceError?.message}</p>
        )}
        {dataByServiceLoading ? (
          <LoadingRing />
        ) : (
          <>
            <select onChange={(e) => setSelectedService(e.target.value)}>
              <option>All</option>
              {dataByService?.map((service, i) => (
                <option key={i}>
                  {service?.servicesName ?? "no service avaiable"}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardSelectOption;
