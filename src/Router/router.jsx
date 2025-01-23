import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/Home/Home";
import SignIn from "../pages/signin/SignIn";
import DashBoard from "../pages/Dashboard/DashBoard";
import ErrorPage from "../shared/ErrorPage";
import AdminManage from "../pages/Dashboard/Admin/ManageUsers.jsx";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers.jsx";
import ManageTasks from "../pages/Dashboard/Admin/ManageTasks.jsx";
import AddTask from "../pages/Dashboard/buyer/AddTask.jsx";
import MyTasks from "../pages/Dashboard/buyer/MyTasks.jsx";
import PurchaseCoine from "../pages/Dashboard/buyer/PurchaseCoine.jsx";

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
        ]
    },{
        path:'/dashboard',
        element:<DashBoard></DashBoard>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'manageusers',
                element:<ManageUsers></ManageUsers>
            },
            {
                path:'managetasks',
                element:<ManageTasks></ManageTasks>
            },
            {
                path:'addtask',
                element:<AddTask></AddTask>
            },
            {
                path:'mytasks',
                element:<MyTasks></MyTasks>
            },
            {
                path:'purchasecoine',
                element:<PurchaseCoine></PurchaseCoine>
            }
        ]
    }
])
export default router