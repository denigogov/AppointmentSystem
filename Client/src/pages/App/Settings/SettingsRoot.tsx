import { Outlet } from "react-router-dom";
import SettingsRootNav from "../../../components/Settings/SettingsRootNav";

const SettingsRoot = () => {
  return (
    <div style={{ borderTop: "1px solid #e0e0e0" }}>
      <SettingsRootNav />
      <Outlet />
    </div>
  );
};

export default SettingsRoot;
