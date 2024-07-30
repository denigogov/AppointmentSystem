import "../../../../styling/Management/_approvals.scss";
import useSWR from "swr";
import { fetchAllServiceEmployees } from "../../../../api/tableApi";
import { ServiceEmloyeesTypes } from "../../../../types/tableApiTypes";
import { useAuth } from "../../../../helpers/Auth";
import LoadingRing from "../../../../components/loadingRing";
import ApprovalsTableView from "../../../../components/ManagementComponent/Approvals/ApprovalsTableView";

interface ApprovalsProps {
  // propType
}

const Approvals: React.FC<ApprovalsProps> = () => {
  const { token } = useAuth();

  const {
    data: servicesEmpolyees,
    // error: servicesEmpolyeesError,
    isLoading: servicesEmpolyeesLoading,
  } = useSWR<ServiceEmloyeesTypes[]>(["servicesemployees", token], () =>
    fetchAllServiceEmployees(token)
  );

  if (servicesEmpolyeesLoading) return <LoadingRing />;

  const requestToApprove = servicesEmpolyees?.filter(
    (service) => service.approved !== 1 ?? []
  );

  return (
    <div>
      <ApprovalsTableView requestToApprove={requestToApprove} />
    </div>
  );
};

export default Approvals;
