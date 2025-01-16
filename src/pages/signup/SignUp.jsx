import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignUp = () => {
  let { createUser, setuser, setloading, updateUserProfile } = useAuth();

  let handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      let form = new FormData(e.target);
      let name = form.get("username");
      let photo = form.get("photo");
      let email = form.get("email");
      let password = form.get("password");

      let { user } = await createUser(email, password);
      await updateUserProfile(name, photo);
      setuser(user);
    } catch (error) {
      console.log(error.code);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <div className="hero min-h-screen container">
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
              {/* rule */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rule</span>
                </label>
               <select className="input input-bordered" defaultValue={'worker'}>
                <option value={'worker'}>Worker</option>
                <option value={'buyer'}>buyer</option>
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
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <p className="text-center mt-2">
            already have an account?
            <Link className=" underline font-bold" to={'/signin'}>Sign-In</Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default SignUp;
