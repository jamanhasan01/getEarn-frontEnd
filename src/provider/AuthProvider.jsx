import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export let authContext = createContext();

const AuthProvider = ({ children }) => {
  let axiosPublic = useAxiosPublic();
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  let google_provider=new GoogleAuthProvider()

  // create an user
  let createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user

  let signIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let goolgeSignIn=()=>{
    return signInWithPopup(auth,google_provider)
  }
  // update user imformetion
  let updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // this state for track user (is this user login or not)
  useEffect(() => {
    setloading(true);
    let unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      if (currentUser) {
        axiosPublic.post("/jwt", { email: currentUser?.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data?.token);
            setloading(false);
          }
        });
      } else {
        localStorage.removeItem("access-token");
        setloading(false);
      }
    });
    return () => unsubcribe();
  }, []);

  let logout = () => {
    return signOut(auth);
  };

 

  let authInfo = {
    user,
    setuser,
    setloading,
    loading,
    createUser,
    updateUserProfile,
    logout,
    signIn,
    goolgeSignIn
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
