import "../../../styling/_appointmentsPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../helpers/Auth.tsx";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import {
  fetchAllAppointmentsFromTodayOn,
  fetchAllServiceEmployees,
  fetchTimeManagment,
} from "../../../api/tableApi.ts";
import {
  AllAppointmentsTypes,
  ServiceEmloyeesTypes,
  TimeManagmentTypes,
} from "../../../types/tableApiTypes.ts";

import { apiGeneralErrorHandle } from "../../../helpers/api.ts";
import ProgressBar from "../../../components/ProgressBar.tsx";
import Step1 from "../../../components/AppointmentComponent/Step1.tsx";
import Step2 from "../../../components/AppointmentComponent/Step2.tsx";
import Step3 from "../../../components/AppointmentComponent/Step3.tsx";
import { useMultiStepFormEmployees } from "../../../helpers/useMultiStepFormEmployees.ts";
import { succesMessageNoBtn } from "../../../components/ErrorSuccesMessage.ts";

const API_URL = import.meta.env.VITE_API_URL as string;

export type InitialDataProps = {
  customer_id?: number | string;
  employee_id: number | string;
  service_id: number | string;
  scheduled_at: Date | string;
};

const INITAL_DATA: InitialDataProps = {
  service_id: "",
  employee_id: "",
  scheduled_at: "",
};

const Appointment = () => {
  const [appointmentData, setAppointmentData] =
    useState<InitialDataProps>(INITAL_DATA);

  const navigate = useNavigate();
  const auth = useAuth();
  const token = auth?.token;
  const customerId = auth.userInfo?.id;

  const updateFileds = (fileds: Partial<InitialDataProps>) => {
    setAppointmentData((prev) => {
      return { ...prev, ...fileds };
    });
  };

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

  const { steps, currentStepIndex, next, previuse, isFirstStep, isLastStep } =
    useMultiStepFormEmployees([
      <Step1
        {...appointmentData}
        updateFileds={updateFileds}
        servicesEmpolyees={servicesEmpolyees}
        servicesEmpolyeesLoading={servicesEmpolyeesLoading}
        servicesEmpolyeesError={servicesEmpolyeesError}
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
        timeManagmentError={timeManagmentError}
        timeManagmentLoading={timeManagmentLoading}
        allAppointmentsError={allAppointmentsError}
        allAppointmentsLoading={allAppointmentsLoading}
      />,
    ]);

  const postData = { ...appointmentData, customer_id: customerId };

  const AppointmentPOSTrequest = async () => {
    try {
      const res = await fetch(`${API_URL}/tableRoute/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        succesMessageNoBtn("Appointment successfully scheduled!");
        navigate("/app/dashboard");
        setAppointmentData(INITAL_DATA);
      } else {
        const errorResponse = await res.json();
        throw new Error(`${errorResponse.validationErrors[0].message}`);
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!isLastStep) next();

    if (isLastStep) AppointmentPOSTrequest();
  };

  return (
    <div className="appointment__container">
      <div className="appointment--title">
        <h2>Create new Appointment</h2>
        <p>
          Unlock Your Style Potential with Seamless Booking! Step into
          Effortless Elegance in Just Three Simple Steps.
        </p>
      </div>

      <div className=" appointmenet_wrap-form">
        <ProgressBar currentStepIndex={currentStepIndex} {...stepNames} />

        <form
          onSubmit={handleSubmitForm}
          className="form__container--appointments"
        >
          <div>{steps[currentStepIndex]}</div>

          <div className="multiForm__button-wrap flexColumn">
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
