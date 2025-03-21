import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import LoadingPage from "../shared/LoadingPage";

import moment from "moment";
import { Link } from "react-router-dom";

const NavBarOfNotifications = ({ setshowNotificatoinBar }) => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  // Fetch notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: [user?.email, "notification"], // Include `showAll` in the query key to refetch when it changes
    queryFn: async () => {
      const res = await axiosPrivate(`/notifications/${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const notificationArr = notifications || [];

  return (
    <div className="bg-gray-700 z-50 w-80  m- p-5 rounded-2xl">
      {/* Add a fixed height or max-height to enable scrolling */}
      <div className="space-y-2 overflow-y-scroll max-h-[calc(100vh-130px)]">
        <div className="text-right font-semibold text-sm  ">
          <button onClick={() => setshowNotificatoinBar(false)}>
            <Link to={`/dashboard/notifications`}>See more</Link>
          </button>
        </div>
        {notificationArr?.map((n) => (
          <div className="bg-slate-800 p-2 rounded-xl" key={n._id}>
            <p className="text-base">{n.message}</p>
            <h6 className="text-sm mt-2 text-lime-600">
              {moment(n.createdAt).format("LLL")}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBarOfNotifications;
