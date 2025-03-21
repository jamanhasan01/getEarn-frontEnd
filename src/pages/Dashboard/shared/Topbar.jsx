import { Link, useLocation } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";
import default_avatar from "../../../assets/default_avatar.jpg";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingPage from "../../../shared/LoadingPage";
import NavBarOfNotifications from "../../../components/NavBarOfNotifications";
import { useState } from "react";
import useWorker from "../../../hooks/useWorker";
import useCoins from "../../../hooks/useCoins";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect } from "react";

const Topbar = () => {
  let { user } = useAuth();
  let [coins, refetchCoins] = useCoins();
  let axiosPrivate = useAxiosPrivate();
  let [isWorker] = useWorker();
  const [showNotificatoinBar, setshowNotificatoinBar] = useState(false);
  let location = useLocation();

  // ------------------------------
  // Animation setup
  const count = useMotionValue(0); // Start from 0
  const rounded = useTransform(count, (latest) => Math.round(latest)); // Round the animated value

  useEffect(() => {
    if (typeof coins === "number") {

      const controls = animate(count, coins, { duration: 1 });
      return () => controls.stop();
    }
  }, [coins]); // Animate when coins change
  // ------------------------------

  let { data: user_info, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      let res = await axiosPrivate(`/user/${user?.email}`);
      return res?.data;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="navbar bg-gray-700 border-b border-gray-600 fixed z-10 items-center capitalize">
      <div className="navbar-start"></div>

      <div className="navbar-end">
        <div className="flex flex-col pr-2">
          <h4 className="text-white/80 w-24 md:w-auto">
            <span className="font-semibold">Role</span> : {user_info?.role}
          </h4>
          <h4 className="flex items-center text-xl font-semibold gap-2 text-[#FFD700]">
            {" "}
            <motion.span>{rounded}</motion.span>
            <FaCoins />
          </h4>
        </div>
        <div className="flex flex-col  px-2 border-gray-400 justify-center items-center">
          <img
            className="w-10 h-10 bg-cover rounded-badge border-2 border-gray-500"
            src={user?.photoURL || default_avatar} // Default image if no URL is provided
            alt="User Avatar"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = default_avatar; // Replace with your default image URL
            }}
          />
          <h4 className="text-sm font-semibold ">{user_info?.name}</h4>
        </div>
        <div>
          {isWorker?.worker &&
            location.pathname !== "/dashboard/notifications" && (
              <button
                onClick={() => setshowNotificatoinBar(!showNotificatoinBar)}
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            )}
        </div>
      </div>
      <div className=" absolute right-0 top-20">
        {showNotificatoinBar && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <NavBarOfNotifications
              setshowNotificatoinBar={setshowNotificatoinBar}
            ></NavBarOfNotifications>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
