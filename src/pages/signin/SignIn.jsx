

const SignIn = () => {
  return (
    <div>
    <div className="hero min-h-screen container">
    

        <div className="w-full max-w-lg  shadow-2xl p-10">
        <h1 className="text-center text-3xl font-semibold mb-5 ">Register</h1>
          <form className=" w-full">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
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
        </div>
      </div>

  </div>
  )
}

export default SignIn