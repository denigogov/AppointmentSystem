import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchCustomerData } from "../../../api/tableApi";
import { useAuth } from "../../../helpers/Auth";
import { CustomersDataTypes } from "../../../types/tableApiTypes";
import ErrorPage1 from "../../ErrorPage";
import UnderConstruction from "../../UnderConstruction";

const UserDetailsRoute = () => {
  const selectedCustomerId = useParams();
  const auth = useAuth();
  const token = auth.token ?? "";
  const type = 1;
  const id = selectedCustomerId?.id;

  const {
    data: customerData,
    error: customerDataError,
    isLoading: customerDataLoading,
  } = useSWR<CustomersDataTypes[]>(["customerData", id, token], () =>
    // i'm passing also the ID on every click of the component the ID is updating !
    fetchCustomerData({ id, type, token })
  );

  if (customerDataError)
    return (
      <ErrorPage1
        errorMessage="User Not Found"
        navigateTo1={"/home"}
        navigateTo2={"/home2"}
      />
    );

  if (customerDataLoading) return <p>loading...</p>;

  return (
    <div>
      {/* user details {selectedCustomerId.id} */}
      <UnderConstruction titleText="View" />
      {/* I need to build when user click on the table in dashboard I'm not sure what data to show ! */}
      {/* <p>{customerData[0]?.CustomerFirstName ?? ""}</p> */}
    </div>
  );
};

export default UserDetailsRoute;
