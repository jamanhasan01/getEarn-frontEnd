import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import default_avatar from "../assets/default_avatar.jpg";
import ThemeToggle from "../components/ThemeToggle";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { toast } from "react-toastify";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true); // State to manage transparency
  let { user, logout } = useAuth();
  let navigate = useNavigate();

  // Handle logout
  let handleLogout = () => {
    logout()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) =>toast.error(error));
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsTransparent(false); // Make navbar opaque
      } else {
        setIsTransparent(true); // Make navbar transparent
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navbar items
  let items = (
    <>
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
      </li>
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
    <div
    className={`navbar fixed left-0 top-0 z-10  transition-colors duration-300 ${
      isTransparent
        ? "bg-transparent !text-secondary"
        : " dark:bg-base-100/80 bg-transparent backdrop-blur-sm shadow-md"
    }`}
  >
      <div className="container py-0">
        <div className="flex-1">
          <Link
            to={"/"}
            className={`btn btn-ghost text-white ${!isTransparent &&"!text-secondary"}   text-xl`}
          >
            Get_Earn
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-secondary border-2">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photoURL || default_avatar}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = default_avatar; // Replace with your default image URL
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
          <ThemeToggle isTransparent={isTransparent}></ThemeToggle>
        </div>
      </div>
    </div>
  );
};

export default Navbar;