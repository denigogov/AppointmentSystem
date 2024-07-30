import { useState } from "react";
import CustomerFormInput from "../../components/RegisterCustomer/CustomerFormInput";
import "../../styling/_SignUp.scss";
import {
  CustomerInputsTypes,
  CustomerinputsRegistrationTypes,
} from "../../types/CustomerRegistrationTypes";
// import { postDeletePutRequest } from "../../api/handleRequest";
import { useAuth } from "../../helpers/Auth";

import { generateInputs } from "./SignUpInputs";
import { errorMessageBtn } from "../../components/ErrorSuccesMessage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL as string;

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [succes, setSucces] = useState<string>("");

  console.log(succes);

  const [gender, setGender] = useState<string>("");
  const [values, setValues] = useState<CustomerInputsTypes>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = generateInputs(values.password);
  const navigate = useNavigate();
  const auth = useAuth();

  const handlePostRequest = async () => {
    //

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...allValues } = values;
    const restValues = { gender, ...allValues };

    // postDeletePutRequest(
    //   "POST",
    //   `${auth.token}`,
    //   "tableRoute/customers",
    //   restValues,
    //   setErrorMessage,
    //   errorMessage,
    //   "Customer Already exists",
    //   "A user with the same email, phone, or username already exists. Please choose unique values.",
    //   setSucces,
    //   succes,
    //   "cool",
    //   "vmroooooo",
    //   navigate("/")
    // );

    try {
      const res = await fetch(`${API_URL}/tableRoute/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(restValues),
      });

      if (res.ok) {
        setSucces(`Account creation successful!`);
        setErrorMessage("");

        Swal.fire({
          icon: "success",
          title: `Account creation successful!`,
          html: `<p>to get started, please verify your <strong>email</strong> using the link we sent</>`,
          confirmButtonColor: "#fe9393",
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) navigate("/");
        });
      } else {
        const errorResponse = await res.json();

        setErrorMessage(errorResponse.validateCustomer[0].message);
        throw new Error(errorResponse.validateCustomer[0].message);
      }
    } catch (err) {
      setErrorMessage((err as Error).message);

      {
        errorMessage &&
          errorMessageBtn(
            errorMessage?.includes("Duplicate")
              ? "Customer Already exists"
              : errorMessage,
            "A user with the same email, phone, or username already exists. Please choose unique values.",
            "please try one more time !"
          );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handlePostRequest();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="signUpContainer">
      <form onSubmit={handleSubmit} autoComplete="on">
        <h1>Register Form</h1>

        <br />
        <label>Choose your Gender</label>
        <select required onChange={(e) => setGender(e.target.value)}>
          <option>Select Your Gender</option>
          <option>Female</option>
          <option>Male</option>
          <option>Other</option>
        </select>
        {inputs.map((input: CustomerinputsRegistrationTypes, i: number) => {
          return (
            <CustomerFormInput
              key={i}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          );
        })}
        <button>submit</button>
      </form>
    </div>
  );
};

export default SignUp;
