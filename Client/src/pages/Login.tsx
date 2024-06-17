import "../styling/_login.scss";
import { useRef, useState } from "react";
import { TokenType } from "../types/AuthTypes";
import { CredentialsTypes } from "../types/LoginApiTypes";
import { useAuth } from "../helpers/Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingRing from "../components/loadingRing";
import { succesMessageBtn } from "../components/ErrorSuccesMessage";
const API_URL = import.meta.env.VITE_API_URL as string;
const ALERT_TITLE = import.meta.env.VITE_ALERT_TITLE as string;
const ALERT_TEXT = import.meta.env.VITE_ALERT_MESSAGE as string;
const ALERT_ICON = import.meta.env.VITE_ALERT_ICON as string;

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();

  const loginResponse = async (credentials: CredentialsTypes) => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.token as TokenType;
    } catch (err) {
      const requestError = (err as Error).stack;

      setError(
        requestError?.includes("Too")
          ? "Too Many Request, Please Try later ! "
          : `Wrong email or password `
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    {
      ALERT_ICON === "" ||
        succesMessageBtn(
          // "Login Delay",
          ALERT_TITLE,
          ALERT_TEXT,
          // "Please wait while we securely log you in. Server standby may cause a brief delay. Thank you for your patience",
          "",
          ALERT_ICON
        );
    }
    // const redirectPath = location.state?.path || "/";

    // leaving as reference

    // const credentials: CredentialsTypes = {
    //   email: emailRef.current?.value,
    //   password: passRef.current?.value,
    // };

    //NEW
    const formData = new FormData(e.target as HTMLFormElement);
    const credentials: CredentialsTypes = Object.fromEntries(
      formData.entries()
    );

    const token = await loginResponse(credentials);
    // const redirectPath = location.state?.path || "/";

    if (token) {
      auth.login(token);
      // navigate(redirectPath, { replace: true }); -- return you to be last place where you been ! nice future
      navigate("/"); // I add because of the login bug the user data is not reading because of I don't know maybe useEffect I will have to discove little bit more ! vazno
    }
  };

  return (
    <div className="loginPage">
      <div className="loginPage__signup">
        <div className="loginPage__signup-text">
          <h4>
            Don't have an account<span> ?</span>
          </h4>
          <p>
            Efficiently streamline scheduling processes. Elevate customer
            satisfaction. Sign up now to unlock your salon's full potential.
          </p>
          <Link to="/signup">
            <button>SIGN UP</button>
          </Link>
        </div>
      </div>

      <div className="loginPage__login">
        <p className="loginPage__login-title">
          SalonPro Scheduler Suite System{" "}
        </p>

        <form onSubmit={handleLogin}>
          <input
            required
            type="email"
            name="email"
            // defaultValue="owner@gmail.com"
            placeholder="Select an email from list"
            ref={emailRef}
            list="accounts"
          />
          <datalist id="accounts">
            <option value="ownerview@salonpro.com">Owner Account</option>
            <option value="employeeview@salonpro.com">Employees Account</option>
            <option value="denigogov@hotmail.com">Customers Account</option>
          </datalist>
          <div className="passwordShow">
            <input
              required
              name="password"
              type={showPassword ? "text" : "password"}
              defaultValue="deni123!"
              placeholder="password"
              ref={passRef}
            />
            <p
              onClick={() => setShowPassword(!showPassword)}
              className="passwordShow-toggle"
            >
              show
            </p>
          </div>

          <button>Sign in</button>

          <p className="errorMessage">{error}</p>
        </form>
        {loading && <LoadingRing />}
      </div>
    </div>
  );
};

export default Login;
