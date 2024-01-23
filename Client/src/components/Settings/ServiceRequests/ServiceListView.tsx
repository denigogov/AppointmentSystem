import { AllServicesTypes } from "../../../types/tableApiTypes";

interface ServiceListViewProps {
  filterNewServices: AllServicesTypes[];
  selectedService: Array<string>;
  setSelectedService: React.Dispatch<React.SetStateAction<string[]>>;
  setStepOne: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceListView = ({
  filterNewServices,
  selectedService,
  setSelectedService,
  setStepOne,
}: ServiceListViewProps) => {
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedItems = e.target.value;
    !selectedService.includes(checkedItems)
      ? setSelectedService([...selectedService, checkedItems])
      : setSelectedService(selectedService.filter((id) => id !== checkedItems));
  };

  const handleCloseBtn = () => {
    setStepOne(false);
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
        {filterNewServices.length ? (
          filterNewServices.map((service) => (
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
          ))
        ) : (
          <small>No Avaiable Services</small>
        )}
      </div>

      <div>
        <button className="addServiceBtn" onClick={handleCloseBtn}>
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default ServiceListView;
