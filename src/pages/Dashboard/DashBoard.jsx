import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Topbar from "./shared/Topbar";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useBuyer from "../../hooks/useBuyer";
import useWorker from "../../hooks/useWorker";
import LoadingPage from "../../shared/LoadingPage";
import AdminHome from "./Admin/AdminHome";
import BuyerHome from "./buyer/BuyerHome";
import WokerHome from "./worker/WokerHome";
import {
  FaUsers,
  FaTasks,
  FaPlusCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaHome,
  FaMoneyBillWave,
  FaFileImport,
} from "react-icons/fa";
import { BsFileEarmark } from "react-icons/bs";

import { RiArrowGoBackFill } from "react-icons/ri";

import { FaCircleChevronRight } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";


const DashBoard = () => {
  let { logout, loading, user } = useAuth();
  let location = useLocation();
  let navigate = useNavigate();
  let [isAdmin] = useAdmin();
  let [isBuyer] = useBuyer();
  let [isWorker] = useWorker();

  const [showSidebar, setshowSidebar] = useState(true);

  if (loading) {
    return <LoadingPage />;
  }
  if (!user) {
    logout()
      .then(() => navigate("/signin"))
      .catch((error) => console.log(error));
  }
  let handleLogout = () => {
    logout()
      .then(() => navigate("/signin"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="h-screen flex flex-col">
      <Topbar />
      <div className="flex h-full">
        {
          <aside
            className={`fixed left-0 top-0 z-10 h-full bg-gray-700 p-5 ${
              showSidebar ? "px-1" : "px-5"
            } flex flex-col justify-between transition-all duration-300 ${
              showSidebar ? "w-12" : "md:w-1/5"
            }`}
          >
            {/* Button to toggle sidebar visibility */}
            <button
              onClick={() => setshowSidebar(!showSidebar)}
              className="absolute -right-3 top-[50%] text-white  text-3xl"
            >
              <FaCircleChevronRight />
            </button>

            <nav className="text-center">
              <Link to="/">
                {!showSidebar ? (
                  <h2 className="text-2xl font-semibold text-secondary mb-5">
                    Get Earn
                  </h2>
                ) : (
                  <GiTakeMyMoney className="text-4xl p-1 rounded-2xl font-semibold text-secondary bg-white mb-5 border"></GiTakeMyMoney>
                )}{" "}
              </Link>
              <ul className="list-none flex flex-col gap-2">
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center justify-start  gap-2 text-base px-2  py-2  font-semibold transition-all ${
                        location.pathname === "/dashboard"
                          ? "bg-white text-secondary rounded"
                          : "text-white rounded hover:bg-white hover:text-secondary"
                      }`
                    }
                  >
                    <FaHome
                      className={`${showSidebar ? "text-2xl" : "text-2xl"}`}
                    />
                    {!showSidebar && "Dashboard"}{" "}
                    {/* Hide text if sidebar is collapsed */}
                  </NavLink>
                </li>

                {isAdmin && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/admin/manageusers"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaUsers
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Manage Users"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/admin/managetasks"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaTasks
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Manage Tasks"}
                      </NavLink>
                    </li>
                  </>
                )}

                {isBuyer?.buyer && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/buyer/addtask"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaPlusCircle
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Add New Task"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/buyer/mytasks"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <BsFileEarmark
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "My Tasks"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/buyer/purchasecoine"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaShoppingCart
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Purchase Coins"}
                      </NavLink>
                    </li>
                  </>
                )}

                {isWorker?.worker && (
                  <>
                    <li>
                      <NavLink
                        to="/dashboard/worker/tasklist"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaTasks
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Task List"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/worker/mysubmissions"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaFileImport
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "My Submissions"}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/worker/withdrawals"
                        className={({ isActive }) =>
                          `flex items-center gap-2 text-base px-2 py-2 font-semibold transition-all ${
                            isActive
                              ? "bg-white text-secondary rounded"
                              : "text-white rounded hover:bg-white hover:text-secondary"
                          }`
                        }
                      >
                        <FaMoneyBillWave
                          className={`text-${showSidebar ? "2xl" : "2xl"}`}
                        />
                        {!showSidebar && "Withdrawals"}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </nav>

            {/* Bottom section for logout and home */}
            <nav className="text-center border-t pt-3">
              <ul className="list-none flex flex-col gap-2 font-bold text-white">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white hover:text-secondary transition"
                  >
                    <RiArrowGoBackFill
                      className={`text-${showSidebar ? "2xl" : "2xl"}`}
                    />
                    {!showSidebar && "Home"}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-2 rounded w-full hover:bg-white hover:text-secondary transition"
                  >
                    <FaSignOutAlt
                      className={`text-${showSidebar ? "2xl" : "2xl"}`}
                    />
                    {!showSidebar && "Log-Out"}
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        }

        <div
          className={`transition-all duration-300 ${
            showSidebar ? "ml-[3rem] w-full" : "ml-[20%] w-[80%]"
          } h-[calc(100vh- 60px)]  md:p-6 my-16`}
        >
          {location.pathname === "/dashboard" && (
            <>
              {isAdmin ? (
                <AdminHome />
              ) : isBuyer?.buyer ? (
                <BuyerHome />
              ) : isWorker?.worker ? (
                <WokerHome />
              ) : null}
            </>
          )}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
