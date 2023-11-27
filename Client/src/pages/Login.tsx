import { useRef, useState } from "react";
import { TokenType } from "../types/AuthTypes";
import { CredentialsTypes } from "../types/LoginApiTypes";
import { useAuth } from "../helpers/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import "../styling/_login.scss";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import loginLogo from "../assets/loginLogo.svg";
import LoadingRing from "../components/loadingRing";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginResponse = async (credentials: CredentialsTypes) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:4000/login`, {
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
      setError(`Wrong email or password `);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const redirectPath = location.state?.path || "/";

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

    if (token) {
      auth.login(token);
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div className="login-page">
      <div className="login-appInfo">SalonPro Scheduler Suite System</div>

      <div className="login-logo">
        <img src={loginLogo} alt="login-logo" />
      </div>

      <form onSubmit={handleLogin}>
        <input
          required
          type="text"
          name="email"
          placeholder="email"
          ref={emailRef}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          ref={passRef}
        />
        <button>Sign in</button> <p className="errorMessage">{error}</p>
      </form>
      {loading && <LoadingRing />}
      <div>
        <p className="navLinkInfo">
          No account ?{" "}
          <Link className="navLinkInfo__link" to="/signup">
            Create one
          </Link>
        </p>

        <p className="navLinkInfo">
          back to{" "}
          <NavLink className="navLinkInfo__link" to="/">
            Home
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
