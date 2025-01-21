import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SignUp = () => {
  let axiosPublic = useAxiosPublic();
  let { createUser, setuser, setloading, updateUserProfile } = useAuth();
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let name = form.get("username");
    let photo = form.get("photo");
    let email = form.get("email");
    let role = form.get("role");
    let password = form.get("password");
    try {
      
      let { user } = await createUser(email, password);
      await updateUserProfile(name, photo);
      setuser(user);

      // this object send in user database
      let userInfo = {
        email,
        name,
        role,
        photo,
        
      };
      let { data } = await axiosPublic.post("/users", userInfo);
      if (data.insertedId) {
        toast.success("Registation successful");
        navigate("/");
      }
      setloading(false);
    } catch (error) {
      console.log(error.code);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <div className="hero container">
        <div className="w-full max-w-lg  shadow-2xl  p-10">
          <h1 className="text-center text-3xl font-semibold mb-5">Register</h1>
          <form onSubmit={handleSubmit} className=" w-full">
            {/* grid leyer */}
            <div className="grid md:grid-cols-2 gap-3">
              {/* username */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="type your name"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* photo url */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="url"
                  name="photo"
                  placeholder="photo url"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            {/* grid leyer */}
            <div className="grid md:grid-cols-2 gap-3">
              {/* email */}
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
              {/* role */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  className="input input-bordered"
                  defaultValue={"worker"}
                >
                  <option value={"worker"}>Worker</option>
                  <option value={"buyer"}>Buyer</option>
                </select>
              </div>
            </div>
            {/* password */}
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
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <p className="text-center mt-2">
            already have an account ? 
            <Link className=" underline font-bold" to={"/signin"}>
              Sign-In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
