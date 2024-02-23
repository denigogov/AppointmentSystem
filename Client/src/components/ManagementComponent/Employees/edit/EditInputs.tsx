import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";
import MultiFormWraper from "../MultiFormWraper";

interface EditInputsProps {
  singleEmployer?: FetchAllEmployeesTypes;
}

const EditInputs: React.FC<EditInputsProps> = ({ singleEmployer }) => {
  return (
    <div className="form__container--edit">
      <MultiFormWraper>
        <label>First Name</label>
        <input
          type="text"
          required
          minLength={3}
          maxLength={16}
          defaultValue={singleEmployer?.firstName ?? "Not Found"}
          placeholder="First Name (e.g., John)"
        />
        <label>Last Name</label>
        <input
          type="text"
          minLength={3}
          maxLength={16}
          defaultValue={singleEmployer?.lastName ?? "Not Found"}
          placeholder="Last Name "
        />
        <label>City</label>
        <input
          type="text"
          minLength={3}
          maxLength={16}
          placeholder="City"
          defaultValue={singleEmployer?.city ?? "Not Found"}
        />
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="Email"
          defaultValue={singleEmployer?.email ?? "Not Found"}
        />
        <label>Phone Number</label>
        <input
          type="text"
          minLength={5}
          maxLength={16}
          placeholder="Phone Number"
          defaultValue={singleEmployer?.phoneNumber ?? "Not Found"}
        />
        <label>Password</label>
        <input type="password" placeholder="Password" />
      </MultiFormWraper>
    </div>
  );
};

export default EditInputs;
