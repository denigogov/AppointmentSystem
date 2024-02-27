import { FormEvent, useRef } from "react";
import "../../../styling/Components/management components/_createServiceView.scss";
import MultiFormWraper from "../Employees/MultiFormWraper";
import { QueryDataType } from "../../../pages/App/Management/Services/ServiceCreate";
interface CreateServiceViewProps {
  handleCreateService: (queryData: QueryDataType) => void;
}

const CreateServiceView: React.FC<CreateServiceViewProps> = ({
  handleCreateService,
}) => {
  const serviceNameRef = useRef<HTMLInputElement>(null);
  const servicePriceRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const queryData: QueryDataType = {
      servicesName: serviceNameRef.current?.value ?? "",
      servicePrice: parseFloat(servicePriceRef.current?.value ?? ""),
    };

    handleCreateService(queryData);
  };

  return (
    <div className="createService__container">
      <div className="createService__text">
        <p className="createService--title">Create New Service</p>
        <p className="createService--subTitle">
          Please fill in the required information to create a new service.
        </p>
      </div>

      <form className="createService__form-wrap" onSubmit={handleSubmit}>
        <MultiFormWraper>
          <label>Service Name</label>
          <input
            ref={serviceNameRef}
            type="text"
            placeholder="Service Name (e.g. Haircut)"
            min="2"
            max="16"
            required
          />
          <label>Price</label>
          <input
            ref={servicePriceRef}
            type="tel"
            step="0.01"
            min="0"
            placeholder="Price (e.g. 20) "
            required
          />
        </MultiFormWraper>
        <button className="button__submit" type="submit">
          <span>Submit</span>
        </button>
      </form>
    </div>
  );
};

export default CreateServiceView;
