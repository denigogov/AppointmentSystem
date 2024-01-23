import "../../../styling/Components/SettingsComponents/ServiceRequests/_serviceRequestPage.scss";
import useSWR, { mutate } from "swr";
import {
  fetchAllServiceEmployees,
  fetchAllServices,
} from "../../../api/tableApi";
import { useAuth } from "../../../helpers/Auth";
import {
  AllServicesTypes,
  ServiceEmloyeesTypes,
} from "../../../types/tableApiTypes";
import ServiceApprovedView from "../../../components/Settings/ServiceRequests/ServiceApprovedView";
import ServicePendingView from "../../../components/Settings/ServiceRequests/ServicePendingView";
import ServiceSelectView from "../../../components/Settings/ServiceRequests/ServiceSelectView";
import ServiceListView from "../../../components/Settings/ServiceRequests/ServiceListView";
import { useState } from "react";
import Swal from "sweetalert2";
import { apiGeneralErrorHandle } from "../../../helpers/api";
const apiUrl = import.meta.env.VITE_API_URL as string;

const ServiceRequest = () => {
  const [stepOne, setStepOne] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string[]>([]);

  const auth = useAuth();
  const token = auth.token ?? "";
  const employeeId = auth.userInfo?.id;

  const {
    data: servicesEmpolyees,
    error: servicesEmpolyeesError,
    isLoading: servicesEmpolyeesLoading,
  } = useSWR<ServiceEmloyeesTypes[]>(["servicesemployees", token], () =>
    fetchAllServiceEmployees(token)
  );
  const {
    data: allServices,
    error: allServicesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[]>(["allServices", token], () =>
    fetchAllServices({ token })
  );

  const filterNewServices = allServices?.filter((service) => {
    const isServicePresentForEmp = servicesEmpolyees?.some(
      (empService) =>
        empService?.servicesName === service.servicesName &&
        empService?.employees_id === employeeId
    );
    return !isServicePresentForEmp;
  });

  const approvedServices = servicesEmpolyees?.filter(
    (user) => user.approved === 1 && user.employees_id === employeeId
  );
  const pendingServices = servicesEmpolyees?.filter(
    (user) => user?.approved !== 1 && user?.employees_id === employeeId
  );

  if (servicesEmpolyeesError || allServicesError) {
    return <p>Error happen , {servicesEmpolyeesError.message} </p>;
  }
  if (servicesEmpolyeesLoading || allServicesLoading) {
    return <p>Loading...</p>;
  }

  const selectedServices: string[] = selectedService.length
    ? selectedService
    : [];
  const selectedServiceId = allServices?.filter((service) =>
    selectedServices.includes(service.servicesName)
  );

  const queryData = selectedServiceId
    ? selectedServiceId.map((service) => {
        const data = {
          services_id: service.id,
          employees_id: employeeId,
        };
        return data;
      })
    : [];

  const postSelectedServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/tableRoute/serviceemloyees/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(queryData),
      });

      if (res.ok) {
        mutate(["servicesemployees", token]);
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#ffda79",
          title: "Created!",
          text: "Request submitted! Awaiting owner approval. You'll be notified on approval. Thanks!",
          showConfirmButton: false,
          timer: 3000,
        });

        setStepOne(false);
      } else throw new Error(`${res.statusText}`);
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handleDeleteService = async (service: ServiceEmloyeesTypes) => {
    const sendPrompt = Swal.fire({
      title: "Delete Service ?",
      html: `Are you sure you want to remove the <strong>'${
        service?.servicesName ?? "service not found"
      }'</strong>service? This action is irreversible, and you won't have access to its benefits. Confirm your decision below.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffda79",
      cancelButtonColor: "#b7b7b7",
      confirmButtonText: "Confirm !",
    });

    try {
      if ((await sendPrompt).isConfirmed) {
        const res = await fetch(
          `${apiUrl}/tableRoute/serviceemloyees/${service?.id ?? null}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          mutate(["servicesemployees", token]);
          Swal.fire({
            position: "center",
            icon: "success",
            iconColor: "#ffda79",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else throw new Error(`${res.statusText}`);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div className="serviceRequest__container">
      {/* USING THE SAME CLASSES BECAUSE THE LAYOUT IS THE SAME of the TITLE AND SUBTITLE! */}
      <div className="timeManagement--text-container">
        <h2 className="timeManagemen-title">Service Requests</h2>
        <p className="timeManagemen-subTitle">
          Explore the array of available services, handpick the ones you desire,
          and send requests for approval. Keep track of your pending requests
          and anticipate the approval that will unlock new possibilities for
          your experience.
        </p>
      </div>

      <div
        className={
          stepOne
            ? "serviceRequest__component--container   stepOne__active"
            : "serviceRequest__component--container"
        }
      >
        <section className="serviceRequest__component-displayOnly--wrap">
          <ServiceApprovedView
            approvedServices={approvedServices || []}
            stepOne={stepOne}
          />
          <ServicePendingView
            setStepOne={setStepOne}
            stepOne={stepOne}
            pendingServices={pendingServices || []}
            setSelectedService={setSelectedService}
            handleDeleteService={handleDeleteService}
          />
        </section>

        {stepOne && (
          <section className="serviceRequst__component-addService--wrap">
            <ServiceListView
              filterNewServices={filterNewServices || []}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setStepOne={setStepOne}
            />
            <ServiceSelectView
              selectedService={selectedService}
              postSelectedServices={postSelectedServices}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ServiceRequest;
