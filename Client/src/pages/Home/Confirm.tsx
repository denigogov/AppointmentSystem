import "../../styling/_confirmComponent.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/Auth";
import { useLocation } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../helpers/api";

const API_URL = import.meta.env.VITE_API_URL as string;

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  // removing the token=? with substring
  const tokens = location.search.substring(7);

  const sendRequest = async () => {
    try {
      const res = await fetch(`${API_URL}/tableRoute/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenBack: tokens }),
      });

      if (res.ok) {
        const refreshToken = await res.text();
        auth.login(refreshToken);
        navigate("/");
      } else {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error);
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
      navigate("/login");
    }
  };

  const handleConfirm = () => {
    sendRequest();
  };

  return (
    <div className="confirmComponent">
      <p>Thank you for confirming your email address.</p>
      <p>
        You're one step closer to unlocking the full potential of our app. To
        complete the process, simply click the <strong>Confirm</strong> button
        below. Once confirmed, you'll be automatically logged in and ready to
        explore all the features our app has to offer as a customer.
      </p>
      <h4>Welcome aboard!</h4>

      <p className="confirmComponent-btn" onClick={handleConfirm}>
        confirm
      </p>
    </div>
  );
};

export default Confirm;
