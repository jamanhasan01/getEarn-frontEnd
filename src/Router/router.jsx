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



let router=createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'signin',
                element:<SignIn/>
            },
            {
                path:'signup',
                element:<SignUp/>
            },
            {
                path:'vedioplayer/:id',
                element:<VedioPlayer></VedioPlayer>
            }
        ]
    },{
        path:'/dashboard',
        element:<DashBoard></DashBoard>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            // --------admin----------
         
            {
                path:'manageusers',
                element:<ManageUsers></ManageUsers>
            },
            {
                path:'managetasks',
                element:<ManageTasks></ManageTasks>
            },

            // ----------buyer----------
        
            {
                path:'addtask',
                element:<AddTask></AddTask>
            },
            {
                path:`updatetask/:id`,
                element:<UpdateTask></UpdateTask>
            }
            ,
            {
                path:'mytasks',
                element:<MyTasks></MyTasks>
            },
            {
                path:'purchasecoine',
                element:<PurchaseCoine></PurchaseCoine>
            },
            // ----------worker-----------
            {
                path:'tasklist',
                element:<TaskLists></TaskLists>
            },
            {
                path:'mysubmissions',
                element:<MySubmissions></MySubmissions>
            },
            {
                path:'withdrawals',
                element:<Withdrawals></Withdrawals>
            },
            {
                path:'payment_history',
                element:<PaymentHistory></PaymentHistory>
            } ,     
          ]
    }
])
export default router