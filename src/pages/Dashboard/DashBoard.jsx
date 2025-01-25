import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Topbar from "./shared/Topbar";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import LoadingPage from "../../shared/LoadingPage";

const DashBoard = () => {
  let { logout, } = useAuth();
  let navigate = useNavigate();
  let [isAdmin] = useAdmin();
  let [isBuyer,adminLoading] = useBuyer();
 
  if (adminLoading) {
    return <LoadingPage></LoadingPage>
  }

  let handleLogout = () => {
    logout()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="h-screen flex flex-col">
      {/* Topbar */}
      <Topbar />

      <div className="flex h-full">
        {/* Sidebar (Fixed) */}
        <aside className="w-1/4 min-h-screen bg-[#7480ff] p-5 fixed top-0 z-10 flex justify-between flex-col">
          <nav className="text-center">
            <Link to={"/"}>
              <h2 className="text-2xl font-semibold text-white mb-5">
                GetEarn
              </h2>
            </Link>
            {/* this is admin route is will show only for admin */}
            {isAdmin && (
              <ul className="list-none flex flex-col gap-2">
                <li>
                  <NavLink
                    to="/dashboard/manageusers"
                    className={({ isActive }) =>
                      isActive
                        ? "block bg-white text-[#7480ff] font-semibold px-4 py-2 rounded"
                        : "block text-white font-semibold px-4 py-2"
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
                        ? "block bg-white text-[#7480ff] font-semibold px-4 py-2 rounded"
                        : "block text-white font-semibold px-4 py-2"
                    }
                  >
                    Manage Tasks
                  </NavLink>
                </li>
              </ul>
            )}
            {isBuyer?.buyer && <ul className="list-none flex flex-col gap-2">
              <li>
                  <NavLink
                    to="/dashboard/addtask"
                    className={({ isActive }) =>
                      isActive
                        ? "block bg-white text-[#7480ff] font-semibold px-4 py-2 rounded"
                        : "block text-white font-semibold px-4 py-2"
                    }
                  >
                    Add New Task
                  </NavLink>
                </li>
              <li>
                  <NavLink
                    to="/dashboard/mytasks"
                    className={({ isActive }) =>
                      isActive
                        ? "block bg-white text-[#7480ff] font-semibold px-4 py-2 rounded"
                        : "block text-white font-semibold px-4 py-2"
                    }
                  >
                    My Task's
                  </NavLink>
                </li>
              <li>
                  <NavLink
                    to="/dashboard/purchasecoine"
                    className={({ isActive }) =>
                      isActive
                        ? "block bg-white text-[#7480ff] font-semibold px-4 py-2 rounded"
                        : "block text-white font-semibold px-4 py-2"
                    }
                  >
                    Purchase Coines
                  </NavLink>
                </li>
              </ul>}
          </nav>
          <nav className="text-center">
            <ul className="list-none flex flex-col gap-2 font-bold text-white border-t">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Log-Out</button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content (Adjusted for Sidebar) */}
        <div className="flex-1 min-h-screen  ml-[25%]  mt-10 p-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
