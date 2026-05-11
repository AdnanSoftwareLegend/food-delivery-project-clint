import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaUtensils } from "react-icons/fa"; // আইকন ব্যবহারের জন্য: npm install react-icons
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Logged out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.error(error));
    };

    // নেভিগেশন লিঙ্কগুলো (মোবাইল ও ডেস্কটপ উভয়ের জন্য)
    const navOptions = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "text-orange-600 font-bold underline" : "font-medium hover:text-orange-500"}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/allmeal" 
                    className={({ isActive }) => isActive ? "text-orange-600 font-bold underline" : "font-medium hover:text-orange-500"}
                >
                    Meals
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink 
                        to="/dashboard" 
                        className={({ isActive }) => isActive ? "text-orange-600 font-bold underline" : "font-medium hover:text-orange-500"}
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start">
                {/* মোবাইল মেনু (Dropdown) */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2 font-semibold">
                        {navOptions}
                    </ul>
                </div>
                
                {/* লোগো এবং প্রজেক্টের নাম */}
                <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-orange-600">
                    <FaUtensils className="text-2xl" />
                    <span className="tracking-tight">LocalChefBazaar</span>
                </Link>
            </div>

            {/* ডেস্কটপ মেনু */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-6">
                    {navOptions}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* লগইন থাকলে প্রোফাইল পিকচার এবং লগআউট বাটন */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-orange-500 hover:scale-105 transition-transform">
                                <div className="w-10 rounded-full">
                                    <img 
                                        alt="User Profile" 
                                        src={user?.photoURL|| "https://i.ibb.co/mJR9p7C/user-placeholder.png"} 
                                        title={user?.displayName} 
                                    />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-orange-100">
                                <li className="px-4 py-2 font-bold text-orange-600 border-b mb-2">
                                    {user?.displayName || "User"}
                                </li>
                                <li><Link to="/profile">My Profile</Link></li>
                                <li><button onClick={handleLogOut} className="text-red-500 font-semibold mt-2">Logout</button></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-outline btn-orange-600 btn-sm md:btn-md border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all">
                            Login
                        </Link>
                        <Link to="/register" className="btn bg-orange-600 border-none text-white btn-sm md:btn-md hover:bg-orange-700 shadow-lg">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;