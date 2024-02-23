import { FetchUserTypesProps } from "../../../types/tableApiTypes";
import LoadingRing from "../../loadingRing";
import MultiFormWraper from "./MultiFormWraper";

type Step1UserData = {
  employeesUserType_id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phoneNumber: string;
  password: string;
};

// Partial is makeing the userDataProps optional!!
type MultiFormStep1Props = Step1UserData & {
  updateFileds: (fileds: Partial<Step1UserData>) => void;
  allUserTypes?: FetchUserTypesProps[];
};

const MultiFormStep1: React.FC<MultiFormStep1Props> = ({
  employeesUserType_id,
  firstName,
  lastName,
  city,
  email,
  phoneNumber,
  password,
  updateFileds,
  allUserTypes,
}) => {
  // Remove customer value from selectOption
  const removeCustomer = allUserTypes?.filter(
    (type) => type?.userType_name !== "Customer"
  );

  return (
    <MultiFormWraper title="Employer Info">
      {!allUserTypes?.length && <LoadingRing />}

      {allUserTypes?.length && (
        <>
          <label>User Type</label>
          <select
            value={employeesUserType_id}
            onChange={(e) =>
              updateFileds({ employeesUserType_id: +e.target.value })
            }
          >
            {removeCustomer?.map((services) => (
              <option key={services?.id} value={services?.id}>
                {services?.userType_name ?? "Not Found"}
              </option>
            ))}
          </select>

          <label>First Name</label>
          <input
            type="text"
            required
            minLength={3}
            maxLength={16}
            value={firstName}
            onChange={(e) => updateFileds({ firstName: e.target.value })}
          />
          <label>Last Name</label>
          <input
            type="text"
            minLength={3}
            maxLength={16}
            value={lastName}
            onChange={(e) => updateFileds({ lastName: e.target.value })}
          />
          <label>City</label>
          <input
            type="text"
            minLength={3}
            maxLength={16}
            value={city}
            onChange={(e) => updateFileds({ city: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => updateFileds({ email: e.target.value })}
          />
          <label>Phone Number</label>
          <input
            type="text"
            minLength={5}
            maxLength={16}
            value={phoneNumber}
            onChange={(e) => updateFileds({ phoneNumber: e.target.value })}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => updateFileds({ password: e.target.value })}
          />
        </>
      )}
    </MultiFormWraper>
  );
};

export default MultiFormStep1;
