import { CustomerinputsRegistrationTypes } from "../../types/CustomerRegistrationTypes";

export const generateInputs = (
  passwordPatern: string
): CustomerinputsRegistrationTypes[] => [
  {
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    label: "First Name",
    errorMessage:
      "First Name should be 3-16 characters and shouldn't include any special character!",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    label: "Last Name",
    errorMessage:
      "Last Name should be 3-16 characters and shouldn't include any special character!",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    name: "phoneNumber",
    type: "tel",
    placeholder: "Phone Number",
    label: "Phone Number",
    errorMessage:
      "invalid phone format or length, please use the follow format xxxxxxxxxx",
    pattern: "^\\d{6,15}$",
    required: false,
  },
  {
    name: "email",
    type: "text",
    placeholder: "Email",
    label: "Email",
    errorMessage: "It should be valid email or this email already existd",
    pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$`,
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    errorMessage:
      "Password should be at least 6 characters and should include at least 1 letter, 1 number and 1 special character",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$`,
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    errorMessage: "password don't match",
    pattern: `${passwordPatern}`,
    required: true,
  },
];
