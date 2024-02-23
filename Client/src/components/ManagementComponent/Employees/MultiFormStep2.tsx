import { AllServicesTypes } from "../../../types/tableApiTypes";
import MultiFormWraper from "./MultiFormWraper";
import LoadingRing from "../../loadingRing";
import React from "react";

// Partial is makeing the userDataProps optional!!
type MultiFormStep2Props = {
  allServices?: AllServicesTypes[];
  checkboxData: number[];
  setCheckBoxData: React.Dispatch<React.SetStateAction<number[]>>;
};

const MultiFormStep2: React.FC<MultiFormStep2Props> = ({
  allServices,
  checkboxData,
  setCheckBoxData,
}) => {
  const handleCheckbox = (serviceId: number) => {
    if (checkboxData.includes(serviceId)) {
      setCheckBoxData(checkboxData.filter((id) => id !== serviceId));
    } else {
      setCheckBoxData([...checkboxData, serviceId]);
    }
  };
  return (
    <MultiFormWraper title="Add New Services">
      {allServices?.length ? (
        allServices?.map((service) => (
          <React.Fragment key={service.id}>
            <label>{service?.servicesName ?? "Not Found"}</label>
            <input
              type="checkbox"
              checked={checkboxData.includes(service.id)}
              onChange={() => handleCheckbox(service.id)}
            />
          </React.Fragment>
        ))
      ) : (
        <LoadingRing />
      )}
    </MultiFormWraper>
  );
};

export default MultiFormStep2;
