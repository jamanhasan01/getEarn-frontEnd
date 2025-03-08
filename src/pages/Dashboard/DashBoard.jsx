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
import { TbView360Arrow } from "react-icons/tb";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";

const DashBoard = () => {
  let { logout, loading, user } = useAuth();
  let location = useLocation();
  let navigate = useNavigate();
  let [isAdmin] = useAdmin();
  let [isBuyer, adminLoading] = useBuyer();
  let [isWorker] = useWorker();
  const [showSidebar, setshowSidebar] = useState(false);

  if (adminLoading || loading) {
    return <LoadingPage />;
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
        <aside
          className={`fixed left-0 top-0 z-10 h-full bg-[#7480ff] p-5 flex flex-col justify-between transition-all duration-300 ${
            showSidebar ? "w-20" : "md:w-1/5"
          }`}
        >
          {/* Button to toggle sidebar visibility */}
          <button
            onClick={() => setshowSidebar(!showSidebar)}
            className="absolute -right-3 top-[50%] text-white text-3xl"
          >
            <FaCircleChevronRight />
          </button>

          <nav className="text-center">
          <Link to="/">
         {
          !showSidebar ? 
          <h2 className="text-2xl font-semibold text-white mb-5">
            Get Earn
          </h2> 
          
          :< GiTakeMyMoney className="text-4xl p-1 rounded-2xl font-semibold text-[#7480ff] bg-white mb-5 border"></GiTakeMyMoney>
       
         } </Link>
            <ul className="list-none flex flex-col gap-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                        location.pathname === "/dashboard"
                        ? "bg-white text-[#7480ff] rounded"
                        :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
                    }`
                  }
                >
                  <FaHome className={`text-${showSidebar ? "2xl" : "2xl"}`} />
                  {!showSidebar && "Dashboard"}{" "}
                  {/* Hide text if sidebar is collapsed */}
                </NavLink>
              </li>

              {isAdmin && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manageusers"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/managetasks"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/addtask"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/mytasks"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/purchasecoine"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/tasklist"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            : "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/mysubmissions"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            :  "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                      to="/dashboard/withdrawals"
                      className={({ isActive }) =>
                        `flex items-center gap-2 text-lg px-2 py-2 font-semibold transition-all ${
                          isActive
                            ? "bg-white text-[#7480ff] rounded"
                            : "text-white rounded hover:bg-white hover:text-[#7480ff]"
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
                  className="flex items-center gap-2 px-2 py-2 rounded hover:bg-white hover:text-[#7480ff] transition"
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
                  className="flex items-center gap-2 px-2 py-2 rounded w-full hover:bg-white hover:text-[#7480ff] transition"
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

        <div
          className={`transition-all duration-300 ${
            showSidebar ? "ml-[5rem] w-[calc(100%-5rem)]" : "ml-[20%] w-[80%]"
          } min-h-screen p-10 mt-10`}
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
