import { useState } from "react";
import TableView from "../../../../components/ManagementComponent/Services/TableView";
import "../../../../styling/Management/_servicesRoot.scss";
import useSWR from "swr";
import { fetchAllServices } from "../../../../api/tableApi";
import { useAuth } from "../../../../helpers/Auth";
import { AllServicesTypes } from "../../../../types/tableApiTypes";
import LoadingRing from "../../../../components/loadingRing";

const ServicesRoot = () => {
  const [clickedEdit, setClickedEdit] = useState<boolean>(false);

  const { token } = useAuth();

  const {
    data: allServices,
    // error: allEmployeesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[]>(["allServices", token], () =>
    fetchAllServices(token ?? "")
  );

  if (allServicesLoading) return <LoadingRing />;

  const handleDeleteService = (data: unknown) => {
    alert(data);
  };

  return (
    <div>
      <TableView
        handleDeleteService={handleDeleteService}
        setClickedEdit={setClickedEdit}
        clickedEdit={clickedEdit}
        allServices={allServices}
      />
    </div>
  );
};

export default ServicesRoot;
