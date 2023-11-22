import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/Auth";

const Home = () => {
  const navigate = useNavigate();

  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Home;
