import { mutate } from "swr";
import {
  confirmDeletePrompt,
  confirmUpdatePrompt,
  deleteActionPrompt,
  updateActionPrompt,
} from "../../../../components/ErrorSuccesMessage";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { ServiceEmloyeesTypes } from "../../../../types/tableApiTypes";

const API_URL = import.meta.env.VITE_API_URL as string;

export const handleApprove = async (
  service: ServiceEmloyeesTypes,
  token?: string
) => {
  try {
    const confirmPrompt = confirmUpdatePrompt(
      "Confirm Service Approval",
      `Are you sure you want to approve <strong>${
        service?.servicesName ?? "this service"
      }</strong> ?`,
      " Yes, Approve"
    );

    if ((await confirmPrompt).isConfirmed) {
      // request
      const res = await fetch(
        `${API_URL}/tableRoute/serviceemloyees/${service.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: 1 }),
        }
      );

      if (res.ok) {
        updateActionPrompt(
          "Great!",
          "The service has been approved successfully. You can now proceed with further actions."
        );
        mutate(["servicesemployees", token]);
      } else {
        const errorMessage = await res.text();
        throw new Error(`${res.status} - ${errorMessage}`);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};

export const handleReject = async (
  service: ServiceEmloyeesTypes,
  token?: string
) => {
  try {
    const confirmPrompt = confirmDeletePrompt(
      "Confirm Service Rejection",
      `Are you sure you want to reject  <strong> ${
        service.firstName
      }</strong> requested service <strong>${
        service?.servicesName ?? "this service"
      }</strong> ?`
    );

    if ((await confirmPrompt).isConfirmed) {
      const res = await fetch(
        `${API_URL}/tableRoute/serviceemloyees/${service.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ approved: 0 }),
        }
      );

      if (res.ok) {
        deleteActionPrompt("Service Rejected");
        mutate(["servicesemployees", token]);
      } else {
        const errorMessage = await res.text();
        throw new Error(`${res.status} - ${errorMessage}`);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};

export const handleDelete = async (
  service: ServiceEmloyeesTypes,
  token?: string
) => {
  try {
    const confirmPrompt = confirmDeletePrompt(
      "Confirm Service Deletion",
      `Are you sure you want to delete this service? After deletion, the employer will be able to send an approval request for the same service.`
    );

    if ((await confirmPrompt).isConfirmed) {
      // request
      const res = await fetch(
        `${API_URL}/tableRoute/serviceemloyees/${service.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        deleteActionPrompt();
        mutate(["servicesemployees", token]);
      } else {
        // Reading the Error message from backend !!
        const errorMessage = await res.text();
        throw new Error(`${res.status} - ${errorMessage}`);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};
