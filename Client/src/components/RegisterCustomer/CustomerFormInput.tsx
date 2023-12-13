import { useState } from "react";
import "../../styling/Components/_CustomerFormInput.scss";

interface CustomerFormInputProps {
  placeholder: string;
  name: string;
  label: string;
  value: string;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomerFormInput = (props: CustomerFormInputProps) => {
  const [focused, setFocused] = useState<boolean>(false);
  const { label, errorMessage, onChange, ...inputProps } = props;

  const handleFocused = () => {
    setFocused(true);
  };

  return (
    <div className="customerFormInput">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocused}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        //@ts-ignore
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default CustomerFormInput;
