import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
const socket = io("http://localhost:9000"); // Connect to your backend server


const Notifications = () => {
  let {user} = useAuth();
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Listen for task approval notifications
    socket.on("task_approved", (data) => {
      if (data.workerEmail === user?.email) {
        setNotification(data.message);
      }
    });

    // Cleanup on component unmount
    return () => {
      socket.off("task_approved");
    };
  }, [user?.email]);
  console.log(notification);

  return <div>Notifications</div>;
};

export default Notifications;
