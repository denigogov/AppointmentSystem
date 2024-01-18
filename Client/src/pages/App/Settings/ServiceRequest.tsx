import "../../../styling/Components/SettingsComponents/ServiceRequests/_serviceRequestPage.scss";
import useSWR from "swr";
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

const ServiceRequest = () => {
  const [stepOne, setStepOne] = useState<boolean>(false);
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
  console.log(filterNewServices);

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

      <div className="serviceRequest__component-displayOnly--wrap">
        <ServiceApprovedView approvedServices={approvedServices} />
        <ServicePendingView
          setStepOne={setStepOne}
          pendingServices={pendingServices || []}
        />
      </div>

      {stepOne && (
        <>
          <div className="serviceRequst__component-addService--wrap">
            <ServiceListView filterNewServices={filterNewServices || []} />
            <ServiceSelectView />
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceRequest;
