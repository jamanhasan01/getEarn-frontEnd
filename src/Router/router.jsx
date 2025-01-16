import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import SignUp from "../pages/signup/SignUp";
import Home from "../pages/Home/Home";
import SignIn from "../pages/signin/SignIn";

let router=createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
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
    }
])
export default router