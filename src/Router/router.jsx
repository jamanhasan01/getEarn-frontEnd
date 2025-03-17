import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/Home/Home";
import SignIn from "../pages/signin/SignIn";
import DashBoard from "../pages/Dashboard/DashBoard";
import ErrorPage from "../shared/ErrorPage";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers.jsx";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks.jsx";
import AddTask from "../pages/Dashboard/buyer/AddTask.jsx";
import MyTasks from "../pages/Dashboard/buyer/MyTasks.jsx";
import PurchaseCoine from "../pages/Dashboard/buyer/PurchaseCoine.jsx";
import UpdateTask from "../pages/Dashboard/buyer/UpdateTask.jsx";
import TaskLists from "../pages/Dashboard/worker/TaskLists.jsx";
import MySubmissions from "../pages/Dashboard/worker/MySubmissions.jsx";
import Withdrawals from "../pages/Dashboard/worker/Withdrawals.jsx";

import VedioPlayer from "../components/VedioPlayer.jsx";
import PaymentHistory from "../pages/Dashboard/buyer/PaymentHistory.jsx";
import WorkerRoute from "./privet_route/WorkerRoute.jsx";
import BuyerRoute from "./privet_route/BuyerRoute.jsx";
import AdminRoute from "./privet_route/AdminRoute.jsx";
import Notifications from "../components/Notifications.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "vedioplayer/:id",
        element: <VedioPlayer></VedioPlayer>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // --------admin----------
      {
        path:"notifications",
        element:<Notifications></Notifications>
      },
      {
        path: "admin",
        element: <AdminRoute></AdminRoute>,
        children: [
          {
            path: "manageusers",
            element: <ManageUsers></ManageUsers>,
          },
          {
            path: "managetasks",
            element: <ManageTasks></ManageTasks>,
          },
        ],
      },

      // ----------buyer----------
      {
        path: "buyer",
        element: <BuyerRoute></BuyerRoute>,
        children: [
          {
            path: "addtask",
            element: <AddTask></AddTask>,
          },
          {
            path: `updatetask/:id`,
            element: <UpdateTask></UpdateTask>,
          },
          {
            path: "mytasks",
            element: <MyTasks></MyTasks>,
          },
          {
            path: "purchasecoine",
            element: <PurchaseCoine></PurchaseCoine>,
          },
          {
            path: "payment_history",
            element: <PaymentHistory></PaymentHistory>,
          },
        ],
      },

      // ----------worker-----------
      {
        path: "worker",
        element: <WorkerRoute />, // ✅ Protect all worker routes
        children: [
          { path: "tasklist", element: <TaskLists /> }, // ✅ Child inside WorkerRoute
          { path: "mysubmissions", element: <MySubmissions /> },
          { path: "withdrawals", element: <Withdrawals /> },
        ],
      },
     
    ],
  },
]);
export default router;
