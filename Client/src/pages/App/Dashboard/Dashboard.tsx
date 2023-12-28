import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../helpers/Auth";
import DashboardCustomer from "./DashboardCustomer";
import DashboardEmployees from "./DashboardEmployees";
import DashboardOwner from "./DashboardOwner";
import { useState } from "react";
import "../../../styling/_popUpWindow.scss";

const Dashboard = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const navigator = useNavigate();

  const auth = useAuth();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/app/dashboard");
  };

  let dashboardView;
  switch (auth.userInfo?.type) {
    case 1:
      dashboardView = <DashboardCustomer />;
      break;

    case 2:
      dashboardView = <DashboardEmployees setPopupOpen={setPopupOpen} />;
      break;

    case 3:
      dashboardView = <DashboardOwner />;
      break;

    default:
      dashboardView = <p>No View Found</p>;
    // TO BE ABLE TO VIEW WITHOUT LOGIN  FROM PHONE NEED TO REMOVE !
    // dashboardView = <DashboardEmployees setPopupOpen={setPopupOpen} />;
  }

  return (
    <div style={{ borderTop: "1px solid #e0e0e0" }}>
      <main>{dashboardView}</main>

      {/* PopUp for Employees when Employee click on the customer name from table to see details about customer !  */}
      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp smPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={[setPopupOpen]} />
          </main>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
