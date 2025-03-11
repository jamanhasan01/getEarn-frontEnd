import { useContext } from "react";
import auth from "./firebase/firebase.init";
import { authContext } from "./provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import LoadingPage from "./shared/LoadingPage";

const Root = () => {
  let { loading,user } = useAuth();
  console.log(user);
  
  if (loading) {
    return <LoadingPage></LoadingPage>
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
