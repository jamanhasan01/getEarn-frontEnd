import { useContext } from "react";
import auth from "./firebase/firebase.init";
import { authContext } from "./provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Root = () => {
  let { loading,user } = useAuth();
  if (loading) {
    return;
  }
 

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-20">
      <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
