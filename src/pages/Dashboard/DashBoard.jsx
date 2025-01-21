import { NavLink, Outlet } from "react-router-dom";
import Topbar from "./shared/Topbar";

const DashBoard = () => {
  return (
    <section className="h-screen flex flex-col">
      {/* Topbar */}
      <Topbar />

      <div className="flex h-full">
        {/* Sidebar (Fixed) */}
        <aside className="w-1/4 min-h-screen bg-[#7480ff] p-5 fixed top-0 z-10">
          <nav className="text-center">
            <ul className="list-none flex flex-col gap-2">
              <li>
                <NavLink
                  to="/dashboard/manageusers"
                  className={({ isActive }) =>
                    isActive
                      ? "block bg-white text-[#7480ff] font-bold px-4 py-2 rounded"
                      : "block text-white font-bold px-4 py-2"
                  }
                >
                  Manage User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/managetasks"
                  className={({ isActive }) =>
                    isActive
                      ? "block bg-white text-[#7480ff] font-bold px-4 py-2 rounded"
                      : "block text-white font-bold px-4 py-2"
                  }
                >
                  Manage Tasks
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (Adjusted for Sidebar) */}
        <div className="flex-1 min-h-screen  ml-[25%] p-5">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
