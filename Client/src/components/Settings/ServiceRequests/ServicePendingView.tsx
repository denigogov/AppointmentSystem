import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";
import deleteIcon from "../../../assets/deleteIcon.svg";

interface ServicePendingViewProps {
  setStepOne: React.Dispatch<React.SetStateAction<boolean>>;
  stepOne: boolean;
  pendingServices: ServiceEmloyeesTypes[];
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteService: (
    ServiceEmloyeesTypes: ServiceEmloyeesTypes
  ) => Promise<void>;
}

const ServicePendingView = ({
  stepOne,
  setStepOne,
  pendingServices,
  setSelectedService,
  handleDeleteService,
}: ServicePendingViewProps) => {
  const handleStepOne = () => {
    setStepOne((e) => !e);
    // clean up the state if user click on close btn !
    setSelectedService([]);
  };

  const handleDelete = (service: ServiceEmloyeesTypes) => {
    handleDeleteService(service);
  };

  const onlyPendingServices = pendingServices.filter(
    (services) => services?.approved !== 0
  );

  return (
    // Styling for class  "servicePendingView__container" is inside of _serviceApprovedView
    <div
      className={
        onlyPendingServices.length || !stepOne
          ? "servicePendingView__container notActiveAddService "
          : "servicePendingView__container  emptyServices__container  "
      }
    >
      {onlyPendingServices.length ? (
        <>
          <div className="serviceRequest__header--text">
            <p>Pending Service Requests</p>
            <p>
              Your requested services are awaiting approval. Monitor their
              status and get ready to unlock new features once approved
            </p>
          </div>

          <div className="pendingService__wrap">
            {onlyPendingServices?.map((service) => (
              <ul key={service.id}>
                <li>• {service.servicesName} </li>
                <img
                  src={deleteIcon}
                  alt="delete icon"
                  onClick={() => handleDelete(service)}
                />
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

      {stepOne || (
        <button className="addServiceBtn" onClick={handleStepOne}>
          <span>Add Service</span>
        </button>
      )}
    </div>
  );
};

export default ServicePendingView;
