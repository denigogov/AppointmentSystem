import { Outlet } from "react-router-dom";
import ManagementRootNav from "../../../components/ManagementComponent/ManagementRootNav";

const ManagementRoot = () => {
  return (
    <div style={{ borderTop: "1px solid #e0e0e0" }}>
      <ManagementRootNav />
      <Outlet />
    </div>
  );
};

export default ManagementRoot;
