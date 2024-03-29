import { ServiceEmloyeesTypes } from "../../../types/tableApiTypes";
import approveServiceIcon from "../../../assets/approveServiceIcon1.svg";
import rejectIcon from "../../../assets/rejectIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import {
  handleApprove,
  handleDelete,
  handleReject,
} from "../../../pages/App/Management/Approvals/approveRequest";
import { useAuth } from "../../../helpers/Auth";

interface ApprovalsTableViewProps {
  requestToApprove?: ServiceEmloyeesTypes[];
}

const ApprovalsTableView: React.FC<ApprovalsTableViewProps> = ({
  requestToApprove,
}) => {
  const { token } = useAuth();
  return (
    // Table styling inside of approvals Root
    <div className="approvalsTableView__container table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Employer Name</th>
            <th>Service Name</th>
            <th>Status</th>
            <th>Approve</th>
            <th>Reject</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {requestToApprove?.length ? (
            requestToApprove?.map((service, i) => (
              <tr key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="Employer Name">
                  {service?.firstName ?? "Not Found"} {service?.lastName}
                </td>
                <td data-cell="Service Name">
                  {service?.servicesName ?? "Not Found"}
                </td>
                <td data-cell="Status">
                  <button
                    className={
                      service?.approved === null ? "approved" : "rejected"
                    }
                  >
                    {service?.approved === null ? "Pending" : "Rejected"}
                  </button>
                </td>
                <td data-cell="Approve">
                  <img
                    className="approveIcon"
                    src={approveServiceIcon}
                    alt="approveServiceIcon"
                    onClick={() => handleApprove(service, token ?? "")}
                  />
                </td>
                <td data-cell="Reject">
                  {service.approved === 0 || (
                    <img
                      className="rejectIcon"
                      src={rejectIcon}
                      alt="approveServiceIcon"
                      onClick={() => handleReject(service, token ?? "")}
                    />
                  )}
                </td>
                <td data-cell="Delete">
                  <img
                    className="rejectIcon"
                    src={deleteIcon}
                    alt="approveServiceIcon"
                    onClick={() => handleDelete(service, token ?? "")}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} data-cell="Status">
                No Request Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalsTableView;
