import { InitialDataProps } from "../../pages/App/Appointment/Appointment";
import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";
import MultiFormWraper from "../ManagementComponent/Employees/MultiFormWraper";

interface Step1Props {
  service_id: string | number;
  updateFileds: (fileds: Partial<InitialDataProps>) => void;
  servicesEmpolyees: ServiceEmloyeesTypes[];
}

const Step1: React.FC<Step1Props> = ({
  service_id,
  updateFileds,
  servicesEmpolyees,
}) => {
  const uniqueServicesNames = servicesEmpolyees.filter(
    (service, i, arr) =>
      i === arr.findIndex((v) => v.servicesName === service.servicesName)
  );

  return (
    <MultiFormWraper>
      <select
        value={service_id}
        onChange={(e) => updateFileds({ service_id: +e.target.value })}
      >
        {uniqueServicesNames?.map((services) => (
          <option key={services?.services_id} value={services?.services_id}>
            {services?.servicesName ?? "Not Found"}
          </option>
        ))}
        {/* <option value={1}>Choose Service</option>
        <option value={1}>haircut</option>
        <option value={2}>painting</option>
        <option value={3}>blabla</option> */}
      </select>
    </MultiFormWraper>
  );
};

export default Step1;
