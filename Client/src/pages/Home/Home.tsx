import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/Auth";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const tokens = location.search;

    if (tokens) {
      auth.login(tokens);
    } else null;
  }, [location]);

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
