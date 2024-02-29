import "../../../../styling/Management/_servicesRoot.scss";
import { useState } from "react";
import TableView from "../../../../components/ManagementComponent/Services/TableView";
import useSWR, { mutate } from "swr";
import { fetchAllServices } from "../../../../api/tableApi";
import { useAuth } from "../../../../helpers/Auth";
import { AllServicesTypes } from "../../../../types/tableApiTypes";
import LoadingRing from "../../../../components/loadingRing";
import {
  confirmDeletePrompt,
  confirmUpdatePrompt,
  deleteActionPrompt,
  updateActionPrompt,
} from "../../../../components/ErrorSuccesMessage";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { Outlet, useNavigate } from "react-router-dom";

export type QueryType = {
  servicesName: string;
  servicePrice: number | null;
};
const API_URL = import.meta.env.VITE_API_URL as string;
const ServicesRoot = () => {
  // able to add edit view on clicked value
  const [clickedEdit, setClickedEdit] = useState<boolean | AllServicesTypes>(
    false
  );

  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const navigator = useNavigate();

  const { token } = useAuth();

  const {
    data: allServices,
    // error: allEmployeesError,
    isLoading: allServicesLoading,
  } = useSWR<AllServicesTypes[]>(["allServices", token], () =>
    fetchAllServices(token ?? "")
  );

  if (allServicesLoading) return <LoadingRing />;

  const handleDeleteService = async (data: AllServicesTypes) => {
    try {
      const confirmMessage = await confirmDeletePrompt(
        "Delete Service",
        `Are you sure you want to delete this service <strong>${
          data?.servicesName ?? ""
        }</strong> ? This action cannot be undone`
      );

      if (confirmMessage.isConfirmed) {
        const res = await fetch(`${API_URL}/tableRoute/services/${data?.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          deleteActionPrompt();
          mutate(["allServices", token]);
        } else {
          throw new Error("Something Bad Happen");
        }
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const updateSerivce = async (queryData: QueryType) => {
    try {
      const confirmMessage = await confirmUpdatePrompt(
        "Service Update Confirmation",
        "By clicking confirm, you will save the changes made to this service. Are you sure you want to proceed?",
        "Confirm Update"
      );

      // close edit View When user click cancel
      confirmMessage.isDismissed && setClickedEdit(false);

      if (confirmMessage.isConfirmed) {
        const res = await fetch(`${API_URL}/tableRoute/services/${serviceId}`, {
          method: "PUT",
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
          updateActionPrompt("Great!", "Service Update Successful");
          mutate(["allServices", token]);
          setClickedEdit(false);
        }
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const handlePopUp = () => {
    setPopupOpen((x) => !x);
    navigator("/app/management/service");
  };

  return (
    <div>
      <TableView
        handleDeleteService={handleDeleteService}
        setClickedEdit={setClickedEdit}
        clickedEdit={clickedEdit}
        allServices={allServices}
        updateSerivce={updateSerivce}
        setPopupOpen={setPopupOpen}
        setServiceId={setServiceId}
      />

      {popUpOpen && (
        <div className="overlay" onClick={handlePopUp}>
          <main className="popUp smPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default ServicesRoot;
