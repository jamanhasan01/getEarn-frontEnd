import { useContext } from "react";
import auth from "./firebase/firebase.init";
import { authContext } from "./provider/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import LoadingPage from "./shared/LoadingPage";

import { motion, useScroll } from "framer-motion"; // Correct import

const Root = () => {
  let { loading, user } = useAuth();
  const { scrollYProgress } = useScroll();
  let location = useLocation();


  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbar></Navbar>
      )}
       {location.pathname !== "/signin" && location.pathname !== "/signup" && (
          <motion.div
          id="scroll-indicator"
          style={{ scaleX: scrollYProgress, originX: 0 }} // Only dynamic styles remain
          className="fixed top-0 left-0 right-0 h-[2px] bg-orange-500 mt-16 z-50"
        />
      )}
   
      <Outlet /> {/* Moved outside of motion.div */}
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Footer></Footer>
      )}
    </div>
  );
};

export default Root;
