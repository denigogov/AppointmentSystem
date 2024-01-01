import { AllServicesTypes } from "../../../types/tableApiTypes";

interface DashBoxServicesProps {
  allServices: AllServicesTypes[];
}

const DashBoxServices = ({ allServices }: DashBoxServicesProps) => {
  return (
    <div className="dashBoxAllServices--employees">
      <p className="dashBoxAllServices--employees__title">
        Expertise & Services
      </p>

      <div className="dashBoxAllServices--employees--listWrap">
        {allServices.map((arr, i) => {
          return (
            <ul key={i}>
              <li>
                {arr?.servicesName ?? "no service avaiable"} -{" "}
                {arr.servicePrice} €
              </li>
            </ul>
          );
        })}
      </div>
      <br />
      <p className="dashBoxAllServices--employees__footer">
        Request New Service
      </p>
    </div>
  );
};

export default DashBoxServices;
