import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";


export let authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  let createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
  }
  let updateUserProfile=(name,photo)=>{
    return updateProfile(auth.currentUser,{
      displayName:name,photoURL:photo
    })
  }
  useEffect(() => {
    let subcribe=onAuthStateChanged(auth,currentUser=>{
      setuser(currentUser);
      setloading(false)
    })
    return ()=>subcribe()
  }, [])
  
console.log(user);

  let authInfo = {
    user,
    setuser,
    setloading,
    loading,
    createUser,
    updateUserProfile
  };

  return (
    <authContext.Provider value={authInfo}>{children}</authContext.Provider>
  );
};

export default AuthProvider;
