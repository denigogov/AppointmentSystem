import { InitialDataProps } from "../../pages/App/Appointment/Appointment";
import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";
import MultiFormWraper from "../ManagementComponent/Employees/MultiFormWraper";
import LoadingRing from "../loadingRing";

interface Step1Props {
  service_id: number | string;
  updateFileds: (fileds: Partial<InitialDataProps>) => void;
  servicesEmpolyees: ServiceEmloyeesTypes[];
  servicesEmpolyeesLoading: boolean;
  servicesEmpolyeesError: Error;
}

const Step1: React.FC<Step1Props> = ({
  service_id,
  updateFileds,
  servicesEmpolyees,
  servicesEmpolyeesLoading,
  servicesEmpolyeesError,
}) => {
  const uniqueServicesNames = servicesEmpolyees?.filter(
    (service, i, arr) =>
      i === arr.findIndex((v) => v.servicesName === service.servicesName)
  );

  return (
    <MultiFormWraper>
      {servicesEmpolyeesError && (
        <label>{servicesEmpolyeesError?.message ?? "Error"}</label>
      )}
      {servicesEmpolyeesLoading ? (
        <LoadingRing />
      ) : (
        <>
          <label>Select Service</label>
          <select
            required
            value={service_id}
            onChange={(e) => updateFileds({ service_id: +e.target.value })}
          >
            <option value={0}>Choose Service</option>
            {uniqueServicesNames?.map((services) => (
              <option key={services?.services_id} value={services?.services_id}>
                {services?.servicesName ?? "Not Found"}
              </option>
            ))}
          </select>{" "}
        </>
      )}
    </MultiFormWraper>
  );
};

export default Step1;
