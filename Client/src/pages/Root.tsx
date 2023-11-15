import { Outlet } from "react-router-dom";
import "../styling/_root.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoImg from "../assets/loginLogo.svg";
import { useAuth } from "../helpers/Auth";

const Root = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const auth = useAuth();

  // const location = useLocation();
  // const matchLocation =
  //   location.pathname === "/app" || location.pathname === "/login";

  const handleNavBar = () => {
    setOpenNav((e) => !e);
  };

  return (
    <div className="main-nav">
      {/* I add  this one  "openNav closeNav" to be able to style on desktop */}
      <div className={openNav ? "openNav" : "openNav closeNav"}>
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <div className="usernameNavBar">
          <p>{auth.userInfo?.username ?? "dejan"}</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Root</NavLink>
            </li>
            <li>
              <NavLink to="/app">App</NavLink>
            </li>
            <li>
              <NavLink to="signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="login">Sign In</NavLink>
            </li>
          </ul>
        </nav>

        <div className="appInfoNav">
          <h1>info</h1>
        </div>
      </div>

      <div className={openNav ? "overlay" : ""} onClick={handleNavBar}>
        {!openNav && (
          <div className="navIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
