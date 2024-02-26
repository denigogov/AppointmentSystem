import { FormEvent, useRef } from "react";
import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";
import MultiFormWraper from "../MultiFormWraper";

type InputValuesRef = {
  firstNameRef: React.RefObject<HTMLInputElement>;
  lastNameRef: React.RefObject<HTMLInputElement>;
  cityRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
  phoneNumberRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
};
type EditInputsProps = {
  singleEmployer?: FetchAllEmployeesTypes;
  inputValues: InputValuesRef;
};

const EditInputs: React.FC<EditInputsProps> = ({
  singleEmployer,
  inputValues,
}) => {
  return (
    <div className="form__container--edit">
      <MultiFormWraper>
        <label>First Name</label>
        <input
          ref={inputValues.firstNameRef}
          type="text"
          required
          minLength={3}
          maxLength={16}
          defaultValue={singleEmployer?.firstName ?? "Not Found"}
          placeholder="First Name (e.g., John)"
        />
        <label>Last Name</label>
        <input
          ref={inputValues.lastNameRef}
          type="text"
          minLength={3}
          maxLength={16}
          defaultValue={singleEmployer?.lastName ?? "Not Found"}
          placeholder="Last Name "
        />
        <label>City</label>
        <input
          ref={inputValues.cityRef}
          type="text"
          minLength={3}
          maxLength={16}
          placeholder="City"
          defaultValue={singleEmployer?.city ?? "Not Found"}
        />
        <label>Email</label>
        <input
          ref={inputValues.emailRef}
          type="email"
          required
          placeholder="Email"
          defaultValue={singleEmployer?.email ?? "Not Found"}
        />
        <label>Phone Number</label>
        <input
          ref={inputValues.phoneNumberRef}
          type="text"
          minLength={5}
          maxLength={16}
          placeholder="Phone Number"
          defaultValue={singleEmployer?.phoneNumber ?? "Not Found"}
        />
        <label>Password</label>
        <input
          ref={inputValues.passwordRef}
          type="password"
          placeholder="Password"
        />
      </MultiFormWraper>
    </div>
  );
};

export default EditInputs;
