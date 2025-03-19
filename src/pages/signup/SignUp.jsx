import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const SignUp = () => {
  let axiosPublic = useAxiosPublic();
  const [showPass, setshowPass] = useState(false);
  let { createUser, setuser, setloading, updateUserProfile } = useAuth();
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let name = form.get("username");
    let email = form.get("email");
    let role = form.get("role");
    let password = form.get("password");
    let imageFile = e.target.image.files[0];

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    let imageDbApi = import.meta.env.VITE_IMGDB_API;

    try {
      let imageFormData = new FormData();
      imageFormData.append("image", imageFile);
      let imgUploadRes = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imageDbApi}`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      let imageUrl = imgUploadRes.data?.data?.url;
      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      let { user } = await createUser(email, password);
      await updateUserProfile(name, imageUrl);
      setuser(user);

      // this object send in user database
      let userInfo = {
        email,
        name,
        role,
        photo: imageUrl,
        coinPaid: 0,
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
      <div className="flex justify-center">
        <div className="w-full max-w-lg border border-gray-600 rounded-xl  shadow-2xl  p-10">
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
            </div>

            <div className="grid md:grid-cols-2 gap-3">
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
              {/* password */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={`${showPass?"text":"password"}`}
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
            </div>

            {/* photo url */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Photo</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full bg-gray-700 text-white"
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
