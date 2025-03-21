import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TotpSecret } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import GoogleLogin from "../../components/GoogleLogin";

const SignIn = () => {
  let { signIn, user,setloading } = useAuth();
  const [showPass, setshowPass] = useState(false);
  let navigate = useNavigate();

  let handleSignIn = (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get("email");
    let password = form.get("password");

    signIn(email, password)
      .then((res) => {
        if (res?.user) {
          toast.success("Login successful");
          setloading(false)
          navigate("/");
        }
      })
      .catch((error) => {
         // Handle specific Firebase errors
         switch (error.code) {
          case "auth/invalid-email":
            toast.error("Invalid email address.");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password. Please try again.");
            break;
          case "auth/invalid-credential":
            toast.error("Invalid credentials. Please check your email and password.");
            break;
          default:
            toast.error("Login failed. Please try again.");
        }
    
        setloading(false)
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-2">
        <div className="w-full max-w-lg border  border-gray-600 rounded-xl  shadow-2xl p-10">
          <h1 className="text-center text-3xl font-semibold mb-5 ">Login</h1>
          <form onSubmit={handleSignIn} className=" w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={`${showPass ? "text" : "password"}`}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setshowPass(!showPass)}
                className=" absolute text-xl right-4 top-12 mt-1"
              >
                {showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div>
            <div className="flex items-center w-full my-3">
              <div className="flex-1 h-px bg-gray-400"></div>
              <div className="mx-4 text-gray-500 text-sm font-medium">OR</div>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>
            <GoogleLogin></GoogleLogin>
          </div>
          <p className="mt-2 text-center">
            don't you have any account?{" "}
            <Link to={"/signup"} className=" font-bold">
              Sign-Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
