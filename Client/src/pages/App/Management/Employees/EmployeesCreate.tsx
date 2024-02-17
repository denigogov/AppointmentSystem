import "../../../../styling/Components/management components/_multiStepFormEmp.scss";
import MultiFormStep1 from "../../../../components/ManagementComponent/Employees/MultiFormStep1";
import MultiFormStep2 from "../../../../components/ManagementComponent/Employees/MultiFormStep2";
import MultiFormStep3 from "../../../../components/ManagementComponent/Employees/MultiFormStep3";
import { useMultiStepFormEmployees } from "../../../../helpers/useMultiStepFormEmployees";
import { FormEvent, useState } from "react";
import { setDate } from "date-fns";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProgressBar from "../../../../components/ProgressBar";

interface EmployeesCreateProps {
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  blabla: string;
  blabla2: string;
  age1: string;
  mejdz: string;
  kukuraK: string;
}

const INITAL_DATA: EmployeesCreateProps = {
  firstName: "",
  lastName: "",
  age: "",
  phone: "",
  blabla: "",
  blabla2: "",
  age1: "",
  mejdz: "",
  kukuraK: "",
};

const EmployeesCreate = () => {
  const [data, setData] = useState(INITAL_DATA);
  const navigate = useNavigate();
  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const updateFileds = (fileds: Partial<EmployeesCreateProps>) => {
    setData((prev) => {
      return { ...prev, ...fileds };
    });
  };

  const { steps, currentStepIndex, next, previuse, isFirstStep, isLastStep } =
    useMultiStepFormEmployees([
      <MultiFormStep1 {...data} updateFileds={updateFileds} />,
      <MultiFormStep2 {...data} updateFileds={updateFileds} />,
      <MultiFormStep3 {...data} updateFileds={updateFileds} />,
    ]);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("submit data");
    setData(INITAL_DATA);
    setPopupOpen((e) => !e);
    navigate("/app/management/employees/");
  };

  return (
    <div className="multiForm-employees__container">
      <form onSubmit={handleSubmitForm}>
        <div className="progressBar">
          {/* <div
            style={{
              width: isFirstStep ? "33.3%" : !isLastStep ? "66.6%" : "100%",
            }}
          ></div> */}
          <ProgressBar currentStepIndex={currentStepIndex} />
        </div>
        <div> {steps[currentStepIndex]}</div>
        {!isFirstStep && (
          <button type="button" onClick={previuse}>
            Previuse
          </button>
        )}
        <button type="submit">{!isLastStep ? "Next" : "Submit"}</button>
      </form>
    </div>
  );
};

export default EmployeesCreate;
