import { useContext } from "react";
import auth from "./firebase/firebase.init";
import { authContext } from "./provider/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import LoadingPage from "./shared/LoadingPage";


const Root = () => {
  let { loading, user } = useAuth();
  let location = useLocation();
  console.log(user);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbar></Navbar>
      )}
      <div className="mt-16">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
