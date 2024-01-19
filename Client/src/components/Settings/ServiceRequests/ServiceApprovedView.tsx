import "../../../styling/Components/SettingsComponents/ServiceRequests/_serviceApprovedView.scss";
import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";

interface ServiceApprovedViewProps {
  approvedServices: ServiceEmloyeesTypes[];
  stepOne: boolean;
}

const ServiceApprovedView = ({
  approvedServices,
  stepOne,
}: ServiceApprovedViewProps) => {
  return (
    <div
      className={
        stepOne
          ? "serviceApprovedView__container"
          : "serviceApprovedView__container  notActiveAddService"
      }
    >
      <div className="serviceRequest__header--text">
        <p>Current Services</p>
        <p>
          Explore and manage your current services below. Customize your work
          experience with the tools and benefits you have at your fingertips.
        </p>
      </div>

      <div className="approvedServices__wrap">
        {approvedServices.length ? (
          approvedServices.map((services, i) => (
            <ul key={services.id}>
              <li>• {services?.servicesName}</li>
            </ul>
          ))
        ) : (
          <p>No approved services available</p>
        )}
      </div>
    </div>
  );
};

export default ServiceApprovedView;
