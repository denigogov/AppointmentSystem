import { useParams } from "react-router-dom";
import { useAuth } from "../../../../helpers/Auth";
import useSWR from "swr";
import { CustomersDataTypes } from "../../../../types/tableApiTypes";
import { fetchCustomerData } from "../../../../api/tableApi";
import UnderConstruction from "../../../UnderConstruction";

interface CustomerDetails {}

const CustomerDetails: React.FC<CustomerDetails> = ({}) => {
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
      {/* <strong>
        Maybe I can add new Route -- Appointment Details and only customer Info{" "}
        Ideas:
      </strong>
      <br />
      <hr />
      <br />
      <ul>
        <li>Some Chart Data to show some fancy data :D</li>
        <li>Count Appointmnets</li>
        <li>Total Amount</li>
        <li>Maybe Upcoming App</li>
        <li>To be Able to download as PDF ? Maybe</li>
      </ul>
      <br />
      <hr />
      <br />
      <strong>
        I can do the same view as in the dashboard when owner click
      </strong> */}

      <UnderConstruction titleText="View" />
    </div>
  );
};

export default CustomerDetails;
