import { useState } from "react";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logoutUser } = useAuthContext();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Mobile drawer checkbox */}
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <DashboardNavbar sidebarOpen={sidebarOpen} />

        {/* Main content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;