import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";

interface SignUpFormProps {
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  servicesEmpolyees: ServiceEmloyeesTypes[];
}

const NewAppointment1 = ({
  setSelectedService,
  servicesEmpolyees,
}: SignUpFormProps) => {
  const handleSelectedService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };
  const uniqueServicesNames = servicesEmpolyees.filter(
    (service, i, arr) =>
      i === arr.findIndex((v) => v.servicesName === service.servicesName)
  );

  return (
    <div style={{ padding: "30px" }}>
      <h6>to create new account you need first to create an appoinment</h6>

      <select onChange={handleSelectedService}>
        <option value="">Select a service</option>
        {uniqueServicesNames?.map((a) => (
          <option key={a.id} value={a.services_id}>
            {a.servicesName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewAppointment1;
