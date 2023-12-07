import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/Auth";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // Fetching the token from email !! I will have to remove this fn from here and add in another route !!
  useEffect(() => {
    // Taking the first letter out becaouse is questionMark(?) and chaining to the localtion FN
    const tokens = location.search.substring(1);

    if (tokens) {
      auth.login(tokens);

      // Fetching the token and redirect the user to the home page but already logged in !
      navigate("/");
    } else null;
  }, [location]);

  return (
    <div>
      <h1>Test Component just to fetch the token ... as landing page ! </h1>
    </div>
  );
};

export default Home;
