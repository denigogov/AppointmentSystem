// import { useInView } from "react-intersection-observer";

import CustomersRootNav from "../../../../components/ManagementComponent/Customers/CustomersRootNav";
import CustomerTableView from "../../../../components/ManagementComponent/Customers/CustomerTableView";

import "../../../../styling/Management/_customerRoot.scss";
import { FetchCustomersLimitProps } from "../../../../types/tableApiTypes";
import {
  confirmDeletePrompt,
  deleteActionPrompt,
} from "../../../../components/ErrorSuccesMessage";
import { useAuth } from "../../../../helpers/Auth";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

interface CustomersRootProps {}

const apiUrl = import.meta.env.VITE_API_URL as string;

const CustomersRoot: React.FC<CustomersRootProps> = ({}) => {
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();
  const { token } = useAuth();

  const handleDeleteCustomer = async (customer: FetchCustomersLimitProps) => {
    try {
      const confirmDelete = confirmDeletePrompt(
        "Delete Customer",
        `Are you sure you want to remove  <strong>${
          customer?.firstName ?? "customer not found"
        } </strong>from customers list? This action is irreversible, and you won't have access to its benefits. Confirm your decision below.`
      );

      if ((await confirmDelete).isConfirmed) {
        const res = await fetch(
          `${apiUrl}/tableRoute/customers/${customer?.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          // prompt after user click delete
          deleteActionPrompt();
        } else throw new Error(`${res.statusText}`);
      }
    } catch (err) {
      apiGeneralErrorHandle(err);
    }
  };

  const handlePopUp = (id?: number) => {
    setPopupOpen((x) => !x);

    navigator(
      `${popupOpen ? "/app/management/customers" : `details/${id ? id : 0}`} `
    );
  };

  return (
    <div className="customersRoot--container">
      <CustomersRootNav />
      <CustomerTableView
        handleDeleteCustomer={handleDeleteCustomer}
        handlePopUp={handlePopUp}
      />
      {popupOpen && (
        <div className="overlay" onClick={() => handlePopUp()}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default CustomersRoot;
