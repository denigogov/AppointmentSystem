import { AllServicesTypes } from "../../../types/tableApiTypes";

interface ServiceListViewProps {
  filterNewServices: AllServicesTypes[];
}

const ServiceListView = ({ filterNewServices }: ServiceListViewProps) => {
  return (
    <div>
      SERVICE LIST
      {filterNewServices.map((service) => (
        <div key={service.id}>
          <h5>{service.servicesName}</h5>
        </div>
      ))}
    </div>
  );
};

export default ServiceListView;
