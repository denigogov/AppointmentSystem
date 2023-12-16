import { useAuth } from "../../../helpers/Auth";
import DashboardCustomer from "./DashboardCustomer";
import DashboardEmployees from "./DashboardEmployees";
import DashboardOwner from "./DashboardOwner";

const Dashboard = () => {
  const auth = useAuth();

  let dashboardView;

  switch (auth.userInfo?.type) {
    case 1:
      dashboardView = <DashboardCustomer />;
      break;

    case 2:
      dashboardView = <DashboardEmployees />;
      break;

    case 3:
      dashboardView = <DashboardOwner />;
      break;

    default:
      // dashboardView = <p>Not found</p>;
      // TO BE ABLE TO VIEW WITHOUT LOGIN  FROM PHONE NEED TO REMOVE !
      dashboardView = <DashboardEmployees />;
  }

  return (
    <div style={{ borderTop: "1px solid #e0e0e0" }}>
      <main>{dashboardView}</main>
    </div>
  );
};

export default Dashboard;
