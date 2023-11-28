import { useAuth } from "../../helpers/Auth";

const Dashboard = () => {
  const auth = useAuth();

  let dashboardView;

  switch (auth.userInfo?.type) {
    case 1:
      dashboardView = <h1>Dashboard only for Customer</h1>;
      break;

    case 2:
      dashboardView = <h2>Dashboard only for Employee</h2>;
      break;

    case 3:
      dashboardView = <h3>Dashboard only for Owner</h3>;
      break;

    default:
      dashboardView = <p>Not found</p>;
  }

  return (
    <div style={{ borderTop: "1px solid blue" }}>
      {dashboardView}
      <p>{auth.userInfo?.username}</p>
    </div>
  );
};

export default Dashboard;
