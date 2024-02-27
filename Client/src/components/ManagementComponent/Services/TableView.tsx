import { useState } from "react";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { AllServicesTypes } from "../../../types/tableApiTypes";
import { QueryType } from "../../../pages/App/Management/Services/ServicesRoot";
import { Link } from "react-router-dom";
import addServiceIcon from "../../../assets/serviceRequest.svg";

interface TableViewProps {
  handleDeleteService: (data: AllServicesTypes) => void;
  updateSerivce: (data: QueryType) => void;
  setClickedEdit: React.Dispatch<
    React.SetStateAction<boolean | AllServicesTypes>
  >;
  clickedEdit: boolean | AllServicesTypes;
  allServices?: AllServicesTypes[];
  setPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceId: React.Dispatch<React.SetStateAction<number | null>>;
}
const TableView: React.FC<TableViewProps> = ({
  handleDeleteService,
  setClickedEdit,
  clickedEdit,
  allServices,
  updateSerivce,
  setPopupOpen,
  setServiceId,
}) => {
  const [serviceName, setServiceName] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<number | null>(null);

  const handleEditClick = (service: AllServicesTypes) => {
    setClickedEdit(service);
    setServiceId(service?.id);

    // in case someone click edit and update the value without changein it... to keep the same values as before if not changed !
    setServiceName(service.servicesName);
    setServicePrice(+service.servicePrice);
  };

  const handleEdit = () => {
    const updateQuery = {
      servicesName: serviceName,
      servicePrice: servicePrice,
    };
    updateSerivce(updateQuery);
  };

  return (
    // Styling inside of the root component
    <div className="service__tableView--container">
      <table>
        <thead>
          <tr>
            <th>
              <Link
                style={{ color: "black", fontSize: "13px" }}
                to={`/app/management/service/create`}
                onClick={() => setPopupOpen((e) => !e)}
              >
                <img src={addServiceIcon} alt="addServiceIcon" />
                Add Service
              </Link>
            </th>
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
                  {clickedEdit === service ? (
                    <input
                      type="text"
                      defaultValue={service?.servicesName}
                      onChange={(e) => setServiceName(e.target.value)}
                    />
                  ) : (
                    service?.servicesName ?? "Not Found"
                  )}
                </td>
                <td data-cell="Service Price">
                  {clickedEdit === service ? (
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      defaultValue={service?.servicePrice}
                      onChange={(e) => setServicePrice(+e.target.value)}
                    />
                  ) : (
                    `${service?.servicePrice ?? "Not Found"} €`
                  )}
                </td>
                <td data-cell="Update">
                  {clickedEdit === service ? (
                    <button className="button__table " onClick={handleEdit}>
                      update
                    </button>
                  ) : (
                    <button
                      className="button__table"
                      onClick={() => handleEditClick(service)}
                    >
                      edit
                    </button>
                  )}
                </td>
                <td data-cell="Delete">
                  <img
                    src={deleteIcon}
                    alt="delete icon"
                    onClick={() => handleDeleteService(service)}
                  />
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
