import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa6";

import useCoins from "../../../hooks/useCoins";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingPage from "../../../shared/LoadingPage";

const Topbar = () => {
  let {user}=useAuth()
  let axiosPrivate=useAxiosPrivate()

 let {data:user_info,isLoading}=useQuery({
    queryKey:[user?.email],
    queryFn:async()=>{
      let res=await axiosPrivate(`/user/${user?.email}`)
      return res?.data
      
    }
  })
  if (isLoading) {
    return <LoadingPage></LoadingPage>
  }

  
  
  return (
    <div className="navbar bg-gray-700 border-b border-gray-600 fixed z-10 items-center capitalize">
      <div className="navbar-start"></div>

      <div className="navbar-end">
        <div className="flex flex-col pr-2">
        <h4 className="text-white/80"><span className="font-semibold">Role</span> : {user_info?.role}</h4>
          <h4 className="flex items-center text-2xl font-semibold gap-2 text-[#FFD700]">
            {" "}
            {user_info?.coins}
            <FaCoins />
          </h4>
  
        </div>
        <div className="flex flex-col  px-2 border-gray-400 justify-center items-center">
          <img className="w-10 rounded-badge border-2 border-gray-500" src={user?.photoURL} alt="" />
          <h4 className="text-sm font-semibold ">{user?.displayName}</h4>
        </div>
        <button className="btn btn-ghost btn-circle">
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
      </div>
    </div>
  );
};

export default Topbar;
