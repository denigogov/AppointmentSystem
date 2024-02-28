import { mutate } from "swr";
import {
  confirmDeletePrompt,
  confirmUpdatePrompt,
  deleteActionPrompt,
  updateActionPrompt,
} from "../../../../components/ErrorSuccesMessage";
import { useAuth } from "../../../../helpers/Auth";
import { apiGeneralErrorHandle } from "../../../../helpers/api";
import { ServiceEmloyeesTypes } from "../../../../types/tableApiTypes";

export const handleApprove = async (service: ServiceEmloyeesTypes) => {
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
      const res = {
        ok: "",
      };

      if (!res.ok) {
        updateActionPrompt(
          "Great!",
          "The service has been approved successfully. You can now proceed with further actions."
        );
        //   mutate(["servicesemployees", token]);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};

export const handleReject = async (service: ServiceEmloyeesTypes) => {
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
      // request
      const res = {
        ok: "",
      };

      if (!res.ok) {
        deleteActionPrompt("Service Rejected");
        // mutate(["servicesemployees", token]);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};

export const handleDelete = async (service: ServiceEmloyeesTypes) => {
  console.log(service);
  try {
    const confirmPrompt = confirmDeletePrompt(
      "Confirm Service Deletion",
      `Are you sure you want to delete this service? After deletion, the employer will be able to send an approval request for the same service.`
    );

    if ((await confirmPrompt).isConfirmed) {
      // request
      const res = {
        ok: "",
      };

      if (!res.ok) {
        deleteActionPrompt();
        // mutate(["servicesemployees", token]);
      }
    }
  } catch (err: unknown) {
    apiGeneralErrorHandle(err);
  }
};
