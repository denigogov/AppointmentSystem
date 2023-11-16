import { useState } from "react";
import { AllServicesTypes } from "../../types/tableApiTypes";

interface SignUpFormProps {
  allServices: AllServicesTypes[] | undefined;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ allServices }) => {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleSelectedService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  return (
    <div>
      <h6>to create new account you need first to create an appoinment</h6>

      <select onChange={handleSelectedService}>
        <option value="">Select a service</option>
        {allServices?.map((a) => (
          <option key={a.id} value={a.id}>
            {a.servicesName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SignUpForm;
