import { useRef, useState } from "react";
import { TokenType } from "../types/AuthTypes";
import { CredentialsTypes } from "../types/LoginApiTypes";
import { useAuth } from "../helpers/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginResponse = async (credentials: CredentialsTypes) => {
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
      setError(`Wrong Credentials ${(err as Error).message || ""}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const redirectPath = location.state?.path || "/";

    const credentials: CredentialsTypes = {
      email: emailRef.current?.value,
      password: passRef.current?.value,
    };

    const token = await loginResponse(credentials);

    if (token) {
      auth.login(token);
      navigate(redirectPath, { replace: true });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={handleLogin}
      >
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passRef} />

        <button>login</button>
      </form>

      <p>{error}</p>
    </div>
  );
};

export default Login;
