import { InitialDataProps } from "../../pages/App/Appointment/Appointment";
import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";
import MultiFormWraper from "../ManagementComponent/Employees/MultiFormWraper";

interface Step2Props {
  employee_id: number | string;
  servicesEmpolyees: ServiceEmloyeesTypes[];
  service_id: string | number;
  updateFileds: (fileds: Partial<InitialDataProps>) => void;
}

const Step2: React.FC<Step2Props> = ({
  service_id,
  employee_id,
  updateFileds,
  servicesEmpolyees,
}) => {
  const findEmployee = servicesEmpolyees?.filter(
    (e: ServiceEmloyeesTypes) =>
      e.services_id === +service_id && e.approved === 1
  );
  return (
    <div>
      <MultiFormWraper>
        <select
          value={employee_id}
          onChange={(e) => updateFileds({ employee_id: +e.target.value })}
        >
          {findEmployee.length ? (
            <>
              <option>choose Stylist</option>
              {findEmployee?.map((employer) => (
                <option key={employer?.id} value={employer?.employees_id}>
                  {employer?.firstName ?? "Not Found"} {employer?.lastName}
                </option>
              ))}
            </>
          ) : (
            <>
              <option>Not Found</option>
            </>
          )}
        </select>
      </MultiFormWraper>
    </div>
  );
};

export default Step2;
