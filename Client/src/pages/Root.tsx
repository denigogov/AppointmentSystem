import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../helpers/Auth";
import HamburgetMenu from "../components/HamburgetMenu";
import { useState } from "react";

const Root = () => {
  const auth = useAuth();
  const isPhone = window.innerWidth < 768;
  const [openNav, setOpenNav] = useState<boolean>(!isPhone);

  return (
    <div>
      <HamburgetMenu setOpenNav={setOpenNav} openNav={openNav} />

      {openNav && (
        <div>
          <ul>
            <li>
              <NavLink to="/">MainPage</NavLink>
            </li>

            <li>
              <NavLink to="home">Home</NavLink>
            </li>

            {!auth.token && (
              <li>
                <NavLink to="login">Login </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Root;
