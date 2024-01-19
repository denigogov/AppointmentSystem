import {
  AllServicesTypes,
  ServiceEmloyeesTypes,
} from "../../../types/tableApiTypes";

interface ServicePendingViewProps {
  setStepOne: React.Dispatch<React.SetStateAction<boolean>>;
  stepOne: boolean;
  pendingServices: ServiceEmloyeesTypes[];
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServicePendingView = ({
  stepOne,
  setStepOne,
  pendingServices,
  setSelectedService,
}: ServicePendingViewProps) => {
  const handleStepOne = () => {
    setStepOne((e) => !e);
    // clean up the state if user click on close btn !
    setSelectedService([]);
  };
  return (
    // Styling for class  "servicePendingView__container" is inside of _serviceApprovedView
    <div
      className={
        pendingServices.length || !stepOne
          ? "servicePendingView__container notActiveAddService "
          : "servicePendingView__container  emptyServices__container  "
      }
    >
      {pendingServices.length ? (
        <>
          <div className="serviceRequest__header--text">
            <p>Pending Service Requests</p>
            <p>
              Your requested services are awaiting approval. Monitor their
              status and get ready to unlock new features once approved
            </p>
          </div>

          <div className="pendingService__wrap">
            {pendingServices?.map((service) => (
              <ul key={service.id}>
                <li>• {service.servicesName}</li>
              </ul>
            ))}
          </div>
        </>
      ) : (
        <div className="serviceRequest__header--text">
          <p>Add New Services</p>
          <p>
            Expand your service offerings. Click below to request new services
            and enhance your work experience
          </p>
        </div>
      )}

      <button className="addServiceBtn" onClick={handleStepOne}>
        <span>{stepOne ? "close" : "Add Service"}</span>
      </button>
    </div>
  );
};

export default ServicePendingView;
