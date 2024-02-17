import addUserIcon from "../../../assets/addCreateIcon.svg";
import moreDetailsIcon from "../../../assets/customerMoreDetailsIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import editIcon from "../../../assets/editUserIcon.svg";
import { FetchAllEmployeesTypes } from "../../../types/tableApiTypes";

interface EmpTableViewProps {
  allEmployees?: FetchAllEmployeesTypes[];
  handleDetailsClick: (id: number) => void;
  handleEditClick: (id: number) => void;
  handleDeleteClick: (employees: FetchAllEmployeesTypes) => void;
  handleCreateEmployerClick: () => void;
}

const EmpTableView: React.FC<EmpTableViewProps> = ({
  allEmployees,
  handleDetailsClick,
  handleEditClick,
  handleDeleteClick,
  handleCreateEmployerClick,
}) => {
  //Target for Mobile Phone because of the Create employees Icon
  const isPhone: boolean = window.innerWidth < 768; // or lg 1024px

  return (
    // Styling inside of employeerRoot component
    <div className="empTableView--container">
      <table>
        {isPhone && (
          <span className="addUserIcon">
            <img
              src={addUserIcon}
              alt="CreateEmployees Icon"
              onClick={() => handleCreateEmployerClick()}
            />
          </span>
        )}
        <thead>
          <tr>
            <th>
              <img
                src={addUserIcon}
                alt="CreateEmployees Icon"
                onClick={() => handleCreateEmployerClick()}
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees?.length ? (
            allEmployees?.map((employees, i) => (
              <tr key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="First Name">
                  {employees?.firstName ?? "Not Found"}
                </td>
                <td data-cell="Last Name">{employees?.lastName}</td>
                <td data-cell="Department">
                  {employees?.userType_name ?? "Not Found"}
                </td>
                <td data-cell="Details">
                  <img
                    src={moreDetailsIcon}
                    alt="detailsIcon"
                    onClick={() => handleDetailsClick(employees?.id)}
                  />
                </td>
                <td data-cell="Edit">
                  <img
                    src={editIcon}
                    alt="editIcon"
                    onClick={() => handleEditClick(employees?.id)}
                  />
                </td>
                <td data-cell="Delete">
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    onClick={() => handleDeleteClick(employees)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpTableView;
