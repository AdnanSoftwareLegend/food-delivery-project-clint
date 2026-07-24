import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import {
  FaShoppingCart,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") || "light";

    setTheme(savedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );
  };

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/search?query=${search}`);

    setSearch("");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch(console.error);
  };

  // Navigation Button Style
  const activeClass = ({ isActive }) =>
    isActive
      ? "rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 font-medium shadow-md transition-all duration-300"
      : "rounded-full px-4 py-2 text-gray-700 font-normal hover:bg-orange-50 hover:text-orange-500 transition-all duration-300";

  const navOptions = (
    <>
      <li>
        <NavLink to="/" className={activeClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/allmeal" className={activeClass}>
          Meals
        </NavLink>
      </li>

      <li>
        <NavLink to="/aboutus" className={activeClass}>
          About
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={activeClass}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100 shadow-lg">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8 py-2">

        {/* LEFT */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">

            <label
              tabIndex={0}
              className="btn btn-ghost rounded-full"
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 p-3 shadow-xl rounded-2xl bg-base-100 w-60 z-[100]"
            >
              {navOptions}
            </ul>
          </div>

          <Logo />

        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex items-center gap-8">

          <ul className="menu menu-horizontal gap-2">
            {navOptions}
          </ul>




{/* Search */}
<div
  className="
    group
    flex
    items-center
    w-[380px]
    h-12
    bg-white
    rounded-xl
    border
    border-orange-100
    shadow-sm
    hover:shadow-md
    hover:border-orange-300
    focus-within:border-orange-400
    transition-all
    duration-300
    overflow-hidden
  "
>
  {/* Search Icon */}
  <div
    className="
      flex
      items-center
      justify-center
      pl-4
      text-orange-300
      text-base
      transition-all
      duration-300
    "
  >
    <FaSearch />
  </div>

  {/* Input */}
  <input
    type="text"
    placeholder="Search meals..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    className="
      flex-1
      h-full
      px-3
      bg-transparent
      outline-none
      text-sm
      text-gray-600
      placeholder:text-gray-400
    "
  />

  {/* Divider */}
  <div className="h-6 w-px bg-orange-100 mr-1.5"></div>

  {/* Search Button */}
  <button
    onClick={handleSearch}
    className="
      h-9
      mx-1.5
      px-6
      rounded-lg
      bg-gradient-to-r from-[#ff6b6b] to-orange-500
      text-white
      text-small
      font-medium
      hover:bg-[#ff7e2a]
      active:scale-95
      transition-all
      duration-300
    "
  >
    Search
  </button>
</div>






                  </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">

          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost hover:bg-orange-100 transition duration-300"
          >
            {theme === "light" ? (
              <FaMoon className="text-orange-600 text-lg" />
            ) : (
              <FaSun className="text-yellow-500 text-lg" />
            )}
          </button> */}

          {/* Cart */}
          <Link
            to="/cart"
            className="relative w-11 h-11 rounded-full bg-orange-50 hover:bg-orange-100 flex items-center justify-center transition duration-300"
          >
            <FaShoppingCart className="text-lg text-orange-600" />

            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center animate-pulse">
              0
            </span>
          </Link>

          {/* USER */}
          {user ? (
            <div className="dropdown dropdown-end">

              <label
                tabIndex={0}
                className="cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-11 rounded-full ring ring-orange-400 ring-offset-2 hover:scale-105 transition duration-300">

                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/mJR9p7C/user-placeholder.png"
                      }
                      alt="User"
                    />

                  </div>
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 p-3 shadow-2xl rounded-2xl bg-base-100 w-60 z-[100]"
              >

                <li className="text-center font-semibold text-orange-500 mb-2">
                  {user?.displayName || "User"}
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="font-normal hover:text-orange-500 transition"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="font-normal hover:text-orange-500 transition"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogOut}
                    className="font-normal text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>

              </ul>

            </div>
          ) : (
            <div className="flex gap-3">

              <Link
                to="/login"
                className="btn h-11 min-h-0 rounded-full border border-orange-500 bg-transparent text-orange-500 font-medium px-6 hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn h-11 min-h-0 rounded-full border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium px-6 hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>

            </div>
          )}

                  </div>

      </div>
    </div>
  );
};

export default Navbar;