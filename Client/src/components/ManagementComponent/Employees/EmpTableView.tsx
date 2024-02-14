import addUserIcon from "../../../assets/addCreateIcon.svg";
import moreDetailsIcon from "../../../assets/customerMoreDetailsIcon.svg";
import deleteIcon from "../../../assets/deleteIcon.svg";
import editIcon from "../../../assets/editUserIcon.svg";
import { FetchAllEmployeesTypes } from "../../../types/tableApiTypes";

interface EmpTableViewProps {
  allEmployees?: FetchAllEmployeesTypes[];
}

const EmpTableView: React.FC<EmpTableViewProps> = ({ allEmployees }) => {
  const isPhone: boolean = window.innerWidth < 768; // or lg 1024px

  return (
    // Styling inside of employeerRoot component
    <div className="empTableView--container">
      <table>
        {isPhone && (
          <span className="addUserIcon">
            <img src={addUserIcon} alt="CreateEmployees Icon" />
          </span>
        )}
        <thead>
          <tr>
            <th>
              <img src={addUserIcon} alt="CreateEmployees Icon" />
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
            allEmployees?.map((user, i) => (
              <tr key={i}>
                <td data-cell="#">{i + 1}</td>
                <td data-cell="First Name">{user?.firstName ?? "Not Found"}</td>
                <td data-cell="Last Name">{user?.lastName}</td>
                <td data-cell="Department">
                  {user?.userType_name ?? "Not Found"}
                </td>
                <td data-cell="Details">
                  <img src={moreDetailsIcon} alt="detailsIcon" />
                </td>
                <td data-cell="Edit">
                  <img src={editIcon} alt="editIcon" />
                </td>
                <td data-cell="Delete">
                  <img src={deleteIcon} alt="deleteIcon" />
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
