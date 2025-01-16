import { useContext } from "react";
import auth from "./firebase/firebase.init";
import { authContext } from "./provider/AuthProvider";
import { Outlet } from "react-router-dom";


const Root = () => {


  

  return (
    <div>
      <Outlet/>
    </div>
  );
};

export default Root;
