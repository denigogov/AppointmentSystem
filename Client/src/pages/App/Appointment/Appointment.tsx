import {
  fetchAllAppointments,
  fetchAllServiceEmployees,
  fetchAllServices,
  fetchTimeManagment,
} from "../../../api/tableApi.ts";
import useSWR from "swr";
import {
  AllAppointmentsTypes,
  AllServicesTypes,
  ServiceEmloyeesTypes,
  TimeManagmentTypes,
} from "../../../types/tableApiTypes.ts";
import { useState } from "react";
import NewAppointment1 from "../../../components/AppointmentComponent/NewAppointment1.tsx";
import NewAppointment2 from "../../../components/AppointmentComponent/NewAppointment2.tsx";
import NewAppointment3 from "../../../components/AppointmentComponent/NewAppointment3.tsx";
import { useAuth } from "../../../helpers/Auth.tsx";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import {
  errorMessageBtn,
  succesMessageNoBtn,
} from "../../../components/ErrorSuccesMessage.ts";

const Appointment = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | string>("");
  const [, setSucces] = useState<string>(""); // becouse I don't use success I can skip as this !
  const [, setErrorMessage] = useState<string>("");

  const auth = useAuth();
  const token = auth?.token;

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const navigate = useNavigate();

  const {
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[] | any>(["allServices", token], () =>
    fetchAllServices(token)
  );

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

  console.log(timeManagment);

  const {
    data: allAppointments,
    error: allAppointmentsError,
    isLoading: allAppointmentsLoading,
  } = useSWR<AllAppointmentsTypes[] | any>(["allAppointments", token], () =>
    fetchAllAppointments(token)
  );

  if (
    allServicesError ||
    servicesEmpolyeesError ||
    timeManagmentError ||
    allAppointmentsError
  )
    return <h6>{"error happen"}</h6>;
  if (
    allServicesLoading ||
    servicesEmpolyeesLoading ||
    timeManagmentLoading ||
    allAppointmentsLoading
  )
    return <p>loading...</p>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  const findEmployee = servicesEmpolyees?.filter((e: ServiceEmloyeesTypes) => {
    return e.services_id === +selectedService;
  });

  const filteTimeManagment = timeManagment?.filter(
    (arr: TimeManagmentTypes) => arr.employee_id === +selectedUser
  );

  const filterAppointments = allAppointments?.filter(
    (arr: AllAppointmentsTypes) => {
      return arr.employee_id === +selectedUser;
    }
  );
  const postData = {
    customer_id: auth.userInfo?.id ?? null,
    employee_id: +selectedUser,
    service_id: +selectedService,
    scheduled_at: moment(selectedDate)
      .tz(userTimeZone)
      .format("YYYY-MM-DD HH:mm:ss"),
  };

  const AppointmentPOSTrequest = async () => {
    try {
      const res = await fetch(`http://localhost:4000/tableRoute/appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (res.ok) {
        setSucces(`Appointment successfully scheduled!`);
        setErrorMessage("");
        succesMessageNoBtn("Appointment successfully scheduled!");
        navigate("/app/dashboard");
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log((err as Error).message);
      setErrorMessage((err as Error).message);
      errorMessageBtn(
        "Oops! Something went wrong",
        "Please try again later.",
        ""
      );
    }
  };

  const handlePostRequest = () => {
    AppointmentPOSTrequest();
  };

  return (
    <div style={{ borderTop: "1px solid #e0e0e0", padding: "20px" }}>
      <h4>Create new Account</h4>

      <NewAppointment1
        allServices={allServices}
        setSelectedService={setSelectedService}
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

      <button onClick={handlePostRequest}>send</button>
    </div>
  );
};

export default Appointment;
