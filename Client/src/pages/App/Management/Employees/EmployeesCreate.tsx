import "../../../../styling/Components/management components/_multiStepFormEmp.scss";
import MultiFormStep1 from "../../../../components/ManagementComponent/Employees/MultiFormStep1";
import MultiFormStep2 from "../../../../components/ManagementComponent/Employees/MultiFormStep2";
import MultiFormStep3 from "../../../../components/ManagementComponent/Employees/MultiFormStep3";
import { useMultiStepFormEmployees } from "../../../../helpers/useMultiStepFormEmployees";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProgressBar from "../../../../components/ProgressBar";
import {
  AllServicesTypes,
  FetchAllEmployeesTypes,
  FetchUserTypesProps,
} from "../../../../types/tableApiTypes";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../../../helpers/Auth";
import {
  fetchAllEmployees,
  fetchAllServices,
  fetchUserTypes,
} from "../../../../api/tableApi";
import LoadingRing from "../../../../components/loadingRing";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { succesMessageNoBtn } from "../../../../components/ErrorSuccesMessage";

interface EmployeesCreateProps {
  // Step 1
  employeesUserType_id: number;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RestDataProsp {
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  employee_id?: number;
}

const INITAL_DATA_RESTSTEP: RestDataProsp = {
  // REST STEPS
  startHour: 9,
  endHour: 17,
  startMinute: 0,
  endMinute: 30,
};

const INITAL_DATA_STEP1: EmployeesCreateProps = {
  employeesUserType_id: 2,
  firstName: "",
  lastName: "",
  city: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const API_URL = import.meta.env.VITE_API_URL as string;

const EmployeesCreate = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const [userData, setUserData] = useState(INITAL_DATA_STEP1);
  const [restData, setRestData] = useState(INITAL_DATA_RESTSTEP);
  const [checkboxData, setCheckBoxData] = useState<number[]>([]);
  const [lastEmployeeId, setLastEmployeeId] = useState<number | null>(null);
  const [stepOneSuccess, setStepOneSuccess] = useState<boolean>(false);

  const isOwner = userData.employeesUserType_id === 3;

  const updateFileds = (
    fileds: Partial<EmployeesCreateProps | RestDataProsp>
  ) => {
    setUserData((prev) => {
      return { ...prev, ...fileds };
    });

    setRestData((prev) => {
      return { ...prev, ...fileds };
    });
  };

  const { data: allEmployees, isLoading: allEmployeesLoading } = useSWR<
    FetchAllEmployeesTypes[]
  >(["allEmployees", token], () => fetchAllEmployees(token ?? ""));

  // Taking the last Employer ID
  useEffect(() => {
    if (allEmployees && allEmployees.length > 0) {
      const lastEmployee = allEmployees[allEmployees.length - 1];
      setLastEmployeeId(lastEmployee.id);
    }
  }, [allEmployees]);

  // Fetch UserTypes for MultiFormStep1 fetchDataByService
  const { data: allUserTypes, isLoading: allUserTypesLoading } = useSWR<
    FetchUserTypesProps[]
  >(["AllUserTypes", token], () => fetchUserTypes(token ?? ""));

  const { data: allServices, isLoading: allServicesLoading } = useSWR<
    AllServicesTypes[]
  >(["allServices", token], () => fetchAllServices(token ?? ""));

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isLastStep,
    isSecoundStep,
  } = useMultiStepFormEmployees([
    <MultiFormStep1
      {...userData}
      updateFileds={updateFileds}
      allUserTypes={allUserTypes}
    />,
    <MultiFormStep2
      {...userData}
      {...restData}
      allServices={allServices}
      checkboxData={checkboxData}
      setCheckBoxData={setCheckBoxData}
    />,
    <MultiFormStep3 {...userData} {...restData} updateFileds={updateFileds} />,
  ]);

  const stepNames = {
    step1Name: "Employer Info",
    step2Name: "Services",
    step3Name: "Work Time",
  };

  const createUserRequest = async (queryData: EmployeesCreateProps) => {
    try {
      const res = await fetch(`${API_URL}/employees/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(queryData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(`${errorResponse.validationErrors[0].message}`);
      } else {
        setStepOneSuccess(true);
        mutate(["allEmployees", token]);
      }
    } catch (err: unknown) {
      setStepOneSuccess(false);
      apiGeneralErrorHandle(err);
    }
  };

  interface SelectedServiceQueryProps {
    services_id: number;
    employees_id: number;
    approved: number;
  }

  // Query for the last 2 step
  const selectedServiceQuery: SelectedServiceQueryProps[] = checkboxData.map(
    (serviceId) => ({
      services_id: serviceId,
      employees_id: lastEmployeeId ?? 0,
      approved: 1,
    })
  );

  const workTimeWithEmplyerId: RestDataProsp = {
    employee_id: lastEmployeeId ?? 0,
    ...restData,
  };

  const postSelectedServicesAndWorkTime = async (
    selectedServices: SelectedServiceQueryProps[],
    workTimeQuery: RestDataProsp
  ) => {
    try {
      const res = await fetch(`${API_URL}/tableRoute/serviceemloyees/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedServices),
      });

      const sendWorkTime = await fetch(
        `${API_URL}/tableRoute/timeManagement/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(workTimeQuery),
        }
      );

      if (res.ok || sendWorkTime.ok) {
        succesMessageNoBtn("Employer Account Created");
      } else throw new Error(`${res.statusText}`);
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleSubmitForm = async (e: FormEvent) => {
    e.preventDefault();

    if (isFirstStep) {
      await createUserRequest(userData);
    } else if (!isLastStep) {
      // If it's not the last step and step 1 was successful, move to the next step
      stepOneSuccess ? next() : new Error("Step 1 Error");
    } else {
      // If it's the last step, submit selected services and navigate
      await postSelectedServicesAndWorkTime(
        selectedServiceQuery,
        workTimeWithEmplyerId
      );
      setPopupOpen((e) => !e);
      navigate("/app/management/employees/");
    }
  };
  // useEffect to handle step progression after successful step 1
  useEffect(() => {
    if (stepOneSuccess && isFirstStep) {
      next(); // Move to the next step
    }

    // When is Owner Account Created !
    if (isOwner) {
      succesMessageNoBtn("Owner Account Created");
      setPopupOpen((e) => !e);
      navigate("/app/management/employees/");
    }
  }, [stepOneSuccess]);

  if (allUserTypesLoading || allServicesLoading || allEmployeesLoading)
    return <LoadingRing />;

  return (
    <div className="multiForm-employees__container">
      <ProgressBar currentStepIndex={currentStepIndex} {...stepNames} />

      <form onSubmit={handleSubmitForm} className="form__container">
        <div>{steps[currentStepIndex]}</div>

        <div className="multiForm__button-wrap">
          {!isFirstStep && !isSecoundStep && (
            <button type="button" onClick={previuse}>
              <span>Previuse</span>
            </button>
          )}

          <button type="submit">
            <span>{!isLastStep ? "Next" : "Submit"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeesCreate;
