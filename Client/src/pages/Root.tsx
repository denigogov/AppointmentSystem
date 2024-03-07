import { Outlet, useNavigate } from "react-router-dom";
import "../styling/_root.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../helpers/Auth";
// icons
import logoImg from "../assets/companyLogo.svg";
import homeIcon from "../assets/homeIcon.svg";
import logoutIcon from "../assets/logout.svg";
import githubIcon from "../assets/githubLogo.svg";
import linkedInIcon from "../assets/linkedInLogo.svg";
import AppDashboardIcon from "../assets/appDashboardIcon.svg";
import SignupIcon from "../assets/signupIcon.svg";
import SigninIcon from "../assets/signinIcon.svg";
import { useInView } from "react-intersection-observer";

const Root = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const { ref, inView } = useInView();

  const auth = useAuth();
  const navigate = useNavigate();

  // const location = useLocation();
  // const matchLocation =
  //   location.pathname === "/app" || location.pathname === "/login";

  const handleNavBar = () => {
    setOpenNav((e) => !e);
  };

  const handleLogOut = () => {
    auth.logout();
  };

  return (
    <div className="main-nav">
      {/* I add  this one  "openNav closeNav" to be able to style on desktop */}
      <div className={openNav ? "openNav" : "openNav closeNav"}>
        <div className="logo">
          <img src={logoImg} alt="company logo" onClick={() => navigate("/")} />
          <p className="navLinkInfo">Scheduler Suite System</p>
        </div>
        <div className="navLinkInfo mobile">
          <p>{auth.userInfo?.username ?? ""}</p>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul>
            <NavLink to="/">
              <li>
                Home
                <img src={homeIcon} alt="homeIcon" />
              </li>
            </NavLink>

            {auth.token && (
              <NavLink to="/app">
                <li>
                  Dashboard
                  <img src={AppDashboardIcon} alt="homeIcon" />
                </li>
              </NavLink>
            )}
            {!auth.token && (
              <NavLink to="signup">
                <li>
                  Sign Up
                  <img src={SignupIcon} alt="homeIcon" />
                </li>
              </NavLink>
            )}
            {!auth.token ? (
              <NavLink to="login">
                <li>
                  Sign In
                  <img src={SigninIcon} alt="homeIcon" />
                </li>
              </NavLink>
            ) : (
              <li className="logoutIcon">
                <img
                  className="logoutIcon"
                  src={logoutIcon}
                  alt="logout Icon"
                  onClick={handleLogOut}
                />
              </li>
            )}
          </ul>
        </nav>

        {/* Footer only avaible to phone */}
        <div className="nav-footer">
          <div className="nav-footer__icon">
            <a target="_blank" href="https://github.com/denigogov">
              <img src={githubIcon} alt="github Logo" />
            </a>

            <a
              target="_blank"
              href="https://www.linkedin.com/in/dejan-gogov-571871270/"
            >
              <img src={linkedInIcon} alt="linkedIn Logo" />
            </a>
          </div>
          <p className="navLinkInfo">Dejan Gogov</p>
        </div>
      </div>

      {/* Navigation Hamburger Menu only Avaible on phone */}
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
        <Outlet context={{ ref }} />
        {!inView && (
          <a href="#" className="arrow-scroll">
            arrow example
          </a>
        )}
      </main>
    </div>
  );
};

export default Root;
