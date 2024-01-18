import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";
import { Link } from "react-router-dom";

interface DashBoxServicesProps {
  approvedServices: ServiceEmloyeesTypes[];
}

const DashBoxServices = ({ approvedServices }: DashBoxServicesProps) => {
  return (
    <div className="dashBoxAllServices--employees">
      <p className="dashBoxAllServices--employees__title">
        Expertise & Services
      </p>

      <div className="dashBoxAllServices--employees--listWrap">
        {approvedServices.map((arr, i) => {
          return (
            <ul key={i}>
              <li>
                {arr?.servicesName ?? "no service avaiable"} -{" "}
                {arr.servicePrice ?? "/"} €
              </li>
            </ul>
          );
        })}
      </div>
      <br />
      <p className="dashBoxAllServices--employees__footer">
        <Link to="/app/settings/service-requests">Request New Service</Link>
      </p>
    </div>
  );
};

export default DashBoxServices;
