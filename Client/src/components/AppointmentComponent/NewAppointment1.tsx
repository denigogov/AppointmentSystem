import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";

interface SignUpFormProps {
  setSelectedService: React.Dispatch<React.SetStateAction<string>>;
  uniqueServicesNames: ServiceEmloyeesTypes[];
}

const NewAppointment1 = ({
  setSelectedService,
  uniqueServicesNames,
}: SignUpFormProps) => {
  const handleSelectedService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h6>Create a new appointment to book your spot at the hair salon</h6>

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
