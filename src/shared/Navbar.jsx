import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import default_avatar from "../assets/default_avatar.jpg";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  let { user, logout } = useAuth();
  let navigate = useNavigate();
  let handleLogout = () => {
    logout()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => console.log(error));
  };

  let items = (
    <>
    <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
      <li>
        {user ? (
          <>
            <button onClick={handleLogout}>Log-Out</button>
          </>
        ) : (
          <>
            <Link to={"/signin"}>
              <button>Login</button>
            </Link>
          </>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar bg-secondary dark:bg-base-100 fixed left-0 top-0 z-10">
      <div className=" container py-0">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost text-white dark:text-white text-xl">daisyUI</Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
               {} <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL ||default_avatar}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = default_avatar // Replace with your default image URL
                  }}
                />
                
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary text-white text-xl dark:bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {items}
            </ul>
          </div>
            <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
