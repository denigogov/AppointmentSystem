import { fetchAllServiceEmployees, fetchAllServices } from "../../api/tableApi";
import useSWR from "swr";
import {
  AllServicesTypes,
  ServiceEmloyeesTypes,
} from "../../types/tableApiTypes";
import { useState } from "react";
import NewAppointment1 from "../../components/AppointmentComponent/NewAppointment1.tsx";
import NewAppointment2 from "../../components/AppointmentComponent/NewAppointment2.tsx";
import NewAppointment3 from "../../components/AppointmentComponent/NewAppointment3.tsx";

const Appointment = () => {
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const {
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[] | any>("orderStatus", () => fetchAllServices());

  const {
    data: servicesEmpolyees,
    error: servicesEmpolyeesError,
    isLoading: servicesEmpolyeesLoading,
  } = useSWR<ServiceEmloyeesTypes[] | any>("servicesEmployees", () =>
    fetchAllServiceEmployees()
  );

  if (allServicesError || servicesEmpolyeesError)
    return <h6>{allServicesError.message}</h6>;
  if (allServicesLoading || servicesEmpolyeesLoading) return <></>; // If I add some text there will be flicking because of data loading but anyway I need to add personal Loading message !!

  const findEmployee = servicesEmpolyees?.filter((e: ServiceEmloyeesTypes) => {
    return e.services_id === +selectedService;
  });

  console.log(selectedUser);

  return (
    <div>
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

      {/* {selectedService && selectedUser &&       <NewAppointment3 />} */}
      <NewAppointment3 />
    </div>
  );
};

export default Appointment;
