import { useState } from "react";
import CustomerFormInput from "../../components/RegisterCustomer/CustomerFormInput";
import "../../styling/_SignUp.scss";
import {
  CustomerInputsTypes,
  CustomerinputsRegistrationTypes,
} from "../../types/CustomerRegistrationTypes";

// import { handlePostPutDeleteRequest } from "../../api/handleRequest";
import { useAuth } from "../../helpers/Auth";

import { generateInputs } from "./SignUpInputs";
import { errorMessageBtn } from "../../components/ErrorSuccesMessage";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  //@ts-ignore
  const [succes, setSucces] = useState<string>("");
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
    const { confirmPassword, ...restValues } = values;

    try {
      const res = await fetch(`http://localhost:4000/tableRoute/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(restValues),
      });

      if (res.ok) {
        setErrorMessage("");
        setSucces(`Account creation successful!`);

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
            "A user with the same email, phone, or username already exists. Please choose unique values."
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
