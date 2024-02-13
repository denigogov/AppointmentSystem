// import { useInView } from "react-intersection-observer";

import CustomersRootNav from "../../../../components/ManagementComponent/Customers/CustomersRootNav";
import CustomerTableView from "../../../../components/ManagementComponent/Customers/CustomerTableView";

import "../../../../styling/Management/_customerRoot.scss";
import { FetchCustomersLimitProps } from "../../../../types/tableApiTypes";
import {
  confirmDeletePrompt,
  deleteActionPrompt,
} from "../../../../components/ErrorSuccesMessage";

interface CustomersRootProps {}

const apiUrl = import.meta.env.VITE_API_URL as string;

const CustomersRoot: React.FC<CustomersRootProps> = ({}) => {
  const handleDeleteCustomer = async (data: FetchCustomersLimitProps) => {
    const confirmDelete = confirmDeletePrompt(
      "Delete Service ?",
      `Are you sure you want to remove  <strong>${
        data?.firstName ?? "customer not found"
      } </strong>from customers list? This action is irreversible, and you won't have access to its benefits. Confirm your decision below.`
    );
    console.log(confirmDelete);
    try {
      if ((await confirmDelete).isConfirmed) {
        deleteActionPrompt();
      } else {
        console.log("nothing");
      }
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  return (
    <div className="customersRoot--container">
      <CustomersRootNav />
      <CustomerTableView handleDeleteCustomer={handleDeleteCustomer} />
    </div>
  );
};

export default CustomersRoot;
