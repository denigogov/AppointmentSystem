import { Link } from "react-router-dom";
import { useAuth } from "../../helpers/Auth";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div style={{ border: "1px solid red" }}>
      <h1>APP VIEW</h1>
      <Link to="dashboard">home</Link>

      <p>{auth.userInfo?.username}</p>
    </div>
  );
};

export default Dashboard;
