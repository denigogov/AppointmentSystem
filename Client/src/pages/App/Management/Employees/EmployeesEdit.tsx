import useSWR from "swr";
import {
  fetchAllEmployees,
  fetchSingleEmployees,
} from "../../../../api/tableApi";
import EditInputs from "../../../../components/ManagementComponent/Employees/edit/EditInputs";
import EditTitle from "../../../../components/ManagementComponent/Employees/edit/EditTitle";
import { useAuth } from "../../../../helpers/Auth";
import "../../../../styling/Management/_editEmployer.scss";
import { FetchAllEmployeesTypes } from "../../../../types/tableApiTypes";
import { useParams } from "react-router-dom";
import LoadingRing from "../../../../components/loadingRing";

interface EmployeesEditProps {
  /* props types */
}

const EmployeesEdit: React.FC<EmployeesEditProps> = ({}) => {
  const { token } = useAuth();
  const { id: employerId } = useParams();

  const {
    data: singleEmployer,
    error: singleEmployerError,
    isLoading: singleEmployerLoading,
  } = useSWR<FetchAllEmployeesTypes[]>(
    ["singleEmployer", token, employerId],
    () => fetchSingleEmployees(token ?? "", employerId)
  );

  if (singleEmployerLoading) return <p>loading...</p>;

  return (
    <div className="employer__edit-container">
      <EditTitle />
      {singleEmployer?.length ? (
        <>
          <EditInputs singleEmployer={singleEmployer[0]} />
          <div>
            <button type="button" className="button__submit">
              <span>Update</span>
            </button>
          </div>
        </>
      ) : (
        <p>{singleEmployerError.message}</p>
      )}
    </div>
  );
};

export default EmployeesEdit;
