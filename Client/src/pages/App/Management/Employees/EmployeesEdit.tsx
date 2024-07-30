import useSWR, { mutate } from "swr";
import { fetchSingleEmployees } from "../../../../api/tableApi";
import EditInputs from "../../../../components/ManagementComponent/Employees/edit/EditInputs";
import EditTitle from "../../../../components/ManagementComponent/Employees/edit/EditTitle";
import { useAuth } from "../../../../helpers/Auth";
import "../../../../styling/Management/_editEmployer.scss";
import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { FormEvent, useRef } from "react";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../../components/ErrorSuccesMessage";
import LoadingRing from "../../../../components/loadingRing";

interface EmployeesEditProps {
  /* props types */
}
const API_URL = import.meta.env.VITE_API_URL as string;

const EmployeesEdit: React.FC<EmployeesEditProps> = () => {
  const { token } = useAuth();
  const { id: employerId } = useParams();
  const navigate = useNavigate();
  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const inputValues = {
    firstNameRef: useRef<HTMLInputElement>(null),
    lastNameRef: useRef<HTMLInputElement>(null),
    cityRef: useRef<HTMLInputElement>(null),
    emailRef: useRef<HTMLInputElement>(null),
    phoneNumberRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
  };

  const {
    data: singleEmployer,
    error: singleEmployerError,
    isLoading: singleEmployerLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(
    ["singleEmployer", token, employerId],
    () => fetchSingleEmployees(token ?? "", employerId)
  );

  const updateEmployerRequest = async (
    queryData: Partial<FetchAllEmployeesTypes>
  ) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update User",
        "Are you sure you want to save the changes you made to your profile? This action will update your user information.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        const res = await fetch(`${API_URL}/employees/${employerId}`, {
          method: "PUT",
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
          mutate(["allEmployees", token]);
          updateActionPrompt("Great!", "Your Updates has been saved.");
          setPopupOpen((e) => !e);
          navigate("/app/management/employees/");
        }
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  if (singleEmployerLoading) return <LoadingRing />;

  // if (
  //   inputValues.firstNameRef.current?.value !== singleEmployer![0]?.firstName
  // ) {
  //   queryData.firstName = inputValues.firstNameRef.current?.value;
  // }

  // if (inputValues.lastNameRef.current?.value !== singleEmployer![0]?.lastName) {
  //   queryData.lastName = inputValues.lastNameRef.current?.value;

  // }

  const handlePutRequest = (e: FormEvent) => {
    e.preventDefault();

    // updateEmployerRequest(queryData)
    const queryData: Partial<FetchAllEmployeesTypes> = {};

    const compareValueAndAssign = (fieldName: keyof FetchAllEmployeesTypes) => {
      const refName = (fieldName + "Ref") as keyof typeof inputValues;
      const currentValue = inputValues[refName].current?.value ?? "";
      const initialValue = singleEmployer?.[0]?.[fieldName];
      if (currentValue !== initialValue) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        queryData[fieldName] = currentValue;
      }
    };
    compareValueAndAssign("firstName");
    compareValueAndAssign("lastName");
    compareValueAndAssign("city");
    compareValueAndAssign("email");
    compareValueAndAssign("phoneNumber");

    if (inputValues.passwordRef.current?.value) {
      queryData.password = inputValues.passwordRef.current?.value;
    }

    console.log(queryData);
    updateEmployerRequest(queryData);
    // Updating the editForm to fetch the newest update after submiting !
    mutate(["singleEmployer", token]);
  };

  return (
    <div className="employer__edit-container">
      <EditTitle />
      {singleEmployer?.length ? (
        <>
          <EditInputs
            singleEmployer={singleEmployer[0]}
            inputValues={inputValues}
          />
          <div>
            <button
              type="submit"
              className="button__submit"
              onClick={handlePutRequest}
            >
              <span>Update</span>
            </button>
          </div>
        </>
      ) : (
        <p>{singleEmployerError.message}</p>
      )}
    </div>
  );
};

export default EmployeesEdit;
