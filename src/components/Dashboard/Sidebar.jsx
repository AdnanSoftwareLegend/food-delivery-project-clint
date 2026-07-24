import { NavLink, useNavigate } from "react-router";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaChartBar,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaUserEdit,
  FaBoxOpen,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  const menuItemStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-black hover:bg-orange-100 hover:text-orange-600 transition-all duration-300";

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  return (
    <div className="h-full w-64 bg-[#eaeff5] shadow-xl flex flex-col justify-between p-5">
      {/* Top Section */}
      <div>
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-orange-500 mb-8">
          Dashboard
        </h1>

        {/* Menu */}
        <nav className="space-y-2">
          {/* Common Links */}
          <NavLink to="/" className={menuItemStyle}>
            <FaHome className="text-lg" />
            Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={menuItemStyle}
          >
            <FaUser className="text-lg" />
            Profile
          </NavLink>

          {/* Loading */}
          {isLoading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Statistics */}
              <NavLink
                to="/dashboard/statistics"
                className={menuItemStyle}
              >
                <FaChartBar className="text-lg" />
                Statistics
              </NavLink>

              {/* Customer */}
              {role === "customer" && (
                <>
                  <NavLink
                    to="/dashboard/my-orders"
                    className={menuItemStyle}
                  >
                    <FaClipboardList className="text-lg" />
                    My Orders
                  </NavLink>

                  <NavLink
                    to="/dashboard/become-a-seller"
                    className={menuItemStyle}
                  >
                    <FaUserEdit className="text-lg" />
                    Become A Seller
                  </NavLink>
                </>
              )}

              {/* Seller */}
              {role === "seller" && (
                <>
                  <NavLink
                    to="/dashboard/add-meal"
                    className={menuItemStyle}
                  >
                    <FaPlusCircle className="text-lg" />
                    Add Meals
                  </NavLink>

                  <NavLink
                    to="/dashboard/manage-orders"
                    className={menuItemStyle}
                  >
                    <FaClipboardList className="text-lg" />
                    Manage Orders
                  </NavLink>

                  <NavLink
                    to="/dashboard/my-inventory"
                    className={menuItemStyle}
                  >
                    <FaBoxOpen className="text-lg" />
                    My Inventory
                  </NavLink>
                </>
              )}

              {/* Admin */}
              {role === "admin" && (
                <>
                  <NavLink
                    to="/dashboard/manage-user"
                    className={menuItemStyle}
                  >
                    <FaUsers className="text-lg" />
                    Manage Users
                  </NavLink>

                  <NavLink
                    to="/dashboard/seller-request"
                    className={menuItemStyle}
                  >
                    <FaUserEdit className="text-lg" />
                    Seller Requests
                  </NavLink>
                </>
              )}
            </>
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co/mJR9p7C/user-placeholder.png"
            }
            alt="user"
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />

          <div className="min-w-0">
            <p className="font-semibold text-sm text-black truncate">
              {user?.displayName || "User"}
            </p>

            <p className="text-xs text-gray-700 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;