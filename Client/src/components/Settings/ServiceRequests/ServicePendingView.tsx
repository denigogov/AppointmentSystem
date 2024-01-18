import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";

interface ServicePendingViewProps {
  setStepOne: React.Dispatch<React.SetStateAction<boolean>>;
  pendingServices: ServiceEmloyeesTypes[];
}

const ServicePendingView = ({
  setStepOne,
  pendingServices,
}: ServicePendingViewProps) => {
  const handleStepOne = () => {
    setStepOne((e) => !e);
  };
  return (
    <div>
      service ServicePendingView View
      <button onClick={handleStepOne}>add new service</button>
    </div>
  );
};

export default ServicePendingView;
