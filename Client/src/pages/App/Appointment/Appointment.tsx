import {
  fetchAllAppointmentsFromTodayOn,
  fetchAllServiceEmployees,
  fetchTimeManagment,
} from "../../../api/tableApi.ts";
import useSWR from "swr";
import {
  AllAppointmentsTypes,
  ServiceEmloyeesTypes,
  TimeManagmentTypes,
} from "../../../types/tableApiTypes.ts";
import { FormEvent, useState } from "react";
// import NewAppointment1 from "../../../components/AppointmentComponent/NewAppointment1.tsx";
// import NewAppointment2 from "../../../components/AppointmentComponent/NewAppointment2.tsx";
// import NewAppointment3 from "../../../components/AppointmentComponent/NewAppointment3.tsx";
import { useAuth } from "../../../helpers/Auth.tsx";
import { useNavigate } from "react-router-dom";
// import moment from "moment-timezone";
// import {
//   errorMessageBtn,
//   succesMessageNoBtn,
// } from "../../../components/ErrorSuccesMessage.ts";
import { apiGeneralErrorHandle } from "../../../helpers/api.ts";
import ProgressBar from "../../../components/ProgressBar.tsx";
import Step1 from "../../../components/AppointmentComponent/Step1.tsx";
import Step2 from "../../../components/AppointmentComponent/Step2.tsx";
import Step3 from "../../../components/AppointmentComponent/Step3.tsx";
import { useMultiStepFormEmployees } from "../../../helpers/useMultiStepFormEmployees.ts";
const API_URL = import.meta.env.VITE_API_URL as string;

export type InitialDataProps = {
  customer_id: string | number;
  employee_id: string | number;
  service_id: string | number;
  scheduled_at: Date | string;
};

const INITAL_DATA: InitialDataProps = {
  service_id: "",
  employee_id: "",
  scheduled_at: "",
  customer_id: "",
};

const Appointment = () => {
  const [appointmentData, setAppointmentData] =
    useState<InitialDataProps>(INITAL_DATA);

  const auth = useAuth();
  const token = auth?.token;

  const navigate = useNavigate();

  const updateFileds = (fileds: Partial<InitialDataProps>) => {
    setAppointmentData((prev) => {
      return { ...prev, ...fileds };
    });
  };

  console.log(appointmentData);

  const stepNames = {
    step1Name: "Service Selection",
    step2Name: "Choose Your Stylist",
    step3Name: "Select Date and Time",
  };

  const {
    data: servicesEmpolyees,
    error: servicesEmpolyeesError,
    isLoading: servicesEmpolyeesLoading,
  } = useSWR<ServiceEmloyeesTypes[] | any>(["servicesemployees", token], () =>
    fetchAllServiceEmployees(token)
  );

  const {
    data: timeManagment,
    error: timeManagmentError,
    isLoading: timeManagmentLoading,
  } = useSWR<TimeManagmentTypes[]>(["timeManagment", token], () =>
    fetchTimeManagment({ token })
  );

  // fetchAllAppointmentsFromTodayOn
  const {
    data: allAppointments,
    error: allAppointmentsError,
    isLoading: allAppointmentsLoading,
  } = useSWR<AllAppointmentsTypes[] | any>(["allAppointments", token], () =>
    fetchAllAppointmentsFromTodayOn(token)
  );

  const {
    steps,
    currentStepIndex,
    next,
    previuse,
    isFirstStep,
    isLastStep,
    isSecoundStep,
  } = useMultiStepFormEmployees([
    <Step1
      {...appointmentData}
      updateFileds={updateFileds}
      servicesEmpolyees={servicesEmpolyees}
    />,
    <Step2
      {...appointmentData}
      updateFileds={updateFileds}
      servicesEmpolyees={servicesEmpolyees}
    />,
    <Step3
      {...appointmentData}
      updateFileds={updateFileds}
      timeManagment={timeManagment ?? []}
      allAppointments={allAppointments}
    />,
  ]);

  if (servicesEmpolyeesError || timeManagmentError || allAppointmentsError)
    return <h6>{"error happen"}</h6>;
  if (
    servicesEmpolyeesLoading ||
    timeManagmentLoading ||
    allAppointmentsLoading
  )
    return <p>loading...</p>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  // const findEmployee = servicesEmpolyees?.filter((e: ServiceEmloyeesTypes) => {
  //   return e.services_id === +appointmentData.service_id && e.approved === 1;
  // });

  // const filteTimeManagment = timeManagment?.filter(
  //   (arr: TimeManagmentTypes) =>
  //     arr.employee_id === +appointmentData.employee_id
  // );

  // const filterAppointments = allAppointments?.filter(
  //   (arr: AllAppointmentsTypes) => {
  //     return arr.employee_id === +appointmentData.employee_id;
  //   }
  // );

  //  I did it as test for universal API but I need to refactore !! REFACTORE
  // const postData = {
  //   customer_id: auth.userInfo?.id ?? null,
  //   employee_id: +selectedUser,
  //   service_id: +selectedService,
  //   scheduled_at: moment(selectedDate)
  //     .tz(userTimeZone)
  //     .format("YYYY-MM-DD HH:mm:ss"),
  // };

  // const AppointmentPOSTrequest = async () => {
  //   try {
  //     const res = await fetch(`${API_URL}/tableRoute/appointment`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(postData),
  //     });

  //     if (res.ok) {
  //       setSucces(`Appointment successfully scheduled!`);
  //       setErrorMessage("");
  //       succesMessageNoBtn("Appointment successfully scheduled!");
  //       navigate("/app/dashboard");
  //     } else {
  //       throw new Error();
  //     }
  //   } catch (err) {
  //     console.log((err as Error).message);
  //     setErrorMessage((err as Error).message);
  //     errorMessageBtn(
  //       "Oops! Something went wrong",
  //       "Please try again later.",
  //       ""
  //     );

  //     apiGeneralErrorHandle(err);
  //   }
  // };

  // const handlePostRequest = () => {
  //   AppointmentPOSTrequest();
  // };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) next();
  };

  return (
    <div style={{ borderTop: "1px solid #e0e0e0", padding: "20px" }}>
      <h4>Create new Appointment</h4>

      {/* <NewAppointment1
        setSelectedService={setSelectedService}
        uniqueServicesNames={uniqueServicesNames}
      />

      {selectedService && (
        <NewAppointment2
          servicesEmpolyees={findEmployee}
          setSelectedUser={setSelectedUser}
        />
      )}

      {selectedService && selectedUser && (
        <NewAppointment3
          filteTimeManagment={filteTimeManagment ?? []}
          filterAppointments={filterAppointments}
          selectedUser={selectedUser}
          setSelectedDate={setSelectedDate}
        />
      )}

      <button onClick={handlePostRequest}>send</button> */}

      <div className="multiForm-employees__container">
        <ProgressBar currentStepIndex={currentStepIndex} {...stepNames} />

        <form onSubmit={handleSubmitForm} className="form__container">
          <div>{steps[currentStepIndex]}</div>

          <div className="multiForm__button-wrap">
            {!isFirstStep && (
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
    </div>
  );
};

export default Appointment;
