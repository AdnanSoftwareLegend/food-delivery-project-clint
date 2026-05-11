import { NavLink, useNavigate } from "react-router";
import { FaHome, FaUser, FaSignOutAlt, FaChartBar, FaPlusCircle, FaClipboardList, FaUsers, FaUserEdit, FaBoxOpen } from "react-icons/fa"; // Logic-er shathe icon gulo change kora hoyeche
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../Shared/LoadingSpinner"; // Apnar spinner path thik kore nin

const Sidebar = () => {
    const { user, logOut } = useAuth();
    const [role, isLoading] = useRole(); // useRole theke isLoading state-ti nilam
    const navigate = useNavigate();

    const menuItemStyle = ({ isActive }) =>
        isActive
            ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold"
            : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-orange-100 hover:text-orange-600 transition";

    const handleLogout = () => {
        logOut();
        navigate("/");
    };

    return (
        <div className="h-full w-64 bg-white shadow-lg flex flex-col justify-between p-5">

            {/* Top Section */}
            <div>
                {/* Logo / Title */}
                <h1 className="text-2xl font-bold text-orange-500 mb-8">
                    Dashboard
                </h1>

                {/* Menu */}
                <nav className="space-y-2">
                    {/* Common Links (Shobar jonyo) */}
                    <NavLink to="/" className={menuItemStyle}>
                        <FaHome />
                        Home
                    </NavLink>

                    <NavLink to="/profile" className={menuItemStyle}>
                        <FaUser />
                        Profile
                    </NavLink>

                    {/* Role Based Links with Loading Check */}
                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            {/* Statistics (Shadharonoto shobar thake) */}
                            <NavLink to="/dashboard/statistics" className={menuItemStyle}>
                                <FaChartBar />
                                Statistics
                            </NavLink>

                            {/* Customer Routes */}
                            {role === 'customer' && (
                                <>
                                    <NavLink to="/dashboard/my-orders" className={menuItemStyle}>
                                        <FaClipboardList />
                                        My Orders
                                    </NavLink>
                                    <NavLink to="/dashboard/become-a-seller" className={menuItemStyle}>
                                        <FaUserEdit />
                                        Become A Seller
                                    </NavLink>
                                </>
                            )}

                            {/* Seller Routes */}
                            {role === 'seller' && (
                                <>
                                    <NavLink to="/dashboard/add-meal" className={menuItemStyle}>
                                        <FaPlusCircle />
                                        Add Meals
                                    </NavLink>
                                    <NavLink to="/dashboard/manage-orders" className={menuItemStyle}>
                                        <FaClipboardList />
                                        Manage Orders
                                    </NavLink>
                                    <NavLink to="/dashboard/my-inventory" className={menuItemStyle}>
                                        <FaBoxOpen />
                                        My Inventory
                                    </NavLink>
                                </>
                            )}

                            {/* Admin Routes */}
                            {role === 'admin' && (
                                <>
                                    <NavLink to="/dashboard/manage-user" className={menuItemStyle}>
                                        <FaUsers />
                                        Manage Users
                                    </NavLink>
                                    <NavLink to="/dashboard/seller-request" className={menuItemStyle}>
                                        <FaUserEdit />
                                        Seller Requests
                                    </NavLink>
                                </>
                            )}
                        </>
                    )}
                </nav>
            </div>

            {/* Bottom Section (User + Logout) */}
            <div className="border-t pt-4">
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/mJR9p7C/user-placeholder.png"}
                        alt="user"
                        className="w-10 h-10 rounded-full border object-cover"
                    />
                    <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                            {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;