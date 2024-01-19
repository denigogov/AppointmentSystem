import { AllServicesTypes } from "../../../types/tableApiTypes";

interface ServiceListViewProps {
  filterNewServices: AllServicesTypes[];
  selectedService: Array<string>;
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServiceListView = ({
  filterNewServices,
  selectedService,
  setSelectedService,
}: ServiceListViewProps) => {
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedItems = e.target.value;
    !selectedService.includes(checkedItems)
      ? setSelectedService([...selectedService, checkedItems])
      : setSelectedService(selectedService.filter((id) => id !== checkedItems));
  };

  return (
    // Styling for class  "serviceListView__container" is inside of _serviceApprovedView
    <div className="serviceListView__container">
      <div className="serviceRequest__header--text">
        <p>Explore New Services</p>
        <p>
          Discover a range of services currently unavailable to you. Select the
          ones that fit your needs and submit requests for approval.
        </p>
      </div>
      <div className="serviceList__checkbox-wrap">
        {filterNewServices.map((service) => (
          <label
            key={service?.id}
            className={
              selectedService.includes(service?.servicesName)
                ? "serviceList__checkbox--active"
                : ""
            }
          >
            <input
              type="checkbox"
              value={service.servicesName}
              onChange={handleCheckBox}
            />
            {service?.servicesName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServiceListView;
