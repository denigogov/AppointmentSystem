import "../../../../styling/Management/_employeesRoot.scss";
import EmpTableView from "../../../../components/ManagementComponent/Employees/EmpTableView";
import { fetchAllEmployees } from "../../../../api/tableApi";
import { useAuth } from "../../../../helpers/Auth";
import useSWR, { mutate } from "swr";
import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  confirmDeletePrompt,
  deleteActionPrompt,
} from "../../../../components/ErrorSuccesMessage";

const apiUrl = import.meta.env.VITE_API_URL as string;

const EmployeesRoot = () => {
  const { token } = useAuth();
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const {
    data: allEmployees,
    error: allEmployeesError,
    isLoading: allEmployeesLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(["allEmployees", token], () =>
    fetchAllEmployees(token ?? "")
  );

  if (allEmployeesError) allEmployeesError.message;
  if (allEmployeesLoading) return <p>loading...</p>;

  const handleEventRoute = (url: string) => {
    setPopupOpen((x) => !x);
    navigator(url);
  };

  const handlePopUp = () => {
    handleEventRoute("/app/management/employees/");
  };

  const handleEditClick = (id: number) => {
    handleEventRoute(`/app/management/employees/edit/${id}`);
  };

  const handleDetailsClick = (id: number) => {
    handleEventRoute(`/app/management/employees/details/${id}`);
  };

  const handleCreateEmployerClick = () => {
    handleEventRoute(`/app/management/employees/create/`);
  };

  const handleDeleteClick = async (employees: FetchAllEmployeesTypes) => {
    try {
      const confirmDelete = confirmDeletePrompt(
        "Delete Employer",
        `Are you sure you want to remove  <strong>${
          employees?.firstName ?? "employer"
        } </strong>from employees list? This action is irreversible, and you won't have access to its benefits. Confirm your decision below.`
      );

      if ((await confirmDelete).isConfirmed) {
        const res = await fetch(`${apiUrl}/employees/${employees?.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          mutate(["allEmployees", token]);

          // prompt after user click delete
          deleteActionPrompt();
        } else throw new Error(`${res.statusText}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="employeesRoot--container">
      <EmpTableView
        allEmployees={allEmployees}
        handleDetailsClick={handleDetailsClick}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleCreateEmployerClick={handleCreateEmployerClick}
      />

      {popUpOpen && (
        <div className="overlay" onClick={handlePopUp}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default EmployeesRoot;
