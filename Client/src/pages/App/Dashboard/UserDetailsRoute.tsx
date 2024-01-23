import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchCustomerData } from "../../../api/tableApi";
import { useAuth } from "../../../helpers/Auth";
import { CustomersDataTypes } from "../../../types/tableApiTypes";

const UserDetailsRoute = () => {
  const selectedCustomerId = useParams();
  const auth = useAuth();
  const token = auth.token;
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

  if (customerDataError) return <h6>{customerDataError.message}</h6>;
  if (customerDataLoading) return <p>loading...</p>;

  return (
    <div>
      user details {selectedCustomerId.id}
      {/* I need to build when user click on the table in dashboard I'm not sure what data to show ! */}
      {/* <p>{customerData[0]?.CustomerFirstName ?? ""}</p> */}
    </div>
  );
};

export default UserDetailsRoute;
