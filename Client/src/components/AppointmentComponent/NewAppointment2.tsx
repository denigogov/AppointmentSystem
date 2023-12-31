import { ServiceEmloyeesTypes } from "../../types/tableApiTypes";

interface NewAppointment2rops {
  servicesEmpolyees: ServiceEmloyeesTypes[];
  // setSelectedUser: React.Dispatch<React.SetStateAction<string>> ;
  setSelectedUser: (value: React.SetStateAction<string>) => void;
}

const NewAppointment2 = ({
  servicesEmpolyees,
  setSelectedUser,
}: NewAppointment2rops) => {
  //

  const handleFindUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div>
      <select onChange={handleFindUser}>
        <option value="">Select a user</option>
        {servicesEmpolyees?.map((e, i) => (
          <option key={i} value={e?.employees_id}>
            {`${e.firstName} ${e.lastName}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewAppointment2;
