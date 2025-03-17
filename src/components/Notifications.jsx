import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../shared/LoadingPage";
import moment from "moment";
const socket = io("http://localhost:9000");

const Notifications = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  console.log(user);

  // Fetch notifications
  const { data: notifications, isLoading } = useQuery({
    queryKey: [user?.email, "notification"],
    queryFn: async () => {
      const res = await axiosPrivate(`/notifications/${user?.email}?limit=${100}&skip=${0}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const notificationArr = notifications || [];
  console.log(notificationArr);

  return (
    <section>
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">
         All Notifications
        </h2>
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <table className="table w-full text-gray-200">
              {/* Table Header */}
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 text-center">No</th>
                  <th className="py-3 text-center">Time & Date</th>
                  <th className="py-3 text-center">Messages</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {notificationArr?.map((n, i) => (
                  <tr key={n._id} className="border-b border-gray-600">
                    <td className="text-center">{i + 1}</td>

                    <td className="text-center">
                      {moment(n?.createdAt).format("lll")}
                    </td>

                    <td className="text-center">{n?.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile */}
          <div className="flex flex-col md:hidden space-y-4">
            {notificationArr?.map((n, i) => (
              <div key={n._id} className="bg-gray-700 p-5 rounded-lg shadow-md">
                <div className="flex flex-col items-start gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-16 w-16">
                      <img src={n?.taskImage} alt="Task Image" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{n.task_title}</h3>
                    <p className="text-gray-400 text-sm">
                      Buyer: {n.buyer_email}
                    </p>
                    <p className="text-green-400 font-bold text-sm">
                      Earned: {n.payable_amount} Coins
                    </p>
                  </div>
                  <div className=" text-right"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
