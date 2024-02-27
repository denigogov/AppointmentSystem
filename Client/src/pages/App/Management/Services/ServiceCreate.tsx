import { useNavigate, useOutletContext } from "react-router-dom";
import { succesMessageNoBtn } from "../../../../components/ErrorSuccesMessage";
import CreateServiceView from "../../../../components/ManagementComponent/Services/CreateServiceView";
import { useAuth } from "../../../../helpers/Auth";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { mutate } from "swr";

export type QueryDataType = {
  servicesName: string;
  servicePrice: number;
};

const API_URL = import.meta.env.VITE_API_URL as string;

const ServiceCreate = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const handleCreateService = async (queryData: QueryDataType) => {
    try {
      const res = await fetch(`${API_URL}/tableRoute/services/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(queryData),
      });

      if (!res.ok) {
        const errorResponse = await res.json();

        throw new Error(`${errorResponse.validationErrors[0].message}`);
      } else {
        succesMessageNoBtn("The new service has been created successfully.");
        setPopupOpen(false);
        navigate("/app/management/service");
        mutate(["allServices", token]);
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  return (
    <div>
      <CreateServiceView handleCreateService={handleCreateService} />
    </div>
  );
};

export default ServiceCreate;
