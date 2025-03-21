import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLogin = () => {
  let navigate = useNavigate();
  let axiosPublic = useAxiosPublic();
  let { goolgeSignIn, setuser, setloading } = useAuth();
  let handleGoogleLogin = async () => {
    try {
      let res = await goolgeSignIn();
      let user = res.user;

      setuser(user);

      let userInfo = {
        email: user.email,
        name:user.displayName,
        role: "worker",
        photo: user.photoURL,
        coinPaid: 0,
      };
      let {status} = await axiosPublic.post("/users", userInfo);
      
      
      if (status===200) {
        toast.success("Registation successful");
        navigate("/");
      }
    
      
      setloading(false);
    } catch (error) {
      toast.error(error.code);
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin} className="btn w-full">
        Sign In With Google
      </button>
    </div>
  );
};

export default GoogleLogin;
