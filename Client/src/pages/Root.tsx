import { Outlet } from "react-router-dom";
import "../styling/_root.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logoImg from "../assets/loginLogo.svg";
import { useAuth } from "../helpers/Auth";

const Root = () => {
  const isPhone = window.innerWidth < 768;
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
      <nav className={openNav && isPhone ? "nav" : "nav close-nav"}>
        {isPhone && openNav && (
          <div className="logo">
            <img src={logoImg} alt="logo " />
            <p>SalonPro Scheduler Suite System</p>
          </div>
        )}

        {isPhone && openNav && (
          <div>
            <p>{auth?.userInfo?.username ?? ""}</p>
          </div>
        )}
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

        {isPhone && openNav && (
          <div>
            <p>info about me</p>
          </div>
        )}
      </nav>

      {/* navigation Menu for Phone */}
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
