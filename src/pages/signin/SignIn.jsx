import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TotpSecret } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  let { signIn, user } = useAuth();
  let navigate = useNavigate();

  let handleSignIn = (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let email = form.get("email");
    let password = form.get("password");

    signIn(email, password)
      .then((res) => {
        if (res?.user) {
          toast.success('Login successful')
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.catch);
      });
  };
  return (
    <div>
      <div className="hero container">
        <div className="w-full max-w-lg  shadow-2xl p-10">
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
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
