import deleteIcon from "../../../assets/deleteIcon.svg";
import { AllServicesTypes } from "../../../types/tableApiTypes";

interface TableViewProps {
  handleDeleteService: (data: unknown) => void;
  setClickedEdit: React.Dispatch<React.SetStateAction<boolean>>;
  clickedEdit: boolean;
  allServices?: AllServicesTypes[];
}
const TableView: React.FC<TableViewProps> = ({
  handleDeleteService,
  setClickedEdit,
  clickedEdit,
  allServices,
}) => {
  return (
    // Styling inside of the root component
    <div className="service__tableView--container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Service Name</th>
            <th>Service Price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allServices?.length ? (
            allServices?.map((service, i) => (
              <tr key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="Service Name">
                  {service?.servicesName ?? "Not Found"}
                </td>
                <td data-cell="Service Price">
                  {service?.servicePrice ?? "Not Found"}
                </td>
                <td data-cell="Update" className="button__table">
                  <button>edit</button>
                </td>
                <td data-cell="Delete">
                  <img src={deleteIcon} alt="delete icon" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
